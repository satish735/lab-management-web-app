import Transaction from "@/model2/Transaction";
import Booking from "@/model2/Booking";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            pageSize = 20,
            pageNo = 1,
            sortColumn = "createdAt",
            sortDirection = "desc",
            searchQuery = "",centerId
        } = urlParams.query;
        const skip = (pageNo - 1) * pageSize;
        const sort = {};
        if (sortColumn) {
            sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
        }
        const searchFilter = {};
        if (searchQuery) {
            searchFilter.$or = [
                { transactionId: { $regex: searchQuery, $options: "i" } },
                { status: { $regex: searchQuery, $options: "i" } },
                { transactionType: { $regex: searchQuery, $options: "i" } },
                { paymentMethod: { $regex: searchQuery, $options: "i" } },
                { referenceTransactionId: { $regex: searchQuery, $options: "i" } }
            ];
        }
        if(centerId){
            // searchFilter.bookingId={centerId}
        }
        const bookingList = await Transaction
            .find(searchFilter).populate({ path: "bookingId" })
            .sort(sort)
            .skip(skip)
            .limit(pageSize);
        const totalCount = await Transaction.find(searchFilter).countDocuments();
        var response = { data: bookingList, total: totalCount }
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(error?.message, { status: 500 });
    }
};