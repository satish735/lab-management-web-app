"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn"
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect"
import InputSelect from "@/components/project-main-component/input-component/InputSelect"
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea"
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";

import useInputComponent from "@/hooks/useInputComponent";
import uuid from "react-uuid";
import { Spinner } from "reactstrap";
import TestListing from "@/components/package-details/total-test-include/TestListing";
import { useRouter } from "next/navigation";
import transformErrorDefault from "@/utils/transformErrorDefault";
import toast from "react-hot-toast";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";

const ViewEdit = ({ searchParams }) => {
    const router = useRouter();

    const [isSubmit, setisSubmit] = useState(false)

    const [imageFile, setImageFile] = useState();
    const [oldImage, setoldImage] = useState();


    const [ListingFields, setListingFields] = useState();

    const [ObservationsData, setObservationsData] = useState([{ observations: '', id: uuid() }]);






    const [IsPopular, setIsPopular] = useState();
    const [IsPopularIsTouch, setIsPopularIsTouch] = useState(false);

    const [IsPopularMessage, setIsPopularMessage] = useState({
        type: "info",
        message: "",
    });
    const IsPopularSelectValidater = (value) => {
        if (value === "" || !value) {
            setIsPopularMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setIsPopularMessage({ type: "info", message: "" });

        return true;
    };


    const [TestOrPackage, setTestOrPackage] = useState();
    const [TestOrPackageIsTouch, setTestOrPackageIsTouch] = useState(false);

    const [TestOrPackageMessage, setTestOrPackageMessage] = useState({
        type: "info",
        message: "",
    });
    const TestOrPackageSelectValidater = (value) => {
        if (value === "" || !value) {
            setTestOrPackageMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setTestOrPackageMessage({ type: "info", message: "" });

        return true;
    };
    const TestOrPackageOption = [
        { label: "Select", value: "" },

        { label: "Test", value: "Test", },
        { label: "Package", value: "Package" },


    ]

    const [createTestResponse, createTestHandler] = useAPI(
        {
            url: `/test/${searchParams?.id}`,
            method: "put",

        },
        (e) => {

            router.push('/admin/tests')

            if (TestOrPackage === 'Test') {
                toast.success("Test updated successfully.");

            }
            if (TestOrPackage === 'Package') {
                toast.success("Package updated successfully.");

            }

            return e
        },
        (e) => {
            // setisSubmit(false)
            toast.error(transformErrorDefault(
                "Something went wrong while updating!",
                e
            ))
        }
    );



    const [deleteTestResponse, deleteTestHandler] = useAPI(
        {
            url: `/test/${searchParams?.id}`,
            method: "delete",

        },
        (e) => {

            router.push('/admin/tests')

            if (TestOrPackage === 'Test') {
                toast.success("Test deleted successfully.");

            }
            if (TestOrPackage === 'Package') {
                toast.success("Package deleted successfully.");

            }

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

            let total_cost = 0;
            let TestListing = (e?.PackageTestInstanceListing ?? []).map((item) => {



                total_cost += Number(item?.rate);
                return { label: item?.name, value: item?._id, price: item?.rate }
            })
            setListingFields({
                TestConditionListing: TestConditionListing, BodyPartListing: BodyPartListing, TestListing: TestListing
            })

            ActualCost.setEnteredValue(total_cost);

            // toast.success("");
            // setisSubmit(false)
        },
        (e) => {
            // setisSubmit(false)
            //  transformErrorDefault(
            //     "Something went wrong while creating Test Case!",
            //     e
            // );
        }
    );






    const [SelectCenter, setSelectCenter] = useState([]);
    const [SelectCenterIsTouch, setSelectCenterIsTouch] = useState(false);

    const [SelectCenterMessage, setSelectCenterMessage] = useState({
        type: "info",
        message: "",
    });
    const SelectCenterSelectValidater = (value) => {
        if (value === "" || !value) {
            setSelectCenterMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setSelectCenterMessage({ type: "info", message: "" });

        return true;
    };

    const TestNameInput = useInputComponent('');
    const TestNameInputValidater = (value) => {
        if (value === "" || !value) {
            TestNameInput.setFeedbackMessage(
                "Field required!"
            );
            TestNameInput.setMessageType("error");
            return false;
        }
        TestNameInput.setFeedbackMessage("");
        TestNameInput.setMessageType("none");
        return true;
    };


    const DescriptionInput = useInputComponent('');
    const DescriptionInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionInput.setFeedbackMessage(
                "Field required!"
            );
            DescriptionInput.setMessageType("error");
            return false;
        }
        DescriptionInput.setFeedbackMessage("");
        DescriptionInput.setMessageType("none");
        return true;
    };
    const [BodyPartType, setBodyPartType] = useState([]);
    const [BodyPartTypeIsTouch, setBodyPartTypeIsTouch] = useState(false);

    const [BodyPartTypeMessage, setBodyPartTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const BodyPartTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setBodyPartTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setBodyPartTypeMessage({ type: "info", message: "" });

        return true;
    };


    const [MedicalConditions, setMedicalConditions] = useState([]);
    const [MedicalConditionsIsTouch, setMedicalConditionsIsTouch] = useState(false);

    const [MedicalConditionsMessage, setMedicalConditionsMessage] = useState({
        type: "info",
        message: "",
    });
    const MedicalConditionsSelectValidater = (value) => {
        if (value === "" || !value) {
            setMedicalConditionsMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setMedicalConditionsMessage({ type: "info", message: "" });

        return true;
    };


    const Price = useInputComponent('');
    const PriceValidater = (value) => {
        if (value === "" || !value) {
            Price.setFeedbackMessage(
                "Field required!"
            );
            Price.setMessageType("error");
            return false;
        }
        Price.setFeedbackMessage("");
        Price.setMessageType("none");
        return true;
    };



    const test_type_option = [

        { label: "Test", value: "test", },
        { label: "Test Package", value: "test package" }

    ]
    const [GenderType, setGenderType] = useState();
    const [GenderTypeIsTouch, setGenderTypeIsTouch] = useState(false);

    const [GenderTypeMessage, setGenderTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const GenderTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setGenderTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setGenderTypeMessage({ type: "info", message: "" });

        return true;
    };

    const genderoption = [

        { label: "", value: "", },
        { label: "Male", value: "male", },
        { label: "Female", value: "female" },
        { label: "Male & Female", value: "both" },

    ]





    const AgeGroupTo = useInputComponent('');
    const AgeGroupToValidater = (value) => {
        if (value === "" || !value) {
            AgeGroupTo.setFeedbackMessage(
                "Field required!"
            );
            AgeGroupTo.setMessageType("error");
            return false;
        }
        AgeGroupTo.setFeedbackMessage("");
        AgeGroupTo.setMessageType("none");
        return true;
    };


    const AgeGroupFrom = useInputComponent('');
    const AgeGroupFromValidater = (value) => {
        if (value === "" || !value) {
            AgeGroupFrom.setFeedbackMessage(
                "Field required!"
            );
            AgeGroupFrom.setMessageType("error");
            return false;
        }
        AgeGroupFrom.setFeedbackMessage("");
        AgeGroupFrom.setMessageType("none");
        return true;
    };



    const ObservationsInput = useInputComponent('');
    const ObservationsInputValidater = (value) => {
        if (value === "" || !value) {
            ObservationsInput.setFeedbackMessage(
                "Field required!"
            );
            ObservationsInput.setMessageType("error");
            return false;
        }
        ObservationsInput.setFeedbackMessage("");
        ObservationsInput.setMessageType("none");
        return true;
    };



    const SampleRequired = useInputComponent('');
    const SampleRequiredValidater = (value) => {
        if (value === "" || !value) {
            SampleRequired.setFeedbackMessage(
                "Field required!"
            );
            SampleRequired.setMessageType("error");
            return false;
        }
        SampleRequired.setFeedbackMessage("");
        SampleRequired.setMessageType("none");
        return true;
    };


    const PreparationRequired = useInputComponent('');
    const PreparationRequiredValidater = (value) => {
        if (value === "" || !value) {
            PreparationRequired.setFeedbackMessage(
                "Field required!"
            );
            PreparationRequired.setMessageType("error");
            return false;
        }
        PreparationRequired.setFeedbackMessage("");
        PreparationRequired.setMessageType("none");
        return true;
    };




    const [HomeCollection, setHomeCollection] = useState();
    const [HomeCollectionIsTouch, setHomeCollectionIsTouch] = useState(false);

    const [HomeCollectionMessage, setHomeCollectionMessage] = useState({
        type: "info",
        message: "",
    });
    const HomeCollectionSelectValidater = (value) => {
        if (value === "" || !value) {
            setHomeCollectionMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setHomeCollectionMessage({ type: "info", message: "" });

        return true;
    };
    const homeCollectionOption = [

        { label: "", value: "", },
        { label: "Yes", value: 'yes', },
        { label: "No", value: "no" },


    ]




    const ResultWithinHours = useInputComponent('');
    const ResultWithinHoursValidater = (value) => {
        if (value === "" || !value) {
            ResultWithinHours.setFeedbackMessage(
                "Field required!"
            );
            ResultWithinHours.setMessageType("error");
            return false;
        }
        ResultWithinHours.setFeedbackMessage("");
        ResultWithinHours.setMessageType("none");
        return true;
    };

    const DiscountPercentage = useInputComponent('');
    const DiscountPercentageValidater = (value) => {
        if (value === "" || !value) {
            DiscountPercentage.setFeedbackMessage(
                "Field required!"
            );
            DiscountPercentage.setMessageType("error");
            return false;
        }
        DiscountPercentage.setFeedbackMessage("");
        DiscountPercentage.setMessageType("none");
        return true;
    };



    const [Testlisting, setTestlisting] = useState([]);
    const [TestlistingIsTouch, setTestlistingIsTouch] = useState(false);

    const [TestlistingMessage, setTestlistingMessage] = useState({
        type: "info",
        message: "",
    });
    const TestlistingSelectValidater = (value) => {
        if (value === "" || !value) {
            setTestlistingMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setTestlistingMessage({ type: "info", message: "" });

        return true;
    };


    const ActualCost = useInputComponent('');
    const ActualCostValidater = (value) => {

        ActualCost.setFeedbackMessage("");
        ActualCost.setMessageType("none");
        return true;
    };

    const FinalMRP = useInputComponent('');
    const FinalMRPValidater = (value) => {
        if (value === "" || !value) {
            FinalMRP.setFeedbackMessage(
                "Field required!"
            );
            FinalMRP.setMessageType("error");
            return false;
        }
        FinalMRP.setFeedbackMessage("");
        FinalMRP.setMessageType("none");
        return true;
    };



    const PackageName = useInputComponent('');
    const PackageNameValidater = (value) => {
        if (value === "" || !value) {
            PackageName.setFeedbackMessage(
                "Field required!"
            );
            PackageName.setMessageType("error");
            return false;
        }
        PackageName.setFeedbackMessage("");
        PackageName.setMessageType("none");
        return true;
    };






    const SubmitHandler = () => {


        if (TestOrPackage === 'Test') {


            let TestNameInputValidate = TestNameInputValidater(TestNameInput.enteredValue);
            let DescriptionInputValidate = DescriptionInputValidater(DescriptionInput.enteredValue);
            let BodyPartTypeSelectValidate = BodyPartTypeSelectValidater(BodyPartType);
            let MedicalConditionsSelectValidate = MedicalConditionsSelectValidater(MedicalConditions);
            let PriceValidate = PriceValidater(Price.enteredValue);

            let GenderTypeSelectValidate = GenderTypeSelectValidater(GenderType);
            let AgeGroupToValidate = AgeGroupToValidater(AgeGroupTo.enteredValue);
            let AgeGroupFromValidate = AgeGroupFromValidater(AgeGroupFrom.enteredValue);
            let SampleRequiredValidate = SampleRequiredValidater(SampleRequired.enteredValue);

            let SelectCenterValidate = SelectCenterSelectValidater(SelectCenter);
            let SelectIsPopularValidate = IsPopularSelectValidater(IsPopular);

            let ObservationsInputValidate = (ObservationsData ?? []).length > 0;
            let PreparationRequiredValidate = PreparationRequiredValidater(PreparationRequired.enteredValue);
            let DiscountPercentageValidate = DiscountPercentageValidater(DiscountPercentage.enteredValue);

            let HomeCollectionSelectValidate = HomeCollectionSelectValidater(HomeCollection);
            let ResultWithinHoursValidate = ResultWithinHoursValidater(ResultWithinHours.enteredValue);




            if (!TestNameInputValidate ||
                !DescriptionInputValidate ||
                !BodyPartTypeSelectValidate ||
                !MedicalConditionsSelectValidate ||
                !PriceValidate ||
                !GenderTypeSelectValidate ||
                !AgeGroupToValidate ||
                !SampleRequiredValidate ||
                !ObservationsInputValidate ||
                !PreparationRequiredValidate ||
                !DiscountPercentageValidate ||
                !AgeGroupFromValidate ||
                !HomeCollectionSelectValidate ||
                !SelectIsPopularValidate ||
                !ResultWithinHoursValidate ||
                !imageFile?.filePath
                || !SelectCenterValidate


            ) {


                console.log('Validation failed for one or more inputs.');
            } else {


                createTestHandler(
                    {
                        body: {
                            name: TestNameInput.enteredValue ?? null,
                            desc: DescriptionInput.enteredValue ?? null,
                            bodyParts: BodyPartType ?? null,
                            observation: ObservationsData ?? null,
                            image: imageFile?.filePath ?? null,
                            oldImage: (imageFile?.filePath === oldImage) ? null : oldImage,
                            conditions: MedicalConditions ?? null,
                            rate: Price.enteredValue ?? null,
                            gender: GenderType ?? null,
                            fromAge: AgeGroupFrom.enteredValue ?? null,
                            testType: TestOrPackage ?? null,
                            toAge: AgeGroupTo.enteredValue ?? null,
                            discountPercentage: DiscountPercentage.enteredValue,
                            is_popular: (IsPopular === 'yes' ? true : false),

                            sampleCollection: SampleRequired.enteredValue ?? null,
                            preparation: PreparationRequired.enteredValue ?? null,
                            availableInCenters: SelectCenter ?? [],
                            homeCollection: (HomeCollection === 'yes' ? true : false),
                            reportGenerationHours: ResultWithinHours.enteredValue ?? null,


                        }
                    }
                )

            }
        }
        else {
            // let FinalMRPInputValidate = FinalMRPValidater(FinalMRP.enteredValue);
            // let ActualCostInputValidate = ActualCostValidater(ActualCost.enteredValue);
            let PackageNameValidate = PackageNameValidater(PackageName.enteredValue);
            let TestlistingSelectValidate = TestlistingSelectValidater(Testlisting);
            let SelectIsPopularValidate = IsPopularSelectValidater(IsPopular);

            let DescriptionInputValidate = DescriptionInputValidater(DescriptionInput.enteredValue);
            let SelectCenterValidate = SelectCenterSelectValidater(SelectCenter);

            let GenderTypeSelectValidate = GenderTypeSelectValidater(GenderType);
            let AgeGroupToValidate = AgeGroupToValidater(AgeGroupTo.enteredValue);
            let AgeGroupFromValidate = AgeGroupFromValidater(AgeGroupFrom.enteredValue);
            let SampleRequiredValidate = SampleRequiredValidater(SampleRequired.enteredValue);

            let PreparationRequiredValidate = PreparationRequiredValidater(PreparationRequired.enteredValue);
            let DiscountPercentageValidate = DiscountPercentageValidater(DiscountPercentage.enteredValue);

            let HomeCollectionSelectValidate = HomeCollectionSelectValidater(HomeCollection);
            let ResultWithinHoursValidate = ResultWithinHoursValidater(ResultWithinHours.enteredValue);


            if (
                // !FinalMRPInputValidate ||
                // !ActualCostInputValidate ||
                !TestlistingSelectValidate ||
                !PackageNameValidate
                ||
                !DescriptionInputValidate ||
                !GenderTypeSelectValidate ||
                !AgeGroupToValidate ||
                !SampleRequiredValidate ||
                !PreparationRequiredValidate ||
                !DiscountPercentageValidate ||
                !AgeGroupFromValidate ||
                !HomeCollectionSelectValidate ||
                !SelectIsPopularValidate ||

                !ResultWithinHoursValidate ||
                !imageFile?.filePath
                || !SelectCenterValidate
            ) {
                console.log('Validation failed for one or more inputs.');

            }

            else {

                createTestHandler(
                    {
                        body: {
                            name: PackageName.enteredValue ?? null,
                            itemId: Testlisting ?? [],
                            desc: DescriptionInput.enteredValue ?? null,
                            availableInCenters: SelectCenter ?? [],

                            image: imageFile?.filePath ?? null,
                            oldImage: (imageFile?.filePath === oldImage) ? null : oldImage,

                            rate: Number(ActualCost.enteredValue) ?? null,
                            totalMrp: Number(FinalMRP.enteredValue) ?? null,
                            gender: GenderType ?? null,
                            fromAge: Number(AgeGroupFrom.enteredValue) ?? null,
                            testType: TestOrPackage ?? null,
                            toAge: Number(AgeGroupTo.enteredValue) ?? null,
                            discountPercentage: Number(DiscountPercentage.enteredValue),
                            is_popular: (IsPopular === 'yes' ? true : false),

                            sampleCollection: SampleRequired.enteredValue ?? null,
                            preparation: PreparationRequired.enteredValue ?? null,

                            homeCollection: (HomeCollection === 'yes' ? true : false),
                            reportGenerationHours: ResultWithinHours.enteredValue ?? null,


                        }
                    }
                )

            }
        }

    }


    useEffect(() => {

        if (isSubmit) {

            TestNameInputValidater(TestNameInput.enteredValue)
            DescriptionInputValidater(DescriptionInput.enteredValue)
            BodyPartTypeSelectValidater(BodyPartType)
            MedicalConditionsSelectValidater(MedicalConditions)
            PriceValidater(Price.enteredValue)

            GenderTypeSelectValidater(GenderType)
            AgeGroupToValidater(AgeGroupTo.enteredValue)
            SampleRequiredValidater(SampleRequired.enteredValue)
            ObservationsInputValidater(ObservationsInput.enteredValue)
            PreparationRequiredValidater(PreparationRequired.enteredValue)
            setTestlisting(Testlisting)
            setSelectCenter(SelectCenter)
            HomeCollectionSelectValidater(HomeCollection)
            // ObservationTitleTypeSelectValidater(ObservationTitleType)
            ResultWithinHoursValidater(ResultWithinHours.enteredValue)
        }

    }, [isSubmit])

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




    const [getTestsPackagesResponse, getTestsPackagesHandler] = useAPI(
        {
            url: `/test/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


 
            setTestOrPackage(e?.testType)


            setImageFile({ filePath: e?.image, url: process.env.NEXT_PUBLIC_BUCKET_URL + e?.image, status: searchParams?.type === 'edit' ? 'original' : 'Original' })

            setoldImage(e?.image)
            TestNameInput.setEnteredValue(e?.name)
            PackageName.setEnteredValue(e?.name)

            DescriptionInput.setEnteredValue(e?.desc)
            AgeGroupFrom.setEnteredValue(e?.fromAge)
            DiscountPercentage.setEnteredValue(e?.discountPercentage)
            ResultWithinHours.setEnteredValue(e?.reportGenerationHours)
            setGenderType(e?.gender)
            AgeGroupTo.setEnteredValue(e?.toAge)
            SampleRequired.setEnteredValue(e?.sampleCollection)
            PreparationRequired.setEnteredValue(e?.preparation)
            setHomeCollection(e?.homeCollection ? 'yes' : 'no')
            setIsPopular(e?.is_popular ? 'yes' : 'no')


            if (e?.testType === 'Test') {
                if ((e?.observation ?? []).length) {

                    let data = (e?.observation ?? []).map((item) => {
                        return { observations: item, id: uuid() }
                    })
                    setObservationsData(data)

                }
                Price.setEnteredValue(e?.rate)

            }

            if (e?.testType === 'Package') {
                // ActualCost.setEnteredValue()
                FinalMRP.setEnteredValue(e?.totalMrp)

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


    useEffect(() => {

        if (ListingFields && getTestsPackagesResponse?.data) {


            let data = (ListingFields?.BodyPartListing ?? []).filter((item) => {



                if ((getTestsPackagesResponse?.data?.bodyParts ?? []).includes(item?.value)) {
                    return item

                }

            })

            setBodyPartType(data)



            let data2 = (ListingFields?.TestConditionListing ?? []).filter((item) => {



                if ((getTestsPackagesResponse?.data?.conditions ?? []).includes(item?.value)) {
                    return item

                }

            })

            setMedicalConditions(data2)




            let data3 = (ListingFields?.TestListing ?? []).filter((item) => {



                if ((getTestsPackagesResponse?.data?.itemId ?? []).includes(item?.value)) {
                    return item

                }

            })

            setTestlisting(data3)
            // 

        }

    }, [ListingFields, getTestsPackagesResponse?.data])

    useEffect(() => {

        if (testResponse?.data && getTestsPackagesResponse?.data) {


            let data = (testResponse?.data?.centerListing ?? []).filter((item) => {



                if ((getTestsPackagesResponse?.data?.availableInCenters ?? []).includes(item?.value)) {
                    return item

                }

            })

            setSelectCenter(data)


        }

    }, [testResponse?.data, getTestsPackagesResponse?.data])


    useEffect(() => {

        if (testResponse?.data && getTestsPackagesResponse?.data) {


            let data = (testResponse?.data?.centerListing ?? []).filter((item) => {



                if ((getTestsPackagesResponse?.data?.availableInCenters ?? []).includes(item?.value)) {
                    return item

                }

            })

            setSelectCenter(data)


        }

    }, [testResponse?.data, getTestsPackagesResponse?.data])









    function calculateFinalPrice(originalPrice, discountPercentage) {
        // Calculate the discount amount
        const discountAmount = (discountPercentage / 100) * originalPrice;

        // Calculate the final price
        const finalPrice = originalPrice - discountAmount;

        return finalPrice;
    }



    useEffect(() => {

        if (Testlisting) {

            let total_cost = 0;
            let TestListing = (Testlisting ?? []).map((item) => {


                total_cost += Number(item?.price);
                return item
            })
            ActualCost.setEnteredValue(total_cost);

            if (DiscountPercentage?.enteredValue) {
                let final_cost = calculateFinalPrice(total_cost, DiscountPercentage?.enteredValue);
                FinalMRP.setEnteredValue(final_cost?.toFixed(2));
            }
        }

    }, [Testlisting])



    useEffect(() => {

        if (DiscountPercentage?.enteredValue) {

            let final_cost = calculateFinalPrice(ActualCost?.enteredValue, DiscountPercentage?.enteredValue);
            FinalMRP.setEnteredValue(final_cost?.toFixed(2));
        }

    }, [DiscountPercentage?.enteredValue])


    return (<>

<BreadcrumbDiv
            options={[
                { label: "Home", link: "/admin" },
                { label: "Tests & Packages", link: "/admin/tests" },
                { label: "Edit Tests & Packages", link: "/admin/tests/view", active: true },
            ]}
        />
        <div className='bg-white pt-2 pb-3 mt-2' style={{ borderRadius: '5px' }}>

            <h3 className="mb-3 px-3 py-2 mt-2  " >

            {searchParams?.type === 'view' ? 'Test Details' : 'Update Details'}
                
            </h3>



            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    getTestsPackagesResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getTestsPackagesResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />

            {
                (!getTestsPackagesResponse?.fetching) &&


                <>
                    <div className=" mt-3  py-0 px-3"  >


                        <div>
                            <InputSelect
                                setValue={setTestOrPackage}
                                value={TestOrPackage}
                                options={TestOrPackageOption ?? []}
                                isTouched={TestOrPackageIsTouch}
                                setIsTouched={setTestOrPackageIsTouch}
                                className="py-1"
                                label={"Select Test Or Package"}
                                isRequired={true}
                                feedbackMessage={TestOrPackageMessage?.message}
                                feedbackType={TestOrPackageMessage?.type}
                                validateHandler={TestOrPackageSelectValidater}
                                disabled={true}

                            />
                        </div>
                    </div>

                    {
                        TestOrPackage === 'Package' &&

                        <>
                            <h5 className="mb-3 px-3 py-2 mt-2  " >

                                Add Package Details
                            </h5>
                            <div className=" mb-3  py-0 px-3"  >
                                <div className="row my-3">
                                    <div className="col-lg-3 col-md-4 col-sm-12">
                                        <p style={{ marginBottom: '7px', fontSize: '12px', color: '#0F0F0F', fontWeight: '500' }}>Upload Image  <span style={{ color: 'rgb(220 53 69)' }}>*</span></p>
                                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />
                                    </div>

                                    <div className="col-lg-9 col-md-8 col-sm-12">

                                        <div className="row">


                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Package Name"
                                                    className="loginInputs"
                                                    setValue={PackageName.setEnteredValue}
                                                    value={PackageName.enteredValue}
                                                    feedbackMessage={PackageName.feedbackMessage}
                                                    feedbackType={PackageName.messageType}
                                                    isTouched={PackageName.isTouched}
                                                    setIsTouched={PackageName.setIsTouched}
                                                    validateHandler={PackageNameValidater}
                                                    reset={PackageName.reset}
                                                    isRequired={true}
                                                    disabled={searchParams?.type === 'view'}

                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputMultipleSelect
                                                    setValue={setSelectCenter}
                                                    value={SelectCenter}
                                                    options={testResponse?.data?.centerListing ?? []}
                                                    isTouched={SelectCenterIsTouch}
                                                    setIsTouched={setSelectCenterIsTouch}
                                                    className="py-1"
                                                    label={"Select Center To Include"}
                                                    isRequired={true}
                                                    feedbackMessage={SelectCenterMessage?.message}
                                                    feedbackType={SelectCenterMessage?.type}
                                                    validateHandler={SelectCenterSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputMultipleSelect
                                                    setValue={setTestlisting}
                                                    value={Testlisting}
                                                    options={ListingFields?.TestListing ?? []}
                                                    isTouched={TestlistingIsTouch}
                                                    setIsTouched={setTestlistingIsTouch}
                                                    className="py-1"
                                                    label={"Select Tests To Include"}
                                                    isRequired={true}
                                                    feedbackMessage={TestlistingMessage?.message}
                                                    feedbackType={TestlistingMessage?.type}
                                                    validateHandler={TestlistingSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Actual Price"
                                                    className="loginInputs"
                                                    setValue={ActualCost.setEnteredValue}
                                                    value={ActualCost.enteredValue}
                                                    feedbackMessage={ActualCost.feedbackMessage}
                                                    feedbackType={ActualCost.messageType}
                                                    isTouched={ActualCost.isTouched}
                                                    setIsTouched={ActualCost.setIsTouched}
                                                    validateHandler={ActualCostValidater}
                                                    reset={ActualCost.reset}
                                                    isRequired={true}

                                                    type="number"
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Discount Percentage"
                                                    className="loginInputs"
                                                    setValue={DiscountPercentage.setEnteredValue}
                                                    value={DiscountPercentage.enteredValue}
                                                    feedbackMessage={DiscountPercentage.feedbackMessage}
                                                    feedbackType={DiscountPercentage.messageType}
                                                    isTouched={DiscountPercentage.isTouched}
                                                    setIsTouched={DiscountPercentage.setIsTouched}
                                                    validateHandler={DiscountPercentageValidater}
                                                    reset={DiscountPercentage.reset}
                                                    isRequired={true}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Final Price"
                                                    className="loginInputs"
                                                    setValue={FinalMRP.setEnteredValue}
                                                    value={FinalMRP.enteredValue}
                                                    feedbackMessage={FinalMRP.feedbackMessage}
                                                    feedbackType={FinalMRP.messageType}
                                                    isTouched={FinalMRP.isTouched}
                                                    setIsTouched={FinalMRP.setIsTouched}
                                                    validateHandler={FinalMRPValidater}
                                                    reset={FinalMRP.reset}
                                                    isRequired={true}
                                                    type="number"
                                                    disabled={true}
                                                />
                                            </div>




                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setGenderType}
                                                    value={GenderType}
                                                    options={genderoption ?? []}
                                                    isTouched={GenderTypeIsTouch}
                                                    setIsTouched={setGenderTypeIsTouch}
                                                    className="py-1"
                                                    label={"Gender"}
                                                    isRequired={true}
                                                    feedbackMessage={GenderTypeMessage?.message}
                                                    feedbackType={GenderTypeMessage?.type}
                                                    validateHandler={GenderTypeSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>



                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputWithAddOn
                                                    label="Age Group From"
                                                    className="loginInputs"

                                                    setValue={AgeGroupFrom.setEnteredValue}
                                                    value={AgeGroupFrom.enteredValue}
                                                    feedbackMessage={AgeGroupFrom.feedbackMessage}
                                                    feedbackType={AgeGroupFrom.messageType}
                                                    isTouched={AgeGroupFrom.isTouched}
                                                    setIsTouched={AgeGroupFrom.setIsTouched}

                                                    validateHandler={AgeGroupFromValidater}
                                                    reset={AgeGroupFrom.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />

                                            </div>


                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputWithAddOn
                                                    label="Age Group To"
                                                    className="loginInputs"

                                                    setValue={AgeGroupTo.setEnteredValue}
                                                    value={AgeGroupTo.enteredValue}
                                                    feedbackMessage={AgeGroupTo.feedbackMessage}
                                                    feedbackType={AgeGroupTo.messageType}
                                                    isTouched={AgeGroupTo.isTouched}
                                                    setIsTouched={AgeGroupTo.setIsTouched}

                                                    validateHandler={AgeGroupToValidater}
                                                    reset={AgeGroupTo.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />

                                            </div>






                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setHomeCollection}
                                                    value={HomeCollection}
                                                    options={homeCollectionOption ?? []}
                                                    isTouched={HomeCollectionIsTouch}
                                                    setIsTouched={setHomeCollectionIsTouch}
                                                    className="py-1"
                                                    label={"Home Collection"}
                                                    isRequired={true}
                                                    feedbackMessage={HomeCollectionMessage?.message}
                                                    feedbackType={HomeCollectionMessage?.type}
                                                    validateHandler={HomeCollectionSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>



                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Result Within Hours"
                                                    className="loginInputs"

                                                    setValue={ResultWithinHours.setEnteredValue}
                                                    value={ResultWithinHours.enteredValue}
                                                    feedbackMessage={ResultWithinHours.feedbackMessage}
                                                    feedbackType={ResultWithinHours.messageType}
                                                    isTouched={ResultWithinHours.isTouched}
                                                    setIsTouched={ResultWithinHours.setIsTouched}

                                                    validateHandler={ResultWithinHoursValidater}
                                                    reset={ResultWithinHours.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />


                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setIsPopular}
                                                    value={IsPopular}
                                                    options={homeCollectionOption ?? []}
                                                    isTouched={IsPopularIsTouch}
                                                    setIsTouched={setIsPopularIsTouch}
                                                    className=""
                                                    label={"Is Popular"}
                                                    isRequired={true}
                                                    feedbackMessage={IsPopularMessage?.message}
                                                    feedbackType={IsPopularMessage?.type}
                                                    validateHandler={IsPopularSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>



                                        </div>



                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 ">

                                        <InputTextArea
                                            label="Sample Required"
                                            className="loginInputs"

                                            setValue={SampleRequired.setEnteredValue}
                                            value={SampleRequired.enteredValue}
                                            feedbackMessage={SampleRequired.feedbackMessage}
                                            feedbackType={SampleRequired.messageType}
                                            isTouched={SampleRequired.isTouched}
                                            setIsTouched={SampleRequired.setIsTouched}

                                            validateHandler={SampleRequiredValidater}
                                            reset={SampleRequired.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />
                                    </div>



                                    <div className="col-lg-6 col-md-6 col-sm-12 ">

                                        <InputTextArea
                                            label="Preparation Required"
                                            className="loginInputs"

                                            setValue={PreparationRequired.setEnteredValue}
                                            value={PreparationRequired.enteredValue}
                                            feedbackMessage={PreparationRequired.feedbackMessage}
                                            feedbackType={PreparationRequired.messageType}
                                            isTouched={PreparationRequired.isTouched}
                                            setIsTouched={PreparationRequired.setIsTouched}

                                            validateHandler={PreparationRequiredValidater}
                                            reset={PreparationRequired.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <InputTextArea
                                            label="Description"
                                            className="loginInputs"

                                            setValue={DescriptionInput.setEnteredValue}
                                            value={DescriptionInput.enteredValue}
                                            feedbackMessage={DescriptionInput.feedbackMessage}
                                            feedbackType={DescriptionInput.messageType}
                                            isTouched={DescriptionInput.isTouched}
                                            setIsTouched={DescriptionInput.setIsTouched}

                                            validateHandler={DescriptionInputValidater}
                                            reset={DescriptionInput.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />

                                    </div>



                                </div>

                            </div>
                        </>

                    }


                    {
                        TestOrPackage === 'Test' &&
                        <>
                            <h5 className="mb-3 px-3 py-2 mt-2  " >

                                Add Test Details
                            </h5>
                            <div className=" mb-3   py-0 px-3"  >

                                <div className="row my-3">

                                    <div className="col-lg-3 col-md-4 col-sm-12">
                                        <p style={{ marginBottom: '7px', fontSize: '12px', color: '#0F0F0F', fontWeight: '500' }}>Upload Image  <span style={{ color: 'rgb(220 53 69)' }}>*</span></p>
                                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />
                                    </div>

                                    <div className="col-lg-9 col-md-8 col-sm-12">
                                        <div className="row">

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Test Name"
                                                    className="loginInputs"

                                                    setValue={TestNameInput.setEnteredValue}
                                                    value={TestNameInput.enteredValue}
                                                    feedbackMessage={TestNameInput.feedbackMessage}
                                                    feedbackType={TestNameInput.messageType}
                                                    isTouched={TestNameInput.isTouched}
                                                    setIsTouched={TestNameInput.setIsTouched}

                                                    validateHandler={TestNameInputValidater}
                                                    reset={TestNameInput.reset}
                                                    isRequired={true}
                                                    disabled={searchParams?.type === 'view'}
                                                />


                                            </div>



                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputMultipleSelect
                                                    setValue={setMedicalConditions}
                                                    value={MedicalConditions}
                                                    options={ListingFields?.TestConditionListing ?? []}
                                                    isTouched={MedicalConditionsIsTouch}
                                                    setIsTouched={setMedicalConditionsIsTouch}
                                                    className="py-1"
                                                    label={"Health Condition"}
                                                    isRequired={true}
                                                    feedbackMessage={MedicalConditionsMessage?.message}
                                                    feedbackType={MedicalConditionsMessage?.type}
                                                    validateHandler={MedicalConditionsSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>


                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputMultipleSelect
                                                    setValue={setBodyPartType}
                                                    value={BodyPartType}
                                                    options={ListingFields?.BodyPartListing ?? []}
                                                    isTouched={BodyPartTypeIsTouch}
                                                    setIsTouched={setBodyPartTypeIsTouch}
                                                    className="py-1"
                                                    label={"Body Part"}
                                                    isRequired={true}
                                                    feedbackMessage={BodyPartTypeMessage?.message}
                                                    feedbackType={BodyPartTypeMessage?.type}
                                                    validateHandler={BodyPartTypeSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputMultipleSelect
                                                    setValue={setSelectCenter}
                                                    value={SelectCenter}
                                                    options={testResponse?.data?.centerListing ?? []}
                                                    isTouched={SelectCenterIsTouch}
                                                    setIsTouched={setSelectCenterIsTouch}
                                                    className="py-1"
                                                    label={"Select Center To Include"}
                                                    isRequired={true}
                                                    feedbackMessage={SelectCenterMessage?.message}
                                                    feedbackType={SelectCenterMessage?.type}
                                                    validateHandler={SelectCenterSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Price"
                                                    className="loginInputs"

                                                    setValue={Price.setEnteredValue}
                                                    value={Price.enteredValue}
                                                    feedbackMessage={Price.feedbackMessage}
                                                    feedbackType={Price.messageType}
                                                    isTouched={Price.isTouched}
                                                    setIsTouched={Price.setIsTouched}

                                                    validateHandler={PriceValidater}
                                                    reset={Price.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />


                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Discount Percentage"
                                                    className="loginInputs"
                                                    setValue={DiscountPercentage.setEnteredValue}
                                                    value={DiscountPercentage.enteredValue}
                                                    feedbackMessage={DiscountPercentage.feedbackMessage}
                                                    feedbackType={DiscountPercentage.messageType}
                                                    isTouched={DiscountPercentage.isTouched}
                                                    setIsTouched={DiscountPercentage.setIsTouched}
                                                    validateHandler={DiscountPercentageValidater}
                                                    reset={DiscountPercentage.reset}
                                                    isRequired={true}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>


                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setGenderType}
                                                    value={GenderType}
                                                    options={genderoption ?? []}
                                                    isTouched={GenderTypeIsTouch}
                                                    setIsTouched={setGenderTypeIsTouch}
                                                    className="py-1"
                                                    label={"Gender"}
                                                    isRequired={true}
                                                    feedbackMessage={GenderTypeMessage?.message}
                                                    feedbackType={GenderTypeMessage?.type}
                                                    validateHandler={GenderTypeSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>



                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputWithAddOn
                                                    label="Age Group From"
                                                    className="loginInputs"

                                                    setValue={AgeGroupFrom.setEnteredValue}
                                                    value={AgeGroupFrom.enteredValue}
                                                    feedbackMessage={AgeGroupFrom.feedbackMessage}
                                                    feedbackType={AgeGroupFrom.messageType}
                                                    isTouched={AgeGroupFrom.isTouched}
                                                    setIsTouched={AgeGroupFrom.setIsTouched}

                                                    validateHandler={AgeGroupFromValidater}
                                                    reset={AgeGroupFrom.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />

                                            </div>


                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputWithAddOn
                                                    label="Age Group To"
                                                    className="loginInputs"

                                                    setValue={AgeGroupTo.setEnteredValue}
                                                    value={AgeGroupTo.enteredValue}
                                                    feedbackMessage={AgeGroupTo.feedbackMessage}
                                                    feedbackType={AgeGroupTo.messageType}
                                                    isTouched={AgeGroupTo.isTouched}
                                                    setIsTouched={AgeGroupTo.setIsTouched}

                                                    validateHandler={AgeGroupToValidater}
                                                    reset={AgeGroupTo.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />

                                            </div>






                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setHomeCollection}
                                                    value={HomeCollection}
                                                    options={homeCollectionOption ?? []}
                                                    isTouched={HomeCollectionIsTouch}
                                                    setIsTouched={setHomeCollectionIsTouch}
                                                    className="py-1"
                                                    label={"Home Collection"}
                                                    isRequired={true}
                                                    feedbackMessage={HomeCollectionMessage?.message}
                                                    feedbackType={HomeCollectionMessage?.type}
                                                    validateHandler={HomeCollectionSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>



                                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                                <InputWithAddOn
                                                    label="Result Within Hours"
                                                    className="loginInputs"

                                                    setValue={ResultWithinHours.setEnteredValue}
                                                    value={ResultWithinHours.enteredValue}
                                                    feedbackMessage={ResultWithinHours.feedbackMessage}
                                                    feedbackType={ResultWithinHours.messageType}
                                                    isTouched={ResultWithinHours.isTouched}
                                                    setIsTouched={ResultWithinHours.setIsTouched}

                                                    validateHandler={ResultWithinHoursValidater}
                                                    reset={ResultWithinHours.reset}
                                                    isRequired={true}
                                                    type='number'
                                                    disabled={searchParams?.type === 'view'}
                                                />


                                            </div>

                                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                                <InputSelect
                                                    setValue={setIsPopular}
                                                    value={IsPopular}
                                                    options={homeCollectionOption ?? []}
                                                    isTouched={IsPopularIsTouch}
                                                    setIsTouched={setIsPopularIsTouch}
                                                    className=""
                                                    label={"Is Popular"}
                                                    isRequired={true}
                                                    feedbackMessage={IsPopularMessage?.message}
                                                    feedbackType={IsPopularMessage?.type}
                                                    validateHandler={IsPopularSelectValidater}
                                                    disabled={searchParams?.type === 'view'}
                                                />
                                            </div>




                                        </div>
                                    </div>





                                    <div className="col-lg-6 col-md-6  col-sm-12 ">

                                        <InputTextArea
                                            label="Sample Required"
                                            className="loginInputs"

                                            setValue={SampleRequired.setEnteredValue}
                                            value={SampleRequired.enteredValue}
                                            feedbackMessage={SampleRequired.feedbackMessage}
                                            feedbackType={SampleRequired.messageType}
                                            isTouched={SampleRequired.isTouched}
                                            setIsTouched={SampleRequired.setIsTouched}

                                            validateHandler={SampleRequiredValidater}
                                            reset={SampleRequired.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />
                                    </div>








                                    <div className="col-lg-6 col-md-6 col-sm-12 ">

                                        <InputTextArea
                                            label="Preparation Required"
                                            className="loginInputs"

                                            setValue={PreparationRequired.setEnteredValue}
                                            value={PreparationRequired.enteredValue}
                                            feedbackMessage={PreparationRequired.feedbackMessage}
                                            feedbackType={PreparationRequired.messageType}
                                            isTouched={PreparationRequired.isTouched}
                                            setIsTouched={PreparationRequired.setIsTouched}

                                            validateHandler={PreparationRequiredValidater}
                                            reset={PreparationRequired.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <InputTextArea
                                            label="Description"
                                            className="loginInputs"

                                            setValue={DescriptionInput.setEnteredValue}
                                            value={DescriptionInput.enteredValue}
                                            feedbackMessage={DescriptionInput.feedbackMessage}
                                            feedbackType={DescriptionInput.messageType}
                                            isTouched={DescriptionInput.isTouched}
                                            setIsTouched={DescriptionInput.setIsTouched}

                                            validateHandler={DescriptionInputValidater}
                                            reset={DescriptionInput.reset}
                                            isRequired={true}
                                            disabled={searchParams?.type === 'view'}
                                        />

                                    </div>



                                </div>

                                <hr />
                                <h5 className="mb-4 mt-2">
                                    Add Observations
                                </h5>


                                {(ObservationsData ?? []).map((observationsItem, index) => {
                                    return <ObservationsSection searchParams={searchParams} observationsItem={observationsItem} key={index} setObservationsData={setObservationsData} length={(ObservationsData ?? []).length} />
                                })}

                                {
                                    searchParams?.type !== 'view' &&
                                    <div className='my-2 '>
                                        <p>
                                            <span style={{ cursor: 'pointer' }} onClick={() => {

                                                setObservationsData(prev => { return [...prev, { observations: '', id: uuid() }] })
                                            }}>
                                                <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 5px 1px 6px' }}>+</span> <span style={{ color: 'blue', fontSize: '18px', fontWeight: '500' }}>Add more observations</span>
                                            </span>

                                        </p>
                                    </div>
                                }

                            </div>
                        </>


                    }
                    <div className=" my-3  text-end  ">

                        <button onClick={() => { deleteTestHandler({ params: searchParams?.id }) }} className="btn btn-danger px-4 mx-3">

                            {deleteTestResponse?.fetching ? (
                                <Spinner size={"sm"} />
                            ) : (
                                "Delete"
                            )}
                        </button>


                        <button onClick={() => { router.push("/admin/tests") }} className="btn btn-dark px-4 mx-3 ">

                            Cancel 
                        </button>
                        <button onClick={() => { SubmitHandler(); setisSubmit(true) }} className="btn btn-success px-4 mx-3">

                            {createTestResponse?.fetching ? (
                                <Spinner size={"sm"} />
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </>
            }
        </div>

    </>
    )


}

export default ViewEdit;

export const commonValidate = (value) => {
    if (value === "" || !value) {
        return {
            message: "Field is required!",
            type: "error",
            valid: false,
        };
    }
    return { message: "", type: "none", valid: true };
}




const ObservationsSection = ({ observationsItem, key, setObservationsData, length, searchParams }) => {
    const Observations = useInputComponent('');
    const ObservationsValidater = (value) => {
        if (value === "" || !value) {
            Observations.setFeedbackMessage(
                "Field required!"
            );
            Observations.setMessageType("error");
            return false;
        }
        Observations.setFeedbackMessage("");
        Observations.setMessageType("none");
        return true;
    };

    const insertobservations = (value) => {


        setObservationsData(prev => {

            let observationsListing = (prev ?? []).map((observationsObject) => {
                if (observationsObject?.id == observationsItem?.id) {
                    return { ...observationsObject, ['observations']: value }
                }
                else {
                    return { ...observationsObject }

                }
            })
            return observationsListing

        })
    }


    const deleteobservations = () => {

        setObservationsData(prev => {



            let observationsListing = (prev ?? []).filter((observationsObject) => {


                if (observationsObject?.id === observationsItem?.id) {

                }
                else {
                    return observationsObject
                }
            })
            return observationsListing


        })
    }

    useEffect(() => {
        if (observationsItem) {
            Observations.setEnteredValue(observationsItem.observations ?? '')
        }
    }, [observationsItem])

    return (
        <>
            <div className="col-lg-8 col-md-8 col-sm-12 " key={key}>
                <div className='row'>
                    <div className='col-9'>
                        <InputWithAddOn
                            label="Observations"
                            className="loginInputs"

                            setValue={Observations.setEnteredValue}
                            value={Observations.enteredValue}
                            feedbackMessage={Observations.feedbackMessage}
                            feedbackType={Observations.messageType}
                            isTouched={Observations.isTouched}
                            setIsTouched={Observations.setIsTouched}

                            validateHandler={ObservationsValidater}
                            reset={Observations.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertobservations(e)
                            }}
                            disabled={searchParams?.type === 'view'}
                        />
                    </div>

                    {
                        (length > 1 && searchParams?.type !== 'view') &&
                        <div className='col-3 ' style={{ paddingTop: '29px', boxSizing: 'border-box' }}>
                            <button onClick={() => { deleteobservations() }} className='' style={{ border: '2px solid red', borderRadius: '10px', color: 'red', fontSize: '15px', fontWeight: '500', backgroundColor: 'white', padding: '2px 10px' }}>X <span>Remove</span></button>


                        </div>
                    }

                </div>

            </div>
        </>
    )
}