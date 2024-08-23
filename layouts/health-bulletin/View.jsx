"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const View = ({ searchParams }) => {


    const router = useRouter();

    const [name, setname] = useState();


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

        if (name != "") {

            healthbulletinHandler({
                body: {
                    name: name
                },
            });
        } else {
            toast.error("Fill complete form.");
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
        <div className="my-2">
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



                <div className="my-3 text-end ">
                    <button
                        className="mx-2 btn btn-outline-dark"
                        onClick={() => {
                            router.push("/admin");
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
        </div>
    )

}
export default View;