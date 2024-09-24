import Booking from "@/model2/Booking";
import SlotTime from "@/model2/SlotTime";
import SlotDate from "@/model2/SlotDate";
import BookingActivity from "@/model2/BookingActivity";
import Coupon from "@/model2/Coupon";
import Membership from "@/model2/Membership";
import UserDetails from "@/model2/UserDetails";
import { parse } from "url";
import mongoose from "mongoose";
import PackageTest from "@/model2/PackageTest";
import Transaction from "@/model2/Transaction";
export const GET = async (request) => {
  try {
    const urlParams = parse(request.url, true);
    const { pageSize = 20, pageNo = 1, sortColumn = "createdAt", sortDirection = "desc", searchQuery = "", centerId = null } = urlParams.query;

    // Pagination and sorting setup
    const skip = (pageNo - 1) * pageSize;
    const sort = sortColumn ? { [sortColumn]: sortDirection === "desc" ? -1 : 1 } : {};

    // Filter setup
    const searchFilter = searchQuery
      ? { $or: [{ bookingId: { $regex: searchQuery, $options: "i" } }, { status: { $regex: searchQuery, $options: "i" } }, { paymentStatus: { $regex: searchQuery, $options: "i" } }] }
      : {};
    if (centerId) searchFilter.centerId = centerId;

    // Fetch bookings
    const bookingList = await Booking.find(searchFilter)
      .populate({ path: "slotId", select: "slotStartTime slotDate", populate: { path: "slotDate", select: "date" } })
      .populate({ path: "teamMemberId", select: "name email" }).populate({
        path: "packages",
        select: "name preparation",
      })
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    // Get total count
    const totalCount = await Booking.countDocuments(searchFilter);

    // Return response
    return new Response(JSON.stringify({ data: bookingList, total: totalCount }), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { team_members = [], center_id = null, payment_type = "cash", collection_type = "lab", slot_id = null, discount = 0, home_collection_charge = 0, total = 10, address_id = null, coupon_id = null, membership_id = null } = await request.json();
    if (!team_members || !Array.isArray(team_members) || !center_id || !slot_id) {
      await session.abortTransaction();
      session.endSession();
      return new Response("Team member, Packages, Slot and center Id cannot be null!", { status: 400 });
    }
    var slotCheck = await SlotTime.findById(slot_id)
    console.log(slotCheck)
    if (!slotCheck || (Number(slotCheck?.currentUse ?? 0) + team_members.length) > slotCheck?.maxUse) {
      await session.abortTransaction();
      session.endSession();
      return new Response("Slots are not available for your bookings! Please try again by changing slots!", { status: 400 });
    }
    const bookingPromises = []
    for (const team_member of team_members.filter(teamItem => teamItem?.member_id && teamItem?.packages && Array.isArray(teamItem?.packages) && teamItem?.packages.length > 0)) {
      const newBooking = new Booking({
        centerId: center_id,
        packages: team_member?.packages,
        status: "created",
        paymentStatus: "pending",
        paymentType: payment_type,
        collectionType: collection_type,
        slotId: slot_id,
        teamMemberId: team_member?.member_id,
        discount,
        homeCollectionCharge: home_collection_charge,
        total,
        addressId: address_id,
        couponSelectedId: coupon_id,
        membershipUsed: membership_id
      });
      bookingPromises.push(newBooking.save({ session }));
    }
    var bookings = await Promise.all(bookingPromises);
    slotCheck.currentUse = Number(slotCheck?.currentUse ?? 0) + team_members.length
    await slotCheck.save({ session })
    await session.commitTransaction();
    session.endSession();
    return new Response(JSON.stringify({ message: 'Booking has been created Successfully.', bookings }), { status: 200 });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    return new Response(error?.message, { status: 500 });
  }
};