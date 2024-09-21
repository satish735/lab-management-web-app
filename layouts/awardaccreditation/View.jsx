"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import LoaderGeneral from '@/components/loaders/LoaderGeneral';

const View = ({ searchParams }) => {

    const router = useRouter();



    const [awardaccreditationResponse, awardaccreditationHandler] = useAPI(
        {
            url: `/awardaccreditation/${searchParams?.id}`,
            method: "PUT",
        },
        (e) => {


            toast.success("award accreditation update successfully");
            router.push("/admin/awardaccreditation");

        },
        (e) => {
            toast.error("Something went wrong while creating award accreditation!")
            return e;
        }
    );


    const submit = () => {

        let isTitleInputValidater = TitleInputValidater(TitleInput?.enteredValue)
        let isDescriptionnInputValidater = DescriptionnInputValidater(DescriptionnInput?.enteredValue)
        let isDateInputValidater = DateInputValidater(DateInput?.enteredValue)

        if (!isTitleInputValidater || !isDescriptionnInputValidater || !isDateInputValidater) {
            toast.error("Fill complete form.");

        } else {
            awardaccreditationHandler({
                body: {
                    name: TitleInput?.enteredValue,
                    desc: DescriptionnInput?.enteredValue,
                    time: DateInput?.enteredValue
                },
            });
        }
    };


    const TitleInput = useInputComponent('');
    const TitleInputValidater = (value) => {
        if (value === "" || !value) {
            TitleInput.setFeedbackMessage(
                "Field required!"
            );
            TitleInput.setMessageType("error");
            return false;
        }
        TitleInput.setFeedbackMessage("");
        TitleInput.setMessageType("none");
        return true;
    };



    const DescriptionnInput = useInputComponent('');
    const DescriptionnInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionnInput.setFeedbackMessage(
                "Field required!"
            );
            DescriptionnInput.setMessageType("error");
            return false;
        }
        DescriptionnInput.setFeedbackMessage("");
        DescriptionnInput.setMessageType("none");
        return true;
    };

    const DateInput = useInputComponent('');
    const DateInputValidater = (value) => {
        if (value === "" || !value) {
            DateInput.setFeedbackMessage(
                "Field required!"
            );
            DateInput.setMessageType("error");
            return false;
        }
        DateInput.setFeedbackMessage("");
        DateInput.setMessageType("none");
        return true;
    };



    const [getawardaccreditationResponse, getawardaccreditationHandler] = useAPI(
        {
            url: `/awardaccreditation/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            TitleInput?.setEnteredValue(e?.name)
            DescriptionnInput?.setEnteredValue(e?.desc)
            DateInput?.setEnteredValue(moment(e?.time)?.format("YYYY-MM-DD"))
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting award accreditation!",
                e
            ));
            return e
        }
    );




    const [deleteawardaccreditationResponse, deleteawardaccreditationHandler] = useAPI(
        {
            url: `/awardaccreditation/${searchParams?.id}`,
            method: "DELETE"
        },
        (e) => {
            router.push("/admin/awardaccreditation");


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

        <>



        
            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    getawardaccreditationResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getawardaccreditationResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />

            {!getawardaccreditationResponse?.fetching && <div className="my-2">
                <h4> Awards and Accreditations</h4>

                <div className="row">
                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Name"
                            setValue={TitleInput.setEnteredValue}
                            value={TitleInput.enteredValue}
                            feedbackMessage={TitleInput.feedbackMessage}
                            feedbackType={TitleInput.messageType}
                            isTouched={TitleInput.isTouched}
                            setIsTouched={TitleInput.setIsTouched}
                            isRequired={true}

                            validateHandler={TitleInputValidater}
                            reset={TitleInput.reset}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>

                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Description"
                            value={DescriptionnInput.enteredValue}
                            feedbackMessage={DescriptionnInput.feedbackMessage}
                            feedbackType={DescriptionnInput.messageType}
                            isTouched={DescriptionnInput.isTouched}
                            setIsTouched={DescriptionnInput.setIsTouched}
                            isRequired={true}

                            validateHandler={DescriptionnInputValidater}
                            reset={DescriptionnInput.reset}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>
                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Date"
                            setValue={DateInput.setEnteredValue}
                            value={DateInput.enteredValue}
                            feedbackMessage={DateInput.feedbackMessage}
                            feedbackType={DateInput.messageType}
                            isTouched={DateInput.isTouched}
                            setIsTouched={DateInput.setIsTouched}

                            validateHandler={DateInputValidater}
                            reset={DateInput.reset}
                            isRequired={true}
                            type="date"
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>

                    <div className="my-3 text-end">
                        <button
                            className="mx-2 btn btn-danger"
                            onClick={() => {
                                deleteawardaccreditationHandler()
                            }}
                            type="button"
                        >
                            {deleteawardaccreditationResponse?.fetching ? <Spinner size='sm' /> : "Delete"}
                        </button>
                        <button
                            className="mx-2 btn btn-dark"
                            onClick={() => {
                                router.push("/admin/awardaccreditation");
                            }}
                            type="button"
                        >
                            Cancel
                        </button>


                        {searchParams?.type == "edit" && <button
                            style={{ float: "right" }}
                            className="btn btn-success px-3"
                            onClick={submit}
                        >
                            {awardaccreditationResponse?.fetching ? <Spinner size={"sm"} /> : "Update"}
                        </button>}

                    </div>
                </div>
            </div>}
        </>
    )

}
export default View;