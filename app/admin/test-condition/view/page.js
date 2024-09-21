
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
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
const EditTestConditionPage = ({ searchParams }) => {
    const router = useRouter();



    const [testconditionResponse, testconditionHandler] = useAPI(
        {
            url: `/testcondition/${searchParams?.id}`,
            method: "put",
        },
        (e) => {

            router.push("/admin/test-condition");
            toast.success("Test condition updated successfully");
            setImageFile({
                url: "",
                status: "",
            })
            testcondition.setEnteredValue()

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Body Part!",
                    e
                )
            );
            return e;
        }
    );



    const [DeletetestconditionResponse, DeletetestconditionHandler] = useAPI(
        {
            url: `/testcondition/${searchParams?.id}`,
            method: "DELETE",
        },
        (e) => {

            router.push("/admin/test-condition");
            toast.success("Test condition deleted successfully");

            testcondition.setEnteredValue()

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Body Part!",
                    e
                )
            );
            return e;
        }
    );




    const testcondition = useInputComponent();
    const testconditionValidater = (value) => {
        if (!value || value == "") {
            testcondition.setFeedbackMessage("Required Field!");
            testcondition.setMessageType("error");
            return false;
        }
        testcondition.setFeedbackMessage(null);
        testcondition.setMessageType("none");
        return true;
    };


    const submit = () => {
        let testconditionIsValid = testconditionValidater(testcondition?.enteredValue);
        if (testconditionIsValid != "") {


            testconditionHandler({
                body: {
                    name: testcondition?.enteredValue ?? '',
                }
            });
        } else {
            toast.error("Fill the field.");
        }
    };


    const [getTestConditionResponse, getTestConditionHandler] = useAPI(
        {
            url: `/testcondition/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            testcondition.setEnteredValue(e?.name)

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
                    { label: "Test Condition", link: "/admin/test-condition" },
                    { label: "Add Test Condition", link: "/admin/test-condition/create", active: true },
                ]}
            />

            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >
                    {searchParams?.type === 'view' ? 'View Test Condition' : 'Edit Test Condition'}

                </h3>




                <LoaderGeneral
                    noContentMessage="records are not found"
                    state={
                        getTestConditionResponse?.fetching
                            ? "loading"
                            : [null, undefined].includes(getTestConditionResponse?.data)
                                ? "no-content"
                                : "none"

                    }
                />

                {
                    (!getTestConditionResponse?.fetching) &&


                    <div className=" my-3  py-4 px-3"  >


                        <div className="row">


                            <div className="col-12 mt-3">

                                <InputWithAddOn
                                    label="Test Condition Name"
                                    className="loginInputs"

                                    setValue={testcondition.setEnteredValue}
                                    value={testcondition.enteredValue}
                                    feedbackMessage={testcondition.feedbackMessage}
                                    feedbackType={testcondition.messageType}
                                    isTouched={testcondition.isTouched}
                                    setIsTouched={testcondition.setIsTouched}

                                    validateHandler={testconditionValidater}
                                    reset={testcondition.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>



                            <div className="my-3 text-end">

                                <button
                                    className="mx-2 btn btn-danger"
                                    onClick={() => {
                                        DeletetestconditionHandler()
                                    }}
                                    type="button"
                                >
                                    {DeletetestconditionResponse?.fetching ? <Spinner size={"sm"} /> : "Delete"}
                                </button>
                                <button
                                    className="mx-2 btn btn-dark"
                                    onClick={() => {
                                        router.push("/admin/test-condition");
                                    }}
                                    type="button"
                                >
                                    {" "}
                                    Cancel
                                </button>

                                <button
                                    style={{ float: "right" }}

                                    className="btn btn-success px-3"
                                    onClick={submit}
                                    type="button"
                                >
                                    {testconditionResponse?.fetching ? (
                                        <Spinner size={"sm"} />
                                    ) : (
                                        "Update"
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                }
            </div>


        </>
    );
};

export default EditTestConditionPage;
