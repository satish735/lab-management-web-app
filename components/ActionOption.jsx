import { Loader } from "lucide-react";
const ActionOption = ({
  Icon = null,
  onClick = () => {},
  disabled = false,
  loading = false,
  name = "",
}) => {
  var CustomIcon = loading ? Loader : Icon;
  return (
    <CustomIcon
      className={`table-action-button ${disabled ? "disabled" : ""} ${
        loading ? "loading spinner" : ""
      }`}
      onClick={(e) => {
        if (disabled || loading) {
        } else {
          onClick(e);
        }
      }}
      data-tooltip-id="my-tooltip"
      data-tooltip-content={name}
      data-tooltip-place="top"
      data-tooltip-float={"true"}
      data-tooltip-offset="20"
    />
  );
};

export default ActionOption;
