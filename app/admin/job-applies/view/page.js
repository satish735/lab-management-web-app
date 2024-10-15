"use client";
import React, { useEffect, useState } from "react";
import "@/app/blog/blog.css"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import MultipleDropZone from "@/components/drop-zones/MultipleDropZone";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import uuid from "react-uuid";
import InputSelect from "@/components/project-main-component/input-component/InputSelect";
import InputTextArea from "@/components/formInput/InputTextArea";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
const Form = ({ searchParams }) => {


    const router = useRouter()

    const [jobRoles, setjobRoles] = useState([])
    const [jobPositions, setjobPositions] = useState([])

    // const [getCareerResponse, getCareerHandler] = useAPI(
    //     {
    //         url: "/addJobApply",
    //         method: "post",
    //         // sendImmediately: true,

    //     },
    //     (e) => {
    //         toast.success('Job Applied successfully.')
    //         router.push('/career')

    //         return e
    //     },
    //     (e) => {

    //         toast.error(transformErrorDefault(
    //             "Something went wrong while saving details!",
    //             e
    //         ));
    //     }
    // );


    const [getJobsResponse, getJobsHandler] = useAPI(
        {
            url: "/getJobs",
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            let data = (e ?? []).map((item) => { return { label: item?.name, value: item?._id } })
            setjobRoles([{ label: 'Select Role', value: '' }, ...data])
            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while fetching jobs!",
                e
            ));
        }
    );


 


    const [ExperienceData, setExperienceData] = useState([]);

    const [addResume, setAddResume] = useState()
    const [addAdditionalDocuments, setAddAdditionalDocuments] = useState([])


    const FirstName = useInputComponent();
    const FirstNameValidater = (value) => {
        if (!value || value == "") {
            FirstName.setFeedbackMessage("Required Field!");
            FirstName.setMessageType("error");
            return false;
        }
        FirstName.setFeedbackMessage(null);
        FirstName.setMessageType("none");
        return true;
    };

    const LastName = useInputComponent();
    const LastNameValidater = (value) => {
        if (!value || value == "") {
            LastName.setFeedbackMessage("Required Field!");
            LastName.setMessageType("error");
            return false;
        }
        LastName.setFeedbackMessage(null);
        LastName.setMessageType("none");
        return true;
    };

    const [Gender, setGender] = useState();
    const [GenderIsTouch, setGenderIsTouch] = useState(false);

    const [GenderMessage, setGenderMessage] = useState({
        type: "info",
        message: "",
    });
    const GenderSelectValidater = (value) => {
        if (value === "" || !value) {
            setGenderMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setGenderMessage({ type: "info", message: "" });

        return true;
    };


    const [JobRole, setJobRole] = useState();
    const [JobRoleIsTouch, setJobRoleIsTouch] = useState(false);

    const [JobRoleMessage, setJobRoleMessage] = useState({
        type: "info",
        message: "",
    });
    const JobRoleSelectValidater = (value) => {
        if (value === "" || !value) {
            setJobRoleMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setJobRoleMessage({ type: "info", message: "" });

        return true;
    };


    useEffect(() => {

        if (JobRole) {
            getJobsPositionHandler()
        }

    }, [JobRole])

    const Email = useInputComponent();
    const EmailValidater = (value) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Username validation regex: Alphanumeric characters, underscores, and hyphens allowed

        if (!emailRegex.test(value)) {
            Email.setFeedbackMessage("Email you entered is invalid!");
            Email.setMessageType("error");
            return false;
        }
        Email.setFeedbackMessage(null);
        Email.setMessageType("none");
        return true;
    };

    const Phone = useInputComponent('');
    const PhoneValidater = (value) => {
        if (value === "" || !value) {
            Phone.setFeedbackMessage(
                "Field required!"
            );
            Phone.setMessageType("error");
            return false;
        }

        if (value.length != 10) {
            Phone.setFeedbackMessage("Enter 10 digit number!");
            Phone.setMessageType("error");
            return false;
        }
        Phone.setFeedbackMessage("");
        Phone.setMessageType("none");
        return true;
    };

    const DateOfBirth = useInputComponent();
    const DateOfBirthValidater = (value) => {
        if (!value || value == "") {
            DateOfBirth.setFeedbackMessage("Required Field!");
            DateOfBirth.setMessageType("error");
            return false;
        }
        DateOfBirth.setFeedbackMessage(null);
        DateOfBirth.setMessageType("none");
        return true;
    };


    const ExperienceYear = useInputComponent('');
    const ExperienceYearValidater = (value) => {
        if (value === "" || !value) {
            ExperienceYear.setFeedbackMessage(
                "Field required!"
            );
            ExperienceYear.setMessageType("error");
            return false;
        }
        ExperienceYear.setFeedbackMessage("");
        ExperienceYear.setMessageType("none");
        return true;
    };


    const ExperienceMonth = useInputComponent('');
    const ExperienceMonthValidater = (value) => {
        if (value === "" || !value) {
            ExperienceMonth.setFeedbackMessage(
                "Field required!"
            );
            ExperienceMonth.setMessageType("error");
            return false;
        }
        ExperienceMonth.setFeedbackMessage("");
        ExperienceMonth.setMessageType("none");
        return true;
    };



    const CurrentSalary = useInputComponent('');
    const CurrentSalaryValidater = (value) => {
        if (value === "" || !value) {
            CurrentSalary.setFeedbackMessage(
                "Field required!"
            );
            CurrentSalary.setMessageType("error");
            return false;
        }
        CurrentSalary.setFeedbackMessage("");
        CurrentSalary.setMessageType("none");
        return true;
    };

    const ExpectedSalary = useInputComponent('');
    const ExpectedSalaryValidater = (value) => {
        if (value === "" || !value) {
            ExpectedSalary.setFeedbackMessage(
                "Field required!"
            );
            ExpectedSalary.setMessageType("error");
            return false;
        }
        ExpectedSalary.setFeedbackMessage("");
        ExpectedSalary.setMessageType("none");
        return true;
    };





    const AvailableToJoin = useInputComponent('');
    const AvailableToJoinValidater = (value) => {
        if (value === "" || !value) {
            AvailableToJoin.setFeedbackMessage(
                "Field required!"
            );
            AvailableToJoin.setMessageType("error");
            return false;
        }
        AvailableToJoin.setFeedbackMessage("");
        AvailableToJoin.setMessageType("none");
        return true;
    };


    const CurrentLocation = useInputComponent();
    const CurrentLocationValidater = (value) => {
        if (!value || value == "") {
            CurrentLocation.setFeedbackMessage("Required Field!");
            CurrentLocation.setMessageType("error");
            return false;
        }
        CurrentLocation.setFeedbackMessage(null);
        CurrentLocation.setMessageType("none");
        return true;
    };

    const [isexperienced, setisexperienced] = useState(false)



    const Skill = useInputComponent();
    const SkillValidater = (value) => {
        if (!value || value == "") {
            Skill.setFeedbackMessage("Required Field!");
            Skill.setMessageType("error");
            return false;
        }
        Skill.setFeedbackMessage(null);
        Skill.setMessageType("none");
        return true;
    };



    const [getJobsPositionResponse, getJobsPositionHandler] = useAPI(
        {
            url: `/getJobs/${JobRole}`,
            method: "get",
            // sendImmediately: true,

        },
        (e) => {
            let data = (e.position ?? []).map((item) => { return { label: item, value: item } })
            setjobPositions([{ label: 'Select Role', value: '' }, ...data])
            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while fetching positions!",
                e
            ));
        }
    );


    const [updateStatusContactUsResponse, updateStatusContactUsHandler] = useAPI(
        {
            url: `/jobAppliesDetails/${searchParams?.id}`,
            method: "put",

        },
        (e) => {
            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting details!",
                e
            ));
            return e
        }
    );

    const [urir, seturir] = useState([])

    const [getContactUsResponse, getContactUsHandler] = useAPI(
        {
            url: `/jobAppliesDetails/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            console.log(e)
            FirstName.setEnteredValue(e?.firstName ?? '')
            LastName.setEnteredValue(e?.lastName ?? '')
            Email.setEnteredValue(e?.email ?? '')
            Phone.setEnteredValue(e?.phone ?? '')
            DateOfBirth.setEnteredValue(e?.dateOfBirth ?? '')
            ExperienceYear.setEnteredValue(e?.experienceYear ?? '')
            ExperienceMonth.setEnteredValue(e?.experienceMonth ?? '')
            setAddResume(e?.resume ?? [])

            seturir([process.env.NEXT_PUBLIC_BUCKET_URL + e?.resume[0]?.filePath])
            console.log(e?.resume[0]?.filePath, e?.resume[0])
            CurrentSalary.setEnteredValue(e?.currentSalary ?? '')
            ExpectedSalary.setEnteredValue(e?.expectedSalary ?? '')
            AvailableToJoin.setEnteredValue(e?.availableToJoin ?? '')
            CurrentLocation.setEnteredValue(e?.currentLocation ?? '')
            Skill.setEnteredValue(e?.skill ?? '')
            setGender(e?.gender ?? '')
            setisexperienced(e?.isExperienced ?? '')

            let data = (e?.experienceData ?? []).map((item) => {
                return { ...item, id: uuid() }
            })
            setExperienceData(data ?? [])
            setJobRole(e?.forOpening ?? '')
            setAddAdditionalDocuments(additionalDetails ?? [])

            // process.env.NEXT_PUBLIC_BUCKET_URL + e?.image
            // {
            //     "_id": "66ec48f430f491697e6c147d",
            //     "firstName": "jai",
            //     "lastName": "soni",
            //     "email": "2019pgicsjai22@poornima.org",
            //     "phone": "08107150777",
            //     "dateOfBirth": "2024-09-08",
            //     "experienceYear": 2,
            //     "experienceMonth": 2,
            //      
            //     "currentSalary": 23,
            //     "expectedSalary": 345,
            //     "availableToJoin": "34",
            //     "currentLocation": "sdfgh",
            //     "skill": "dfgtyujio",
            //     "additionalDetails": null,
            //     "gender": "male",
            //     "isExperienced": true,
            //     "is_delete": false,
            //     "experienceData": [
            //         {
            //             "company_name": "poornima",
            //             "job_title": "df",
            //             "date_of_joining": "324",
            //             "location": "sedr",
            //             "id": "f7a684de-d688-cd7a-0cb9-95c9eb0866eb",
            //             "currently_working": true
            //         }
            //     ],
            //     "forOpening": "66eea98c987555749ef00284",
            //     "__v": 0
            // }

            if (e?.status === 'New') {

                updateStatusContactUsHandler({
                    body: {
                        status: 'Seen'
                    }
                })
            }
            return e

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting details!",
                e
            ));
            return e
        }
    );
    // console.log(urir)



    return (
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Job Applies Listing", link: "/admin/job-applies" },
                    { label: "Job Applies Details", link: "/admin/job-applies/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {'View Job Apply Details'}
                </h3>

                <LoaderGeneral
                    noContentMessage="records are not found"
                    state={
                        getContactUsResponse?.fetching
                            ? "loading"
                            : [null, undefined].includes(getContactUsResponse?.data)
                                ? "no-content"
                                : "none"

                    }
                />

                {
                    (!getContactUsResponse?.fetching) &&



                    <div className=" my-3  py-4 px-3"  >

                        <div className="row">
                            <div className="col-12 mb-4">

                                <MultipleDropZone dropZoneMessage={'Upload Resume'} files={addResume} setFiles={setAddResume} />

                            </div>
                            <div>

                                {
                                    (urir ?? []).map((item,index) => {
                                        return <p key={index} onClick={() => {
                                            window.open(item, '_blank', 'noopener, noreferrer');

                                        }}>dc</p>
                                    })
                                }
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <InputSelect
                                    setValue={setJobRole}
                                    value={JobRole}
                                    options={jobRoles ?? []}
                                    isTouched={JobRoleIsTouch}
                                    setIsTouched={setJobRoleIsTouch}
                                    className="py-1"
                                    label={"Job Role"}
                                    isRequired={true}
                                    feedbackMessage={JobRoleMessage?.message}
                                    feedbackType={JobRoleMessage?.type}
                                    validateHandler={JobRoleSelectValidater}
                                    disabled={true}
                                />
                            </div>



                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <InputWithAddOn
                                    label="First Name"
                                    className="loginInputs"

                                    setValue={FirstName.setEnteredValue}
                                    value={FirstName.enteredValue}
                                    feedbackMessage={FirstName.feedbackMessage}
                                    feedbackType={FirstName.messageType}
                                    isTouched={FirstName.isTouched}
                                    setIsTouched={FirstName.setIsTouched}

                                    validateHandler={FirstNameValidater}
                                    reset={FirstName.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <InputWithAddOn
                                    label="Last Name"
                                    className="loginInputs"

                                    setValue={LastName.setEnteredValue}
                                    value={LastName.enteredValue}
                                    feedbackMessage={LastName.feedbackMessage}
                                    feedbackType={LastName.messageType}
                                    isTouched={LastName.isTouched}
                                    setIsTouched={LastName.setIsTouched}

                                    validateHandler={LastNameValidater}
                                    reset={LastName.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <InputSelect
                                    setValue={setGender}
                                    value={Gender}
                                    options={[{ label: 'Select Role', value: '' }, { label: "Male", value: 'male' }, { label: "Women", value: 'women' }, { label: "Other", value: 'other' }] ?? []}
                                    isTouched={GenderIsTouch}
                                    setIsTouched={setGenderIsTouch}
                                    className="py-1"
                                    label={"Gender"}
                                    isRequired={true}
                                    feedbackMessage={GenderMessage?.message}
                                    feedbackType={GenderMessage?.type}
                                    validateHandler={GenderSelectValidater}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12">

                                <InputWithAddOn
                                    label="Email"
                                    className="loginInputs"

                                    setValue={Email.setEnteredValue}
                                    value={Email.enteredValue}
                                    feedbackMessage={Email.feedbackMessage}
                                    feedbackType={Email.messageType}
                                    isTouched={Email.isTouched}
                                    setIsTouched={Email.setIsTouched}

                                    validateHandler={EmailValidater}
                                    reset={Email.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Phone"
                                    className="loginInputs"

                                    setValue={Phone.setEnteredValue}
                                    value={Phone.enteredValue}
                                    feedbackMessage={Phone.feedbackMessage}
                                    feedbackType={Phone.messageType}
                                    isTouched={Phone.isTouched}
                                    setIsTouched={Phone.setIsTouched}

                                    validateHandler={PhoneValidater}
                                    reset={Phone.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>





                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Date Of Birth"
                                    className="loginInputs"
                                    rest={{ Placeholder: 'DD/MM/YYYY' }}
                                    setValue={DateOfBirth.setEnteredValue}
                                    value={DateOfBirth.enteredValue}
                                    feedbackMessage={DateOfBirth.feedbackMessage}
                                    feedbackType={DateOfBirth.messageType}
                                    isTouched={DateOfBirth.isTouched}
                                    setIsTouched={DateOfBirth.setIsTouched}
                                    type={'date'}
                                    validateHandler={DateOfBirthValidater}
                                    reset={DateOfBirth.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Experience"
                                    className="loginInputs"

                                    setValue={ExperienceYear.setEnteredValue}
                                    value={ExperienceYear.enteredValue}
                                    feedbackMessage={ExperienceYear.feedbackMessage}
                                    feedbackType={ExperienceYear.messageType}
                                    isTouched={ExperienceYear.isTouched}
                                    setIsTouched={ExperienceYear.setIsTouched}
                                    Placeholder={'Years'}

                                    validateHandler={ExperienceYearValidater}
                                    reset={ExperienceYear.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label=" "
                                    className="loginInputs"

                                    setValue={ExperienceMonth.setEnteredValue}
                                    value={ExperienceMonth.enteredValue}
                                    feedbackMessage={ExperienceMonth.feedbackMessage}
                                    feedbackType={ExperienceMonth.messageType}
                                    isTouched={ExperienceMonth.isTouched}
                                    setIsTouched={ExperienceMonth.setIsTouched}
                                    Placeholder='Months'
                                    validateHandler={ExperienceMonthValidater}
                                    reset={ExperienceMonth.reset}
                                    // isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Current Salary"
                                    className="loginInputs"

                                    setValue={CurrentSalary.setEnteredValue}
                                    value={CurrentSalary.enteredValue}
                                    feedbackMessage={CurrentSalary.feedbackMessage}
                                    feedbackType={CurrentSalary.messageType}
                                    isTouched={CurrentSalary.isTouched}
                                    setIsTouched={CurrentSalary.setIsTouched}

                                    validateHandler={CurrentSalaryValidater}
                                    reset={CurrentSalary.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Expected Salary"
                                    className="loginInputs"

                                    setValue={ExpectedSalary.setEnteredValue}
                                    value={ExpectedSalary.enteredValue}
                                    feedbackMessage={ExpectedSalary.feedbackMessage}
                                    feedbackType={ExpectedSalary.messageType}
                                    isTouched={ExpectedSalary.isTouched}
                                    setIsTouched={ExpectedSalary.setIsTouched}

                                    validateHandler={ExpectedSalaryValidater}
                                    reset={ExpectedSalary.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Available To Join (in days)"
                                    className="loginInputs"

                                    setValue={AvailableToJoin.setEnteredValue}
                                    value={AvailableToJoin.enteredValue}
                                    feedbackMessage={AvailableToJoin.feedbackMessage}
                                    feedbackType={AvailableToJoin.messageType}
                                    isTouched={AvailableToJoin.isTouched}
                                    setIsTouched={AvailableToJoin.setIsTouched}

                                    validateHandler={AvailableToJoinValidater}
                                    reset={AvailableToJoin.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={true}
                                />


                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 ">

                                <InputWithAddOn
                                    label="Current Location"
                                    className="loginInputs"

                                    setValue={CurrentLocation.setEnteredValue}
                                    value={CurrentLocation.enteredValue}
                                    feedbackMessage={CurrentLocation.feedbackMessage}
                                    feedbackType={CurrentLocation.messageType}
                                    isTouched={CurrentLocation.isTouched}
                                    setIsTouched={CurrentLocation.setIsTouched}

                                    validateHandler={CurrentLocationValidater}
                                    reset={CurrentLocation.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-12 mb-2">
                                <p className="input-heading">
                                    Any relative working in SSDBSHYAM Diagnostic *
                                </p>
                                <div className='d-flex gap-3'>
                                    <div className='d-flex gap-3'>
                                        <input type="radio" id="yes" name="fav_language" value={true} disabled={true} onChange={(e) => { }} /><div style={{ paddingTop: '4px', boxSizing: 'border-box' }}><label for="yes">Yes</label>
                                        </div>


                                    </div>
                                    <div className='d-flex gap-3'>
                                        <input type="radio" id="no" name="fav_language" value={!isexperienced} disabled={true} onChange={(e) => { }} />
                                        <div style={{ paddingTop: '4px', boxSizing: 'border-box' }}>
                                            <label for="no">No</label>
                                        </div>
                                    </div>



                                </div>
                            </div>


                            <div className="col-12 mt-3">

                                <InputTextArea
                                    label="Skills"
                                    className="loginInputs"

                                    setValue={Skill.setEnteredValue}
                                    value={Skill.enteredValue}
                                    feedbackMessage={Skill.feedbackMessage}
                                    feedbackType={Skill.messageType}
                                    isTouched={Skill.isTouched}
                                    setIsTouched={Skill.setIsTouched}

                                    validateHandler={SkillValidater}
                                    reset={Skill.reset}
                                    isRequired={true}
                                    // disabled={searchParams?.type === 'view'}
                                    disabled={true}
                                />
                            </div>



                            <div className="col-12 mb-3">
                                <p>Additional Documents</p>
                                <div style={{ width: '300px' }}>
                                    <MultipleDropZone dropZoneMessage={'attachment'} files={addAdditionalDocuments} setFiles={setAddAdditionalDocuments}
                                    />

                                </div>

                            </div>

                            <div>
                                <hr />
                            </div>

                            <div className="my-3">
                                <p style={{ fontSize: '14px', fontWeight: '700' }}>
                                    Experience Details
                                </p>

                                {(ExperienceData ?? []).map((experienceItem, index) => {
                                    return <ExperienceBlog experienceItem={experienceItem} key={index} setExperienceData={setExperienceData} length={(ExperienceData ?? []).length} />
                                })}



                                <div>


                                </div>
                            </div>



                            <div className="my-3 text-end">



                                <button
                                    className="mx-2 btn btn-dark"
                                    onClick={() => {
                                        router.push("/admin/jon-applies");
                                    }}
                                    type="button"
                                >
                                    {" "}
                                    Back
                                </button>




                            </div>
                        </div>
                    </div>

                }






            </div >
        </>
    );
};
export default Form;




const ExperienceBlog = ({ experienceItem, key, setExperienceData, length }) => {
    const CompanyName = useInputComponent('');
    const CompanyNameValidater = (value) => {
        if (value === "" || !value) {
            CompanyName.setFeedbackMessage(
                "Field required!"
            );
            CompanyName.setMessageType("error");
            return false;
        }
        CompanyName.setFeedbackMessage("");
        CompanyName.setMessageType("none");
        return true;
    };

    const JobTitle = useInputComponent('');
    const JobTitleValidater = (value) => {
        if (value === "" || !value) {
            JobTitle.setFeedbackMessage(
                "Field required!"
            );
            JobTitle.setMessageType("error");
            return false;
        }
        JobTitle.setFeedbackMessage("");
        JobTitle.setMessageType("none");
        return true;
    };


    const DateOfJoining = useInputComponent('');
    const DateOfJoiningValidater = (value) => {
        if (value === "" || !value) {
            DateOfJoining.setFeedbackMessage(
                "Field required!"
            );
            DateOfJoining.setMessageType("error");
            return false;
        }
        DateOfJoining.setFeedbackMessage("");
        DateOfJoining.setMessageType("none");
        return true;
    };

    const Location = useInputComponent('');
    const LocationValidater = (value) => {
        if (value === "" || !value) {
            Location.setFeedbackMessage(
                "Field required!"
            );
            Location.setMessageType("error");
            return false;
        }
        Location.setFeedbackMessage("");
        Location.setMessageType("none");
        return true;
    };



    const insertexperience = (value, type) => {


        setExperienceData(prev => {

            let experienceListing = (prev ?? []).map((experienceObject) => {
                if (experienceObject?.id == experienceItem?.id) {
                    return { ...experienceObject, [type]: value }
                }
                else {
                    return { ...experienceObject }

                }
            })
            return experienceListing

        })
    }


    const deleteexperience = () => {

        setExperienceData(prev => {



            let experienceListing = (prev ?? []).filter((experienceObject) => {


                if (experienceObject?.id === experienceItem?.id) {

                }
                else {
                    return experienceObject
                }
            })
            return experienceListing


        })
    }

    const [currentlyWorking, setCurrenltyWorking] = useState(false)

    useEffect(() => {
        if (experienceItem) {
            CompanyName.setEnteredValue(experienceItem.company_name ?? '')
            JobTitle.setEnteredValue(experienceItem.job_title ?? '')
            DateOfJoining.setEnteredValue(experienceItem.date_of_joining ?? '')
            Location.setEnteredValue(experienceItem.location ?? '')
        }
    }, [experienceItem])


    return (
        <>
            <div className="col-lg-10 col-md-10 col-sm-12 px-3 py-3 my-3" style={{ backgroundColor: '#ced6d93b' }} key={key}>




                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <InputWithAddOn
                            label="Company Name"
                            className="loginInputs"

                            setValue={CompanyName.setEnteredValue}
                            value={CompanyName.enteredValue}
                            feedbackMessage={CompanyName.feedbackMessage}
                            feedbackType={CompanyName.messageType}
                            isTouched={CompanyName.isTouched}
                            setIsTouched={CompanyName.setIsTouched}

                            validateHandler={CompanyNameValidater}
                            reset={CompanyName.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertexperience(e, 'company_name')
                            }}
                            disabled={true}
                        />
                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <InputWithAddOn
                            label="Job Name"
                            className="loginInputs"

                            setValue={JobTitle.setEnteredValue}
                            value={JobTitle.enteredValue}
                            feedbackMessage={JobTitle.feedbackMessage}
                            feedbackType={JobTitle.messageType}
                            isTouched={JobTitle.isTouched}
                            setIsTouched={JobTitle.setIsTouched}

                            validateHandler={JobTitleValidater}
                            reset={JobTitle.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertexperience(e, 'job_title')
                            }}
                            disabled={true}
                        />
                    </div>

                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <InputWithAddOn
                            label="Date Of Joining"
                            className="loginInputs"

                            setValue={DateOfJoining.setEnteredValue}
                            value={DateOfJoining.enteredValue}
                            feedbackMessage={DateOfJoining.feedbackMessage}
                            feedbackType={DateOfJoining.messageType}
                            isTouched={DateOfJoining.isTouched}
                            setIsTouched={DateOfJoining.setIsTouched}

                            validateHandler={DateOfJoiningValidater}
                            reset={DateOfJoining.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertexperience(e, 'date_of_joining')
                            }}
                            disabled={true}
                        />
                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <InputWithAddOn
                            label="Location"
                            className="loginInputs"

                            setValue={Location.setEnteredValue}
                            value={Location.enteredValue}
                            feedbackMessage={Location.feedbackMessage}
                            feedbackType={Location.messageType}
                            isTouched={Location.isTouched}
                            setIsTouched={Location.setIsTouched}

                            validateHandler={LocationValidater}
                            reset={Location.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertexperience(e, 'location')
                            }}
                            disabled={true}
                        />
                    </div>

                    <div className='d-flex gap-3 my-2'>
                        <input
                            type="radio"
                            id={`currenltyworking${key}`}
                            name={`currenltyworking${key}`}
                            value={currentlyWorking}
                            onClick={() => {
                                // setCurrenltyWorking(!currentlyWorking);
                                insertexperience(!currentlyWorking, 'currently_working')
                            }}

                            disabled={true}
                        />

                        <div onClick={() => { setCurrenltyWorking(!currentlyWorking); insertexperience(!currentlyWorking, 'currently_working') }} style={{ paddingTop: '0px', boxSizing: 'border-box', fontSize: '14px' }}><label for={` `}>Currently Working Here.</label>
                        </div>
                    </div>




                </div>

            </div>
        </>
    )
}
