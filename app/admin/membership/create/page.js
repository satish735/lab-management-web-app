"use client";

import { useState, useEffect } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
import InputTextArea from "@/components/formInput/InputTextArea";
import InputSelect from "@/components/project-main-component/input-component/InputSelect";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import uuid from "react-uuid";
export default function Home() {
  const router = useRouter();


  const [MemberShipResponse, MemberShipHandler] = useAPI(
    {
      url: "/membership/create",
      method: "post",
    },
    (e) => {
      toast.success(
        `Membership added successfully`
      );
      router.push("/admin/membership");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while adding membership!", e)
      );
      return e;
    }
  );

  const [imageFile, setImageFile] = useState({
    url: "",
    status: "",
  });

  const [ObservationsData, setObservationsData] = useState([{ observations: '', id: uuid() }]);

  const [TermsCondition, setTermsCondition] = useState([{ terms: '', id: uuid() }]);




  const nameInput = useInputComponent();
  const nameInputValidater = (value) => {
    if (!value || value == "") {
      nameInput.setFeedbackMessage("Required Field!");
      nameInput.setMessageType("error");
      return false;
    }
    nameInput.setFeedbackMessage(null);
    nameInput.setMessageType("none");
    return true;
  };

  const validity = useInputComponent('');
  const validityValidater = (value) => {
    if (value === "" || !value) {
      validity.setFeedbackMessage(
        "Field required!"
      );
      validity.setMessageType("error");
      return false;
    }
    validity.setFeedbackMessage("");
    validity.setMessageType("none");
    return true;
  };


  const price = useInputComponent('');
  const priceValidater = (value) => {
    if (value === "" || !value) {
      price.setFeedbackMessage(
        "Field required!"
      );
      price.setMessageType("error");
      return false;
    }
    price.setFeedbackMessage("");
    price.setMessageType("none");
    return true;
  };

  const discount = useInputComponent('');
  const discountValidater = (value) => {
    if (value === "" || !value) {
      discount.setFeedbackMessage(
        "Field required!"
      );
      discount.setMessageType("error");
      return false;
    }
    discount.setFeedbackMessage("");
    discount.setMessageType("none");
    return true;
  };

  const discountOnPackagePercentage = useInputComponent('');
  const discountOnPackagePercentageValidater = (value) => {
    if (value === "" || !value) {
      discountOnPackagePercentage.setFeedbackMessage(
        "Field required!"
      );
      discountOnPackagePercentage.setMessageType("error");
      return false;
    }
    discountOnPackagePercentage.setFeedbackMessage("");
    discountOnPackagePercentage.setMessageType("none");
    return true;
  };

  const [type, settype] = useState();
  const [typeIsTouch, settypeIsTouch] = useState(false);

  const [typeMessage, settypeMessage] = useState({
    type: "info",
    message: "",
  });
  const typeSelectValidater = (value) => {
    if (value === "" || !value) {
      settypeMessage({ type: "error", message: "Field Required!" });
      return false;
    }
    settypeMessage({ type: "info", message: "" });

    return true;
  };

  const description = useInputComponent('');
  const descriptionValidater = (value) => {
    if (value === "" || !value) {
      description.setFeedbackMessage(
        "Field required!"
      );
      description.setMessageType("error");
      return false;
    }
    description.setFeedbackMessage("");
    description.setMessageType("none");
    return true;
  };

  const submitHandler = () => {
    var nameIsValid = nameInputValidater(nameInput?.enteredValue);
    var validityIsValid = validityValidater(validity?.enteredValue);
    var priceIsValid = priceValidater(price?.enteredValue);
    var discountOnPackagePercentageIsValid = discountOnPackagePercentageValidater(discountOnPackagePercentage?.enteredValue);
    var typeIsValid = typeSelectValidater(type);
    var descriptionIsValid = descriptionValidater(description.enteredValue);
    var image = imageFile?.filePath;
    let BenifitsInputValidate = (ObservationsData ?? []).length > 0;
    let TermsInputValidate = (TermsCondition ?? []).length > 0;

    if (!nameIsValid || !validityIsValid || !priceIsValid || !discountOnPackagePercentageIsValid || !typeIsValid || !descriptionIsValid || !image || !BenifitsInputValidate || !TermsInputValidate) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    else {
      MemberShipHandler({
        body: {
          name: nameInput.enteredValue ?? '',

          banner: imageFile?.filePath ?? '',
          validity: Number(validity.enteredValue) ?? null,
          price: Number(price?.enteredValue) ?? null,
          discountOnPackagePercentage: Number(discountOnPackagePercentage?.enteredValue) ?? null,
          termsAndConditions: TermsCondition ?? [] ,
          description: description.enteredValue ?? "",
          benefits: ObservationsData ?? [],
          type: type ?? "",
          // conditions: requestBody?.conditions || "",
          // is_delete: requestBody?.is_delete || "",
        }
      });

    }
  }
  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "MemberShip", link: "/admin/membership" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box" style={{ minHeight: '100%' }}>
        <h1 className="main-heading mb-5">Add Member Ship </h1>

        <form>
          <div className="row mt-2">

            <div className="col-lg-9  col-md-8 col-sm-12">

              <div className="row">

                <div className="col-lg-6 col-md-6 col-sm-12 ">

                  <InputWithAddOn
                    label="Name"
                    className="loginInputs"

                    setValue={nameInput.setEnteredValue}
                    value={nameInput.enteredValue}
                    feedbackMessage={nameInput.feedbackMessage}
                    feedbackType={nameInput.messageType}
                    isTouched={nameInput.isTouched}
                    setIsTouched={nameInput.setIsTouched}

                    validateHandler={nameInputValidater}
                    reset={nameInput.reset}
                    isRequired={true}
                  />


                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 ">

                  <InputWithAddOn
                    label="validity"
                    className="loginInputs"

                    setValue={validity.setEnteredValue}
                    value={validity.enteredValue}
                    feedbackMessage={validity.feedbackMessage}
                    feedbackType={validity.messageType}
                    isTouched={validity.isTouched}
                    setIsTouched={validity.setIsTouched}

                    validateHandler={validityValidater}
                    reset={validity.reset}
                    isRequired={true}
                    type={'number'}
                  />


                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 ">

                  <InputWithAddOn
                    label="price"
                    className="loginInputs"

                    setValue={price.setEnteredValue}
                    value={price.enteredValue}
                    feedbackMessage={price.feedbackMessage}
                    feedbackType={price.messageType}
                    isTouched={price.isTouched}
                    setIsTouched={price.setIsTouched}

                    validateHandler={priceValidater}
                    reset={price.reset}
                    isRequired={true}
                    type='number'
                  />


                </div>




                <div className="col-lg-6 col-md-6 col-sm-12 ">

                  <InputWithAddOn
                    label="discount On Package (%)"
                    className="loginInputs"

                    setValue={discountOnPackagePercentage.setEnteredValue}
                    value={discountOnPackagePercentage.enteredValue}
                    feedbackMessage={discountOnPackagePercentage.feedbackMessage}
                    feedbackType={discountOnPackagePercentage.messageType}
                    isTouched={discountOnPackagePercentage.isTouched}
                    setIsTouched={discountOnPackagePercentage.setIsTouched}

                    validateHandler={discountOnPackagePercentageValidater}
                    reset={discountOnPackagePercentage.reset}
                    isRequired={true}
                    type={'number'}

                  />


                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 ">
                  <InputSelect
                    setValue={settype}
                    value={type}
                    options={[
                      { label: 'Select', value: '', disabled: true },

                      { label: 'Family', value: 'family' },
                      { label: 'Senior', value: 'senior' },
                      { label: 'Diabetes', value: 'diabetes' }
                    ]}
                    isTouched={typeIsTouch}
                    setIsTouched={settypeIsTouch}
                    className="py-1"
                    label={"Type"}
                    isRequired={true}
                    feedbackMessage={typeMessage?.message}
                    feedbackType={typeMessage?.type}
                    validateHandler={typeSelectValidater}
                  />
                </div>

              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-12">
              <p style={{ marginBottom: '7px', fontSize: '12px', color: '#0F0F0F', fontWeight: '500' }}>Upload Image  <span style={{ color: 'rgb(220 53 69)' }}>*</span></p>

              <SingleImageDropZone file={imageFile} setFile={setImageFile} />



            </div>




            <div className="col-lg-12 col-md-12 col-sm-12 ">

              <InputTextArea
                label="Description"
                className="loginInputs"

                setValue={description.setEnteredValue}
                value={description.enteredValue}
                feedbackMessage={description.feedbackMessage}
                feedbackType={description.messageType}
                isTouched={description.isTouched}
                setIsTouched={description.setIsTouched}
                validateHandler={descriptionValidater}
                reset={description.reset}
                isRequired={true}
              />
            </div>

