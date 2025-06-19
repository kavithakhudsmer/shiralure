import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = ({ headers, data, renderRow }) => {
  return (
    <>
      <style>{`
        :root {
          --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          --border-radius: 0.5rem;
          --text-color: #333;
        }

        .custom-table {
          width: 100%;
          min-width: 600px; /* ensure enough width for scroll */
          border-collapse: separate;
          border-spacing: 0 2px;
          background-color: transparent;
          border: none;
          box-shadow: var(--box-shadow);
          border: 1px solid #f5f6f7;
          border-radius: var(--border-radius);
        }

        .custom-table thead th {
          background-color: rgb(217, 217, 217);
          color: var(--text-color);
          font-weight: 600;
          text-align: center;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
          border: none;
          font-size: 14px;
        }

        .custom-table tbody tr {
          background-color: #ffffff;
          transition: box-shadow 0.3s ease;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
          border: 0;
        }

        .custom-table tbody tr:hover {
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        }

        .custom-table tbody td {
          text-align: center;
          vertical-align: middle;
          color: var(--text-color);
          border: none;
          font-size: 12px;
        }
                  .responsive-scroll {
            overflow-x: auto;
          }
        @media (max-width: 991px) {
          .responsive-scroll {
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="responsive-scroll">
        <Table bordered hover className="text-center custom-table">
          <thead className="table-light">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map(renderRow)}</tbody>
        </Table>
      </div>
    </>
  );
};

export default TableComponent;
