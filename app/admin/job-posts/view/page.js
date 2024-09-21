
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
import moment from "moment";
import dynamic from "next/dynamic";


const TextEditor = dynamic(
    () => import("@/components/text-editor/TextEditor"),
    { ssr: false }
);
const CreateJobRole = ({ searchParams }) => {
    const router = useRouter();
    const [content, setContent] = useState("");

    const [JobRoleResponse, JobRoleHandler] = useAPI(
        {
            url: `/jobPosts/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/job-posts");

            toast.success("Job Post updated successfully");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Job Post!",
                    e
                )
            );
            return e;
        }
    );


    const [testResponse, testHandler] = useAPI(
        {
            url: "/getCentersLocation",
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting centers!",
                e
            ));
            return e
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


    const JobName = useInputComponent('');
    const JobNameValidater = (value) => {
        if (value === "" || !value) {
            JobName.setFeedbackMessage(
                "Field required!"
            );
            JobName.setMessageType("error");
            return false;
        }
        JobName.setFeedbackMessage("");
        JobName.setMessageType("none");
        return true;
    };


    const Department = useInputComponent('');
    const DepartmentValidater = (value) => {
        if (value === "" || !value) {
            Department.setFeedbackMessage(
                "Field required!"
            );
            Department.setMessageType("error");
            return false;
        }
        Department.setFeedbackMessage("");
        Department.setMessageType("none");
        return true;
    };


    const [JobType, setJobType] = useState();
    const [JobTypeIsTouch, setJobTypeIsTouch] = useState(false);

    const [JobTypeMessage, setJobTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const JobTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setJobTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setJobTypeMessage({ type: "info", message: "" });

        return true;
    };

    const Experience = useInputComponent('');
    const ExperienceValidater = (value) => {
        if (value === "" || !value) {
            Experience.setFeedbackMessage(
                "Field required!"
            );
            Experience.setMessageType("error");
            return false;
        }
        Experience.setFeedbackMessage("");
        Experience.setMessageType("none");
        return true;
    };



    const ClosedAt = useInputComponent();
    const ClosedAtValidater = (value) => {
        if (!value || value == "") {
            ClosedAt.setFeedbackMessage("Required Field!");
            ClosedAt.setMessageType("error");
            return false;
        }
        ClosedAt.setFeedbackMessage(null);
        ClosedAt.setMessageType("none");
        return true;
    };







    const Description = useInputComponent('');
    const DescriptionValidater = (value) => {
        if (value === "" || !value) {
            Description.setFeedbackMessage(
                "Field required!"
            );
            Description.setMessageType("error");
            return false;
        }
        Description.setFeedbackMessage("");
        Description.setMessageType("none");
        return true;
    };



    const PublishedAt = useInputComponent();
    const PublishedAtValidater = (value) => {
        if (!value || value == "") {
            PublishedAt.setFeedbackMessage("Required Field!");
            PublishedAt.setMessageType("error");
            return false;
        }
        PublishedAt.setFeedbackMessage(null);
        PublishedAt.setMessageType("none");
        return true;
    };



    const [SelectCenters, setSelectCenters] = useState([]);
    const [SelectCentersIsTouch, setSelectCentersIsTouch] = useState(false);

    const [SelectCentersMessage, setSelectCentersMessage] = useState({
        type: "info",
        message: "",
    });
    const SelectCentersSelectValidater = (value) => {
        if (value === '' || !value) {
            setSelectCentersMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setSelectCentersMessage({ type: "info", message: "" });

        return true;
    };





    const submit = () => {


        let JobNameValidate = JobNameValidater(JobName?.enteredValue);
        let DepartmentValidate = DepartmentValidater(Department?.enteredValue);
        let ExperienceValidate = content ? true : false;
        let ClosedAtValidate = ClosedAtValidater(ClosedAt?.enteredValue);
        let DescriptionValidate = DescriptionValidater(Description?.enteredValue);
        let PublishedAtValidate = PublishedAtValidater(PublishedAt?.enteredValue);
        let JobTypeValidate = JobTypeSelectValidater(JobType);
        let SelectCentersValidate = (SelectCenters ?? [])?.length > 0

        // console.log(!JobNameValidate || !DepartmentValidate || !ExperienceValidate || !ClosedAtValidate || !DescriptionValidate || !PublishedAtValidate || !JobTypeValidate || !SelectCentersValidate);

        // console.log({

        //     center: SelectCenters ? (SelectCenters ?? []).map((item) => item.value) : [],
        //     department: Department?.enteredValue ?? '',
        //     jobType: JobType ?? '',
        //     experience: content ?? '',
        //     name: JobName?.enteredValue ?? '',
        //     createdBy: '66d9d07fb968d9ac8d97d963',
        //     closedAt: ClosedAt?.enteredValue ?? null,
        //     description: Description?.enteredValue ?? '',
        //     publishedAt: PublishedAt?.enteredValue ?? null,

        // });


        if (!JobNameValidate || !DepartmentValidate || !ExperienceValidate || !ClosedAtValidate || !DescriptionValidate || !PublishedAtValidate || !JobTypeValidate || !SelectCentersValidate) {
            toast.error('Fill all the fields.')
        }

        else {
            JobRoleHandler({
                body: {

                    center: SelectCenters ? (SelectCenters ?? []).map((item) => item.value) : [],
                    department: Department?.enteredValue ?? '',
                    jobType: JobType ?? '',
                    experience: content ?? '',
                    name: JobName?.enteredValue ?? '',
                    createdBy: '66d9d07fb968d9ac8d97d963',
                    closedAt: ClosedAt?.enteredValue ?? null,
                    description: Description?.enteredValue ?? '',
                    publishedAt: PublishedAt?.enteredValue ?? null,

                }
            })
        }

    };


    const [getJobRoleResponse, getJobRoleHandler] = useAPI(
        {
            url: `/jobPosts/${searchParams?.id}`,
            method: "get",
            sendImmediately: true
        },
        (e) => {

            JobName?.setEnteredValue(e?.name)
            Department?.setEnteredValue(e?.department)
            // Experience?.setEnteredValue(e?.experience)
            ClosedAt?.setEnteredValue((e?.closedAt) ? moment(e?.closedAt).format('YYYY-MM-DD') : null)
            Description?.setEnteredValue(e?.description)
            PublishedAt?.setEnteredValue((e?.publishedAt) ? moment(e?.publishedAt).format('YYYY-MM-DD') : null)
            setJobType(e?.jobType)
            setContent(e?.experience)

            return e
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while adding Job Post!",
                    e
                )
            );
            return e;
        }
    );



    useEffect(() => {


        if (testResponse?.data && getJobRoleResponse?.data) {


            let data = (testResponse?.data?.centerListing ?? []).filter((item) => {



                if ((getJobRoleResponse?.data?.center ?? []).includes(item?.value)) {
                    return item

                }

            })

            setSelectCenters(data)
        }

    }, [testResponse?.data, getJobRoleResponse?.data])

    return (
        <>
          
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Job Posts", link: "/admin/job-posts" },
                    { label: "Update Job Posts", link: "/admin/job-posts/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>



                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {searchParams?.type === 'view' ? 'View' : 'Update'} Job Posts</h3>

                <div className=" my-3  py-4 px-3"  >


                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 ">

                            <InputWithAddOn
                                label="Job Name"
                                className="loginInputs"

                                setValue={JobName.setEnteredValue}
                                value={JobName.enteredValue}
                                feedbackMessage={JobName.feedbackMessage}
                                feedbackType={JobName.messageType}
                                isTouched={JobName.isTouched}
                                setIsTouched={JobName.setIsTouched}

                                validateHandler={JobNameValidater}
                                reset={JobName.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />


                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 ">

                            <InputWithAddOn
                                label="Department"
                                className="loginInputs"

                                setValue={Department.setEnteredValue}
                                value={Department.enteredValue}
                                feedbackMessage={Department.feedbackMessage}
                                feedbackType={Department.messageType}
                                isTouched={Department.isTouched}
                                setIsTouched={Department.setIsTouched}

                                validateHandler={DepartmentValidater}
                                reset={Department.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />
                        </div>


                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputSelect
                                setValue={setJobType}
                                value={JobType}
                                options={[{ label: 'Full Time', value: 'full time' }, { label: 'Part Time', value: 'part time' }] ?? []}
                                isTouched={JobTypeIsTouch}
                                setIsTouched={setJobTypeIsTouch}
                                className=""
                                label={"Select Job Type"}
                                isRequired={true}
                                feedbackMessage={JobTypeMessage?.message}
                                feedbackType={JobTypeMessage?.type}
                                validateHandler={JobTypeSelectValidater}
                                disabled={searchParams?.type === 'view'}
                            />
                        </div>



                        <div className="col-lg-4 col-md-4 col-sm-12 ">
                            <InputMultipleSelect
                                setValue={setSelectCenters}
                                value={SelectCenters}
                                options={testResponse?.data?.centerListing ?? []}
                                isTouched={SelectCentersIsTouch}
                                setIsTouched={setSelectCentersIsTouch}
                                className=""
                                label={"Select Centers To Include"}
                                isRequired={true}
                                feedbackMessage={SelectCentersMessage?.message}
                                feedbackType={SelectCentersMessage?.type}
                                validateHandler={SelectCentersSelectValidater}
                                disabled={searchParams?.type === 'view'}
                            />
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12 ">

                            <InputWithAddOn
                                label="Published At"
                                className="loginInputs"
                                rest={{ Placeholder: 'DD/MM/YYYY' }}
                                setValue={PublishedAt.setEnteredValue}
                                value={PublishedAt.enteredValue}
                                feedbackMessage={PublishedAt.feedbackMessage}
                                feedbackType={PublishedAt.messageType}
                                isTouched={PublishedAt.isTouched}
                                setIsTouched={PublishedAt.setIsTouched}
                                type={'date'}
                                validateHandler={PublishedAtValidater}
                                reset={PublishedAt.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />
                        </div>





                        <div className="col-lg-4 col-md-4 col-sm-12 ">

                            <InputWithAddOn
                                label="Close Date"
                                className="loginInputs"
                                rest={{ Placeholder: 'DD/MM/YYYY' }}
                                setValue={ClosedAt.setEnteredValue}
                                value={ClosedAt.enteredValue}
                                feedbackMessage={ClosedAt.feedbackMessage}
                                feedbackType={ClosedAt.messageType}
                                isTouched={ClosedAt.isTouched}
                                setIsTouched={ClosedAt.setIsTouched}
                                type={'date'}
                                validateHandler={ClosedAtValidater}
                                reset={ClosedAt.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />
                        </div>



                        <div className="col-12 ">

                            <InputTextArea
                                label="Job Description"
                                className="loginInputs"

                                setValue={Description.setEnteredValue}
                                value={Description.enteredValue}
                                feedbackMessage={Description.feedbackMessage}
                                feedbackType={Description.messageType}
                                isTouched={Description.isTouched}
                                setIsTouched={Description.setIsTouched}
                                validateHandler={DescriptionValidater}
                                reset={Description.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />


                        </div>
                        {/* 
                        <div className="col-12 ">

                            <InputTextArea
                                label="Experience"
                                className="loginInputs"

                                setValue={Experience.setEnteredValue}
                                value={Experience.enteredValue}
                                feedbackMessage={Experience.feedbackMessage}
                                feedbackType={Experience.messageType}
                                isTouched={Experience.isTouched}
                                setIsTouched={Experience.setIsTouched}
                                validateHandler={ExperienceValidater}
                                reset={Experience.reset}
                                isRequired={true}
                                disabled={searchParams?.type === 'view'}
                            />


                        </div>
 */}


                        <div style={{ minHeight: "300px" }}>
                            <TextEditor content={content} setContent={setContent} />
                        </div>








                        <div className="my-5 text-end">
                            {
                                (searchParams?.type !== 'view') &&
                                <button onClick={() => { deleteJobHandler({ params: searchParams?.id }) }} className="btn btn-danger px-4 mx-2">

                                    {deleteJobResponse?.fetching ? (
                                        <Spinner size={"sm"} />
                                    ) : (
                                        "Delete"
                                    )}
                                </button>

                            }
                            <button
                                className="mx-2 btn btn-outline-dark mx-2"
                                onClick={() => {
                                    router.push("/admin/job-posts")
                                }}
                                type="button"
                            >
                                {" "}
                                Cancel
                            </button>
                            {
                                (searchParams?.type !== 'view') &&
                                <button
                                    style={{ float: "right" }}

                                    className="btn btn-success px-3 mx-2"
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