<div className="my-3">
            <hr />
            </div>
            {(ObservationsData ?? []).map((observationsItem, index) => {
              return <ObservationsSection observationsItem={observationsItem} key={index} setObservationsData={setObservationsData} length={(ObservationsData ?? []).length}
              type='Benifit'  />
            })}

            <div className='my-2 '>
              <p>
                <span style={{ cursor: 'pointer' }} onClick={() => { setObservationsData(prev => { return [...prev, { observations: '', id: uuid() }] }) }}>
                  <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 5px 1px 6px' }}>+</span> <span style={{ color: 'blue', fontSize: '18px', fontWeight: '500' }}>Add more benifits</span>
                </span>

              </p>
            </div>


            <div className="my-3">
            <hr />
            </div>

            {(TermsCondition ?? []).map((observationsItem, index) => {
              return <ObservationsSection observationsItem={observationsItem} key={index} setObservationsData={setTermsCondition} length={(TermsCondition ?? []).length} type='Terms & Condition' />
            })}

            <div className='my-2 '>
              <p>
                <span style={{ cursor: 'pointer' }} onClick={() => { setTermsCondition(prev => { return [...prev, { terms: '', id: uuid() }] }) }}>
                  <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 5px 1px 6px' }}>+</span> <span style={{ color: 'blue', fontSize: '18px', fontWeight: '500' }}>Add more terms & condition</span>
                </span>

              </p>
            </div>

            <div className="col-12 text-end my-3">
              <button

                className="btn btn-success  px-5 me-2"
                onClick={submitHandler}
                type="button"
              >
                {MemberShipResponse?.fetching ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Save"
                )}
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


const ObservationsSection = ({ observationsItem, key, setObservationsData, length,type }) => {
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
              label={type}
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
            />
          </div>

          {
            (length > 1) &&
            <div className='col-3 ' style={{ paddingTop: '29px', boxSizing: 'border-box' }}>
              <button onClick={() => { deleteobservations() }} className='' style={{ border: '2px solid red', borderRadius: '10px', color: 'red', fontSize: '15px', fontWeight: '500', backgroundColor: 'white', padding: '2px 10px' }}>X <span>Remove</span></button>


            </div>
          }

        </div>

      </div>
    </>
  )
}