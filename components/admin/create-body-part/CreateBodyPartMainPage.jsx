
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
const CreateBodyPartMainPage = () => {
    const router = useRouter();



    const [imageFile, setImageFile] = useState({
        url: "",
        status: "",
    });
    const [bodypartResponse, bodypartHandler] = useAPI(
        {
            url: "/body-parts/create",
            method: "post",
        },
        (e) => {


            toast.success("Body part added successfully");
            setImageFile({
                url: "",
                status: "",
              })
              bodypart.setEnteredValue()
        

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
        if (bodyPartIsValid != "" && imageFile?.filePath) {


            bodypartHandler({
                body: {
                    name: bodypart?.enteredValue ?? '',
                    image: imageFile?.filePath
                }
            });
        } else {
            toast.error("Fill the field.");
        }
    };

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

                    Add Body Part</h3>

                <div className=" my-3  py-4 px-3"  >


                    <div className="row">

                        <div className="col-12">
                            <p style={{ marginBottom: '7px', fontSize: '12px', color: '#0F0F0F', fontWeight: '500' }}>Upload Image  <span style={{ color: 'rgb(220 53 69)' }}>*</span></p>

                            <SingleImageDropZone file={imageFile} setFile={setImageFile} />



                        </div>
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
                            // disabled={searchParams?.type === 'view'}
                            />
                        </div>



                        <div className="my-3 text-end">
                            <button
                                className="mx-2 btn btn-outline-dark"
                                onClick={() => {
                                    router.push("/admin/body-parts");
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
                                {bodypartResponse?.fetching ? (
                                    <Spinner size={"sm"} />
                                ) : (
                                    "Submit"
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateBodyPartMainPage;
