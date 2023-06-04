"use client";
import { ProductData } from "@/types";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Product } from "./Product";
import "./pagination.css";

const ProductPagination = ({ products, itemsPerPage }: any) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <div
        className={`
      flex
      justify-center
      `}
      >
        <ul role="list" className={`flex flex-auto flex-row gap-6  flex-wrap `}>
          {currentProducts &&
            currentProducts.map((product: ProductData) => (
              <li key={product.id} className="flex">
                <Product productData={product} />
              </li>
            ))}
        </ul>
      </div>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ProductPagination;
