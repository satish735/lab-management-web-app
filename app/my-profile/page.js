"use client"

import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'

import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import { useSession } from "next-auth/react";
import moment from "moment"
const MyProfile = () => {
    const session = useSession()



    useEffect(()=> {

        if(session?.data?.user?.otherDetails){
            let getuserinfo = session?.data?.user?.otherDetails

            Phone.setEnteredValue(session?.data?.user?.phone ?? "")
            Email.setEnteredValue(getuserinfo?.email ?? "")
            setGenderType(getuserinfo?.gender ?? "")
            Name.setEnteredValue(getuserinfo?.name ?? '')
            DOB.setEnteredValue(moment(getuserinfo?.dob ).format("YYYY-MM-DD")?? "")
        }

       },[session?.data?.user?.otherDetails])




    const Name = useInputComponent('');
    const FullnameValidater = (value) => {
        if (value === "" || !value) {
            Name.setFeedbackMessage(
                "Field required!"
            );
            Name.setMessageType("error");
            return false;
        }
        Name.setFeedbackMessage("");
        Name.setMessageType("none");
        return true;
    };



    const DOB = useInputComponent('');
    const DOBValidater = (value) => {
        if (value === "" || !value) {
            DOB.setFeedbackMessage(
                "Field required!"
            );
            DOB.setMessageType("error");
            return false;
        }
        DOB.setFeedbackMessage("");
        DOB.setMessageType("none");
        return true;
    };


    const [GenderType, setGenderType] = useState();
    const [GenderTypeIsTouch, setGenderTypeIsTouch] = useState(false);

    const [GenderTypeMessage, setGenderTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const GenderTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setGenderTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setGenderTypeMessage({ type: "info", message: "" });

        return true;
    };

    const genderoption = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];




    const Email = useInputComponent("");
    const EmailValidater = (value) => {
        if (value === "" || !value) {
            Email.setFeedbackMessage("Field required!");
            Email.setMessageType("error");
            return false;
        }
        Email.setFeedbackMessage("");
        Email.setMessageType("none");
        return true;
    };




    const Phone = useInputComponent("");
    const PhoneValidater = (value) => {
        if (value === "" || !value) {
            Phone.setFeedbackMessage("Field required!");
            Phone.setMessageType("error");
            return false;
        }
        Phone.setFeedbackMessage("");
        Phone.setMessageType("none");
        return true;
    };

    const [UpdateMemberResponse, UpdateMemberHandler] = useAPI(
        {
            url: `/member/${session?.data?.user?.otherDetails?._id}`,
            method: "put",
        },
        (e) => {

            toast.success("User Profile has been updated successfully");


        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Body Part!",
                    e
                )
            );
            return e;
        }
    );


    const submit = () => {
        var isFullnameValidater = FullnameValidater(Name.enteredValue)
        var isDOBValidater = DOBValidater(DOB.enteredValue)
        var isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType)
        var isEmailValidater = EmailValidater(Email.enteredValue)

        if (!isFullnameValidater || !isDOBValidater || !isGenderTypeSelectValidater || !isEmailValidater ) {
            toast.error(
                "Fill required fields!"
            );
        } else {
            UpdateMemberHandler({
                body: {
                    name: Name.enteredValue,
                    dob: DOB.enteredValue,
                    gender: GenderType,
                    email: Email.enteredValue,
                }
            })
        }
    }


    return <>


        <div className='main-parent-bar-div'>

            <div className='side-bar-main' style={{ backgroundColor: 'white' }}>
                <SideBarProfile />
            </div>

            <div className='item-page-section'>
                <div className="my-3">
                    <h4 className="px-5 mx-5" style={{ fontWeight: "1.orem", fontWeight: "700" }}> 
                        My Profile
                    </h4>

                    <div className="text-center">
                        <img src="/assets/images/male.png" style={{ marginRight: "18px" }} alt="" />
                    </div>
                    <div className='row  mx-lg-5 mx-0 my-2'>
                        <div className=" my-1 col-12">
                            <InputWithAddOn
                                placeholder="Full Name"
                                label="Full Name"
                                className="loginInputs"
                                setValue={Name.setEnteredValue}
                                value={Name.enteredValue}
                                feedbackMessage={Name.feedbackMessage}
                                feedbackType={Name.messageType}
                                isTouched={Name.isTouched}
                                setIsTouched={Name.setIsTouched}
                                validateHandler={FullnameValidater}
                                reset={Name.reset}
                                // disabled={true}
                            />
                        </div>


                        <div className="my-1 col-sm-6 col-12">
                            <InputWithAddOn
                                label="Email"
                                placeholder="Email"
                                className="loginInputs"
                                setValue={Email.setEnteredValue}
                                value={Email.enteredValue}
                                feedbackMessage={Email.feedbackMessage}
                                feedbackType={Email.messageType}
                                isTouched={Email.isTouched}
                                setIsTouched={Email.setIsTouched}
                                validateHandler={EmailValidater}
                                reset={Email?.reset}
                                // disabled={true}
                            />
                        </div>

                        <div className="my-1 col-sm-6 col-12">
                            <InputWithAddOn
                                label="Phone"
                                placeholder="Phone"
                                className="loginInputs"
                                setValue={Phone.setEnteredValue}
                                value={Phone.enteredValue}
                                feedbackMessage={Phone.feedbackMessage}
                                feedbackType={Phone.messageType}
                                isTouched={Phone.isTouched}
                                setIsTouched={Phone.setIsTouched}
                                validateHandler={PhoneValidater}
                                reset={Phone?.reset}
                                disabled={true}
                            />
                        </div>

                        <div className="col-sm-6 col-12 my-1">
                            <InputWithAddOn
                                placeholder="DOB"
                                label="DOB"
                                className="loginInputs"
                                type="date"
                                setValue={DOB.setEnteredValue}
                                value={DOB.enteredValue}
                                feedbackMessage={DOB.feedbackMessage}
                                feedbackType={DOB.messageType}
                                isTouched={DOB.isTouched}
                                setIsTouched={DOB.setIsTouched}
                                validateHandler={DOBValidater}
                                reset={DOB.reset}
                                // disabled={true}
                            />
                        </div>
                        <div className="col-sm-6 col-12 my-1 ">
                            <InputSelect
                                setValue={setGenderType}
                                value={GenderType}
                                options={genderoption ?? []}
                                isTouched={GenderTypeIsTouch}
                                setIsTouched={setGenderTypeIsTouch}
                                className="py-1"
                                label={"Gender"}
                                // disabled={true}
                                feedbackMessage={GenderTypeMessage?.message}
                                feedbackType={GenderTypeMessage?.type}
                                validateHandler={GenderTypeSelectValidater}
                            />
                        </div>
                         <div className="text-end">
                             <button onClick={submit} className="btn btn-theme primary"> 
                               {UpdateMemberResponse?.fetching ? <Spinner size='sm' /> : "Update Profile"}  
                             </button>
                         </div>

                    </div>
                </div>
            </div>
        </div>


    </>
}

export default MyProfile