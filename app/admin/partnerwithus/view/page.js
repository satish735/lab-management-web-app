"use client";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "reactstrap";
import InputSelect from "@/components/formInput/select/InputSelect";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
    () => import("@/components/text-editor/TextEditor"),
    { ssr: false }
);

const Partnerwithusupdate = ({ searchParams }) => {
    const router = useRouter();







    const [getpartnerwithusResponse, getpartnerwithusHandler] = useAPI(
        {
            url: `/partnerwithus/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            setContent(e?.text)
            setPartnertype(e?.type)
            return e

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting partnerwithus!",
                e
            ));
            return e
        }
    );


    const [deletepartnerwithusResponse, deletepartnerwithusHandler] = useAPI(
        {
            url: `/partnerwithus/${searchParams?.id}`,
            method: "DELETE",

        },
        (e) => {

            router.push("/admin/partnerwithus")
            toast.success("Partner With Us Deleted successfully");

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting partnerwithus!",
                e
            ));
            return e
        }
    );

    const [partnerwithusResponse, partnerwithusHandler] = useAPI(
        {
            url: `/partnerwithus/${searchParams?.id}`,
            method: "put",
        },
        (e) => {


            toast.success("Partner With Us updated successfully");

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






    const [content, setContent] = useState("");


    const [Partnertype, setPartnertype] = useState();
    const [PartnertypeIsTouch, setPartnertypeIsTouch] = useState(false);

    const [PartnertypeMessage, setPartnertypeMessage] = useState({
        type: "info",
        message: "",
    });
    const PartnertypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setPartnertypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setPartnertypeMessage({ type: "info", message: "" });

        return true;
    };






    const submit = () => {
        let isPartnertypeSelectValidater = PartnertypeSelectValidater(Partnertype)

        if (!isPartnertypeSelectValidater) {
            toast.error(
                "Please select a partner type!"
            );
        } else {
            partnerwithusHandler({
                body: {
                    text: content,
                    type: Partnertype ?? ""
                }
            })
        }



    };

    return (
        <>
            {getpartnerwithusResponse?.fetching ? <div className="my-4 text-center" ><Spinner size={"xl"} /></div> : <div className=' bg-white p-4  ' style={{ textAlign: "left" }}>



                <h3 className=" mb-5  text-center" style={{ fontSize: "1.2rem" }} >

                    Update Partner With Us</h3>

                <div className=" "  >


                    <div className="row  ">




                        <div className="my-3 ">

                            {partnerwithusResponse?.fetching ? <div style={{ float: "right" }} > <Spinner size={"sm"} /></div> : <button
                                style={{ float: "right" }}

                                className="btn btn-success px-5 "
                                onClick={submit}
                            >
                                Update Psrtner
                            </button>}

                            <button
                                style={{ float: "right" }}

                                className="btn btn-dark px-4 mx-3 "
                                onClick={() => {
                                    router.push("/admin/partnerwithus")
                                }}
                            >
                                Cancel
                            </button>


                            {deletepartnerwithusResponse?.fetching ? <div style={{ float: "right" }} > <Spinner size={"sm"} /></div> : <button
                                style={{ float: "right" }}

                                className="btn btn-danger px-4 mx-3 "
                                onClick={() => {
                                    deletepartnerwithusHandler()
                                }}
                            >
                                Delete
                            </button>}

                        </div>


                        <div className="col-sm-6 col-12  ">
                            <InputSelect
                                setValue={setPartnertype}
                                value={Partnertype}
                                options={[
                                    { label: "Franchising Opportunity", value: "franchising" },
                                    { label: "Lab Acquisition", value: "lab" },
                                    { label: "Hospital Lab Management", value: "hospital" },
                                    { label: "Corporate Wellness", value: "corporate" }
                                ] ?? []}
                                isTouched={PartnertypeIsTouch}
                                setIsTouched={setPartnertypeIsTouch}
                                className="py-1"
                                label={"Gender"}
                                isRequired={true}
                                feedbackMessage={PartnertypeMessage?.message}
                                feedbackType={PartnertypeMessage?.type}
                                validateHandler={PartnertypeSelectValidater}
                                disabled={true}
                            />
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

export default Partnerwithusupdate;