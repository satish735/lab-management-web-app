"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const HealthBulletin = ({ searchParams }) => {



    const router = useRouter();

    const [HealthBulletinResponse, HealthBulletinHandler] = useAPI(
        {
            url: "/healthbulletin/create",
            method: "post",
        },
        (e) => {
            setname();

            toast.success("Health Bulletin has been created successfully");

        },
        (e) => {

            toast.error("Something went wrong while creating Health Bulletin!");

            return e;
        }
    );




    const [name, setname] = useState();



    const submit = () => {
        if (name != "") {
            HealthBulletinHandler({
                body: {
                    name: name,
                },
            });
        } else {
            toast.error("Fill complete form.");
        }
    };




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
