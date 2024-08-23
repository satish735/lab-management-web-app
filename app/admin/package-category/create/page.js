"use client";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";
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
  const nameInput = useInputComponent();
  const nameInputValidater = (value) => {
    if (!value || value == "") {
      nameInput.setFeedbackMessage("Package Category can not be be empty!");
      nameInput.setMessageType("error");
      return false;
    }
    nameInput.setFeedbackMessage(null);
    nameInput.setMessageType("none");
    return true;
  };
  
  const [PackageCategoryResponse, PackageCategoryHandler] = useAPI(
    {
      url: "/package-category/create",
      method: "post",
    },
    (e) => {
      toast.success(
        `Package Category added successfully`
      );
      router.push("/admin/blogs");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while adding Package Category!", e)
      );
      return e;
    }
  );
 

  const submitHandler=()=>{
    var nameIsValid = nameInputValidater(nameInput?.enteredValue);
    if (!nameIsValid) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    else{
     PackageCategoryHandler({ body: {
        name:nameInput.enteredValue ?? ''
     } });

    }
  }
  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Package Category", link: "/admin/Package-Category" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box" style={{minHeight:'100%'}}>
        <h1 className="main-heading">Add Package Category</h1>
         
        <form>
          <div className="row mt-2">
            <div className="col-12">
              <InputWithAddOn
                label="Blog Title"
                isRequired={true}
                value={nameInput.enteredValue}
                setValue={nameInput.setEnteredValue}
                feedbackMessage={nameInput.feedbackMessage}
                feedbackType={nameInput.messageType}
                isTouched={nameInput.isTouched}
                setIsTouched={nameInput.setIsTouched}
                validateHandler={nameInputValidater}
              />
            </div>
           
            
            <div className="col-12 text-end my-3">
              <button
                
                className="btn  btn-success  px-5 me-2"
                onClick={submitHandler}
                type="button"
              >
                {PackageCategoryResponse?.fetching ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Save"
                )}
              </button>
               
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
