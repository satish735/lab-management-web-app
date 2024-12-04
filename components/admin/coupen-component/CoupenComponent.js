

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
import MenuItems from "@/components/multilevel-dropdown/MenuItems";
import moment from "moment";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
const CoupenComponent = ({ searchParams }) => {
    const router = useRouter();

    const [DiscountCoupenResponse, DiscountCoupenHandler] = useAPI(
        {
            url: `/addCoupon/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/coupen");
            toast.success("Coupen updated successfully");


        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updated Coupen!",
                    e
                )
            );
            return e;
        }
    );


    const [deleteCouponResponse, deleteCouponHandler] = useAPI(
        {
            url: `/addCoupon/${searchParams?.id}`,
            method: "delete",

        },
        (e) => {

            router.push("/admin/coupen");
            toast.success("Coupon deleted successfully.");



            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while deleting!",
                e
            ))
        }
    );



    const [TermsCondition, setTermsCondition] = useState([{ terms: '', id: uuid() }]);


    const [ListingFields, setListingFields] = useState();
    const [FieldsToDisplay, setFieldsToDisplay] = useState({ all: false, test: false, package: false, bodypart: false, healthcondition: false, individual: false });
    // console.log(FieldsToDisplay);

    const [getBasicDetailsResponse, getBasicDetailsHandler] = useAPI(
        {
            url: "/getTestDetails",
            method: "get",
            sendImmediately: true,

        },
        (e) => {



            let TestConditionListing = (e?.TestConditionListing ?? []).map((item) => {
                return { label: item?.name, value: item?._id }
            })
            let BodyPartListing = (e?.BodyPartListing ?? []).map((item) => {
                return { label: item?.name, value: item?._id }
            })


            let TestListing = (e?.PackageTestInstanceListing ?? []).map((item) => {


                return { label: item?.name, value: item?._id, price: item?.rate }
            })

            let PackagesListing = (e?.PackagesListing ?? []).map((item) => {


                return { label: item?.name, value: item?._id }
            })
            setListingFields({
                TestConditionListing: TestConditionListing, BodyPartListing: BodyPartListing, TestListing: TestListing, PackagesListing: PackagesListing
            })


        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while getting Details!",
                e
            ))
            return e
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

    const [userResponse, userHandler] = useAPI(
        {
            url: "/getUserList",
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            let data = (e?.UserInstanceListing).map(user => ({
                value: user._id,
                label: user.name
            }));
            return data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting users!",
                e
            ));
            return e
        }
    );



    const CouponName = useInputComponent('');
    const CouponNameValidater = (value) => {

        if (value === "" || !value) {
            CouponName.setFeedbackMessage("Field required!");
            CouponName.setMessageType("error");
            return false;
        }


        CouponName.setFeedbackMessage("");
        CouponName.setMessageType("none");
        return true;
    };


    const CouponCode = useInputComponent('');
    const CouponCodeValidater = (value) => {
        const regex = /^[a-zA-Z0-9]{5,12}$/;
        if (value === "" || !value) {
            CouponCode.setFeedbackMessage("Field required!");
            CouponCode.setMessageType("error");
            return false;
        }
        if (!regex.test(value)) {
            CouponCode.setFeedbackMessage("Invalid code! Only alphanumeric characters, 5-12 characters long.");
            CouponCode.setMessageType("error");
            return false;
        }
        CouponCode.setFeedbackMessage("");
        CouponCode.setMessageType("none");
        return true;
    };


    const [DiscountType, setDiscountType] = useState('percentage');
    const [DiscountTypeIsTouch, setDiscountTypeIsTouch] = useState(false);

    const [DiscountTypeMessage, setDiscountTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const DiscountTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setDiscountTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setDiscountTypeMessage({ type: "info", message: "" });

        return true;
    };



    const ExpirationDate = useInputComponent();
    const ExpirationDateValidater = (value) => {
        if (!value || value == "") {
            ExpirationDate.setFeedbackMessage("Required Field!");
            ExpirationDate.setMessageType("error");
            return false;
        }
        ExpirationDate.setFeedbackMessage(null);
        ExpirationDate.setMessageType("none");
        return true;
    };

    const StartDate = useInputComponent();
    const StartDateValidater = (value) => {
        if (!value || value == "") {
            StartDate.setFeedbackMessage("Required Field!");
            StartDate.setMessageType("error");
            return false;
        }
        StartDate.setFeedbackMessage(null);
        StartDate.setMessageType("none");
        return true;
    };



    const MaxUse = useInputComponent('');
    const MaxUseValidater = (value) => {
        if (value === "" || !value) {
            MaxUse.setFeedbackMessage(
                "Field required!"
            );
            MaxUse.setMessageType("error");
            return false;
        }
        MaxUse.setFeedbackMessage("");
        MaxUse.setMessageType("none");
        return true;
    };




    const maxUsagePerUser = useInputComponent('');
    const maxUsagePerUserValidater = (value) => {
        if (value === "" || !value) {
            maxUsagePerUser.setFeedbackMessage(
                "Field required!"
            );
            maxUsagePerUser.setMessageType("error");
            return false;
        }
        maxUsagePerUser.setFeedbackMessage("");
        maxUsagePerUser.setMessageType("none");
        return true;
    };




    const DiscountValue = useInputComponent('');
    const DiscountValueValidater = (value) => {
        if (value === "" || !value) {
            DiscountValue.setFeedbackMessage(
                "Field required!"
            );
            DiscountValue.setMessageType("error");
            return false;
        }
        DiscountValue.setFeedbackMessage("");
        DiscountValue.setMessageType("none");
        return true;
    };




    const DescriptionShort = useInputComponent('');
    const DescriptionShortValidater = (value) => {
        if (value === "" || !value) {
            DescriptionShort.setFeedbackMessage(
                "Field required!"
            );
            DescriptionShort.setMessageType("error");
            return false;
        }
        DescriptionShort.setFeedbackMessage("");
        DescriptionShort.setMessageType("none");
        return true;
    };


    const [Status, setStatus] = useState();
    const [StatusIsTouch, setStatusIsTouch] = useState(false);

    const [StatusMessage, setStatusMessage] = useState({
        type: "info",
        message: "",
    });
    const StatusSelectValidater = (value) => {
        if (value === "" || !value) {
            setStatusMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setStatusMessage({ type: "info", message: "" });

        return true;
    };

    const [selectUserType, setselectUserType] = useState();
    const [selectUserTypeIsTouch, setselectUserTypeIsTouch] = useState(false);

    const [selectUserTypeMessage, setselectUserTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const selectUserTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setselectUserTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setselectUserTypeMessage({ type: "info", message: "" });

        return true;
    };


    const [UsersList, setUsersList] = useState([]);
    const [UsersListIsTouch, setUsersListIsTouch] = useState(false);

    const [UsersListMessage, setUsersListMessage] = useState({
        type: "info",
        message: "",
    });
    const UsersListSelectValidater = (value) => {
        if (value === '' || !value) {
            setUsersListMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setUsersListMessage({ type: "info", message: "" });

        return true;
    };


    const [SelectCenter, setSelectCenter] = useState([]);
    const [SelectCenterIsTouch, setSelectCenterIsTouch] = useState(false);

    const [SelectCenterMessage, setSelectCenterMessage] = useState({
        type: "info",
        message: "",
    });
    const SelectCenterSelectValidater = (value) => {
        if (value === '' || !value) {
            setSelectCenterMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setSelectCenterMessage({ type: "info", message: "" });

        return true;
    };

    const [SelectTests, setSelectTests] = useState([]);
    const [SelectTestsIsTouch, setSelectTestsIsTouch] = useState(false);

    const [SelectTestsMessage, setSelectTestsMessage] = useState({
        type: "info",
        message: "",
    });
    const SelectTestsSelectValidater = (value) => {
        if (value === '' || !value) {
            setSelectTestsMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setSelectTestsMessage({ type: "info", message: "" });

        return true;
    };


    const [selectedCriteria, setselectedCriteria] = useState([]);
    const [selectedCriteriaIsTouch, setselectedCriteriaIsTouch] = useState(false);

    const [selectedCriteriaMessage, setselectedCriteriaMessage] = useState({
        type: "info",
        message: "",
    });
    const selectedCriteriaSelectValidater = (value) => {
        if (value === '' || !value) {
            setselectedCriteriaMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setselectedCriteriaMessage({ type: "info", message: "" });

        return true;
    };


    const [selectPackages, setselectPackages] = useState([]);
    const [selectPackagesIsTouch, setselectPackagesIsTouch] = useState(false);

    const [selectPackagesMessage, setselectPackagesMessage] = useState({
        type: "info",
        message: "",
    });
    const selectPackagesSelectValidater = (value) => {
        if (value === '' || !value) {
            setselectPackagesMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setselectPackagesMessage({ type: "info", message: "" });

        return true;
    };


    const [selectHealthCondition, setselectHealthCondition] = useState([]);
    const [selectHealthConditionIsTouch, setselectHealthConditionIsTouch] = useState(false);

    const [selectHealthConditionMessage, setselectHealthConditionMessage] = useState({
        type: "info",
        message: "",
    });
    const selectHealthConditionSelectValidater = (value) => {
        if (value === '' || !value) {
            setselectHealthConditionMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setselectHealthConditionMessage({ type: "info", message: "" });

        return true;
    };


    const [selectBodyParts, setselectBodyParts] = useState([]);
    const [selectBodyPartsIsTouch, setselectBodyPartsIsTouch] = useState(false);

    const [selectBodyPartsMessage, setselectBodyPartsMessage] = useState({
        type: "info",
        message: "",
    });
    const selectBodyPartsSelectValidater = (value) => {
        if (value === '' || !value) {
            setselectBodyPartsMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setselectBodyPartsMessage({ type: "info", message: "" });

        return true;
    };

    const submit = () => {



        let CouponNameValidate = CouponNameValidater(CouponName.enteredValue);
        let CouponCodeValidate = CouponCodeValidater(CouponCode.enteredValue);
        let ExpirationDateValidate = ExpirationDateValidater(ExpirationDate.enteredValue);
        let StartDateValidate = StartDateValidater(StartDate.enteredValue);
        let MaxUseValidate = MaxUseValidater(MaxUse.enteredValue);
        let DescriptionShortValidate = DescriptionShortValidater(DescriptionShort.enteredValue);
        let maxUsagePerUserValidate = maxUsagePerUserValidater(maxUsagePerUser.enteredValue);
        let DiscountValueValidate = DiscountValueValidater(DiscountValue.enteredValue);
        let StatusValidate = StatusSelectValidater(Status);
        let selectUserTypeValidate = selectUserTypeSelectValidater(selectUserType);
        let SelectCenterValidate = (SelectCenter ?? []).length > 0;
        let SelectTestsValidate = (SelectTests ?? []).length > 0;
        let DiscountTypeValidate = DiscountTypeSelectValidater(DiscountType);
        let selectedCriteriaValidate = (selectedCriteria ?? []).length > 0;
        let selectPackagesValidate = (selectPackages ?? []).length > 0;
        let selectHealthConditionValidate = (selectHealthCondition ?? []).length > 0;
        let selectBodyPartsValidate = (selectBodyParts ?? []).length > 0;
        let UsersListValidate = (UsersList ?? []).length > 0;



        if (!SelectCenterValidate) {
            setSelectCenterMessage({
                type: "error",
                message: "Field Required",
            })
        }

        if (!selectedCriteriaValidate) {
            setselectedCriteriaMessage({
                type: "error",
                message: "Field Required",
            })
        }
        if (!UsersListValidate) {
            setUsersListMessage({
                type: "error",
                message: "Field Required",
            })
        }



        let flag = false
        let data = (TermsCondition ?? []).map((item) => {
            if (item.terms === '') {
                flag = true
            }
            return item
        })

        if (!CouponNameValidate ||
            !CouponCodeValidate ||
            !ExpirationDateValidate ||
            !StartDateValidate ||
            !MaxUseValidate ||
            !DescriptionShortValidate ||
            !maxUsagePerUserValidate ||
            !DiscountValueValidate ||
            !StatusValidate ||
            !selectUserTypeValidate ||
            !SelectCenterValidate ||

            !DiscountTypeValidate ||
            !selectedCriteriaValidate ||
            ((selectUserType === 'individual') ? !UsersListValidate : false)) {
            toast.error('Fill all the fields.')
        }
        else if (flag) {
            toast.error('Fill all the fields for terms and conditions.')

        }
        else {
            DiscountCoupenHandler({
                body: {
                    couponName: CouponName?.enteredValue ?? '',
                    couponCode: CouponCode?.enteredValue ?? '',
                    expirationDate: ExpirationDate?.enteredValue ?? '',
                    startDate: StartDate?.enteredValue ?? '',
                    maxUsage: MaxUse?.enteredValue ?? '',
                    descriptionShort: DescriptionShort?.enteredValue ?? '',
                    maxUsagePerUser: maxUsagePerUser?.enteredValue ?? '',
                    discountValue: DiscountValue?.enteredValue ?? '',
                    status: Status ?? '',
                    userType: selectUserType ?? '',
                    selectedUsers: (selectUserType === 'individual') ? (UsersList ? (UsersList ?? []).map((item) => item.value) : []) : [],
                    selectedCenters: SelectCenter ? (SelectCenter ?? []).map((item) => item.value) : [],
                    discountType: DiscountType ?? '',
                    selectedCriteria: {
                        testCondition: SelectTests ?
                            ((SelectTests ?? []).find((item) => item.value === '*') ? '*' : (SelectTests ?? []).map((item) => item.value))
                            : [],

                        HealthCondition: selectHealthCondition ?
                            ((selectHealthCondition ?? []).find((item) => item.value === '*') ? '*' : (selectHealthCondition ?? []).map((item) => item.value))
                            : [],

                        BodyPart: selectBodyParts ?
                            ((selectBodyParts ?? []).find((item) => item.value === '*') ? '*' : (selectBodyParts ?? []).map((item) => item.value))
                            : [],

                        Packages: selectPackages ?
                            ((selectPackages ?? []).find((item) => item.value === '*') ? '*' : (selectPackages ?? []).map((item) => item.value))
                            : [],
                    } ?? '',

                    termsCondition: TermsCondition ? (TermsCondition ?? []).map((item) => item.terms) : [],

                }
            })
        }

    };



    useEffect(() => {

        if (selectedCriteria) {

            let all = false, bodypart = false, healthcondition = false, tests = false, packages = false;


            let data = (selectedCriteria ?? []).map((item) => {

                if (item.value === 'all') {
                    all = true
                }
                if (item.value === 'tests') {
                    tests = true
                }
                if (item.value === 'Packages') {
                    packages = true
                }
                if (item.value === 'BodyPart') {
                    bodypart = true
                }
                if (item.value === 'HealthCondition') {
                    healthcondition = true
                }
                return item
            })

            // console.log(all, tests, packages, bodypart, healthcondition);


            if (all) {
                setFieldsToDisplay({ all: true, test: false, package: false, bodypart: false, healthcondition: false })
            }
            else {

                setFieldsToDisplay((prev) => { return { ...prev, all: false } })


                if (tests) {


                    setFieldsToDisplay((prev) => { return { ...prev, test: true } })
                }
                else {
                    setFieldsToDisplay((prev) => { return { ...prev, test: false } })

                }

                if (bodypart) {
                    setFieldsToDisplay((prev) => { return { ...prev, bodypart: true } })

                }
                else {
                    setFieldsToDisplay((prev) => { return { ...prev, bodypart: false } })

                }

                if (healthcondition) {
                    setFieldsToDisplay((prev) => { return { ...prev, healthcondition: true } })

                }
                else {
                    setFieldsToDisplay((prev) => { return { ...prev, healthcondition: false } })

                }
                if (packages) {
                    setFieldsToDisplay((prev) => { return { ...prev, package: true } })

                }
                else {
                    setFieldsToDisplay((prev) => { return { ...prev, package: false } })

                }
            }
        }

    }, [selectedCriteria])






    const [getCouponResponse, getCouponHandler] = useAPI(
        {
            url: `/addCoupon/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            if ((e?.termsCondition ?? []).length) {

                let data = (e?.termsCondition ?? []).map((item) => {
                    return { terms: item, id: uuid() }
                })
                setTermsCondition(data)

            }
            CouponName.setEnteredValue(e?.couponName)
            CouponCode.setEnteredValue(e?.couponCode)
            ExpirationDate.setEnteredValue(moment(e?.expirationDate).format('YYYY-MM-DD'))
            StartDate.setEnteredValue(moment(e?.startDate).format('YYYY-MM-DD'))
            MaxUse.setEnteredValue(e?.maxUsage)
            DescriptionShort.setEnteredValue(e?.descriptionShort)
            maxUsagePerUser.setEnteredValue(e?.maxUsagePerUser)
            DiscountValue.setEnteredValue(e?.discountValue)
            setStatus(e?.status)
            setselectUserType(e?.userType)
            setDiscountType(e?.discountType)

            let array = [{ label: 'All', value: '*' }, { label: 'On Tests', value: 'tests' }, { label: 'On Packages', value: 'Packages' }, { label: 'On Health Condition', value: 'HealthCondition' }, { label: 'On Body Part', value: 'BodyPart' }]


            let data = (array ?? []).filter((item) => {



                if ((e?.criteriaFields ?? []).includes(item?.value)) {
                    return item

                }

            })

            setselectedCriteria(data)

            //  
            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting users!",
                e
            ));
            return e
        }
    );



    useEffect(() => {

        if (ListingFields && getCouponResponse?.data) {

            if (getCouponResponse?.data?.selectedCriteria?.all) {

            }
            else {
                if (getCouponResponse?.data?.selectedCriteria?.bodyPart === '*') {


                    setselectBodyParts([{ label: 'All', value: '*' }, ...ListingFields?.BodyPartListing])

                }
                else {

                    let data = (ListingFields?.BodyPartListing ?? []).filter((item) => {



                        if ((getCouponResponse?.data?.selectedCriteria?.bodyPart ?? []).includes(item?.value)) {
                            return item

                        }

                    })
                    setselectBodyParts(data)
                }

                if (getCouponResponse?.data?.selectedCriteria?.HealthCondition === '*') {


                    setselectHealthCondition([{ label: 'All', value: '*' }, ...ListingFields?.TestConditionListing])
                    // 
                }
                else {

                    let data2 = (ListingFields?.TestConditionListing ?? []).filter((item) => {



                        if ((getCouponResponse?.data?.selectedCriteria?.HealthCondition ?? []).includes(item?.value)) {
                            return item

                        }

                    })

                    setselectHealthCondition(data2)

                }


                if (getCouponResponse?.data?.selectedCriteria?.testCondition === '*') {


                    setSelectTests([{ label: 'All', value: '*' }, ...ListingFields?.TestListing])
                    // 
                }
                else {

                    let data3 = (ListingFields?.TestListing ?? []).filter((item) => {



                        if ((getCouponResponse?.data?.selectedCriteria?.testCondition ?? []).includes(item?.value)) {
                            return item

                        }

                    })

                    console.log(data3)
                    setSelectTests(data3)
                    // 
                }


                if (getCouponResponse?.data?.selectedCriteria?.Packages === '*') {


                    setselectPackages([{ label: 'All', value: '*' }, ...ListingFields?.PackagesListing])
                    // 
                }
                else {

                    let data4 = (ListingFields?.PackagesListing ?? []).filter((item) => {



                        if ((getCouponResponse?.data?.selectedCriteria?.Packages ?? []).includes(item?.value)) {
                            return item

                        }

                    })

                    setselectPackages(data4)

                }

            }

        }

    }, [ListingFields, getCouponResponse?.data])



    useEffect(() => {

        if (testResponse?.data && getCouponResponse?.data) {


            let data = (testResponse?.data?.centerListing ?? []).filter((item) => {



                if ((getCouponResponse?.data?.selectedCenters ?? []).includes(item?.value)) {
                    return item

                }

            })

            setSelectCenter(data)



        }

    }, [testResponse?.data, getCouponResponse?.data])



    useEffect(() => {


        if (userResponse?.data && getCouponResponse?.data) {


            let data = (userResponse?.data ?? []).filter((item) => {



                if ((getCouponResponse?.data?.selectedUsers ?? []).includes(item?.value)) {
                    return item

                }

            })


            setUsersList(data)



        }

    }, [userResponse?.data, getCouponResponse?.data])

    return (
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Coupon", link: "/admin/coupen" },
                    { label: "Add Coupon", link: "/admin/coupen/create", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>



                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    Update Coupon</h3>

                <div className=" my-3  py-4 px-3"  >



                    <LoaderGeneral
                        noContentMessage="records are not found"
                        state={
                            getCouponResponse?.fetching
                                ? "loading"
                                : [null, undefined].includes(getCouponResponse?.data)
                                    ? "no-content"
                                    : "none"

                        }
                    />

                    {
                        (!getCouponResponse?.fetching) &&


                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Coupon Name"
                                    className="loginInputs"

                                    setValue={CouponName.setEnteredValue}
                                    value={CouponName.enteredValue}
                                    feedbackMessage={CouponName.feedbackMessage}
                                    feedbackType={CouponName.messageType}
                                    isTouched={CouponName.isTouched}
                                    setIsTouched={CouponName.setIsTouched}

                                    validateHandler={CouponNameValidater}
                                    reset={CouponName.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>



                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Coupon Code"
                                    className="loginInputs"

                                    setValue={CouponCode.setEnteredValue}
                                    value={CouponCode.enteredValue}
                                    feedbackMessage={CouponCode.feedbackMessage}
                                    feedbackType={CouponCode.messageType}
                                    isTouched={CouponCode.isTouched}
                                    setIsTouched={CouponCode.setIsTouched}

                                    validateHandler={CouponCodeValidater}
                                    reset={CouponCode.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Start Date"
                                    className="loginInputs"
                                    rest={{ Placeholder: 'DD/MM/YYYY' }}
                                    setValue={StartDate.setEnteredValue}
                                    value={StartDate.enteredValue}
                                    feedbackMessage={StartDate.feedbackMessage}
                                    feedbackType={StartDate.messageType}
                                    isTouched={StartDate.isTouched}
                                    setIsTouched={StartDate.setIsTouched}
                                    type={'date'}
                                    validateHandler={StartDateValidater}
                                    reset={StartDate.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Expiration Date"
                                    className="loginInputs"
                                    rest={{ Placeholder: 'DD/MM/YYYY' }}
                                    setValue={ExpirationDate.setEnteredValue}
                                    value={ExpirationDate.enteredValue}
                                    feedbackMessage={ExpirationDate.feedbackMessage}
                                    feedbackType={ExpirationDate.messageType}
                                    isTouched={ExpirationDate.isTouched}
                                    setIsTouched={ExpirationDate.setIsTouched}
                                    type={'date'}
                                    validateHandler={ExpirationDateValidater}
                                    reset={ExpirationDate.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setDiscountType}
                                    value={DiscountType}
                                    options={[{ label: 'Percentage', value: 'percentage' }, { label: 'Fixed', value: 'fixed' }] ?? []}
                                    isTouched={DiscountTypeIsTouch}
                                    setIsTouched={setDiscountTypeIsTouch}
                                    className=" "
                                    label={"Discount Type"}
                                    isRequired={true}
                                    feedbackMessage={DiscountTypeMessage?.message}
                                    feedbackType={DiscountTypeMessage?.type}
                                    validateHandler={DiscountTypeSelectValidater}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Discount Value"
                                    className="loginInputs"
                                    setValue={DiscountValue.setEnteredValue}
                                    value={DiscountValue.enteredValue}
                                    feedbackMessage={DiscountValue.feedbackMessage}
                                    feedbackType={DiscountValue.messageType}
                                    isTouched={DiscountValue.isTouched}
                                    setIsTouched={DiscountValue.setIsTouched}
                                    validateHandler={DiscountValueValidater}
                                    reset={DiscountValue.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="No Of Times Used"
                                    className="loginInputs"

                                    setValue={MaxUse.setEnteredValue}
                                    value={MaxUse.enteredValue}
                                    feedbackMessage={MaxUse.feedbackMessage}
                                    feedbackType={MaxUse.messageType}
                                    isTouched={MaxUse.isTouched}
                                    setIsTouched={MaxUse.setIsTouched}

                                    validateHandler={MaxUseValidater}
                                    reset={MaxUse.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>







                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Max Usage Per User"
                                    className="loginInputs"

                                    setValue={maxUsagePerUser.setEnteredValue}
                                    value={maxUsagePerUser.enteredValue}
                                    feedbackMessage={maxUsagePerUser.feedbackMessage}
                                    feedbackType={maxUsagePerUser.messageType}
                                    isTouched={maxUsagePerUser.isTouched}
                                    setIsTouched={maxUsagePerUser.setIsTouched}

                                    validateHandler={maxUsagePerUserValidater}
                                    reset={maxUsagePerUser.reset}
                                    isRequired={true}
                                    type='number'
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>




                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setselectUserType}
                                    value={selectUserType}
                                    options={[{ label: 'All', value: 'all' }, { label: 'Individual', value: 'individual' }, { label: 'New Members', value: 'new_members' }] ?? []}
                                    isTouched={selectUserTypeIsTouch}
                                    setIsTouched={setselectUserTypeIsTouch}
                                    className=""
                                    label={"Select User Type"}
                                    isRequired={true}
                                    feedbackMessage={selectUserTypeMessage?.message}
                                    feedbackType={selectUserTypeMessage?.type}
                                    validateHandler={selectUserTypeSelectValidater}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>


                            {(selectUserType === 'individual') &&

                                <div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <InputMultipleSelect
                                        setValue={setUsersList}
                                        value={UsersList}
                                        options={userResponse?.data ?? []}
                                        isTouched={UsersListIsTouch}
                                        setIsTouched={setUsersListIsTouch}
                                        className=""
                                        label={"Select User To Include"}
                                        isRequired={true}
                                        feedbackMessage={UsersListMessage?.message}
                                        feedbackType={UsersListMessage?.type}
                                        validateHandler={UsersListSelectValidater}
                                        disabled={searchParams?.type === 'view'}
                                    />
                                </div>
                            }


                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setStatus}
                                    value={Status}
                                    options={[{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Expired', value: 'expired' }] ?? []}
                                    isTouched={StatusIsTouch}
                                    setIsTouched={setStatusIsTouch}
                                    className=""
                                    label={"Status"}
                                    isRequired={true}
                                    feedbackMessage={StatusMessage?.message}
                                    feedbackType={StatusMessage?.type}
                                    validateHandler={StatusSelectValidater}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputMultipleSelect
                                    setValue={setSelectCenter}
                                    value={SelectCenter}
                                    options={[{ label: 'All', value: '*' }, ...(testResponse?.data?.centerListing ?? [])] ?? []}
                                    isTouched={SelectCenterIsTouch}
                                    setIsTouched={setSelectCenterIsTouch}
                                    className=""
                                    label={"Select Center"}
                                    isRequired={true}
                                    feedbackMessage={SelectCenterMessage?.message}
                                    feedbackType={SelectCenterMessage?.type}
                                    validateHandler={SelectCenterSelectValidater}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputMultipleSelect
                                    setValue={setselectedCriteria}
                                    value={selectedCriteria}
                                    options={[{ label: 'All', value: '*' }, { label: 'On Tests', value: 'tests' }, { label: 'On Packages', value: 'Packages' }, { label: 'On Health Condition', value: 'HealthCondition' }, { label: 'On Body Part', value: 'BodyPart' }] ?? []}
                                    isTouched={selectedCriteriaIsTouch}
                                    setIsTouched={setselectedCriteriaIsTouch}
                                    className=""
                                    label={"Applied On"}
                                    isRequired={true}
                                    feedbackMessage={selectedCriteriaMessage?.message}
                                    feedbackType={selectedCriteriaMessage?.type}
                                    validateHandler={selectedCriteriaSelectValidater}
                                    disabled={searchParams?.type === 'view'}
                                />
                            </div>



                            {(FieldsToDisplay?.test && !FieldsToDisplay?.all) &&
                                < div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <InputMultipleSelect
                                        setValue={setSelectTests}
                                        value={SelectTests}
                                        options={[{ label: 'All', value: '*' }, ...(ListingFields?.TestListing) ?? []] ?? []}
                                        isTouched={SelectTestsIsTouch}
                                        setIsTouched={setSelectTestsIsTouch}
                                        className=""
                                        label={"Select Tests To Include"}
                                        isRequired={true}
                                        feedbackMessage={SelectTestsMessage?.message}
                                        feedbackType={SelectTestsMessage?.type}
                                        validateHandler={SelectTestsSelectValidater}
                                        disabled={searchParams?.type === 'view'}
                                    />
                                </div>}

                            {(FieldsToDisplay?.package && !FieldsToDisplay?.all) &&

                                <div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <InputMultipleSelect
                                        setValue={setselectPackages}
                                        value={selectPackages}
                                        options={[{ label: 'All', value: '*' }, ...(ListingFields?.PackagesListing) ?? []] ?? []}
                                        isTouched={selectPackagesIsTouch}
                                        setIsTouched={setselectPackagesIsTouch}
                                        className=""
                                        label={"Select Packages To Include"}
                                        isRequired={true}
                                        feedbackMessage={selectPackagesMessage?.message}
                                        feedbackType={selectPackagesMessage?.type}
                                        validateHandler={selectPackagesSelectValidater}
                                        disabled={searchParams?.type === 'view'}
                                    />
                                </div>
                            }


                            {(FieldsToDisplay?.bodypart && !FieldsToDisplay?.all) &&

                                <div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <InputMultipleSelect
                                        setValue={setselectBodyParts}
                                        value={selectBodyParts}
                                        options={[{ label: 'All', value: '*' }, ...(ListingFields?.BodyPartListing) ?? []] ?? []}
                                        isTouched={selectBodyPartsIsTouch}
                                        setIsTouched={setselectBodyPartsIsTouch}
                                        className=""
                                        label={"Select Body Parts To Include"}
                                        isRequired={true}
                                        feedbackMessage={selectBodyPartsMessage?.message}
                                        feedbackType={selectBodyPartsMessage?.type}
                                        validateHandler={selectBodyPartsSelectValidater}
                                        disabled={searchParams?.type === 'view'}
                                    />
                                </div>
                            }
                            {(FieldsToDisplay?.healthcondition && !FieldsToDisplay?.all) &&

                                <div className="col-lg-4 col-md-4 col-sm-12 ">
                                    <InputMultipleSelect
                                        setValue={setselectHealthCondition}
                                        value={selectHealthCondition}
                                        options={[{ label: 'All', value: '*' }, ...(ListingFields?.TestConditionListing) ?? []] ?? []}
                                        isTouched={selectHealthConditionIsTouch}
                                        setIsTouched={setselectHealthConditionIsTouch}
                                        className=""
                                        label={"Select Health Conditions To Include"}
                                        isRequired={true}
                                        feedbackMessage={selectHealthConditionMessage?.message}
                                        feedbackType={selectHealthConditionMessage?.type}
                                        validateHandler={selectHealthConditionSelectValidater}
                                        disabled={searchParams?.type === 'view'}
                                    />
                                </div>
                            }

                            <div className="col-12 ">

                                <InputTextArea
                                    label="Description"
                                    className="loginInputs"

                                    setValue={DescriptionShort.setEnteredValue}
                                    value={DescriptionShort.enteredValue}
                                    feedbackMessage={DescriptionShort.feedbackMessage}
                                    feedbackType={DescriptionShort.messageType}
                                    isTouched={DescriptionShort.isTouched}
                                    setIsTouched={DescriptionShort.setIsTouched}
                                    validateHandler={DescriptionShortValidater}
                                    reset={DescriptionShort.reset}
                                    isRequired={true}
                                    disabled={searchParams?.type === 'view'}
                                />


                            </div>

                            <div className="my-3">
                                <p style={{ fontSize: '17px', fontWeight: '700' }}>
                                    Add Terms & Conditions
                                </p>

                                {(TermsCondition ?? []).map((positionItem, index) => {
                                    return <ExperienceBlog positionItem={positionItem} key={index} setTermsCondition={setTermsCondition} length={(TermsCondition ?? []).length} searchParams={searchParams} />
                                })}
                                {(searchParams?.type !== 'view') &&
                                    <div className='my-1 '>
                                        <p>
                                            <span style={{ cursor: 'pointer' }} onClick={() => { setTermsCondition(prev => { return [...prev, { company_name: '', job_title: '', date_of_joining: '', location: '', id: uuid() }] }) }}>
                                                <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 4px 0px 4px' }}>+</span><span style={{ color: 'blue', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}> Add more Terms Condition for this role.</span>
                                            </span>

                                        </p>
                                    </div>}

                                <div>


                                </div>
                            </div>







                            <div className="my-3 text-end">
                                {
                                    (searchParams?.type !== 'view') &&
                                    <button onClick={() => { deleteCouponHandler({ params: searchParams?.id }) }} className="btn btn-danger px-4 mx-3">

                                        {deleteCouponResponse?.fetching ? (
                                            <Spinner size={"sm"} />
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>

                                }
                                <button
                                    className="mx-2 btn btn-outline-dark"
                                    onClick={() => {
                                        router.push("/admin/coupen");
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

                                        className="btn btn-success px-3"
                                        onClick={submit}
                                    >
                                        {DiscountCoupenResponse?.fetching ? (
                                            <Spinner size={"sm"} />
                                        ) : (
                                            "Update"
                                        )}

                                    </button>
                                }

                            </div>
                        </div>

                    }
                </div>
            </div >
        </>
    );
};

export default CoupenComponent;





const ExperienceBlog = ({ positionItem, key, setTermsCondition, length, searchParams }) => {
    const TermsConditionInput = useInputComponent('');
    const TermsConditionInputValidater = (value) => {
        if (value === "" || !value) {
            TermsConditionInput.setFeedbackMessage(
                "Field required!"
            );
            TermsConditionInput.setMessageType("error");
            return false;
        }
        TermsConditionInput.setFeedbackMessage("");
        TermsConditionInput.setMessageType("none");
        return true;
    };




    const insertposition = (value, type) => {


        setTermsCondition(prev => {

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

        setTermsCondition(prev => {



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
            TermsConditionInput.setEnteredValue(positionItem.terms ?? '')
        }
    }, [positionItem])


    return (
        <>
            <div className="col-12   py-3 my-3" key={key}>



                <div className='row'>
                    <div className='col-11'>
                        <InputWithAddOn
                            label="Terms & Condition"
                            className="loginInputs"

                            setValue={TermsConditionInput.setEnteredValue}
                            value={TermsConditionInput.enteredValue}
                            feedbackMessage={TermsConditionInput.feedbackMessage}
                            feedbackType={TermsConditionInput.messageType}
                            isTouched={TermsConditionInput.isTouched}
                            setIsTouched={TermsConditionInput.setIsTouched}
                            validateHandler={TermsConditionInputValidater}
                            reset={TermsConditionInput.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertposition(e, 'terms')
                            }}
                            disabled={searchParams?.type === 'view'}
                        />
                    </div>






                    {
                        (length > 1 && (searchParams?.type !== 'view')) &&
                        <div className='col-1 ' style={{ paddingTop: '29px', boxSizing: 'border-box' }}>
                            <button onClick={() => { deleteposition() }} className='' style={{ border: '2px solid red', borderRadius: '10px', color: 'red', fontSize: '15px', fontWeight: '500', backgroundColor: 'white', padding: '2px 10px' }}>X  </button>


                        </div>
                    }


                </div>

            </div>
        </>
    )
}