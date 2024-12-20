"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import moment from "moment";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import transformErrorDefault from "@/utils/transformErrorDefault";


const Userupdate = ({ searchParams }) => {
    const router = useRouter();


    const [imageFile, setImageFile] = useState({
        url: "",
        status: "",
    });

    const [centerdata, setcenterdata] = useState([])

    const [centerResponse, centerHandler] = useAPI(
        {
            url: "/centers/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {
            let data = e?.data?.map((item) => {
                return { label: item?.centre, value: item?._id }
            })
            setcenterdata(data)
            return data
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Getting Centers!", e)
            );
            return e;
        }
    );


    useEffect(() => {

        if (centerdata) {
            getuserHandler()
        }

    }, [centerdata])


    const [getuserResponse, getuserHandler] = useAPI(
        {
            url: `/adminlogin/${searchParams?.id}`,
            method: "get",
        },
        (e) => {
            EmailInput.setEnteredValue(e?.email)
            PhoneInput.setEnteredValue(e?.phone)
            UserNameInput?.setEnteredValue(e?.username)
            setrole(e?.role)
            setImageFile({ filePath: e?.image, url: process.env.NEXT_PUBLIC_BUCKET_URL + e?.image, status: searchParams?.type === 'edit' ? 'original' : 'Original' })
            setGenderType(e?.gender)
            dobDate?.setEnteredValue(moment(e?.dob).format("YYYY-MM-DD"))
            PasswordInput.setEnteredValue(e?.bcryptPassword)
            NameInput.setEnteredValue(e?.name)
            const filteredData = centerdata.filter(item => e?.iscenter.includes(item.value))
            setcenter(filteredData ?? [])

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting User!",
                e
            ));
            return e
        }
    );


    const [deleteuserResponse, deleteuserHandler] = useAPI(
        {
            url: `/adminlogin/${searchParams?.id}`,
            method: "DELETE",

        },
        (e) => {

            router.push("/admin/user")

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting User!",
                e
            ));
            return e
        }
    );

    const [userResponse, userHandler] = useAPI(
        {
            url: `/adminlogin/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/user")

            toast.success("Test condition updated successfully");
            setImageFile({
                url: "",
                status: "",
            })

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



    const EmailInput = useInputComponent('');
    const EmailInputValidater = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "" || !value) {
            EmailInput.setFeedbackMessage(
                "Field required!"
            );
            EmailInput.setMessageType("error");
            return false;
        }

        if (!emailRegex.test(value)) {
            EmailInput.setFeedbackMessage("Please enter a valid email address (e.g., user@example.com).");
            EmailInput.setMessageType("error");
            return false;
        }
        EmailInput.setFeedbackMessage("");
        EmailInput.setMessageType("none");
        return true;
    };


    const NameInput = useInputComponent('');
    const NameInputValidater = (value) => {
        if (value === "" || !value) {
            NameInput.setFeedbackMessage(
                "Field required!"
            );
            NameInput.setMessageType("error");
            return false;
        }
        NameInput.setFeedbackMessage("");
        NameInput.setMessageType("none");
        return true;
    };


    const UserNameInput = useInputComponent('');
    const UserNameInputValidater = (value) => {
        if (value === "" || !value) {
            UserNameInput.setFeedbackMessage(
                "Field required!"
            );
            UserNameInput.setMessageType("error");
            return false;
        }

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(value)) {
            UserNameInput.setFeedbackMessage(
                "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
            );
            UserNameInput.setMessageType("error");
            return false;
        }
        UserNameInput.setFeedbackMessage("");
        UserNameInput.setMessageType("none");
        return true;
    };


    const DescriptionInput = useInputComponent('');
    const DescriptionInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionInput.setFeedbackMessage(
                "Field required!"
            );
            DescriptionInput.setMessageType("error");
            return false;
        }
        DescriptionInput.setFeedbackMessage("");
        DescriptionInput.setMessageType("none");
        return true;
    };



    const PhoneInput = useInputComponent('');
    const PhoneInputValidater = (value) => {
        if (value === "" || !value) {
            PhoneInput.setFeedbackMessage(
                "Field required!"
            );
            PhoneInput.setMessageType("error");
            return false;
        }
        const phoneRegex = /^[789]\d{9}$/;
        const cleanedValue = value.replace(/\D/g, '');

        if (cleanedValue.length !== 10 || !phoneRegex.test(cleanedValue)) {
            PhoneInput.setFeedbackMessage(
                "Please enter a valid 10-digit Indian phone number."
            );
            PhoneInput.setMessageType("error");
            return false;
        }

        PhoneInput.setFeedbackMessage("");
        PhoneInput.setMessageType("none");
        return true;
    };




    const PasswordInput = useInputComponent('');
    const PasswordInputValidater = (value) => {
        if (value === "" || !value) {
            PasswordInput.setFeedbackMessage(
                "Field required!"
            );
            PasswordInput.setMessageType("error");
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const minLength = 8;
        if (!passwordRegex.test(value)) {
            PasswordInput.setFeedbackMessage(
                "Password must be at least 8 characters with mixed types  Example 'Root@123'."
            );
            PasswordInput.setMessageType("error");
            return false;
        }
        PasswordInput.setFeedbackMessage("");
        PasswordInput.setMessageType("none");
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



    const [role, setrole] = useState();
    const [roleIsTouch, setroleIsTouch] = useState(false);

    const [roleMessage, setroleMessage] = useState({
        type: "info",
        message: "",
    });
    const roleSelectValidater = (value) => {
        if (value === "" || !value) {
            setroleMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setroleMessage({ type: "info", message: "" });

        return true;
    };


    const [center, setcenter] = useState([]);
    const [centerIsTouch, setcenterIsTouch] = useState(false);

    const [centerMessage, setcenterMessage] = useState({
        type: "info",
        message: "",
    });
    const centerSelectValidater = (value) => {
        if (value === "" || !value) {
            setcenterMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setcenterMessage({ type: "info", message: "" });

        return true;
    };



    const dobDate = useInputComponent("");
    const dobDateValidater = (value) => {
        if (value === "" || !value) {
            dobDate.setFeedbackMessage("Field required!");
            dobDate.setMessageType("error");
            return false;
        }
        dobDate.setFeedbackMessage("");
        dobDate.setMessageType("none");
        return true;
    };










    const submit = () => {



        let EmailValidate = EmailInputValidater(EmailInput.enteredValue);
        let NameValidate = NameInputValidater(NameInput.enteredValue);
        // let isUserNameValidate = UserNameInputValidater(UserNameInput.enteredValue);
        let isPasswordValidate = PasswordInputValidater(PasswordInput.enteredValue);
        let PhoneValidate = PhoneInputValidater(PhoneInput.enteredValue);
        // let isroleSelectValidater = roleSelectValidater(role)
        let iscenterSelectValidater = centerSelectValidater(center)
        let isdobDateValidater = dobDateValidater(dobDate?.enteredValue)
        let isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType)

        if (!EmailValidate || !PhoneValidate || !NameValidate || !isdobDateValidater
            || !isGenderTypeSelectValidater || !isPasswordValidate || !iscenterSelectValidater
        ) {
            toast.error('Fill all required fields.')
        }
        else {


            userHandler({
                body: {
                    email: EmailInput.enteredValue ?? '',
                    phone: PhoneInput.enteredValue ?? '',
                    role: role ?? '',
                    name: NameInput?.enteredValue,
                    gender: GenderType ?? "",
                    dob: dobDate?.enteredValue ?? null,
                    // image: imageFile?.filePath ?? "",
                    iscenter: center?.map((item) => {
                        return item?.value
                    }) ?? [],
                    bcryptPassword: PasswordInput?.enteredValue ?? ""
                }
            })




        }

    };

    return (
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "User", link: "/admin/user" },
                    { label: "Update", active: true },
                ]}
            />
            {(getuserResponse?.fetching || centerResponse?.fetching) ? <div className="my-4 text-center" ><Spinner size={"xl"} /></div> : <div className=' bg-white p-4  ' style={{ textAlign: "left" }}>


                <h1 className="main-heading">Update Admin User</h1>

                <div className=" row my-3"  >
                    <div className="my-2 col-sm-3 col-12" >

                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />
                    </div>

                    <div className="row col-sm-9 col-12 ">


                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <InputWithAddOn
                                label="Name"
                                className="loginInputs"

                                setValue={NameInput.setEnteredValue}
                                value={NameInput.enteredValue}
                                feedbackMessage={NameInput.feedbackMessage}
                                feedbackType={NameInput.messageType}
                                isTouched={NameInput.isTouched}
                                setIsTouched={NameInput.setIsTouched}
                                disabled={searchParams?.type === 'view'}

                                validateHandler={NameInputValidater}
                                reset={NameInput.reset}
                                isRequired={true}
                            />

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <InputWithAddOn
                                label="Email"
                                className="loginInputs"

                                setValue={EmailInput.setEnteredValue}
                                value={EmailInput.enteredValue}
                                feedbackMessage={EmailInput.feedbackMessage}
                                feedbackType={EmailInput.messageType}
                                isTouched={EmailInput.isTouched}
                                setIsTouched={EmailInput.setIsTouched}
                                disabled={searchParams?.type === 'view'}

                                validateHandler={EmailInputValidater}
                                reset={EmailInput.reset}
                                isRequired={true}
                            />


                        </div>


                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <InputWithAddOn
                                label="User Name"
                                className="loginInputs"

                                setValue={UserNameInput.setEnteredValue}
                                value={UserNameInput.enteredValue}
                                feedbackMessage={UserNameInput.feedbackMessage}
                                feedbackType={UserNameInput.messageType}
                                isTouched={UserNameInput.isTouched}
                                setIsTouched={UserNameInput.setIsTouched}
                                disabled={true}
                                validateHandler={UserNameInputValidater}
                                reset={UserNameInput.reset}
                                isRequired={true}
                            />


                        </div>


                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <InputWithAddOn
                                label="Phone"
                                className="loginInputs"
                                setValue={PhoneInput.setEnteredValue}
                                value={PhoneInput.enteredValue}
                                feedbackMessage={PhoneInput.feedbackMessage}
                                feedbackType={PhoneInput.messageType}
                                isTouched={PhoneInput.isTouched}
                                setIsTouched={PhoneInput.setIsTouched}
                                type={'number'}
                                validateHandler={PhoneInputValidater}
                                reset={PhoneInput.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}

                            />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <InputWithAddOn
                                label="Password"
                                className="loginInputs"

                                setValue={PasswordInput.setEnteredValue}
                                value={PasswordInput.enteredValue}
                                feedbackMessage={PasswordInput.feedbackMessage}
                                feedbackType={PasswordInput.messageType}
                                isTouched={PasswordInput.isTouched}
                                setIsTouched={PasswordInput.setIsTouched}
                                validateHandler={PasswordInputValidater}
                                reset={PasswordInput.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}

                            />
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputWithAddOn
                                label="DOB Date"
                                className="loginInputs"
                                setValue={dobDate.setEnteredValue}
                                value={dobDate.enteredValue}
                                feedbackMessage={dobDate.feedbackMessage}
                                feedbackType={dobDate.messageType}
                                isTouched={dobDate.isTouched}
                                setIsTouched={dobDate.setIsTouched}
                                type="date"
                                validateHandler={dobDateValidater}
                                reset={dobDate.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}

                            />
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputSelect
                                setValue={setGenderType}
                                value={GenderType}
                                options={genderoption ?? []}
                                isTouched={GenderTypeIsTouch}
                                setIsTouched={setGenderTypeIsTouch}
                                className="py-1"
                                label={"Gender"}
                                isRequired={true}
                                feedbackMessage={GenderTypeMessage?.message}
                                feedbackType={GenderTypeMessage?.type}
                                validateHandler={GenderTypeSelectValidater}
                                disabled={searchParams?.type === 'view'}

                            />
                        </div>



                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputSelect
                                setValue={setrole}
                                value={role}
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "Admin User", value: "adminuser" }
                                ] ?? []}
                                isTouched={roleIsTouch}
                                setIsTouched={setroleIsTouch}
                                className="py-1"
                                label={"Role"}
                                isRequired={true}
                                feedbackMessage={roleMessage?.message}
                                feedbackrole={roleMessage?.type}
                                validateHandler={roleSelectValidater}
                                disabled={true}

                            />
                        </div>
                        {role == "adminuser" && <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputMultipleSelect
                                setValue={setcenter}
                                value={center}
                                disabled={searchParams?.type === 'view'}
                                options={(centerResponse?.data ?? [])}
                                isTouched={centerIsTouch}
                                setIsTouched={setcenterIsTouch}
                                className="py-1"
                                label={"Center"}
                                isRequired={true}
                                feedbackMessage={centerMessage?.message}
                                feedbackrole={centerMessage?.type}
                                validateHandler={centerSelectValidater}

                            />
                        </div>}

                        <div className="my-3 ">

                            <button
                                style={{ float: "right" }}

                                className="btn btn-success px-5 "
                                onClick={submit}
                            >
                                {userResponse?.fetching ? <Spinner size={"sm"} /> : "Update User"}
                            </button>

                            <button
                                style={{ float: "right" }}

                                className="btn btn-dark px-4 mx-3 "
                                onClick={() => {
                                    router.push("/admin/user")
                                }}
                            >
                                Cancel
                            </button>


                            {deleteuserResponse?.fetching ? <div style={{ float: "right" }} > <Spinner size={"sm"} /></div> : <button
                                style={{ float: "right" }}

                                className="btn btn-danger px-4 mx-3 "
                                onClick={() => {
                                    deleteuserHandler()
                                }}
                            >
                                Delete
                            </button>}

                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Userupdate;