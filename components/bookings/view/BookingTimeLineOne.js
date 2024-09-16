"use client"
const BookingTimeLineOne = ({
  selected = null,
  isCancelled = true,
}) => {
  var options = [
    { label: "Created", value: "created", sequence: 1 },
    { label: "Confirmed", value: "confirmed", sequence: 2 },
    { label: "Process Assigned", value: "process_assigned", sequence: 3 },
    { label: "Started", value: "started", sequence: 4 },
    { label: "Collection Done", value: "collection_done", sequence: 5 },
    { label: "Sample Reached", value: "sample_reached", sequence: 6 },
    { label: "Report Approved", value: "report_approved", sequence: 7 },
    { label: "Completed", value: "completed", sequence: 8 },
    { label: "Cancelled", value: "cancelled", sequence: 9 },
  ];
  var sSequence = options.find((item) => item?.value == selected)?.sequence;
  return (
    <ul class={`timeline ${isCancelled == true ? "cancelled" : ""}`}>
      {options.map((item) => {
        let className;
        if (item.value == "cancelled") {
          className = "cancelled";
        } else if (sSequence >= item.sequence) {
          className = "completed";
        } else {
          className = "pending";
        }
        if (isCancelled != true && item.value == "cancelled") {
          return null;
        }
        return <li className={className} key={item?.sequence}>{item?.label}</li>;
      })}
    </ul>
  );
};
export default BookingTimeLineOne;
