"use client";
import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useRouter } from "next/navigation";
import Loader from "../essentials/Loader";
import PhoneInput from "./login-inputs/PhoneInput";
import toast from "react-hot-toast";
import useAPI from "@/hooks/useAPI";
import transformErrorDefault from "@/utils/transformErrorDefault";
const LoginForm = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginAPIResponse, loginAPIHandler] = useAPI(
    {
      url: "/login",
      method: "post",
    },
    (e) => {
      toast.success("OTP sent successfully.");
      router.push(`/login/otp-verify?phone=${phoneNumber}`);
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Genrating OTP!", e)
      );
      return e;
    }
  );
  const phonePattern = /^\d{10}$/;
  const [phoneIsTouched, setPhoneIsTouched] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  const phoneNumberValidation = (e) => {
    setShowPhoneError(!phonePattern.test(e));
    return phonePattern.test(e);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    var checkPhoneIsValid = phoneNumberValidation(phoneNumber);
    if (!checkPhoneIsValid) {
      toast.error("Invalid Phone Number!");
      return;
    }
    await loginAPIHandler({
      body: {
        phone: phoneNumber,
      },
    });
  };
  return (
    <div className="w-100 text-start login-form-inner">
      <h1 className="main-heading">Login</h1>
      <h3 className="secondary-heading">
        Enter your mobile number to verify OTP
      </h3>
      <form onSubmit={loginHandler}>
        <div className="login-form-box">
          <PhoneInput
            value={phoneNumber}
            setValue={setPhoneNumber}
            isTouch={phoneIsTouched}
            setIsTouch={setPhoneIsTouched}
            validate={phoneNumberValidation}
            showError={showPhoneError}
          />
        </div>
        <div className="login-form-box">
          <button
            type="submit"
            name="en"
            className="login-main-button"
            disabled={loginAPIResponse?.fetching}
          >
            {loginAPIResponse?.fetching ? <Loader /> : "Login"}
          </button>
        </div>
      </form>

      <p>
        Read our{" "}
        <a className="default-link text-decoration-none">
          Terms &amp; Conditions
        </a>{" "}
        and <a className="default-link text-decoration-none">Privacy Policy</a>
      </p>
    </div>
  );
};

export default LoginForm;
