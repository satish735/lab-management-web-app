
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
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import useInputComponent from "@/hooks/useInputComponent";
import uuid from "react-uuid";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
const CreateJobRole = ({ searchParams }) => {
    const router = useRouter();

    const [JobRoleResponse, JobRoleHandler] = useAPI(
        {
            url: `/jobPosts/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            JobRole.setEnteredValue();
            setJobRoleData([{ job_position: '', id: uuid() }])

            toast.success("JobRole update successfully");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating JobRole!",
                    e
                )
            );
            return e;
        }
    );


    const [deleteJobResponse, deleteJobHandler] = useAPI(
        {
            url: `/jobPosts/${searchParams?.id}`,
            method: "delete",

        },
        (e) => {

            router.push('/admin/job-posts')


            toast.success("Job Post deleted successfully.");



            return e
        },
        (e) => {
            // setisSubmit(false)
            toast.error(transformErrorDefault(
                "Something went wrong while deleting!",
                e
            ))
        }
    );


    const [JobRoleData, setJobRoleData] = useState([{ job_position: '', id: uuid() }]);


    const JobRole = useInputComponent('');
    const JobRoleValidater = (value) => {
        if (value === "" || !value) {
            JobRole.setFeedbackMessage(
                "Field required!"
            );
            JobRole.setMessageType("error");
            return false;
        }
        JobRole.setFeedbackMessage("");
        JobRole.setMessageType("none");
        return true;
    };





    const submit = () => {

        let titleValidate = JobRoleValidater(JobRole.enteredValue);
       
        let flag = false
        let data = (JobRoleData ?? []).map((item) => {
            if (!item.job_position || item.job_position === '') {
                flag = true
            }
            return item?.job_position
        })

        if (!titleValidate) {
            toast.error('Fill all the fields.')
        }
        else if (flag) {
            toast.error('Fill all the fields for positions.')

        }
        else {
            JobRoleHandler({
                body: {
                    jobRole: JobRole.enteredValue ?? '',
                    position: data ?? [],

                }
            })
        }

    };


    const [getBodyPartResponse, getBodyPartHandler] = useAPI(
        {
            url: `/jobPosts/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {



            JobRole.setEnteredValue(e?.jobRole)
            if ((e?.position ?? []).length) {

                let data = (e?.position ?? []).map((item) => {
                    return { job_position: item, id: uuid() }
                })
                setJobRoleData(data)

            }

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
                    { label: "Job Posts", link: "/admin/job-posts" },
                    { label: "Add Job Vacancies", link: "/admin/job-posts/create", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>



                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    Add Job Vacancies</h3>

                <div className=" my-3  py-4 px-3"  >


                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">

                            <InputWithAddOn
                                label="Job Role"
                                className="loginInputs"

                                setValue={JobRole.setEnteredValue}
                                value={JobRole.enteredValue}
                                feedbackMessage={JobRole.feedbackMessage}
                                feedbackType={JobRole.messageType}
                                isTouched={JobRole.isTouched}
                                setIsTouched={JobRole.setIsTouched}

                                validateHandler={JobRoleValidater}
                                reset={JobRole.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />


                        </div>


                        <div className="my-3">
                            <p style={{ fontSize: '17px', fontWeight: '700' }}>
                                Add Job Positions
                            </p>

                            {(JobRoleData ?? []).map((positionItem, index) => {
                                return <ExperienceBlog searchParams={searchParams} positionItem={positionItem} key={index} setJobRoleData={setJobRoleData} length={(JobRoleData ?? []).length} />
                            })}


                            {
                                searchParams?.type !== 'view' &&
                                <div className='my-2 '>
                                    <p>
                                        <span style={{ cursor: 'pointer' }} onClick={() => { setJobRoleData(prev => { return [...prev, { company_name: '', job_title: '', date_of_joining: '', location: '', id: uuid() }] }) }}>
                                            <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 5px 1px 6px' }}>+</span><span style={{ color: 'blue', fontSize: '18px', fontWeight: '500', cursor: 'pointer' }}> Add more Position for this role.</span>
                                        </span>

                                    </p>
                                </div>
                            }

                            <div>


                            </div>
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
                            <button onClick={() => { deleteJobHandler({ params: searchParams?.id }) }} className="btn btn-danger px-4 mx-3">

                                {deleteJobResponse?.fetching ? (
                                    <Spinner size={"sm"} />
                                ) : (
                                    "Delete"
                                )}
                            </button>


                            {
                                searchParams?.type !== 'view' &&
                                <button
                                    style={{ float: "right" }}

                                    className="btn btn-success px-3"
                                    onClick={submit}
                                >
                                    {JobRoleResponse?.fetching ? (
                                        <Spinner size={"sm"} />
                                    ) : (
                                        "Update"
                                    )}

                                </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateJobRole;





const ExperienceBlog = ({ positionItem, key, setJobRoleData, length, searchParams }) => {
    const JobPosition = useInputComponent('');
    const JobPositionValidater = (value) => {
        if (value === "" || !value) {
            JobPosition.setFeedbackMessage(
                "Field required!"
            );
            JobPosition.setMessageType("error");
            return false;
        }
        JobPosition.setFeedbackMessage("");
        JobPosition.setMessageType("none");
        return true;
    };




    const insertposition = (value, type) => {


        setJobRoleData(prev => {

            let positionListing = (prev ?? []).map((positionObject) => {
                if (positionObject?.id == positionItem?.id) {
                    return { ...positionObject, [type]: value }
                }
                else {
                    return { ...positionObject }

                }
            })
            return positionListing

        })
    }


    const deleteposition = () => {

        setJobRoleData(prev => {



            let positionListing = (prev ?? []).filter((positionObject) => {


                if (positionObject?.id === positionItem?.id) {

                }
                else {
                    return positionObject
                }
            })
            return positionListing


        })
    }


    useEffect(() => {
        if (positionItem) {
            JobPosition.setEnteredValue(positionItem.job_position ?? '')
        }
    }, [positionItem])


    return (
        <>
            <div className="col-12   py-3 my-3" key={key}>



                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <InputWithAddOn
                            label="Position"
                            className="loginInputs"

                            setValue={JobPosition.setEnteredValue}
                            value={JobPosition.enteredValue}
                            feedbackMessage={JobPosition.feedbackMessage}
                            feedbackType={JobPosition.messageType}
                            isTouched={JobPosition.isTouched}
                            setIsTouched={JobPosition.setIsTouched}

                            validateHandler={JobPositionValidater}
                            reset={JobPosition.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertposition(e, 'job_position')
                            }}
                            disabled={searchParams?.type === 'view'}
                        />
                    </div>






                    {
                        (length > 1 && searchParams?.type !== 'view') &&
                        <div className='col-3 ' style={{ paddingTop: '29px', boxSizing: 'border-box' }}>
                            <button onClick={() => { deleteposition() }} className='' style={{ border: '2px solid red', borderRadius: '10px', color: 'red', fontSize: '15px', fontWeight: '500', backgroundColor: 'white', padding: '2px 10px' }}>X <span>Remove</span></button>


                        </div>
                    }


                </div>

            </div>
        </>
    )
}