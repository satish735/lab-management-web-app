
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
import { Spinner } from "reactstrap";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
const EditBodyPartMainPage = ({ searchParams }) => {
    const router = useRouter();



    const [bodypartResponse, bodypartHandler] = useAPI(
        {
            url: `/body-parts/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/body-parts");

            toast.success("Body part updated successfully");

            bodypart.setEnteredValue()


        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Body Part!",
                    e
                )
            );
            return e;
        }
    );




    const [DeletebodypartResponse, DeletebodypartHandler] = useAPI(
        {
            url: `/body-parts/${searchParams?.id}`,
            method: "DELETE",
        },
        (e) => {
            router.push("/admin/body-parts")
            toast.success("Body part deleted successfully");

            bodypart.setEnteredValue()
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Body Part!",
                    e
                )
            );
            return e;
        }
    );




    const bodypart = useInputComponent();
    const bodypartValidater = (value) => {
        if (!value || value == "") {
            bodypart.setFeedbackMessage("Required Field!");
            bodypart.setMessageType("error");
            return false;
        }
        bodypart.setFeedbackMessage(null);
        bodypart.setMessageType("none");
        return true;
    };


    const submit = () => {
        let bodyPartIsValid = bodypartValidater(bodypart?.enteredValue);
        if (bodyPartIsValid != "") {


            bodypartHandler({
                body: {
                    name: bodypart?.enteredValue ?? '',
                }
            });
        } else {
            toast.error("Fill the field.");
        }
    };


    const [getBodyPartResponse, getBodyPartHandler] = useAPI(
        {
            url: `/body-parts/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            bodypart.setEnteredValue(e?.name)

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
                    { label: "Body Parts", link: "/admin/body-parts" },
                    { label: "Add Body Part", link: "/admin/body-parts/create", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {searchParams?.type === 'view' ? 'View Body Part' : 'Edit Body Part'}
                </h3>

                <LoaderGeneral
                    noContentMessage="records are not found"
                    state={
                        getBodyPartResponse?.fetching
                            ? "loading"
                            : [null, undefined].includes(getBodyPartResponse?.data)
                                ? "no-content"
                                : "none"

                    }
                />

                {
                    (!getBodyPartResponse?.fetching) &&


                    <div className=" my-3  py-4 px-3"  >


                        <div className="row">


                            <div className="col-12 mt-3">

                                <InputWithAddOn
                                    label="Body Part Name"
                                    className="loginInputs"

                                    setValue={bodypart.setEnteredValue}
                                    value={bodypart.enteredValue}
                                    feedbackMessage={bodypart.feedbackMessage}
                                    feedbackType={bodypart.messageType}
                                    isTouched={bodypart.isTouched}
                                    setIsTouched={bodypart.setIsTouched}

                                    validateHandler={bodypartValidater}
                                    reset={bodypart.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>



                            <div className="my-3 text-end">

                                {searchParams?.type != 'view'

                                    &&
                                    <button
                                        className="mx-2 btn btn-danger"
                                        onClick={() => { DeletebodypartHandler() }}
                                        type="button"
                                    >
                                        {DeletebodypartResponse?.fetching ? <Spinner size="sm" /> : "Delete"}
                                    </button>
                                }
                                {searchParams?.type != 'view'

                                    &&
                                    <button
                                        className="mx-2 btn btn-dark"
                                        onClick={() => {
                                            router.push("/admin/body-parts");
                                        }}
                                        type="button"
                                    >
                                        {" "}
                                        Cancel
                                    </button>
                                }


                                {searchParams?.type != 'view'

                                    &&
                                    <button
                                        style={{ float: "right" }}
                                        className="btn btn-success px-3"
                                        onClick={submit}
                                        type="button"
                                    >
                                        {bodypartResponse?.fetching ? (
                                            <Spinner size={"sm"} />
                                        ) : (
                                            "Update"
                                        )}
                                    </button>
                                }


                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    );
};

export default EditBodyPartMainPage;
