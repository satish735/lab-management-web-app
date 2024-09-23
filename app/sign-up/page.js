'use client'

import { useEffect, useState } from "react";
import "./LoginForm.css";
import "@/app/blog/blog.css"
import { useRouter } from "next/navigation";
import Loader from "@/components/essentials/Loader";
import toast from "react-hot-toast";
import useAPI from "@/hooks/useAPI";
import transformErrorDefault from "@/utils/transformErrorDefault";
import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import { signOut, useSession } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();

  const session = useSession()
  const [LoginUserResponse, LoginUserHandler] = useAPI(
    {
      url: "/member/create",
      method: "post",
    },
    (e) => {
      if (e) {
        session.update({ email: e?.email, name: e?.name, otherDetails: e })
        router.push("/")
      }

      return toast.success("User Information has been Added successfully");
    },
    (e) => {

      return toast.error(
        transformErrorDefault(
          "Something went wrong while creating Member!",
          e
        )
      );
      return e;
    }
  );





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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "" || !value) {
      Email.setFeedbackMessage("Required!");
      Email.setMessageType("error");
      return false;
    }

    if (!emailRegex.test(value)) {
      Email.setFeedbackMessage("Invalid email!");
      Email.setMessageType("error");
      return false;
    }

    Email.setFeedbackMessage("");
    Email.setMessageType("none");
    return true;
  };






  const loginHandler = async (e) => {
    e.preventDefault();
    var isFullnameValidater = FullnameValidater(Name.enteredValue)
    var isDOBValidater = DOBValidater(DOB.enteredValue)
    var isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType)
    var isEmailValidater = EmailValidater(Email.enteredValue)


    if (!isFullnameValidater || !isDOBValidater || !isGenderTypeSelectValidater || !isEmailValidater) {
      toast.error(
        "Fill required fields!"
      );
    } else {
      LoginUserHandler({
        body: {
          name: Name.enteredValue,
          dob: DOB.enteredValue,
          gender: GenderType,
          email: Email.enteredValue,
          relation: "self",
          loginId: session?.data?.user?.id
        }
      })
    }

  };
  return (
    <div className="w-100 text-start login-form-inner">
      <h1 className="main-heading">Create your Account</h1>
      <h3 className="secondary-heading">
        Enter your details below to set up your account
      </h3>
      <form onSubmit={loginHandler}>
        <div className='row'>
          <div className="">
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
              isRequired={true}
            />
          </div>


          <div className="">
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
              isRequired={true}
            />
          </div>
          <div className="">
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
            />
          </div>

          <div className="">
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
              reset={Email.reset}
              isRequired={true}
            />
          </div>

        </div>
        <div className="login-form-box">
          <button
            type="submit"
            name="en"
            className="login-main-button"
            disabled={LoginUserResponse?.fetching}
          >
            {LoginUserResponse?.fetching ? <Loader /> : "Sign Up"}
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
