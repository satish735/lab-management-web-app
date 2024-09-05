"use client";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "reactstrap";
import { useState } from "react";
import InputSelect from "@/components/formInput/select/InputSelect";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("@/components/text-editor/TextEditor"),
  { ssr: false }
);

const Home = () => {
  const router = useRouter();

  const [content, setContent] = useState("");

  const [partnerResponse, partnerHandler] = useAPI(
    {
      url: "/partnerwithus/create",
      method: "post",
    },
    (e) => {
      router.push("/admin/partnerwithus")
      return e
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while adding partner!",
          e
        )
      );
      return e;
    }
  );



  const [getpartnerResponse, getpartnerHandler] = useAPI(
    {
        url: `/partnerwithus/list`,
        method: "get",
        sendImmediately: true,

    },
    (e) => {
        
      
        const updatedItems = [
            { label: "Franchising Opportunity", value: "franchising" },
            { label: "Lab Acquisition", value: "lab" },
            { label: "Hospital Lab Management", value: "hospital" },
            { label: "Corporate Wellness", value: "corporate" }
        ].map((item) => {
            const isDisabled = e?.data?.some((key) => key?.type === item?.value);
            return { ...item, disabled: isDisabled };
        });
        
        return updatedItems

    },
    (e) => {

        toast.error(transformErrorDefault(
            "Something went wrong while Getting partnerwithus!",
            e
        ));
        return e
    }
);

  const [Partnertype, setPartnertype] = useState();
  const [PartnertypeIsTouch, setPartnertypeIsTouch] = useState(false);

  const [PartnertypeMessage, setPartnertypeMessage] = useState({
    type: "info",
    message: "",
  });
  const PartnertypeSelectValidater = (value) => {
    if (value === "" || !value) {
      setPartnertypeMessage({ type: "error", message: "Field Required!" });
      return false;
    }
    setPartnertypeMessage({ type: "info", message: "" });

    return true;
  };



  const submit = () => {

    let isPartnertypeSelectValidater = PartnertypeSelectValidater(Partnertype)

    if (!isPartnertypeSelectValidater) {
      toast.error(
        "Please select a partner type!"
      );
    } else {
      partnerHandler({
        body: {
          text: content,
          type:Partnertype ?? ""
        }
      })
    }



  };

  return (
    <>
      <div className=' bg-white p-4  ' style={{ textAlign: "left" }}>



        <h3 className=" mb-5  text-center" style={{ fontSize: "1.2rem" }} >

          Partner with Us</h3>

        <div className=" "  >

          <div className="  ">

            <div className="my-3 ">

              <button
                style={{ float: "right" }}

                className="btn btn-success px-5 "
                onClick={submit}
              >
                {partnerResponse?.fetching ? <Spinner size={"sm"} /> : "Create Partner"}
              </button>

              <button
                style={{ float: "right" }}

                className="btn btn-dark px-4 mx-3"
                onClick={() => {
                  router.push("/admin/partnerwithus")
                }}
              >
                Cancel
              </button>

            </div>


            <div className="col-sm-6 col-12  ">
              <InputSelect
                setValue={setPartnertype}
                value={Partnertype}
                options={getpartnerResponse?.data ?? []}
                isTouched={PartnertypeIsTouch}
                setIsTouched={setPartnertypeIsTouch}
                className="py-1"
                label={"Gender"}
                isRequired={true}
                feedbackMessage={PartnertypeMessage?.message}
                feedbackType={PartnertypeMessage?.type}
                validateHandler={PartnertypeSelectValidater}
              />
            </div>
            <div style={{ height: "400px" }}>
              <TextEditor content={content} setContent={setContent} />
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default Home;