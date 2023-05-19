import React from 'react'

export const Pagenation = ({ perPage, totalData, paginate}) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalData / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className={"mt-5"}>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number+1)} className="page-link bg-info me-2" style={{ cursor: 'pointer' }}>
                            {number+1}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}