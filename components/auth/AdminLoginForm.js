"use client";
import { useState } from "react";
import EmailInput from "./login-inputs/EmailInput";
import PasswordInput from "./login-inputs/PasswordInput";
import "./LoginForm.css";
import Loader from "../essentials/Loader";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const AdminLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [emailIsTouch, setEmailIsTouch] = useState(false);
  const [passwordIsTouch, setPasswordIsTouch] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidate = (value) => {
    setShowEmailError(!emailRegex.test(value));
    return emailRegex.test(value);
  };
  const passwordValidate = (value) => {
    setShowPasswordError(!(value.length >= 8));
    return value.length >= 8;
  };
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const loginSubmitHandler = async (e) => {
    setLoginIsLoading(true);
    e.preventDefault();
    var isEmailValid = emailValidate(email);
    var isPasswordValid = passwordValidate(password);
    if (!isEmailValid || !isPasswordValid) {
      toast.error("Enter valid values in form!");
      setLoginIsLoading(false);
      return;
    }
    const result = await signIn("admin", { email, password, redirect: false });
    if (result?.error) {
      toast.error(result?.error ?? "Something went wrong while Logging In!");
    } else {
      toast.success("Logged In.");
      router.push(`/admin`);
    }
    setLoginIsLoading(false);
  };
  return (
    <div className="w-100 text-start login-form-inner">
      <h1 className="main-heading">Admin Login</h1>
      <h3 className="secondary-heading">
        Enter your Email and Password to Login
      </h3>
      <form onSubmit={loginSubmitHandler}>
        <EmailInput
          value={email}
          setValue={setEmail}
          isTouch={emailIsTouch}
          setIsTouch={setEmailIsTouch}
          validate={emailValidate}
          showError={showEmailError}
        />
        <PasswordInput
          value={password}
          setValue={setPassword}
          isTouch={passwordIsTouch}
          setIsTouch={setPasswordIsTouch}
          validate={passwordValidate}
          showError={showPasswordError}
        />
        <div className="login-form-box">
          <button
            type="submit"
            name="en"
            className="login-main-button"
            disabled={loginIsLoading}
          >
            {loginIsLoading ? <Loader /> : "Login"}
          </button>
        </div>
      </form>
      <p>
        Read our{" "}
        <a
          className="default-link text-decoration-none"
          href="/terms_and_conditions"
        >
          Terms &amp; Conditions
        </a>{" "}
        and{" "}
        <a className="default-link text-decoration-none" href="/privacypolicy">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default AdminLoginForm;
