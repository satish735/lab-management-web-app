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
export default function Home({ params: { slug: string } }) {
  const router = useRouter();
  const titleInput = useInputComponent();
  const titleInputValidater = (value) => {
    if (!value || value == "") {
      titleInput.setFeedbackMessage("Blog title cannot be empty!");
      titleInput.setMessageType("error");
      return false;
    }
    titleInput.setFeedbackMessage(null);
    titleInput.setMessageType("none");
    return true;
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const [blogDescription, setBlogDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [blogSubmitResponse, blogSubmitHandler] = useAPI(
    {
      url: "/blogs/create",
      method: "post",
    },
    (e) => {
      toast.success(
        `Blog has been ${publish ? "Published" : "Saved"} successfully`
      );
      router.push("/admin/blogs");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while creating Blog!", e)
      );
      return e;
    }
  );
  const createBlogSubmitHandler = async (isPublish = false) => {
    setPublish(isPublish);
    var titleIsValid = titleInputValidater(titleInput?.enteredValue);
    if (!titleIsValid) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    var submitBody = {
      title: titleInput?.enteredValue,
      author: "Test Author",
      description: blogDescription,
      category_id: 1,
      image: "https://picsum.photos/500/200",
      is_home: selectedTags.some((item) => item?.value == "is_home"),
      trending: selectedTags.some((item) => item?.value == "trending"),
      is_popular: selectedTags.some((item) => item?.value == "is_popular"),
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      published_at: isPublish ? moment().toString() : null,
    };
    await blogSubmitHandler({ body: submitBody });
  };
  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Centers", link: "/admin/center" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Center</h1>
        <p className="sub-heading">
          Easily Add and Configure a New Center to Application Database
        </p>
        <form>
          <div className="row mt-2">
            <div className="col-12">
              <InputWithAddOn
                label="Blog Title"
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
            <div className=" col-md-6 col-12">
              <InputMultipleSelect
                label="Tags"
                options={[
                  { label: "Show At Home", value: "is_home" },
                  { label: "Trending", value: "trending" },
                  { label: "Popular", value: "is_popular" },
                ]}
                isRequired={true}
                value={selectedTags}
                setValue={setSelectedTags}
                feedbackMessage={
                  "Select tags from above to make blog more visible."
                }
                feedbackType={"info"}
              />
            </div>
            <div className="col-12">
              {/* <TextEditor
                content={blogDescription}
                setContent={setBlogDescription}
              /> */}
            </div>
            <div className="col-12 text-end my-3">
              <button
                disabled={blogSubmitResponse?.fetching}
                className="btn  btn-outline-dark px-5 me-2"
                onClick={createBlogSubmitHandler}
                type="button"
              >
                {blogSubmitResponse?.fetching && !publish ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Save"
                )}
              </button>
              <button
                disabled={blogSubmitResponse?.fetching}
                className="btn btn-success px-5"
                onClick={() => {
                  createBlogSubmitHandler(true);
                }}
                type="button"
              >
                {blogSubmitResponse?.fetching && publish ? (
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
