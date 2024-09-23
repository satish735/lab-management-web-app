"use client";
import React, { useEffect, useState } from "react";
import "@/components/home-component/full-body-checkup/full-body-checkup.css";
import InputSelect from "@/components/project-main-component/input-component/InputSelect";
import CarousalSlider from "@/components/CarousalSlider";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
import { useSession } from "next-auth/react";

const FullBodyCheckup = () => {

  const [locationSelected, setlocationSelected] = useState();

  const session=useSession();
  const [SelectCategory, setSelectCategory] = useState();
  const [SelectCategoryIsTouch, setSelectCategoryIsTouch] = useState();
  const router = useRouter();

  const [SelectCategoryFeedbackMessage, setSelectCategoryFeedBackMessage] =
    useState({
      type: "info",
      message: "",
    });
  const SelectCategorySelectValidater = (value) => {
    return true;
  };





  const [testResponse, testHandler] = useAPI(
    {
      url: "/test/list",
      method: "get",
      // sendImmediately: true,
      params: {
        // sortColumn: sort?.column,
        // sortDirection: sort?.direction,
        pageNo: 1,
        pageSize: 20,
        location: locationSelected ?? null

        // searchQuery: searchValue,
      },
    },
    (e) => {

      console.log(e);


      let packages = (e?.data ?? []).filter((item) => {
        return item.testType === 'Package'
      });

      let tests = (e?.data ?? []).filter((item) => {
        return item.testType === 'Test'
      });

      return { packagesList: packages, testList: tests }
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting milestones!",
        e
      ));
      return e
    }
  );

  useEffect(() => {

    if (session?.data ) {


      setlocationSelected(session?.data?.user?.selectedCity)

      testHandler({
        params: {
          pageNo: 1,
          pageSize: 20,
          location: session?.data?.user?.selectedCity ?? null,
          bodyPartsIds: JSON.stringify([]),
          conditionIds: JSON.stringify([]),
        }
      })
    }

  }, [session?.data ])



  return (
    <div className="">
      <div className="container-fluid ">
        <div className="row ">
          <p className="col-lg-8 col-md-8 col-sm-12 heading-text-home ">
            Full Body Checkup Packages
          </p>
          <div className="col-lg-4 col-md-4 col-sm-12 pt-3">

          </div>
        </div>

        {testResponse?.fetching ? (
          <div className='text-center my-5'>

            <Spinner size={"xl"} />
          </div>

        ) : (
          <div className="full-body-checkup-section py-5">
            <CarousalSlider
              DataList={testResponse?.data?.packagesList}
              slidesToScroll={1}
              slidesToShow_lg={3}
              sliderFor={"packages"}
            />
          </div>
        )}

        <div className="text-center my-4">
          <button onClick={() => { router.push(`/health-packages`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All Packages
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <p className=" heading-text-home my-2">Most Popular Tests</p>
        {testResponse?.fetching ? (
          <div className='text-center my-5'>

            <Spinner size={"xl"} />
          </div>

        ) : (
          <div>
            <CarousalSlider
              DataList={testResponse?.data?.testList}
              slidesToScroll={1}
              slidesToShow_lg={3}
              sliderFor={"popular test"}
            />
          </div>
        )}
        <div className="text-center my-5">
          <button onClick={() => { router.push(`/lab-tests`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All Test
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <div className="offer-main-div row pt-3 pb-4 global-background-gradient"   >
          <div className="col-lg-8 col-md-8 col-sm-12 ps-lg-5">
            <p className="offer-heading-text ">
              Exclusive Offer:{" "}
              <span style={{ color: "#e1fba6" }}>Get 10% Off</span> Your First
              Test or Health Package Today!
            </p>

            <p style={{ color: "#fff", fontSize: "17px" }}>
              New user? Enjoy 10% off up to Rs 200 on all tests and health
              packages with code NEW10. Prioritize your health journey now!
            </p>

            <div>
              <button className="discount-code-coupen">
                Use Code:<span style={{ color: "#e1fba6" }}>{"NEW10"}</span>
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12" style={{ position: 'relative' }}>
            <img className=" " style={{ height: "270px", position: 'absolute', bottom: '-24px', right: '20px' }} src="/assets/images/temp/discount-image.webp" alt="post image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBodyCheckup;

const items = [
  {
    img: "/assets/images/temp/img1.jpg",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img1",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img1",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  // Add more items as needed
];


// {
//   "packagesList": [
//       {
//           "_id": "66c9bcd84f00356eb66ab32e",
//           "itemId": [
//               "66c9bc9c4f00356eb66ab326"
//           ],
//           "name": "jhjh",
//           "rate": 4,
//           "desc": "jjb",
//           "bodyParts": [],
//           "conditions": [],
//           "totalMrp": null,
//           "gender": "female",
//           "fromAge": 56,
//           "toAge": 5,
//           "observation": [],
//           "discountPercentage": 6,
//           "reportGenerationHours": 5,
//           "image": "public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png",
//           "testType": "Package",
//           "isBestSeller": false,
//           "homeCollection": true,
//           "isTrigger": false,
//           "nearMe": false,
//           "sampleCollection": "b vv",
//           "preparation": "vnv",
//           "packageTestList": [],
//           "is_delete": false,
//           "slug": "jhjh",
//           "__v": 0
//       }
//   ],
//   "testList": [
//       {
//           "_id": "66c9bc9c4f00356eb66ab326",
//           "itemId": [],
//           "name": "jhbh",
//           "rate": 4,
//           "desc": "j",
//           "bodyParts": [
//               "66c6235ec0c0024eaf036598"
//           ],
//           "conditions": [
//               "66c62d4f0de4e1b1d62e7b50"
//           ],
//           "totalMrp": null,
//           "gender": "female",
//           "fromAge": 4,
//           "toAge": 5,
//           "observation": [
//               "kjhjk"
//           ],
//           "discountPercentage": 78,
//           "reportGenerationHours": 5,
//           "image": "public/bce611a1-7efe-f28d-1fc2-5a7d2587c310.png",
//           "testType": "Test",
//           "isBestSeller": false,
//           "homeCollection": true,
//           "isTrigger": false,
//           "nearMe": false,
//           "sampleCollection": "jk",
//           "preparation": "j",
//           "packageTestList": [],
//           "is_delete": false,
//           "slug": "jhbh",
//           "__v": 0
//       },
//       {
//           "_id": "66caf1db3c986b236354d82a",
//           "itemId": [],
//           "name": "ERYTHROCYTES SEDIMENTATION RATE(ESR)",
//           "rate": 2000,
//           "desc": "ESR is an acute phase reactant which indicates the presence and intensity of an inflammatory process. An erythrocyte sedimentation rate (ESR) is a type of blood test that measures how quickly erythrocytes (red blood cells) settle at the bottom of a test tube that contains a blood sample. A high value of ESR can be seen in the following conditions: infection, rheumatoid arthritis, rheumatic fever, vascular disease, inflammatory bowel disease, heart disease, kidney disease, certain cancers, and other chronic inflammatory conditions.",
//           "bodyParts": [
//               "66c624710de4e1b1d62e7b29"
//           ],
//           "conditions": [
//               "66c76a05b7d422211b927962"
//           ],
//           "totalMrp": null,
//           "gender": "both",
//           "fromAge": 20,
//           "toAge": 60,
//           "observation": [
//               "Erythrocytes Sedimentation Rate"
//           ],
//           "discountPercentage": 10,
//           "reportGenerationHours": 24,
//           "image": "public/6f364e57-9afc-e7e4-ea55-08a8ef8caeb4.jpg",
//           "testType": "Test",
//           "isBestSeller": false,
//           "homeCollection": true,
//           "isTrigger": false,
//           "nearMe": false,
//           "sampleCollection": "EDTA Blood",
//           "preparation": "Overnight fasting is preferred.",
//           "packageTestList": [],
//           "is_delete": false,
//           "slug": "erythrocytes-sedimentation-rate(esr)",
//           "__v": 0
//       }
//   ]
// }