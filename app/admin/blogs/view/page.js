"use client";

import { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";


const TextEditor = dynamic(
    () => import("@/components/text-editor/TextEditor"),
    { ssr: false }
);

const Page = ({ searchParams }) => {
    const router = useRouter();




    const [oldImage, setoldImage] = useState();




    const [getblogResponse, getblogHandler] = useAPI(
        {
            url: `/blogs/${searchParams?.id}`,
            method: "get",
            sendImmediately: true

        },
        (e) => {
            titleInput?.setEnteredValue(e?.title)
            descriptionInput?.setEnteredValue(e?.description)
            setContent(e?.ckdescription)
            setImageFile({
                filePath: e?.image, url: process.env.NEXT_PUBLIC_BUCKET_URL + e?.image,
                status: 'original'
            })


            setoldImage(e?.image)
            let getdata = [
                { label: "Show At Home", value: "is_home" },
                { label: "Trending", value: "trending" },
                { label: "Popular", value: "is_popular" },
            ]?.map((item) => {
                if (e?.isPopular && item?.value == "is_popular") {
                    return item
                } else if (e?.is_home && item?.value == "is_home") {
                    return item
                } else if (e?.trending && item?.value == "trending") {
                    return item
                }
            })?.filter((item) => item != undefined)

            setSelectedTags(getdata ?? [])
            return e

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting blog!",
                e
            ));
            return e
        }
    );


    // useEffect(() => {
    //     if (searchParams?.id) {
    //         getblogHandler()
    //     }

    // }, [searchParams])


    const [deleteblogResponse, deleteblogHandler] = useAPI(
        {
            url: `/blogs/${searchParams?.id}`,
            method: "DELETE",

        },
        (e) => {

            router.push("/admin/blogs")
            toast.success("Blog Deleted successfully");

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while deleting blog!",
                e
            ));
            return e
        }
    );

    const [blogResponse, blogHandler] = useAPI(
        {
            url: `/blogs/${searchParams?.id}`,
            method: "put",
        },
        (e) => {

            router.push("/admin/blogs")

            toast.success("Blog has been  updated successfully");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Body!",
                    e
                )
            );
            return e;
        }
    );





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
    console.log(imageFile)

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



    const [selectedTags, setSelectedTags] = useState([]);






    const createBlogSubmitHandler = async (isPublish = false) => {
        // setPublish(isPublish);
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
            image: imageFile?.filePath ?? null,
            oldImage: (imageFile?.filePath === oldImage) ? null : oldImage,
            ckdescription: content,
        };
        await blogHandler({ body: submitBody });
    };

    console.log(imageFile?.filePath ?? null)
    console.log((imageFile?.filePath === oldImage) ? null : oldImage)
    return (
        <>
            {getblogResponse?.fetching ? <div className="my-4 text-center" ><Spinner size={"xl"} /></div> : <div className=' bg-white p-4  ' style={{ textAlign: "left" }}>



                <h3 className=" mb-5  text-center" style={{ fontSize: "1.2rem" }} >

                    Update Blog</h3>

                <div className=" "  >


                    <div className="row  ">




                        <div className="my-3 ">

                            <button
                                style={{ float: "right" }}

                                className="btn btn-success px-5 "
                                onClick={() => {
                                    createBlogSubmitHandler(true);
                                }}
                            >
                                {blogResponse?.fetching ? <Spinner size={"sm"} /> : "Update Blog"}
                            </button>

                            <button
                                style={{ float: "right" }}

                                className="btn btn-dark px-4 mx-3 "
                                onClick={() => {
                                    router.push("/admin/blogs")
                                }}
                            >
                                Cancel
                            </button>


                            <button
                                style={{ float: "right" }}

                                className="btn btn-danger px-4 mx-3 "
                                onClick={() => {
                                    deleteblogHandler()
                                }}
                            >
                                {deleteblogResponse?.fetching ? <Spinner size={"sm"} /> : 'Delete'}
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




                        <div style={{ height: "400px" }}>
                            <TextEditor content={content} setContent={setContent} />
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Page;