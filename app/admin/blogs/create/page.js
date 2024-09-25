"use client";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import useInputComponent from "@/hooks/useInputComponent";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputTextArea from "@/components/formInput/InputTextArea";
import moment from "moment";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("@/components/text-editor/TextEditor"),
  { ssr: false }
);
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
export default function Home() {
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

  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState();

  const descriptionInput = useInputComponent();
  const descriptionInputValidater = (value) => {
    if (!value || value == "") {
      descriptionInput.setFeedbackMessage("Blog Description cannot be empty!");
      descriptionInput.setMessageType("error");
      return false;
    }
    descriptionInput.setFeedbackMessage(null);
    descriptionInput.setMessageType("none");
    return true;
  };

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const [selectedTags, setSelectedTags] = useState([]);


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
    var isdescription = descriptionInputValidater(
      descriptionInput?.enteredValue
    );
    if (!titleIsValid || !isdescription) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    var submitBody = {
      title: titleInput?.enteredValue,
      author: "Test Author",
      description: descriptionInput?.enteredValue,
      is_home: selectedTags.some((item) => item?.value == "is_home"),
      trending: selectedTags.some((item) => item?.value == "trending"),
      isPopular: selectedTags.some((item) => item?.value == "is_popular"),
      image: imageFile?.filePath,
      ckdescription: content,
      published_at: isPublish
    };
    await blogSubmitHandler({ body: submitBody });
  };

  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Blogs", link: "/admin/blogs" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Blog</h1>
        <p className="sub-heading">
          Share your insights and updates with our everyone..
        </p>
        <form>
          <div className="col-12 text-end my-3">
            <button
              disabled={blogSubmitResponse?.fetching}
              className="btn  btn-outline-dark px-5 me-2"
              onClick={createBlogSubmitHandler(false)}
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

          <div className="row" >
            <div className="py-3 col-sm-3 col-12">
              <h6 className="py-1 small">Add Banner Image</h6>
              <SingleImageDropZone file={imageFile} setFile={setImageFile} />
            </div>


            <div className="row mt-2 col-sm-9 col-12">



              <div className=" col-md-6 col-12">
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
              <div>
                <InputTextArea
                  label="Description"
                  isRequired={true}
                  value={descriptionInput.enteredValue}
                  setValue={descriptionInput.setEnteredValue}
                  feedbackMessage={descriptionInput.feedbackMessage}
                  feedbackType={descriptionInput.messageType}
                  isTouched={descriptionInput.isTouched}
                  setIsTouched={descriptionInput.setIsTouched}
                  validateHandler={descriptionInputValidater}
                />
              </div>




            </div>
          </div>




          <div style={{ minHeight: "400px" }}>
            <TextEditor content={content} setContent={setContent} />
          </div>
        </form>
      </div>
    </div>
  );
}
