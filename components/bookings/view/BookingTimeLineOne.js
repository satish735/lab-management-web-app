const BookingTimeLineOne = ({
  currentStatus = null,
  selected = "process_assigned",
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
    { label: "Cancelled", value: "cancelled", sequence: 8 },
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
        if (isCancelled != true) {
          return null;
        }
        return <li className={className}>{item?.label}</li>;
      })}
    </ul>
  );
};
export default BookingTimeLineOne;
