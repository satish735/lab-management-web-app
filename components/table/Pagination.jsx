import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import "./Pagination.css";
const PaginationComponent = ({
  totalRows,
  changePage,
  currentRows,
  currentPage,
  pageOptions = [10, 20, 50, 100],
}) => {
  var totalPages = Math.ceil(totalRows / currentRows);
  const getPageNumbers = () => {
    const pageArray = [];
    const maxPagesToShow = 3; // You can adjust this number based on your design

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
    } else {
      // If total pages are more than maxPagesToShow
      const middleIndex = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(1, currentPage - middleIndex);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        // Add ellipsis at the beginning
        pageArray.push(1, "...");
      }

      // Add pages within the range
      for (let i = startPage; i <= endPage; i++) {
        pageArray.push(i);
      }

      if (endPage < totalPages) {
        // Add ellipsis at the end
        pageArray.push("...", totalPages);
      }
    }

    return pageArray;
  };

  return (
    <div className="row align-items-center ">
      <div className="col-sm-12 col-md-3 text-end">
        <div className="d-flex align-items-center gap-2">
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle
              caret
              className="nav-link current-rows-text"
              tag="a"
            >
              {currentRows}{" "}
            </DropdownToggle>
            <DropdownMenu className="pagination-dropdown-menu">
              {pageOptions.map((item,index) => {
                return (
                  <DropdownItem
                  key={index}
                    className="current-rows-dropdown-item"
                    active={item == currentRows}
                    onClick={() => {
                      changePage(currentPage, item);
                    }}
                    href="#"
                    tag="a"
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
          <span className="entries-per-page">Entries per page</span>
        </div>
      </div>
      <div className="col-sm-12 col-md-9  datatable-pagination-div">
        <Pagination aria-label="Data-table pagination ">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              onClick={() => {
                changePage(currentPage - 1, currentRows);
              }}
            >
              {/* <PreviousIcon /> */}
              Prev
            </PaginationLink>
          </PaginationItem>
          {getPageNumbers().map((page, index) => (
            <PaginationItem
              key={index}
              disabled={page == "..."}
              active={page === currentPage}
            >
              {page === "..." ? (
                <PaginationLink disabled> {page}</PaginationLink>
              ) : (
                <PaginationLink onClick={() => changePage(page, currentRows)}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages} className="me-0">
            <PaginationLink
            className="me-0"
              onClick={() => {
                changePage(currentPage + 1, currentRows);
              }}
            >
              Next
              {/* <NextIcon /> */}
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};
export default PaginationComponent;
