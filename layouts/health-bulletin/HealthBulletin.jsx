"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import MultipleDropZone from "@/components/drop-zones/MultipleDropZone";
const HealthBulletin = ({ searchParams }) => {



    const router = useRouter();

    const [HealthBulletinResponse, HealthBulletinHandler] = useAPI(
        {
            url: "/healthbulletin/create",
            method: "post",
        },
        (e) => {
            router.push("/admin/healthbulletin/create");
            toast.success("Health Bulletin has been created successfully");
        },
        (e) => {
            toast.error("Something went wrong while creating Health Bulletin!");
            return e;
        }
    );




    const [name, setname] = useState();



    const submit = () => {
        if (name == "") {
            return toast.error("Fill Name field.")
        } else if (imageFile?.status != "uploaded") {
            return toast.error("Select image file.")
        } else if (filesMultiple?.length == 0) {
            return toast.error("Add PDF file.")
        }



        if (name != "" && imageFile?.status == "uploaded") {
            HealthBulletinHandler({
                body: {
                    name: name,
                    backgroundLink: imageFile?.filePath,
                    broucherLink: filesMultiple ?? []
                },
            });
        }
    };


    const [imageFile, setImageFile] = useState();
    const [filesMultiple, setFileMultiple] = useState([])


    console.log("imageFile", imageFile)

    return (
        <>
            <div className="my-2">
                <h6> Create Health Bulletin</h6>

                <div className="row my-4">
                    <div className="col-sm-8 col-12" >
                        <InputWithAddOn
                            label="Name"
                            value={name}
                            setValue={setname}
                        />
                    </div>


                    <div className="col-12">
                        <h5 className="py-2 small">Add Banner Image</h5>
                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />
                        <h5 className="py-2 small" >Add PDF</h5>
                        <MultipleDropZone files={filesMultiple} setFiles={setFileMultiple} />
                    </div>

                    <div className="my-3 text-end ">
                        <button
                            className="mx-2 btn btn-outline-dark"
                            onClick={() => {
                                router.push("/admin/healthbulletin");
                            }}
                            type="button"
                        >
                            {" "}
                            Cancel
                        </button>
                        <button
                            style={{ float: "right" }}
                            disabled={name == "" && answers == ""}
                            className="btn btn-success px-3"
                            onClick={submit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthBulletin;
