import twilio from "twilio";
import Login from "@/model2/Login";
import moment from "moment";
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export const POST = async (request, { params }) => {
  try {
    const phonePattern = /^\d{10}$/;
    const { phone = null } = await request.json();
    if (!phone || !phonePattern.test(phone)) {
      return new Response("Invalid Phone number!", { status: 500 });
    }
    const User = await Login.findOne({ phone });
    // var otp = Math.floor(100000 + Math.random() * 900000).toString();

    var otp = 123456;
    const body = `Your OTP code is ${otp}. It is valid for 1 minutes.`;
    // let data = {
    //   body: body,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: `+91${phone}`
    // }

    // await client.messages.create(data);
    if (!User) {
      const newUser = new Login({
        phone: phone,
        otp: otp,
        otpExpire: moment.utc().add(1, "minute").toISOString(),
        password: null,
      });

      console.log(newUser)


      await newUser.save();
      return new Response("OTP for login sent to mobile no.", {
        status: 200,
      });
    } else {
      User.otp = otp;
      User.otpExpire = moment.utc().add(1, "minute").toISOString();
      User.save();
      return new Response("OTP for login sent to mobile no.", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response("Something went wrong while genrating OTP!", {
      status: 500,
    });
  }
};
