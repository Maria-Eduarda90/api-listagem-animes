import React from 'react';
import './styles/pagination.css'

const maxItems = 9;
const maxLeft = (maxItems - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
    {/*Pagina atual*/}
    const current = offset ? (offset / limit) + 1 : 1;

    {/*total de paginas*/}
    const pages = Math.ceil(total / limit);

    {/*Primeiro botão da minha paginação*/}
    const first = Math.max(current - maxLeft, 1);

    function onPageChange(page){
        setOffset((page - 1) * limit)
    }

    return (
        <ul className="pagination">
            <li>
                <button onClick={() => onPageChange(current - 1)} disabled={current === 1}>Anterior</button>
            </li>
            {Array.from({ length: Math.min(maxItems, pages) })
             .map((_, index) => index + first)
             .map((page) => (
                <li key={page}>
                    <button onClick={() => onPageChange(page)}>{page}</button>
                </li>
            ))}
            <li>
                <button onClick={() => onPageChange(current + 1)} disabled={current == pages}>Próxima</button>
            </li>
        </ul>
    );
}

export default Pagination;