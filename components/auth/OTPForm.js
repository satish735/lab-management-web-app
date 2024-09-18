"use client";
import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import Loader from "../essentials/Loader";
import { toast } from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
import useAPI from "@/hooks/useAPI";
import { signIn } from "next-auth/react";

const OTPForm = ({ searchParams }) => {
  const router = useRouter();
  const phone = searchParams?.phone;
  const [otp, setOtp] = useState("");
  const phonePattern = /^\d{10}$/;
  const otpPattern = /^\d{6}$/;
  const [otpResendResponse, otpResendHandler] = useAPI(
    {
      url: "/login/otp-resend",
      method: "POST",
    },
    (e) => {
      toast.success("OTP resent successfully.");
      setCounter(60);
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while resending OTP!", e)
      );
      return e;
    }
  );
  if (!phone || !phonePattern.test(phone)) {
    router.push("/login");
  }

  const [counter, setCounter] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);
  const [otpVerifyIsLoading, setOTPVerifyIsLoading] = useState(false);
  const otpVerifySubmitHandler = async (e) => {
    setOTPVerifyIsLoading(true);
    e.preventDefault();
    if (!otp || otp == "" || !otpPattern.test(otp)) {
      toast.error("Invaild OTP entered!");
      setOTPVerifyIsLoading(false);
      return;
    }
    const result = await signIn("user", { phone, otp, redirect: false });
    if (result?.error) {
      toast.error(result?.error ?? "Something went wrong while Logging In!");
    } else {
      toast.success("Logged In.");
      router.push(`/`);
    }
    setOTPVerifyIsLoading(false);
  };

  
  const resendingOTPHandler = async () => {
    if (otpResendResponse?.fetching) {
      toast("Resending OTP Please wait...!");
      return;
    }
    await otpResendHandler({
      body: {
        phone: phone,
      },
    });
  };
  return (
    <div className="w-100 text-start login-form-inner">
      <h1 className="main-heading">OTP Verification</h1>
      <h3 className="secondary-heading">OTP send on +91 {phone}</h3>
      <form className="w-100 otp-boxes-form" onSubmit={otpVerifySubmitHandler}>
        <br />
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={{ justifyContent: "center", width: "100%" }}
          inputStyle={{
            width: "3rem !important",
            height: "3rem",
            margin: "0 .5rem",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, .3)",
          }}
          renderSeparator={<span></span>}
          renderInput={(props) => <input {...props} />}
        />
        {counter == 0 ? (
          <p
            className="default-link text-decoration-none resend-otp"
            style={{
              cursor: otpResendResponse?.fetching ? "default" : "pointer",
              userSelect: "none",
            }}
            onClick={resendingOTPHandler}
          >
            {otpResendResponse?.fetching ? "Resending..." : " Resend OTP"}
          </p>
        ) : (
          <p className="resend-otp">
            Resend OTP in <span>{counter}</span> seconds
          </p>
        )}
        <div className="login-form-box">
          <button
            type="submit"
            name="en"
            className="login-main-button"
            disabled={otpVerifyIsLoading}
          >
            {otpVerifyIsLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </form>

      <p>
        Go back to{" "}
        <a className="default-link text-decoration-none" href="/login">
          Login
        </a>
      </p>
    </div>
  );
};

export default OTPForm;
