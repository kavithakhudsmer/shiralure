import { useState } from "react";
import TopControls from "../../component/ui/Topcontrols";
import TableComponent from "../../component/ui/TableComponent";
import ActionIcon from "../../component/ui/ActionIcon";
import Pagination from "../../component/ui/Pagination";
import CustomModal from "../../component/ui/CustomModal";
import { OrderData, ProductData } from "../../data/OrderData";
import { FiSearch, FiX } from "react-icons/fi";
import RichTextEditor from "../../component/ui/RichTextEditor";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { BiPrinter } from "react-icons/bi";
import "../../../admin/pages/returnOrder/returnorders.css";
import ButtonComponent from "../../component/ui/ButtonComponent";
import DateTimePicker from "../../component/ui/DateTimePicker";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ARorder = () => {
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [filterText, setFilterText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewedOrder, setViewedOrder] = useState(null);
  const [orders, setOrders] = useState(OrderData);
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRef, setFilterRef] = useState("");
  const [filterTotal, setFilterTotal] = useState("");
  const [filterReason, setFilterReason] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const [newOrder, setNewOrder] = useState({
    name: "",
    ref: "",
    total: "",
    reason: "",
  });
  const handleSearch = () => {
    const filtered = orders.filter((order) => {
      return (
        (filterCustomer === "" ||
          order.name.toLowerCase().includes(filterCustomer.toLowerCase())) &&
        (filterDate === "" || order.time.includes(filterDate)) &&
        (filterRef === "" ||
          order.ref.toLowerCase().includes(filterRef.toLowerCase())) &&
        (filterTotal === "" || order.total.toString().includes(filterTotal)) &&
        (filterReason === "" ||
          order.reason.toLowerCase().includes(filterReason.toLowerCase()))
      );
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

const handleClear = () => {
  setFilterCustomer("");
  setFilterDate("");
  setFilterRef("");
  setFilterTotal("");
  setFilterReason("");
};



  const displayedProducts = ProductData;
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
    const index = OrderData.findIndex(
      (order) => order.ref === selectedOrder.ref
    );
    if (index !== -1) {
      OrderData.splice(index, 1);
    }
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleAddClick = () => {
    setShowInputModal(true);
  };

  const handleAddConfirm = () => {
    OrderData.push({
      ...newOrder,
      time: new Date().toLocaleDateString(),
    });
    setShowInputModal(false);
    setNewOrder({ name: "", ref: "", total: "", reason: "" });
  };

  const exportXLS = () => alert("Download XLS not implemented.");
  const printPage = () => window.print();

  return (
    <div className="ar-container">
    <div className="arheader">
        <h2 className="artitle">Return Order</h2>
        <h6 className="arbreadcrumb">
          <a href="/" className="arbreadcrumb">Home</a> &gt;&gt; <span>Return Order</span>
        </h6>
      </div>
    <div className="mid-layer">
      <TopControls
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(val) => {
          setRowsPerPage(val);
          setCurrentPage(1);
        }}
        onFilterToggle={() => setShowFilter(!showFilter)}
        showFilter={showFilter}
        onNavigateAdd={() => handleAddClick()}
        onPrint={printPage}
        onExportXLS={exportXLS}
        showIcons={{ filter: true, share: true, add: true }}
      />

      {showFilter && (
        <div className="mid-layer shadow-sm">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Date</label>
              <DateTimePicker value={filterDate} onChange={setFilterDate} />
            </div>          

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Reference No</label>
              <input
                type="number"
                className="form-control"
                value={filterRef}
                onChange={(e) => setFilterRef(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Total</label>
              <input
                type="text"
                className="form-control"
                value={filterTotal}
                onChange={(e) => setFilterTotal(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Reason</label>
              <input
                type="text"
                className="form-control"
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex align-items-end gap-2">
              <ButtonComponent variant="blueclr" onClick={handleSearch}>
                <FiSearch />
                Search
              </ButtonComponent>

              <ButtonComponent variant="darkblack" onClick={handleClear}>
                <FiX />
                Clear
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}

      <TableComponent
        headers={[
          "CUSTOMER",
          "Date",
          "Reference No",
          "Total",
          "Reason",
          "Action",
        ]}
        data={displayedOrders}
        renderRow={(order, idx) => (
          <tr key={idx}>
            <td>{order.name}</td>
            <td>{order.time}</td>
            <td>{order.ref}</td>
            <td>${order.total}</td>
            <td>{order.reason}</td>
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
          <AiOutlineExclamationCircle             style={{
              width: "60px",
              height: "60px",
              color: "#f6ad55",
              }}/>

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

      {/* Add Order Modal */}
      <CustomModal
        show={showInputModal}
        onHide={() => setShowInputModal(false)}
        onConfirm={handleAddConfirm}
        confirmText="Save"
        cancelText="Cancel"
        title="Add Return Order"
      >
        <form
          className="container-fluid"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddConfirm();
          }}
        >
          {/* Date and Reference */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={newOrder.time}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, time: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
              <label>Reference No</label>
              <input
                type="text"
                className="form-control"
                value={newOrder.ref}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, ref: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Customer and Attachments */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Customer</label>
              <input
                type="text"
                className="form-control"
                value={newOrder.name}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
  <label>Attachments</label>
  <input
    type="file"
    className="form-control"
    onChange={(e) =>
      setNewOrder({ ...newOrder, attachment: e.target.files[0] })
    }
  />
</div>

          </div>
<div className="form-group mb-3">
  <div className="p-3 mb-3" style={{ backgroundColor: "#fff9db", border: "1px solid #ffe58f", borderRadius: "5px" }}>
    <label className="form-label fw-bold text-dark mb-2">Please select these before adding any product</label>
    <div className="form-group">
      <label className="form-label">Add Products <span className="text-danger">*</span></label>
      <select
        className="form-select"
        value={newOrder.selectedProduct}
        onChange={(e) =>
          setNewOrder({ ...newOrder, selectedProduct: e.target.value })
        }
        required
      >
        <option value="">Select one</option>
        <option value="Product A">Product A</option>
        <option value="Product B">Product B</option>
        <option value="Product C">Product C</option>
        {/* You can dynamically populate this if needed */}
      </select>
    </div>
  </div>
</div>

          {/* Products Table */}
          <div className="form-group mb-3">
            <label>Products</label>
            <TableComponent
              headers={[
                "Product",
                "Unit Cost",
                "Quantity",
                "Discount",
                "Taxes",
                "SubTotal",
                "Actions",
              ]}
              data={displayedProducts}
              renderRow={(product, idx) => (
                <tr key={idx}>
                  <td>{product.products}</td>
                  <td>{product.unitCost}</td>
                  <td>{product.quantity}</td>
                  <td>{product.discount}</td>
                  <td>{product.taxes}</td>
                  <td>{product.subTotal}</td>
                  <td className="d-flex gap-2 justify-content-center"></td>
                </tr>
              )}
            />
          </div>

          {/* Reason (Rich Text Editor) */}
          <div className="form-group mb-3">
            <label>Reason</label>
            <RichTextEditor
              theme="snow"
              value={newOrder.reason}
              onChange={(value) => setNewOrder({ ...newOrder, reason: value })}
              placeholder="Insert content here..."
            />
          </div>
          <div>
            <button
              style={{
                backgroundColor: "#7f5af0",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <FaRegCheckCircle className="me-1" />
              Save
            </button>
          </div>
        </form>
      </CustomModal>

      {/* View Order Modal */}
      <CustomModal
        show={!!viewedOrder}
        onHide={() => setViewedOrder(null)}
        title="Return Order Details"
      >
        {viewedOrder && (
          <div className="row" style={{ fontSize: "13px" }}>
            {/* Left Side */}
            <div className="col-md-8">
              {/* Order Details */}
              <div className="mb-3">
                <h6 className="fw-semibold mb-2">Order Details</h6>
                <ul className="ps-3 mb-0">
                  <li>
                    <strong>Order ID:</strong> {viewedOrder.ref}
                  </li>
                  <li>
                    <strong>Customer Name:</strong> {viewedOrder.name}
                  </li>
                  <li>
                    <strong>Customer Contact:</strong>{" "}
                    {viewedOrder.contact || "N/A"}
                  </li>
                  <li>
                    <strong>Order Date:</strong> {viewedOrder.time}
                  </li>
                  <li>
                    <strong>Delivery Date:</strong>{" "}
                    {viewedOrder.deliveryDate || "N/A"}
                  </li>
                </ul>
              </div>

              {/* Product Details */}
              <div className="mb-3">
                <h6 className="fw-semibold mb-2">Product Details</h6>
                <ul className="ps-3 mb-0">
                  <li>
                    <strong>Product Name:</strong>{" "}
                    {viewedOrder.productName || "N/A"}
                  </li>
                  <li>
                    <strong>SKU:</strong> {viewedOrder.sku || "N/A"}
                  </li>
                  <li>
                    <strong>Size:</strong> {viewedOrder.size || "N/A"}
                  </li>
                  <li>
                    <strong>Color:</strong> {viewedOrder.color || "N/A"}
                  </li>
                  <li>
                    <strong>Quantity:</strong> {viewedOrder.quantity || "1"}
                  </li>
                </ul>
              </div>

              {/* Return Request Details */}
              <div className="mb-3">
                <h6 className="fw-semibold mb-2">Return Request Details</h6>
                <ul className="ps-3 mb-1">
                  <li>
                    <strong>Return Request ID:</strong> RET-{viewedOrder.ref}
                  </li>
                  <li>
                    <strong>Return Date:</strong>{" "}
                    {viewedOrder.returnDate || "N/A"}
                  </li>
                  <li>
                    <strong>Reason:</strong> {viewedOrder.reason || "N/A"}
                  </li>
                  <li>
                    <strong>Additional Info:</strong>{" "}
                    {viewedOrder.additionalInfo || "N/A"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 d-flex flex-column align-items-end justify-content-end">
              <img
                src={
                  viewedOrder.productImage || "/assets/images/product-image.jpg"
                }
                alt="Product"
                className="img-fluid rounded"
                style={{ maxHeight: "220px", marginBottom: "1rem" }}
              />
              <ButtonComponent variant="blueclr" onClick={printPage}>
                <BiPrinter />
                Print
              </ButtonComponent>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
    </div>
  );
};

export default ARorder;
