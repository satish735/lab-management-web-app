
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
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
const Home = () => {
  const router = useRouter();

  const [AdminloginResponse, AdminloginHandler] = useAPI(
    {
      url: "/adminlogin/create",
      method: "post",
    },
    (e) => {
      EmailInput.setEnteredValue();
      PhoneInput.setEnteredValue();


      toast.success("Admin login added successfully");

    },
    (e) => {

      toast.error(
        transformErrorDefault(
          "Something went wrong while adding Admin login!",
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


  const PasswordInput = useInputComponent('');
  const PasswordInputValidater = (value) => {
    if (value === "" || !value) {
      PasswordInput.setFeedbackMessage(
        "Field required!"
      );
      PasswordInput.setMessageType("error");
      return false;
    }
    PasswordInput.setFeedbackMessage("");
    PasswordInput.setMessageType("none");
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


  const [imageFile, setImageFile] = useState({
    url: "",
    status: "",
  });

  const submit = () => {

    let EmailValidate = EmailInputValidater(EmailInput.enteredValue);
    let NameValidate = NameInputValidater(NameInput.enteredValue);
    let isUserNameValidate = UserNameInputValidater(UserNameInput.enteredValue);
    let isPasswordValidate = PasswordInputValidater(PasswordInput.enteredValue);
    let PhoneValidate = PhoneInputValidater(PhoneInput.enteredValue);
    let isroleSelectValidater = roleSelectValidater(role)
    let iscenterSelectValidater = centerSelectValidater(center)
    let isdobDateValidater = dobDateValidater(dobDate?.enteredValue)
    let isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType)

    if (!EmailValidate || !PhoneValidate || !NameValidate || !isUserNameValidate ||
      !isroleSelectValidater || !isdobDateValidater || !isGenderTypeSelectValidater || !isPasswordValidate
    ) {
      toast.error('Fill all the fields.')
    }
    else {


      if (role == "adminuser") {
        if (!iscenterSelectValidater) {
          toast.error('Select center minimum one.')
        } else {
          AdminloginHandler({
            body: {
              email: EmailInput.enteredValue ?? '',
              username: DescriptionInput.enteredValue ?? '',
              role: role ?? '',
              name: NameInput?.enteredValue,
              gender: GenderType ?? "",
              dob: dobDate?.enteredValue ?? null,
              image: imageFile?.filePath ?? "",
              iscenter: centerResponse?.data?.filter((item) => center.some((key) => key?.value == item?.centreId)) ?? [],
              bcryptPassword:PasswordInput?.enteredValue ?? ""
            }
          })
        }
      } else {
        AdminloginHandler({
          body: {
            email: EmailInput.enteredValue ?? '',
            username: DescriptionInput.enteredValue ?? '',
            role: role ?? '',
            name: NameInput?.enteredValue,
            gender: GenderType ?? "",
            dob: dobDate?.enteredValue ?? null,
            image: imageFile?.filePath ?? "",
            iscenter: "*",
            bcryptPassword:PasswordInput?.enteredValue ?? ""
          }
        })
      }




    }

  };

  return (
    <>
      <div className='  ' style={{ textAlign: "left" }}>



        <h3 className=" mb-5  text-center" style={{ fontSize: "1.2rem" }} >

          Login Admin User</h3>

        <div className=" "  >


          <div className="row  ">

            <div className="my-4">
              <p style={{ marginBottom: '7px', fontSize: '12px', color: '#0F0F0F', fontWeight: '500' }}>Upload Image  <span style={{ color: 'rgb(220 53 69)' }}>*</span></p>

              <SingleImageDropZone file={imageFile} setFile={setImageFile} />



            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">

              <InputWithAddOn
                label="Full Name"
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
                label="Email ID"
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
              />


            </div>


            <div className="col-lg-12 col-md-12 col-sm-12">
              <InputWithAddOn
                label="Phone Number"
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
                label="Date of Birth"
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
                label={"Role"}
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
                options={(centerResponse?.data ?? [])?.filter((item) =>
                  item?.publishedAt != "null" || item?.publishedAt != null
                  || item?.publishedAt != undefined)?.map((item) => {
                    return { label: item?.centre, value: item?._id }
                  })}
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
