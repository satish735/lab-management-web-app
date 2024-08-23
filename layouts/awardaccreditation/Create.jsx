"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Create = ({ searchParams }) => {


    const router = useRouter();

    const [awardaccreditationResponse, awardaccreditationHandler] = useAPI(
        {
            url: "/awardaccreditation/create",
            method: "post",
        },
        (e) => {
            settitle();
            setdescs();
            toast.success("Award accreditation added successfully");
            // setisSubmit(false)
        },
        (e) => {
            // setisSubmit(false)
            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating award accreditation!",
                    e
                )
            );
            return e;
        }
    );




    const [title, settitle] = useState();
    const [descs, setdescs] = useState();
    const [date, setdate] = useState();

    const submit = () => {
        if (title != "") {
            awardaccreditationHandler({
                body: {
                    title: title,
                    desc: descs,
                    date: date
                },
            });
        } else {
            toast.error("Fill complete form.");
        }
    };




    return (
        <>
            <div className="my-2">
                <h6> Awards and Accreditations</h6>

                <div className="row">
                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Title"
                            value={title}
                            setValue={settitle}
                        />
                    </div>

                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Description"
                            value={descs}
                            setValue={setdescs}
                        />
                    </div>

                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Date"
                            value={date}
                            setValue={setdate}
                            type="date"
                        />
                    </div>

                    <div className="my-3 text-end">
                        <button
                            className="mx-2 btn btn-outline-dark"
                            onClick={() => {
                                router.push("/admin/awardaccreditation");
                            }}
                            type="button"
                        >
                            {" "}
                            Cancel
                        </button>
                        <button
                            style={{ float: "right" }}
                            disabled={title == "" && descs == ""}
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

export default Create;
