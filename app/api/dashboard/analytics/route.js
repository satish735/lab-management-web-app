import Booking from "@/model2/Booking";
import HomeCollection from "@/model2/HomeCollection";
import Transaction from "@/model2/Transaction";
import UserDetails from "@/model2/UserDetails";
import moment from "moment";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    var { selectedCenter, start, end } = requestBody;
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
    if (Array.isArray(selectedCenter) && selectedCenter.length > 0) {
      matchConditions.centerId = selectedCenter;
    }
    const bookingList = await Booking.find(matchConditions).select(
      "createdAt status isCancelled"
    );
    const bookingListCreatedAt = bookingList
      .map((item) => {
        return {
          ...item,
          createdAt: moment(item?.createdAt).format("YYYY-MM-DD"),
        };
      })
      .sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt));
    var returnResponse = generateBookingChartData(records);
    return new Response(JSON.stringify(returnResponse), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
const records = [
  { createdAt: "2023-09-01", status: "created", isCancelled: false },
  { createdAt: "2023-09-01", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-01", status: "started", isCancelled: false },
  { createdAt: "2023-09-01", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-01", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-02", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-02", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-02", status: "completed", isCancelled: false },
  { createdAt: "2023-09-02", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-03", status: "created", isCancelled: false },
  { createdAt: "2023-09-03", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-03", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-03", status: "started", isCancelled: false },
  { createdAt: "2023-09-03", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-04", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-04", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-04", status: "completed", isCancelled: false },
  { createdAt: "2023-09-04", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-05", status: "created", isCancelled: false },
  { createdAt: "2023-09-05", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-05", status: "started", isCancelled: false },
  { createdAt: "2023-09-05", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-05", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-06", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-06", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-06", status: "completed", isCancelled: false },
  { createdAt: "2023-09-06", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-07", status: "created", isCancelled: false },
  { createdAt: "2023-09-07", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-07", status: "started", isCancelled: false },
  { createdAt: "2023-09-07", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-07", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-08", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-08", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-08", status: "completed", isCancelled: false },
  { createdAt: "2023-09-08", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-09", status: "created", isCancelled: false },
  { createdAt: "2023-09-09", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-09", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-09", status: "started", isCancelled: false },
  { createdAt: "2023-09-09", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-10", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-10", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-10", status: "completed", isCancelled: false },
  { createdAt: "2023-09-10", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-11", status: "created", isCancelled: false },
  { createdAt: "2023-09-11", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-11", status: "started", isCancelled: false },
  { createdAt: "2023-09-11", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-11", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-12", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-12", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-12", status: "completed", isCancelled: false },
  { createdAt: "2023-09-12", status: "cancelled", isCancelled: true },
  { createdAt: "2023-09-13", status: "created", isCancelled: false },
  { createdAt: "2023-09-13", status: "confirmed", isCancelled: false },
  { createdAt: "2023-09-13", status: "started", isCancelled: false },
  { createdAt: "2023-09-13", status: "process_assigned", isCancelled: false },
  { createdAt: "2023-09-13", status: "collection_done", isCancelled: false },
  { createdAt: "2023-09-14", status: "sample_reached", isCancelled: false },
  { createdAt: "2023-09-14", status: "report_approved", isCancelled: false },
  { createdAt: "2023-09-14", status: "completed", isCancelled: false },
  { createdAt: "2023-09-14", status: "cancelled", isCancelled: true },
];
const generateBookingChartData = (bookingData) => {
  const loopResult = {
    all: [],
    created: [],
    confirmed: [],
    process_assigned: [],
    started: [],
    collection_done: [],
    sample_reached: [],
    report_approved: [],
    completed: [],
    cancelled: [],
  };

  bookingData.forEach((bookingItem) => {
    const { createdAt, status, isCancelled } = bookingItem;

    if (!loopResult.all.some((item) => item.date === createdAt)) {
      loopResult.all.push({ date: createdAt, count: 1 });
      Object.keys(loopResult).forEach((key) => {
        if (key != "all" && key != "cancelled") {
          loopResult[key].push({
            date: createdAt,
            count: status === key ? 1 : 0,
          });
        } else if (key == "cancelled") {
          loopResult[key].push({
            date: createdAt,
            count: isCancelled == true ? 1 : 0,
          });
        }
      });
    } else {
      // Update existing counts
      loopResult.all.forEach((statusItem) => {
        if (statusItem.date === createdAt) {
          statusItem.count += 1;
        }
      });
      if (loopResult["cancelled"] && isCancelled) {
        loopResult["cancelled"].forEach((statusItem) => {
          if (statusItem.date == createdAt) {
            statusItem.count += 1;
          }
        });
      } else if (loopResult[status]) {
        loopResult[status].forEach((statusItem) => {
          if (statusItem.date === createdAt) {
            statusItem.count += 1;
          }
        });
      }
    }
  });

  return {
    labels: loopResult.all.map((item) => item.date),
    datasets: [
      {
        label: "Created",
        data: loopResult.created.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Confirmed",
        data: loopResult.confirmed.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(9, 192, 3, 0.2)",
        borderColor: "rgba(12, 192, 45, 1)",
        borderWidth: 2,
      },
      {
        label: "Process Assigned",
        data: loopResult.process_assigned.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
      {
        label: "Started",
        data: loopResult.started.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Collection Done",
        data: loopResult.collection_done.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      {
        label: "Sample Reached",
        data: loopResult.sample_reached.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
      {
        label: "Report Approved",
        data: loopResult.report_approved.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
      },
      {
        label: "Completed",
        data: loopResult.completed.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(0, 204, 0, 0.2)",
        borderColor: "rgba(0, 204, 0, 1)",
        borderWidth: 2,
      },
      {
        label: "Cancelled",
        data: loopResult.cancelled.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 2,
      },
    ],
  };
};
