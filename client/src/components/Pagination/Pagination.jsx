import style from "./Pagination.module.css";

export const Pagination = ({
  pageSize,
  totalGames,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalGames / pageSize); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousButton = () => {
    setCurrentPage(--currentPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNextButton = () => {
    setCurrentPage(++currentPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handlePageButton = (n) => {
    setCurrentPage(n);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button
        className={`${style.pageButton} ${
          currentPage === 1 ? style.disabled : ""
        }`}
        onClick={handlePreviousButton}
        disabled={currentPage === 1}
      >
        <i className={`fa-solid fa-angle-left ${style.icons}`}></i>
      </button>
      {pageNumbers.map((pageNum) => {
        return (
          <button
            key={pageNum}
            className={`${style.pageButton} ${
              pageNum === currentPage ? style.current : ""
            }`}
            onClick={() => handlePageButton(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className={`${style.pageButton} ${
          currentPage >= pageNumbers.length ? style.disabled : ""
        }`}
        onClick={handleNextButton}
        disabled={currentPage >= pageNumbers.length}
      >
        <i className={`fa-solid fa-angle-right ${style.icons}`}></i>
      </button>
    </div>
  );
};
