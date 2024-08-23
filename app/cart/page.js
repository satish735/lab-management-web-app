"use client";
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import "./cart.css"
import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '../../components/formInput/InputWithAddOn';
const Cart = ({ params: { id } }) => {


    const [initialProducts, setinitialProducts] = useState([
        {
            name: 'Natural Cacao Powder',
            price: 900.00,
            image: '/images/cacao.jpg'
        },
        {
            name: 'Biotin Complex',
            price: 1400.00,
            image: '/images/biotin.jpg'
        }
    ])

    const removeitem = (itemindex) => {
        let data = initialProducts?.filter((item, index) => index != itemindex)
        setinitialProducts(data)
    }


    const [totalprice, settotalprice] = useState(0)
    const [Subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(10)

    const[discountcost, setDiscountCost] = useState(0)

    useEffect(() => {

        if (initialProducts.length > 0) {
            let totalcost = 0;
            initialProducts?.map((item) => {
                totalcost += Number(item?.price)
            })

            console.log(totalcost)
            setSubtotal(totalcost)
            let actualcost = totalcost - (totalcost / 100) * discount
            settotalprice(actualcost)

            setDiscountCost((totalcost / 100) * discount)
        }



    }, [initialProducts])


    const CouponCode = useInputComponent('');
    const CouponCodeValidater = (value) => {
        if (value === "" || !value) {
            CouponCode.setFeedbackMessage(
                "Field required!"
            );
            CouponCode.setMessageType("error");
            return false;
        }
        CouponCode.setFeedbackMessage("");
        CouponCode.setMessageType("none");
        return true;
    };
    return (
        <div style={{ backgroundColor: "white" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    Cart
                </span>
            </div>

            <div className="p-3  " style={{ width: "90%", margin: "0 auto" }} >
                <table className="custom_css rounded " style={{ width: "100%", backgroundColor: "#ffffff", borderCollapse: "collapse", border: "1px solid #ccc" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #ccc" }}>

                            <th className="py-3" colSpan={2} style={{ border: "1px solid #ccc", textAlign: "center" }}>Product</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialProducts.map((product, index) => (
                            <tr key={index} className="my-2 py-3" style={{ borderBottom: "1px solid #ccc" }}>
                                <td className="text-center small  py-4">
                                    <span style={{ cursor: "pointer" }} onClick={() => { removeitem(index) }} className="cross_button ">X</span>
                                </td>
                                <td className="px-2" style={{ border: "1px solid #ccc " }}>
                                    {/* <img src={product.image} alt={product.name} width={50} height={50} /> */}
                                    {product.name}
                                </td>
                                <td className="px-2" style={{ border: "1px solid #ccc" }}>₹ {product.price.toFixed(2)}</td>
                            </tr>
                        ))}


                    </tbody>

                </table>


                <div className="bg-white py-3 px-0 mx-0 row border-1 border rounded ">
                    <div className="col-sm-3 col-7">
                        <InputWithAddOn
                            placeholder="Coupon Code"
                            className="loginInputs"

                            setValue={CouponCode.setEnteredValue}
                            value={CouponCode.enteredValue}
                            feedbackMessage={CouponCode.feedbackMessage}
                            feedbackType={CouponCode.messageType}
                            isTouched={CouponCode.isTouched}
                            setIsTouched={CouponCode.setIsTouched}

                            // validateHandler={CouponCodeValidater}
                            reset={CouponCode.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-5">
                        <button type="button " style={{ fontSize: "0.7rem" }}
                            className="btn btn_apply_coupon small">Apply Coupon</button>
                    </div>
                </div>


                <div className="py-3">
                    <h5 className="custom_css">Cart Totals</h5>
                    <div className="col-sm-4 col-12" >
                        <div className="py-2">
                            <span className="custom_css">Subtotal :</span>
                            <span style={{ float: "right" }}>₹ {Subtotal}</span>
                        </div>

                        <div className="py-2">
                            <span className="custom_css">Discount Amount :</span>
                            <span style={{ float: "right" }}>- ₹ {discountcost}</span>
                        </div>

                        <div className="py-2">
                            <span className="custom_css">Total :</span>
                            <span style={{ float: "right" }}>₹ {totalprice} </span>
                        </div>

                    </div>

                    <div className="my-3">
                        <button type="button " className="btn   btn_checkout">Proced To Checkout</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Cart;
