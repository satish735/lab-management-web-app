import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import crypto from "crypto";
// transactionid - generated uniquiq id to be used in callback(required)
// merchantUserId - booking id / user id
// amount in paise min 100
// redirectUrl -redirect to page after payment success
// callbackUrl - api url to update database entry{post}
// 
async function initiatePayment({ transactionid, merchantUserId, amount, redirectUrl, callbackUrl, userMobileNumber = null }) {
    try {

        const payload = {
            merchantId: process.env.PAYMENT_GATEWAY_MERCHANT_ID,
            merchantTransactionId: transactionid,
            merchantUserId: merchantUserId,
            amount: amount,
            redirectUrl: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${redirectUrl}`,
            redirectMode: "GET",
            callbackUrl: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${callbackUrl}`,
            mobileNumber: userMobileNumber,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };
        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString('base64');
        // Create checksum
        const fullURL = dataBase64 + "/pg/v1/pay" + process.env.PAYMENT_GATEWAY_SALT_KEY;
        const dataSha256 = crypto.createHash('sha256').update(fullURL).digest('hex');
        const checksum = `${dataSha256}###${process.env.PAYMENT_GATEWAY_SALT_INDEX}`;
        const UAT_PAY_API_URL =
            "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const response = await axios.post(
            UAT_PAY_API_URL,
            {
                request: dataBase64,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
            }
        );
        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        return { status: "success", url: redirect }
    }
    catch (err) {
        return { status: "failed", message: err?.message }
    }
}

async function parseCallbackResponse(base64Response) {
    try {
        var decodedSha = null
        const buffer = Buffer.from(base64String, 'base64');
        const utf8String = buffer.toString('utf8');
        decodedSha = JSON.parse(utf8String)
        return { status: "success", decoded: decodedSha }
    }
    catch (err) {
        return { status: "failed", message: err?.message }
    }
}
// pending
async function checkTransactionStatus(base64Response) {
    try {
        var decodedSha = SHA256(base64Response + process.env.PAYMENT_GATEWAY_SALT_KEY) + "###" + process.env.PAYMENT_GATEWAY_SALT_INDEX
        return { status: "success", decoded: decodedSha }
    }
    catch (err) {
        return { status: "failed", message: err?.message }
    }
}
module.exports = {
    initiatePayment,
    parseCallbackResponse
}