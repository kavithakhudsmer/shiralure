import React, { useState } from "react";
import TopControls from "../../component/ui/Topcontrols";
import TableComponent from "../../component/ui/TableComponent";
import ActionIcon from "../../component/ui/ActionIcon";
import Pagination from "../../component/ui/Pagination";
import CustomModal from "../../component/ui/CustomModal";
import { NotificationData  } from "../../data/OrderData";
import { FiSearch, FiX } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import "../../../admin/pages/returnOrder/returnorders.css";
import ButtonComponent from "../../component/ui/ButtonComponent";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const PushNotification = () => {
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewedOrder, setViewedOrder] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(NotificationData);

  const [newOrder, setNewOrder] = useState({
    title: "",
    role: "",
    user: "",
    description: "",
    image: "",
  });

  const handleSearch = () => {
    const filtered = NotificationData.filter((order) => {
      return (
        (filterTitle === "" ||
          order.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
        (filterRole === "" ||
          order.role.toLowerCase().includes(filterRole.toLowerCase())) &&
        (filterUser === "" ||
          order.user.toLowerCase().includes(filterUser.toLowerCase()))
      );
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

const handleClearInputs = () => {
  setFilterTitle("");
  setFilterRole("");
  setFilterUser("");
};



  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedOrders = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedOrders = filteredOrders.filter(
      (order) => order !== selectedOrder
    );
    setFilteredOrders(updatedOrders);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleAddClick = () => {
    setShowInputModal(true);
  };

  const handleAddConfirm = () => {
const newEntry = {
  ...newOrder,
  image: newOrder.imageURL || "/assets/images/product-image.jpg",
};

    setFilteredOrders([newEntry, ...filteredOrders]);
    setShowInputModal(false);
    setNewOrder({
      title: "",
      role: "",
      user: "",
      description: "",
      image: "",
    });
  };

  const exportXLS = () => alert("Download XLS not implemented.");
  const printPage = () => window.print();

  return (
    <div className="mid-layer">
      <TopControls
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(val) => {
          setRowsPerPage(val);
          setCurrentPage(1);
        }}
        onFilterToggle={() => setShowFilter(!showFilter)}
        showFilter={showFilter}
        onNavigateAdd={handleAddClick}
        onPrint={printPage}
        onExportXLS={exportXLS}
        showIcons={{ filter: true, share: true, add: true }}
      />

      {showFilter && (
        <div className="mid-layer shadow-sm">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">User</label>
              <input
                type="text"
                className="form-control"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex align-items-end gap-2">
              <ButtonComponent variant="blueclr" onClick={handleSearch}>
                <FiSearch />
                Search
              </ButtonComponent>

<ButtonComponent variant="darkblack" onClick={handleClearInputs}>
  <FiX />
  Clear
</ButtonComponent>

            </div>
          </div>
        </div>
      )}

      <TableComponent
        headers={["Title", "Role", "User", "Action"]}
        data={displayedOrders}
        renderRow={(order, idx) => (
          <tr key={idx}>
            <td>{order.title}</td>
            <td>{order.role}</td>
            <td>{order.user}</td>
            <td className="d-flex gap-2 justify-content-center">
              <ActionIcon
                onView={() => setViewedOrder(order)}
                onDelete={() => handleDeleteClick(order)}
                show={{ eye: true, trash: true }}
              />
            </td>
          </tr>
        )}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + rowsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} entries
        </small>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <CustomModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <AiOutlineExclamationCircle
            style={{
              width: "60px",
              height: "60px",
              color: "#f6ad55",
            }}
          />

          <strong style={{ fontSize: "22px", marginBottom: "10px" }}>
            Are you sure?
          </strong>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
            You will not be able to recover the deleted record!
          </p>

          <div style={{ display: "flex", gap: "15px" }}>
            <ButtonComponent variant="blueclr" onClick={confirmDelete}>
              Yes, Delete it!
            </ButtonComponent>

            <ButtonComponent
              variant="darkblue"
              onClick={() => setShowDeleteModal(false)}
            >
              No, Cancel!
            </ButtonComponent>
          </div>
        </div>
      </CustomModal>

      {/* Add Notification Modal */}
<CustomModal
  show={showInputModal}
  onHide={() => setShowInputModal(false)}
  onConfirm={handleAddConfirm}
  confirmText="Save"
  cancelText="Cancel"
  title="Add Push Notification"
>
  <form
    className="container-fluid"
    onSubmit={(e) => {
      e.preventDefault();
      handleAddConfirm();
    }}
  >
    <div className="row g-3">
      {/* Role */}
      <div className="col-12 col-sm-6">
        <label className="form-label fw-semibold">Role</label>
        <input
          type="text"
          className="form-control shadow-sm rounded"
          required
          value={newOrder.role}
          onChange={(e) =>
            setNewOrder({ ...newOrder, role: e.target.value })
          }
        />
      </div>

      {/* User */}
      <div className="col-12 col-sm-6">
        <label className="form-label fw-semibold">User</label>
        <input
          type="text"
          className="form-control shadow-sm rounded"
          required
          value={newOrder.user}
          onChange={(e) =>
            setNewOrder({ ...newOrder, user: e.target.value })
          }
        />
      </div>

      {/* Title */}
      <div className="col-12">
        <label className="form-label fw-semibold">Title</label>
        <input
          type="text"
          className="form-control shadow-sm rounded"
          required
          value={newOrder.title}
          onChange={(e) =>
            setNewOrder({ ...newOrder, title: e.target.value })
          }
        />
      </div>

      {/* Image Upload */}
<div className="mb-3">
  <label className="form-label fw-semibold">IMAGE</label>

  {/* File Upload Box */}
  <div className="position-relative d-flex align-items-center border rounded shadow-sm px-3 py-2" style={{ height: "45px" }}>
    <span className="input-group-text bg-white border-0">
      <i className="bi bi-globe2 me-2"></i>
      Browse...
    </span>
    <i className="bi bi-file-earmark-text me-2 text-muted"></i>

    <span className="text-muted small flex-grow-1">
      {newOrder.image ? newOrder.image.name : "No file selected"}
    </span>



    {/* Invisible File Input */}
    <input
      type="file"
      accept="image/*"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
        zIndex: 1,
      }}
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setNewOrder({
            ...newOrder,
            image: file,
            imageURL: URL.createObjectURL(file),
          });
        }
      }}
    />
  </div>
