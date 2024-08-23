"use client";
import { useEffect } from "react";
import "./CustomTable.css";
import { Spinner, Table } from "reactstrap";

const CustomTable = ({
  columns = [],
  data = [],
  type = "list",
  cardClassName = null,
  cardComponent = null,
  loading = false,
  striped = false,
  hover = false,
  sort = null,
  selectedColumns = [],
  sortAction = () => {},
  searchTerm = "",
}) => {
  useEffect(() => {
    // Highlight search term
    const highlightSearchTerm = (term) => {
      const highlightText = (node) => {
        if (node.nodeType === 3) {
          const text = node.nodeValue;
          const regex = new RegExp(`(${term})`, "gi");
          if (regex.test(text)) {
            const span = document.createElement("span");
            span.innerHTML = text.replace(
              regex,
              '<span className="highlight">$1</span>'
            );
            node.replaceWith(span);
          }
        } else if (
          node.nodeType === 1 &&
          node.childNodes &&
          !["SCRIPT", "STYLE"].includes(node.tagName)
        ) {
          node.childNodes.forEach(highlightText);
        }
      };

      document.querySelectorAll(".highlight").forEach((el) => {
        el.replaceWith(el.firstChild);
      });

      if (term) {
        document.querySelectorAll("td").forEach((el) => {
          el.childNodes.forEach(highlightText);
        });
      }
    };

    highlightSearchTerm(searchTerm);
  }, [searchTerm]);
  return (
    <div className="w-100 custom-table">
      {type == "list" ? (
        <div className="custom-table-box">
          <Table responsive striped={striped} hover={hover}>
            <thead>
              <tr className="custom-table-header">
                {columns
                  .filter((columnsItem) =>
                    selectedColumns.length > 0
                      ? selectedColumns.includes(columnsItem?.key)
                      : true
                  )
                  .map((columnsItem,ctIndex) => {
                    return (
                      <th
                      key={ctIndex}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={columnsItem?.label}
                        data-tooltip-place="top"
                        data-tooltip-float={"true"}
                        data-tooltip-offset="20"
                        onClick={() => {
                          if (columnsItem?.sortable == true) {
                            sortAction(
                              columnsItem?.key,
                              sort?.direction == "asc" ? "desc" : "asc"
                            );
                          }
                        }}
                        className={`custom-table-header-cell ${
                          columnsItem?.sortable == true
                            ? sort?.column == columnsItem?.key
                              ? "has-sort-" + sort?.direction
                              : "has-sort"
                            : ""
                        }`}
                        style={columnsItem?.headerStyles ?? {}}
                      >
                        {columnsItem?.label}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data?.map((dataItem,ctIndex) => {
                  return (
                    <tr className="custom-table-body-row" key={ctIndex}>
                      {columns
                        .filter((columnsItem) =>
                          selectedColumns.length > 0
                            ? selectedColumns.includes(columnsItem?.key)
                            : true
                        )
                        .map((columnsItem,Tdindex) => {
                          return (
                            <td
                            key={Tdindex}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content={
                                columnsItem?.hasTooltip
                                  ? columnsItem?.notSame
                                    ? columnsItem?.tooltip(dataItem)
                                    : columnsItem?.value(dataItem)
                                  : ""
                              }
                              data-tooltip-place="top"
                              data-tooltip-float={"true"}
                              data-tooltip-offset="20"
                              className={`custom-table-body-cell ${columnsItem?.className}`}
                              style={columnsItem?.styles ?? {}}
                            >
                              {columnsItem?.value(dataItem)}
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {loading && (
            <div className="loading">
              <Spinner
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "#00265c",
                }}
              />
            </div>
          )}
          {(!data || data?.length == 0) && !loading && (
            <div className="no-content-found">
              <img
                src="/assets/icons/custom-tables/NoContentIcon.svg"
                alt="No content found icon"
                height="88px"
                width={"160px"}
              />
              <p className="mt-2">No content found</p>
            </div>
          )}
        </div>
      ) : (
        <div className={cardClassName || "row"}>
          {data.map((item,index) => {
            return <cardComponent key={index} />;
          })}
        </div>
      )}
    </div>
  );
};
export default CustomTable;
