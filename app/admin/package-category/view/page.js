
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
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
const EditpackagecategoryMainPage = ({ searchParams }) => {
    const router = useRouter();



    const [packagecategoryResponse, packagecategoryHandler] = useAPI(
        {
            url: `/package-category/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/package-category");

            toast.success("Package Category updated successfully");



        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Package Category!",
                    e
                )
            );
            return e;
        }
    );




    const [DeletepackagecategoryResponse, DeletepackagecategoryHandler] = useAPI(
        {
            url: `/package-category/${searchParams?.id}`,
            method: "DELETE",
        },
        (e) => {
            router.push("/admin/package-category")
            toast.success("Package Category deleted successfully");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Package Category!",
                    e
                )
            );
            return e;
        }
    );




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


    const submit = () => {

        var nameIsValid = nameInputValidater(nameInput?.enteredValue);
        if (!nameIsValid) {
            toast.error("Please check all validations before continuing!");
            return;
        }
        else {
            packagecategoryHandler({
                body: {
                    name: nameInput.enteredValue ?? ''
                }
            });

        }

    };


    const [getpackagecategoryResponse, getpackagecategoryHandler] = useAPI(
        {
            url: `/package-category/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            nameInput?.setEnteredValue(e?.name)

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting Faq!",
                e
            ));
            return e
        }
    );

    return (
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Package Categorys", link: "/admin/package-category" },
                    { label: "Update Package Category", link: "/admin/package-category/view", active: true },
                ]}
            />

            {getpackagecategoryResponse?.fetching ? <div className="text-center my-5" ><Spinner size={"lg"} /> </div> : <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {searchParams?.type === 'view' ? 'View Package Category' : 'Edit Package Category'}
                </h3>

                <div className=" my-3  py-4 px-3"  >


                    <div className="row">


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



                        <div className="my-3 text-end">

                            {searchParams?.type != 'view'

                                &&
                                <button
                                    className="mx-2 btn btn-danger"
                                    onClick={() => { DeletepackagecategoryHandler() }}
                                    type="button"
                                >
                                    {DeletepackagecategoryResponse?.fetching ? <Spinner size="sm" /> : "Delete"}
                                </button>
                            }

                            <button
                                className="mx-2 btn btn-dark"
                                onClick={() => {
                                    router.push("/admin/package-category");
                                }}
                                type="button"
                            >
                                {" "}
                                Cancel
                            </button>



                            {searchParams?.type != 'view'

                                &&
                                <button
                                    style={{ float: "right" }}
                                    className="btn btn-success px-3"
                                    onClick={submit}
                                    type="button"
                                >
                                    {packagecategoryResponse?.fetching ? (
                                        <Spinner size={"sm"} />
                                    ) : (
                                        "Update"
                                    )}
                                </button>
                            }


                        </div>
                    </div>
                </div>
            </div>}

        </>
    );
};

export default EditpackagecategoryMainPage;
