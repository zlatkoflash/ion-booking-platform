"use client";

import { useState } from "react";
import ZIcon from "@/components/icons/ZIcon";
import Title from "@/components/typography/Title";
import { updateUrlParam } from "@/utils/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BookingListTablePagination(
  { totalCountItems, countItemsPerPage = 5 }
    :
    { totalCountItems: number, countItemsPerPage: number }
) {

  const tCommon = useTranslations("Common");
  // const totalCountItems: number = 144;
  // const countItemsPerPage: number = 5;
  const countPages: number = Math.ceil(totalCountItems / countItemsPerPage);

  const searchParams = useSearchParams();
  const currentPageFromGet = Number(searchParams.get("page") || 1);

  const [currentPage, setCurrentPage] = useState(isNaN(currentPageFromGet) ? 1 : currentPageFromGet);
  const updateURLParamRef = updateUrlParam();

  const getPaginationGroup = () => {
    let pages = [];

    // Always include page 1
    pages.push(1);

    // If current page is > 2, add dots
    if (currentPage > 3) {
      pages.push("...");
    }

    // Add n and n+1 if they are not the first or last page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(countPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add dots before last page if current is far from end
    if (currentPage < countPages - 2) {
      pages.push("...");
    }

    // Always include last page
    if (countPages > 1) {
      pages.push(countPages);
    }

    return pages;
  };

  if (countPages < 2) {
    return <></>
  }

  return (
    <div className="booking-list-table-pagination">
      <Title headingType="span" headingStyle="Text-sm-Medium" color="--color-text-fg-muted">
        {tCommon("page")} {currentPage} {tCommon("of")} {countPages}
      </Title>

      <div className="pagination-buttons">
        <button
          className="pagination-button prev"
          onClick={() => {
            setCurrentPage(prev => Math.max(prev - 1, 1));
            updateURLParamRef('page', `${currentPage - 1}`);
          }}
          disabled={currentPage === 1}
        >
          <ZIcon type="arrow-right" />
        </button>

        {getPaginationGroup().map((page, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === page ? "active" : ""} ${page === "..." ? "three-dots" : ""}`}
            onClick={() => {
              typeof page === 'number' && setCurrentPage(page);
              updateURLParamRef('page', page);
            }}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button next"
          onClick={() => {
            setCurrentPage(prev => Math.min(prev + 1, countPages));
            updateURLParamRef("page", `${currentPage + 1}`);
          }}
          disabled={currentPage === countPages}
        >
          <ZIcon type="arrow-right" />
        </button>
      </div>
    </div>
  );
}