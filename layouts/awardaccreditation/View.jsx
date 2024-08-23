"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
const View = ({ searchParams }) => {

    const router = useRouter();

    const [name, setname] = useState();
    const [desc, setdesc] = useState();
    const [time, settime] = useState();

    const [awardaccreditationResponse, awardaccreditationHandler] = useAPI(
        {
            url: `/awardaccreditation/${searchParams?.id}`,
            method: "PUT",
        },
        (e) => {

            setname();
            setdesc();
            settime()

            toast.success("award accreditation update successfully");
            router.push("/admin/awardaccreditation");

        },
        (e) => {
            toast.error("Something went wrong while creating award accreditation!")
            return e;
        }
    );


    const submit = () => {

        if (name != "" && desc != "") {

            awardaccreditationHandler({
                body: {
                    name: name,
                    desc: desc,
                    time: time
                },
            });
        } else {
            toast.error("Fill complete form.");
        }
    };




    const [getawardaccreditationResponse, getawardaccreditationHandler] = useAPI(
        {
            url: `/awardaccreditation/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            setname(e?.name)
            setdesc(e?.desc)
            settime(moment(e?.time)?.format("YYYY-MM-DD"))
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting award accreditation!",
                e
            ));
            return e
        }
    );


    return (
        <div className="my-2">
            <h6> Awards and Accreditations</h6>

            <div className="row">
                <div className="col-sm-6 col-12" >
                    <InputWithAddOn
                        label="Name"
                        value={name}
                        setValue={setname}
                        disabled={searchParams.type == "view" ? true : false}
                    />
                </div>

                <div className="col-sm-6 col-12" >
                    <InputWithAddOn
                        label="Description"
                        value={desc}
                        setValue={setdesc}
                        disabled={searchParams.type == "view" ? true : false}
                    />
                </div>
                <div className="col-sm-6 col-12" >
                    <InputWithAddOn
                        label="Date"
                        type="date"
                        value={time}
                        setValue={settime}
                        disabled={searchParams.type == "view" ? true : false}
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


                    {searchParams.type == "edit" && <button
                        style={{ float: "right" }}
                        disabled={name == "" && desc == ""}
                        className="btn btn-success px-3"
                        onClick={submit}
                    >
                        Update
                    </button>}

                </div>
            </div>
        </div>
    )

}
export default View;