</div>



      {/* Description */}
      <div className="col-12">
        <label className="form-label fw-semibold">Description</label>
        <textarea
          className="form-control shadow-sm rounded"
          rows={3}
          required
          value={newOrder.description}
          onChange={(e) =>
            setNewOrder({ ...newOrder, description: e.target.value })
          }
        ></textarea>
      </div>
    </div>
                <div className="col-12 d-flex align-items-end gap-2 mt-3">
              <ButtonComponent variant="blueclr" >
                                <SiTicktick />
                Save
              </ButtonComponent>

              <ButtonComponent variant="darkblack" onClick={() => setShowInputModal(false)}>
                <RxCrossCircled />
                Cancel
              </ButtonComponent>
            </div>
  </form>
</CustomModal>


    {/* View Notification Modal */}
    <CustomModal
      show={!!viewedOrder}
      onHide={() => setViewedOrder(null)}
      title="Push Notification"
    >
      <div className="text-center p-3">
       
<img
  src={viewedOrder?.imageURL || viewedOrder?.image}
  alt={viewedOrder?.title}
  style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
/>

        <h5 className="mt-3">{viewedOrder?.user}</h5>
         <h5>{viewedOrder?.title}</h5>
                 <p>
          <strong>Role:</strong> {viewedOrder?.role}
        </p>
        <p>{viewedOrder?.description}</p>

      </div>
    </CustomModal>
  </div>
);
};

export default PushNotification;
