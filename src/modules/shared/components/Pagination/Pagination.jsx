import React from 'react'


export default function Pagination({arrayOfPages,updateParams}) {


  return (
    <nav aria-label="Page navigation example" className='d-flex'>
    <ul className="pagination" style={{marginInline:'auto'}}>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
      {arrayOfPages.map((pageNo)=>
        <li className="page-item" Key={pageNo} onClick={()=>updateParams(pageNo)}>
            <a className="page-link" href="#">
                {pageNo}
            </a>
        </li>
      )}
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
  )
}
