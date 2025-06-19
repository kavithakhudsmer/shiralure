import React from "react";
import { FaRegTrashAlt, FaCheckCircle } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { BiPlusCircle } from "react-icons/bi";

const COLORS = {
  eye: "#606CF2",
  trash: "#F4415F",
  add: "#28a745",
  present: "#17a2b8",
};

const ActionIcon = ({
  onView,
  onDelete,
  onAdd,
  onPresent,
  show = { eye: true, trash: true, add: true, present: false },
}) => {
  return (
    <>
      <style>{`
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color: inherit;
          font-size: 18px;
          user-select: none;
        }
        .icon-eye:hover {
          background-color: rgba(96, 108, 242, 0.5);
          color: #606CF2;
        }
        .icon-trashh:hover {
          background-color: rgba(244, 65, 95, 0.5);
          color: #F4415F;
        }
        .icon-add:hover {
          background-color: rgba(40, 167, 69, 0.5);
          color: #28a745;
        }
        .icon-present:hover {
          background-color: rgba(23, 162, 184, 0.5);
          color: #17a2b8;
        }
      `}</style>

      <div className="d-flex gap-2 justify-content-center">
        {show.eye && (
          <div
            className="icon-btn icon-eye"
            style={{ color: COLORS.eye }}
            onClick={onView}
            title="View"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && onView()}
          >
            <LuEye />
          </div>
        )}
        {show.trash && (
          <div
            className="icon-btn icon-trashh"
            style={{ color: COLORS.trash }}
            onClick={onDelete}
            title="Delete"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && onDelete()}
          >
            <FaRegTrashAlt />
          </div>
        )}
        {show.add && (
          <div
            className="icon-btn icon-add"
            style={{ color: COLORS.add }}
            onClick={onAdd}
            title="Add"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && onAdd()}
          >
            <BiPlusCircle />
          </div>
        )}
        {show.present && (
          <div
            className="icon-btn icon-present"
            style={{ color: COLORS.present }}
            onClick={onPresent}
            title="Mark Present"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && onPresent()}
          >
            <FaCheckCircle />
          </div>
        )}
      </div>
    </>
  );
};

export default ActionIcon;
