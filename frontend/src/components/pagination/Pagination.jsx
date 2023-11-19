import React from 'react'
import './pagination.css'

function Pagination() {
  return (
    <div className="pagination">
            <button 
             className="page previous"
            //  onClick={() => setCurrentPage(current => current - 1)}
            //  disabled={currentPage === 1}
            >
                Previous
            </button>
            {[1,2,3,4,5].map(page => (
                <div 
                //  onClick={() => setCurrentPage(page)} 
                 key={page} 
                 className={ "page"} 
                >
                    {page}
                </div>
            ))}
            <button 
             className="page next"
            //  onClick={() => setCurrentPage(current => current + 1)}
            //  disabled={currentPage === pages}
            >
                Next
            </button>
        </div>
  )
}

export default Pagination