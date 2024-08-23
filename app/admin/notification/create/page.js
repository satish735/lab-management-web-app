"use client";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import useInputComponent from "@/hooks/useInputComponent";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
// import TextEditor from "@/components/text-editor/TextEditor";
import moment from "moment";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
export default function Home() {
  const router = useRouter();
  const titleInput = useInputComponent();
  const titleInputValidater = (value) => {
    if (!value || value == "") {
      titleInput.setFeedbackMessage("Notification title cannot be empty!");
      titleInput.setMessageType("error");
      return false;
    }
    titleInput.setFeedbackMessage(null);
    titleInput.setMessageType("none");
    return true;
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const [NotificationDescription, setNotificationDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [NotificationSubmitResponse, NotificationSubmitHandler] = useAPI(
    {
      url: "/notifications/create",
      method: "post",
    },
    (e) => {
      toast.success(
        `Notification has been ${publish ? "Published" : "Saved"} successfully`
      );
      router.push("/admin/notification");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while creating Notification!", e)
      );
      return e;
    }
  );
  const createNotificationSubmitHandler = async (isPublish = false) => {
    setPublish(isPublish);
    var titleIsValid = titleInputValidater(titleInput?.enteredValue);
    if (!titleIsValid) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    var submitBody = {
      notificationHeader: titleInput?.enteredValue,
      notificationDescription: NotificationDescription,
      dateTime:""
    };
    await NotificationSubmitHandler({ body: submitBody });
  };
  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Notifications", link: "/admin/notifications" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Notification</h1>
        <p className="sub-heading">
          Share your insights and updates with our everyone..
        </p>
        <form>
          <div className="row mt-2">
            <div className="col-12">
              <InputWithAddOn
                label="Notification Title"
                isRequired={true}
                value={titleInput.enteredValue}
                setValue={titleInput.setEnteredValue}
                feedbackMessage={titleInput.feedbackMessage}
                feedbackType={titleInput.messageType}
                isTouched={titleInput.isTouched}
                setIsTouched={titleInput.setIsTouched}
                validateHandler={titleInputValidater}
              />
            </div>
{/*        
            <div className="col-12">
              <TextEditor
                content={NotificationDescription}
                setContent={setNotificationDescription}
              />
            </div> */}
            <div className="col-12 text-end my-3">
              <button
                disabled={NotificationSubmitResponse?.fetching}
                className="btn  btn-outline-dark px-5 me-2"
                onClick={createNotificationSubmitHandler}
                type="button"
              >
                {NotificationSubmitResponse?.fetching && !publish ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Save"
                )}
              </button>
              <button
                disabled={NotificationSubmitResponse?.fetching}
                className="btn btn-success px-5"
                onClick={() => {
                  createNotificationSubmitHandler(true);
                }}
                type="button"
              >
                {NotificationSubmitResponse?.fetching && publish ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
