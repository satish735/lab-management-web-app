"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import GenrateSlots from "@/components/slots/GenrateSlots";
import ViewSlots from "@/components/slots/ViewSlots";
import useAPI from "@/hooks/useAPI";
import { Spinner } from "reactstrap";
import toast from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession()


    const centerId = session?.data?.user?.currentCenter?._id



  const [genratedSlots, setGenratedSlots] = useState([])


  const [saveGeneratedSlotsResponse, saveGenratedSlotsHandler] = useAPI(
    {
      url: "/slots",
      method: "post",
    },
    (e) => {
      toast.success(
        `Slots for center has been created successfully`
      );
      router.push("/admin/slots");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while creating slots!", e)
      );
      return e;
    }
  );
  const [excludeDatesResponse, excludeDatesHandler] = useAPI(
    {
      url: "/slots/check-dates",
      params: {
        center_id: centerId
      },
      method: "get",
      sendImmediately: true
    },
    (e) => {
      return e?.data ?? []
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Validating slot dates!", e)
      );
      return e;
    }
  );
  const createSlotsSubmitHandler = async () => {
    if (!genratedSlots || !Array.isArray(genratedSlots) || genratedSlots.length == 0) {
      toast.error("Please generate slots before submit!");
      return;
    }
    var submitBody = {
      slots: genratedSlots,
      center_id: centerId
    };
    await saveGenratedSlotsHandler({ body: submitBody });
  };

  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Slots", link: "/admin/slots" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Slots</h1>
        <p className="sub-heading">
          Easily Add and Configure a Slots to Application Database
        </p>
        <GenrateSlots slots={genratedSlots} setSlots={setGenratedSlots} centerId={centerId} exclude={excludeDatesResponse?.data} excludeLoading={excludeDatesResponse?.fetching} />
        <br />
        <ViewSlots slots={genratedSlots} type={"create"} setSlots={setGenratedSlots} />
        <div className="w-100 text-end py-2">
          <button className="btn btn-theme secondary-outline me-2" onClick={() => { router.push("/admin/slots") }}>Cancel</button>
          <button className="btn btn-theme primary " onClick={createSlotsSubmitHandler} style={{ minWidth: "100px" }}> {saveGeneratedSlotsResponse?.fetching ? (
            <Spinner size={"sm"} />
          ) : (
            "Save Slots"
          )}</button>
        </div>
      </div>
    </div>
  );
} 
