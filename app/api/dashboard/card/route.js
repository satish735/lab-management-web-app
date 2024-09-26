import Booking from "@/model2/Booking";
import HomeCollection from "@/model2/HomeCollection";
import Transaction from "@/model2/Transaction";
import UserDetails from "@/model2/UserDetails";
import moment from "moment";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    var { selectedCenter, start, end } = requestBody;
    var returnReponse = {};

    returnReponse.patient = {
      total: "0",
      isIncrease: true,
      percentage: "0",
      today_count: "0",
    };
    returnReponse.transaction = {
      total: "0",
      isIncrease: true,
      percentage: "0",
      today_count: "0",
    };
    returnReponse.homecollection = {
      total: "0",
      isIncrease: true,
      percentage: "0",
      today_count: "0",
    };
    returnReponse.booking = {
      total: "0",
      isIncrease: true,
      percentage: "0",
      today_count: "0",
    };

    const matchConditions = {};

    // Apply date filters if provided
    if (start) {
      matchConditions.createdAt = {
        ...(matchConditions?.createdAt ?? {}),
        $gte: new Date(start),
      };
    }
    if (end) {
      matchConditions.createdAt = {
        ...(matchConditions?.createdAt ?? {}),
        $lte: new Date(end),
      };
    }

    // Apply center ID filter if provided
    if (Array.isArray(selectedCenter) && selectedCenter.length > 0) {
      matchConditions.centerId = selectedCenter;
    }
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // For Boookings
    returnReponse.booking.total =
      (await Booking.countDocuments(matchConditions)) ?? 0;
    returnReponse.booking.today_count =
      (await Booking.countDocuments({
        ...matchConditions,
        createdAt: { $gte: startOfToday },
      })) ?? 0;
    const uniqueDatesArrayBookings = await Booking.find(matchConditions).select(
      "createdAt"
    );
    const uniqueDatesBookings = [
      ...new Set(
        uniqueDatesArrayBookings.map((item) =>
          moment(item?.createdAt).format("YYYY-MM-DD")
        )
      ),
    ];

    returnReponse.booking.average =
      returnReponse.booking.total / uniqueDatesBookings.length;
    var percentageChangeBooking = calculateChange(
      returnReponse.booking.average,
      returnReponse.booking.today_count
    );
    returnReponse.booking.isIncrease =
      percentageChangeBooking?.changeType == "decrease" ? false : true;
    returnReponse.booking.percentage =
      percentageChangeBooking?.percentageChange;

    // For Patients
    returnReponse.patient.total =
      (await UserDetails.countDocuments(matchConditions)) ?? 0;
    returnReponse.patient.today_count =
      (await UserDetails.countDocuments({
        ...matchConditions,
        createdAt: { $gte: startOfToday },
      })) ?? 0;
    const uniqueDatesArrayPatient = await UserDetails.find(
      matchConditions
    ).select("createdAt");
    const uniqueDatesPatient = [
      ...new Set(
        uniqueDatesArrayPatient.map((item) =>
          moment(item?.createdAt).format("YYYY-MM-DD")
        )
      ),
    ];

    returnReponse.patient.average =
      returnReponse.patient.total / uniqueDatesPatient.length;
    var percentageChangePatient = calculateChange(
      returnReponse.patient.average,
      returnReponse.patient.today_count
    );
    returnReponse.patient.isIncrease =
      percentageChangePatient?.changeType == "decrease" ? false : true;
    returnReponse.patient.percentage =
      percentageChangePatient?.percentageChange;

    // For Transactions
    returnReponse.transaction.total =
      (await Transaction.countDocuments(matchConditions)) ?? 0;
    returnReponse.transaction.today_count =
      (await Transaction.countDocuments({
        ...matchConditions,
        createdAt: { $gte: startOfToday },
      })) ?? 0;
    const uniqueDatesArrayTransaction = await Transaction.find(
      matchConditions
    ).select("createdAt");
    const uniqueDatesTransaction = [
      ...new Set(
        uniqueDatesArrayTransaction.map((item) =>
          moment(item?.createdAt).format("YYYY-MM-DD")
        )
      ),
    ];

    returnReponse.transaction.average =
      returnReponse.transaction.total / uniqueDatesTransaction.length;
    var percentageChangeTransaction = calculateChange(
      returnReponse.transaction.average,
      returnReponse.transaction.today_count
    );
    returnReponse.transaction.isIncrease =
      percentageChangeTransaction?.changeType == "decrease" ? false : true;
    returnReponse.transaction.percentage =
      percentageChangeTransaction?.percentageChange;

    // For HomeCollections
    returnReponse.homecollection.total =
      (await HomeCollection.countDocuments(matchConditions)) ?? 0;
    returnReponse.homecollection.today_count =
      (await HomeCollection.countDocuments({
        ...matchConditions,
        createdAt: { $gte: startOfToday },
      })) ?? 0;
    const uniqueDatesArrayHomeCollection = await HomeCollection.find(
      matchConditions
    ).select("createdAt");
    const uniqueDatesHomeCollection = [
      ...new Set(
        uniqueDatesArrayHomeCollection.map((item) =>
          moment(item?.createdAt).format("YYYY-MM-DD")
        )
      ),
    ];

    returnReponse.homecollection.average =
      returnReponse.homecollection.total / uniqueDatesHomeCollection.length;
    var percentageChangeHomeCollection = calculateChange(
      returnReponse.homecollection.average,
      returnReponse.homecollection.today_count
    );
    returnReponse.homecollection.isIncrease =
      percentageChangeHomeCollection?.changeType == "decrease" ? false : true;
    returnReponse.homecollection.percentage =
      percentageChangeHomeCollection?.percentageChange;
    console.log(returnReponse);
    return new Response(JSON.stringify(returnReponse), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};

function calculateChange(average = 0, current = 0) {
  if (typeof average != "number" || typeof current != "number") {
    return {
      changeType: "decrease",
      percentageChange: 0,
    };
  }
  const difference = current - average;
  let changeType;

  if (difference > 0) {
    changeType = "increase";
  } else if (difference < 0) {
    changeType = "decrease";
  } else {
    changeType = "no change";
  }

  const percentageChange = (difference / average) * 100;

  return {
    changeType,
    percentageChange: Math.abs(percentageChange).toFixed(2), // Get absolute value
  };
}
