
"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import useInputComponent from "@/hooks/useInputComponent";
const Home = () => {
  const router = useRouter();

  const [milestoneResponse, milestoneHandler] = useAPI(
    {
      url: "/milestones/create",
      method: "post",
    },
    (e) => {
      EmailInput.setEnteredValue();
      PhoneInput.setEnteredValue();
      DescriptionInput.setEnteredValue();

      toast.success("Milestone added successfully");

    },
    (e) => {

      toast.error(
        transformErrorDefault(
          "Something went wrong while adding milestone!",
          e
        )
      );
      return e;
    }
  );


  const EmailInput = useInputComponent('');
  const EmailInputValidater = (value) => {
    if (value === "" || !value) {
      EmailInput.setFeedbackMessage(
        "Field required!"
      );
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
    PhoneInput.setFeedbackMessage("");
    PhoneInput.setMessageType("none");
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


  const [centerResponse, centerHandler] = useAPI(
    {
      url: "/centers/list",
      method: "get",
      sendImmediately: true,
      params: {

      },
    },
    (e) => {
      return e?.data
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Getting Centers!", e)
      );
      return e;
    }
  );

  const submit = () => {

    let EmailValidate = EmailInputValidater(EmailInput.enteredValue);
    let NameValidate = NameInputValidater(NameInput.enteredValue);
    let UserNameValidate = UserNameInputValidater(UserNameInput.enteredValue);
    let PhoneValidate = PhoneInputValidater(PhoneInput.enteredValue);
    let descValidate = DescriptionInputValidater(DescriptionInput.enteredValue);
    if (!EmailValidate || !PhoneValidate || !descValidate || !NameValidate || !UserNameValidate) {
      toast.error('Fill all the fields.')
    }
    else {
      milestoneHandler({
        body: {
          Email: EmailInput.enteredValue ?? '',
          description: DescriptionInput.enteredValue ?? '',
          Phone: PhoneInput.enteredValue ?? '',
        }
      })
    }

  };

  return (
    <>
      <div className='  ' style={{ textAlign: "left" }}>



        <h3 className=" mb-5  text-center" style={{fontSize:"1.2rem"}} >

          Login Admin User</h3>

        <div className=" "  >


          <div className="row  ">


            <div className="col-lg-12 col-md-12 col-sm-12">

              <InputWithAddOn
                label="Name"
                className="loginInputs"

                setValue={NameInput.setEnteredValue}
                value={NameInput.enteredValue}
                feedbackMessage={NameInput.feedbackMessage}
                feedbackType={NameInput.messageType}
                isTouched={NameInput.isTouched}
                setIsTouched={NameInput.setIsTouched}

                validateHandler={NameInputValidater}
                reset={NameInput.reset}
                isRequired={true}
              />


            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">

              <InputWithAddOn
                label="Email"
                className="loginInputs"

                setValue={EmailInput.setEnteredValue}
                value={EmailInput.enteredValue}
                feedbackMessage={EmailInput.feedbackMessage}
                feedbackType={EmailInput.messageType}
                isTouched={EmailInput.isTouched}
                setIsTouched={EmailInput.setIsTouched}

                validateHandler={EmailInputValidater}
                reset={EmailInput.reset}
                isRequired={true}
              />


            </div>


            <div className="col-lg-12 col-md-12 col-sm-12">

              <InputWithAddOn
                label="User Name"
                className="loginInputs"

                setValue={UserNameInput.setEnteredValue}
                value={UserNameInput.enteredValue}
                feedbackMessage={UserNameInput.feedbackMessage}
                feedbackType={UserNameInput.messageType}
                isTouched={UserNameInput.isTouched}
                setIsTouched={UserNameInput.setIsTouched}

                validateHandler={UserNameInputValidater}
                reset={UserNameInput.reset}
                isRequired={true}
              />


            </div>


            <div className="col-lg-12 col-md-12 col-sm-12">
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
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 ">
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
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 ">
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



            <div className="col-lg-12 col-md-12 col-sm-12 ">
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
                label={"role"}
                isRequired={true}
                feedbackMessage={roleMessage?.message}
                feedbackrole={roleMessage?.type}
                validateHandler={roleSelectValidater}
              />
            </div>
            {role == "adminuser" && <div className="col-lg-12 col-md-12 col-sm-12 ">
              <InputMultipleSelect
                setValue={setcenter}
                value={center}
                options={(centerResponse?.data ?? [])?.map((item) => {
                  return { label: item?.centre, value: item?._id }
                })?.filter((item)=> iten?.publishedAt != "null" || iten?.publishedAt != null || iten?.publishedAt != undefined  )}
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
                // style={{ float: "right" }}

                className="btn btn-success px-5 w-100"
                onClick={submit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
