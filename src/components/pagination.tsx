// @ts-nocheck
"use client"
import React, { useState } from 'react'
import Itemcard from './itemcard'



const Pagination = ({ products }) => {

  const pagesize = 15
  const [currentpage, setCurrentpage] = useState(1)

  const totalproducts = products.length
  const totalpage = Math.ceil(totalproducts / pagesize)
  const start = (currentpage - 1) * pagesize
  const end = currentpage * pagesize

  const maxVisibleButtons = 5

  const getPageRange = () => {
    let startPage = Math.max(1, currentpage - Math.floor(maxVisibleButtons / 2))
    let endPage = startPage + maxVisibleButtons - 1

    if (endPage > totalpage) {
      endPage = totalpage
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }

    const range = []
    for (let i = startPage; i <= endPage; i++) {
      range.push(i)
    }

    return range
  }

  function updatepage(page) {
    setCurrentpage(page)
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5">
        {
          products.slice(start, end).map((product, index) => (
            <Itemcard key={index} product={product} />
          ))
        }
      </div>

      <div className='flex justify-center mt-10'>
        {currentpage > 1 && (
          <button
            className="bg-gray-500 text-white rounded px-3 py-1.5 mx-1"
            onClick={() => updatepage(currentpage - 1)}
          >
            Prev
          </button>
        )}

        {getPageRange().map((pageNum) => (
          <button
            key={pageNum}
            className={`rounded px-3 py-1.5 mx-1 ${currentpage === pageNum ? 'bg-pink-600 text-white' : 'bg-slate-600 text-white'}`}
            onClick={() => updatepage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {currentpage < totalpage && (
          <button
            className="bg-gray-500 text-white rounded px-3 py-1.5 mx-1"
            onClick={() => updatepage(currentpage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
