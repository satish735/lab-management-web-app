"use client";
import { useEffect, useState } from "react";
import "./LoginForm.css";
import "@/app/blog/blog.css"
import { useRouter } from "next/navigation";
import Loader from "@/components/essentials/Loader";
// import DobInput from "./login-inputs/DobInput";
import toast from "react-hot-toast";
import useAPI from "@/hooks/useAPI";
import transformErrorDefault from "@/utils/transformErrorDefault";
const LoginForm = () => {
  const router = useRouter();

  const [loginAPIResponse, loginAPIHandler] = useAPI(
    {
      url: "/signup",
      method: "post",
    },
    (e) => {

    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Genrating OTP!", e)
      );
      return e;
    }
  );


  const [name, setName] = useState()
  const [email, setemail] = useState()
  const [Dob, setDob] = useState()



  // validation input 

  const [isname, setisname] = useState(false)
  const [isemail, setisemail] = useState(false)
  const [isDob, setisDob] = useState(false)



  const loginHandler = async (e) => {
    e.preventDefault();

    await loginAPIHandler({
      body: {
        // Dob: DobNumber,
      },
    });
  };
  return (
    <div className="w-100 text-start login-form-inner">
      <h1 className="main-heading">Create your Account</h1>
      <h3 className="secondary-heading">
        Enter your details below to set up your account
      </h3>
      <form onSubmit={loginHandler}>
        <div  >
          <div className="my-3">
            <p style={{ fontSize: "0.9rem" , marginBottom:"0px", fontWeight:"600"}} >Full Name*</p>
            <input
              className="input"
              placeholder="Name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

            {isname && <span className="input_isrequired" >This field is required.</span>}

          </div>
          <div className="my-3" >
            <p style={{ fontSize: "0.9rem", marginBottom:"0px" , fontWeight:"600"}}>Email Address*</p>
            <input
              className="input"
              placeholder="Email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value)
              }}
            />

            {isemail && <span className="input_isrequired" >This field is required.</span>}

          </div>
          <div className="my-3" >
            <p style={{ fontSize: "0.9rem" ,marginBottom:"0px",  fontWeight:"600"}}>DOB*</p>
            <input
              className="input"
              placeholder="Dob"
              label="Dob"
              type="date"
              value={Dob}
              onChange={(e) => {
                setDob(e.target.value)
              }}
            />

            {isDob && <span className="input_isrequired" >This field is required.</span>}

          </div>
          <div className="my-3" >
            <p style={{ fontSize: "0.9rem" ,marginBottom:"0px",  fontWeight:"600"}}>Gender*</p>
            <input
              className="input"
              placeholder=" select Gender"
              label="Gender"
              type="gender"
              value={Dob}
              onChange={(e) => {
                setDob(e.target.value)
              }}
            />

            {isDob && <span className="input_isrequired" >This field is required.</span>}

          </div>




        </div>
        <div className="login-form-box">
          <button
            type="submit"
            name="en"
            className="login-main-button"
            disabled={loginAPIResponse?.fetching}
          >
            {loginAPIResponse?.fetching ? <Loader /> : "Sign Up"}
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
