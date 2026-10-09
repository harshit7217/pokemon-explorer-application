import Button from "./Button";
import PageButton from "./PageButton";

const Page = ({ currentPage, totalPage, onHandlePage }) => {
  const array = Array.from({ length: totalPage }, (_, i) => {
    const page = i + 1;
    const isActive = page === currentPage;
    return (
      <PageButton
        key={i}
        i={i}
        isActive={isActive}
        onHandlePage={onHandlePage}
        page={page}
      />
    );
  });

  const pageNumber = array.slice(
    Math.min(currentPage - 1, totalPage - 5),
    Math.min(currentPage + 4, totalPage),
  );
  return (
    <div className="flex">
      {currentPage !== 1 ? (
        <div>
          <PageButton i={1} onHandlePage={onHandlePage} page={1} />
          <span>.....</span>
        </div>
      ) : null}
      <div className="flex items-center gap-2">{pageNumber}</div>
      {currentPage !== totalPage ? (
        <div>
          <span>.....</span>
          <PageButton
            i={totalPage}
            onHandlePage={onHandlePage}
            page={totalPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Page;
