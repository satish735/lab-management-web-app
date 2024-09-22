"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import MultipleDropZone from "@/components/drop-zones/MultipleDropZone";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";

const View = ({ searchParams }) => {


    const router = useRouter();

    const [name, setname] = useState();



    const [imageFile, setImageFile] = useState();

    const [filesMultiple, setFileMultiple] = useState([])


    const [healthbulletinResponse, healthbulletinHandler] = useAPI(
        {
            url: `/healthbulletin/${searchParams?.id}`,
            method: "PUT",
        },
        (e) => {
            setname();
            toast.success("health bulletin update successfully");
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating health bulletin!",
                    e
                )
            );
            return e;
        }
    );


    const submit = () => {

        if (name == "") {
            return toast.error("Fill Name field.")
        } else if (imageFile?.status == "uploaded") {
            return toast.error("Select image file.")
        } else if (filesMultiple?.length == 0) {
            return toast.error("Add PDF file.")
        }


        if (name != "" && imageFile?.status == "uploaded") {

            healthbulletinHandler({
                body: {
                    name: name,
                    backgroundLink: imageFile?.filePath,
                    broucherLink: filesMultiple ?? []
                },
            });
        }
    };



    const [gethealthbulletinResponse, gethealthbulletinHandler] = useAPI(
        {
            url: `/healthbulletin/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            setname(e?.name)
            setImageFile({
                url: process.env.NEXT_PUBLIC_BUCKET_URL + e?.backgroundLink,
                status: "uploaded",
                filepath: e?.backgroundLink
            })
            setFileMultiple(e?.broucher_link ?? [])
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting health bulletin!",
                e
            ));
            return e
        }
    );




    return (
        <>

            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    gethealthbulletinResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(gethealthbulletinResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />
            {!gethealthbulletinResponse?.fetching && <div className="my-2">
                <h6> Health Bulletin</h6>

                <div className="row">
                    <div className="col-sm-8 col-12" >
                        <InputWithAddOn
                            label="Name"
                            value={name}
                            setValue={setname}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>


                    <div className="col-12">
                        <h5 className="py-2 small">Add Banner Image</h5>
                        <SingleImageDropZone file={imageFile} setFile={setImageFile}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                        <h5 className="py-2 small" >Add PDF</h5>
                        <MultipleDropZone
                            disabled={searchParams.type == "view" ? true : false}
                            files={filesMultiple} setFiles={setFileMultiple} />
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


                        {searchParams.type == "edit" && <button
                            style={{ float: "right" }}
                            disabled={name == ""}
                            className="btn btn-success px-3"
                            onClick={submit}
                        >
                            Update
                        </button>}

                    </div>
                </div>
            </div>}

        </>
    )

}
export default View;