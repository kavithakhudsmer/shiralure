import { Dropdown } from "react-bootstrap";
import {
  FaPrint,
  FaFileExcel,
  FaShareSquare,
} from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { PiSliders } from "react-icons/pi";

const TopControls = ({
  rowsPerPage,
  setRowsPerPage,
  onFilterToggle,
  onNavigateAdd,
  showIcons = { filter: true, share: true, add: true },
  onPrint,
  onExportXLS,
}) => {
  return (
    <>
      <style>{`
        .custom-btn {
          background-color: var(--primary-color) !important;
          border: none !important;
          color: white !important;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 0.375rem;
          font-size: 16px;
        }

        .custom-btn:hover {
          opacity: 0.9;
        }

        .dropdown-toggle.custom-btn::after {
          display: none !important; /* Removes caret */
        }

        .dropdown-menu {
          background-color: var(--primary-color);
          border: none;
          min-width: 160px;
        }

        .dropdown-menu .dropdown-item {
          color: white;
          transition: background-color 0.2s ease;
          font-size: 14px;
        }

        .dropdown-menu .dropdown-item:hover,
        .dropdown-menu .dropdown-item:focus {
          background-color: #4f46e5;
          color: white;
        }

        .top-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px; /* 10px gap between all icons/buttons */
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="top-controls">
        {/* Rows Per Page Dropdown */}
        <Dropdown>
          <Dropdown.Toggle className="custom-btn">
            {rowsPerPage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[6, 10, 15, 20].map((num) => (
              <Dropdown.Item key={num} onClick={() => setRowsPerPage(num)}>
                {num}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Filter Icon */}
        {showIcons.filter && (
          <button onClick={onFilterToggle} className="custom-btn" title="Filter">
            <PiSliders style={{ width: "18px", height: "18px", color: "#fff" }} />
          </button>
        )}

        {/* Share Dropdown */}
        {showIcons.share && (
          <Dropdown>
            <Dropdown.Toggle className="custom-btn">
              <FaShareSquare style={{ width: "18px", height: "18px", color: "#fff" }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onPrint}>
                <FaPrint className="me-2" /> Print
              </Dropdown.Item>
              <Dropdown.Item onClick={onExportXLS}>
                <FaFileExcel className="me-2" /> Export XLS
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {/* Add New Icon */}
        {showIcons.add && (
          <button onClick={onNavigateAdd} className="custom-btn" title="Add New Item">
            <MdAddToPhotos style={{ width: "18px", height: "18px", color: "#fff" }} />
          </button>
        )}
      </div>
    </>
  );
};

export default TopControls;
