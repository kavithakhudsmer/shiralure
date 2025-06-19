import { useState } from "react";
import TopControls from "../../component/ui/Topcontrols";
import TableComponent from "../../component/ui/TableComponent";
import ActionIcon from "../../component/ui/ActionIcon";
import Pagination from "../../component/ui/Pagination";
import CustomModal from "../../component/ui/CustomModal";
import { OrderData, ProductData, posOrder } from "../../data/OrderData";
import { FiSearch, FiX } from "react-icons/fi";
import poscustomer from "../../../assets/images/products/poscustomer.png";
import { FaCalendar, FaPhoneAlt } from "react-icons/fa";
import { BiPrinter } from "react-icons/bi";
import "../../../admin/pages/returnOrder/returnorders.css";
import ButtonComponent from "../../component/ui/ButtonComponent";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Printer } from "lucide-react";
import { MdEmail } from "react-icons/md";
import "../../../admin/pages/pos/posorder.css";

const PosOrder = () => {
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [filterText, setFilterText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewedOrder, setViewedOrder] = useState(null);
  const [orders, setOrders] = useState(posOrder);
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRef, setFilterRef] = useState("");
  const [filterTotal, setFilterTotal] = useState("");
  const [filterReason, setFilterReason] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

const handleSearch = () => {
  const filtered = orders.filter((order) => {
    const formattedDate = filterDate
      ? new Date(filterDate).toLocaleDateString("en-GB") // "19/03/2025"
      : "";

    const orderDateOnly = order.date.split(",")[0]; // "19-03-2025"

    return (
      (filterCustomer === "" ||
        order.customer.toLowerCase().includes(filterCustomer.toLowerCase())) &&
      (filterDate === "" || orderDateOnly === formattedDate.replaceAll("/", "-")) &&
      (filterRef === "" ||
        order.order.toLowerCase().includes(filterRef.toLowerCase())) &&
      (filterTotal === "" || order.amount.toString().includes(filterTotal)) &&
      (filterReason === "" ||
        order.status.toLowerCase().includes(filterReason.toLowerCase()))
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
      (order) => order.order === selectedOrder.order
    );
    if (index !== -1) {
      OrderData.splice(index, 1);
    }
    setShowDeleteModal(false);
    setSelectedOrder(null);
    setFilteredOrders(OrderData);
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
        onPrint={printPage}
        onExportXLS={exportXLS}
        showIcons={{ filter: true, share: true, add: false }}
      />

      {showFilter && (
        <div className="mid-layer shadow-sm">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label">Order ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Order ID"
                value={filterRef}
                onChange={(e) => setFilterRef(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Status"
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Customer Name"
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label">Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
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
        headers={["Order ID", "Customer", "Amount", "Date", "Status", "Action"]}
        data={displayedOrders}
        renderRow={(order, idx) => (
          <tr key={idx}>
            <td>{order.order}</td>
            <td>{order.customer}</td>
            <td>${order.amount}</td>
            <td>{order.date}</td>
            <td>{order.status}</td>
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
        <div className="text-center p-4">
          <AiOutlineExclamationCircle
            style={{ width: "60px", height: "60px", color: "#f6ad55" }}
          />
          <strong style={{ fontSize: "22px", marginBottom: "10px" }}>
            Are you sure?
          </strong>
          <p className="text-muted mb-3">
            You will not be able to recover the deleted record!
          </p>
          <div className="d-flex justify-content-center gap-3">
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

      <CustomModal show={!!viewedOrder} onHide={() => setViewedOrder(null)}>
        {viewedOrder && (
          <div className="adminpos-container">
            <div className="row adminpos-card py-2 px-1 mb-4">
              <div className="col-md-6 my-2">
                <div className="d-flex align-items-center flex-wrap gap-1 mb-2">
                  <h6 className="adminpos-order-title mb-0 me-2">
                    ORDER ID: <span>#{viewedOrder.order}</span>
                  </h6>
                  <span className="adminpos-paid text-success fw-bold me-1">
                    Paid
                  </span>
                  <span className="adminpos-confirmed text-primary fw-bold">
                    Confirmed
                  </span>
                </div>
                <span className="adminpos-date d-block text-muted mb-2">
                  <FaCalendar className="me-1" />
                  {viewedOrder.date}
                </span>
                <div className="adminpos-order-info d-flex flex-column gap-2">
                  <span>
                    <strong>Payment Type:</strong> {viewedOrder.paymentType}
                  </span>
                  <span>
                    <strong>Order Type:</strong> {viewedOrder.orderType}
                  </span>
                </div>
              </div>

              <div className="col-md-6 d-flex align-items-end justify-content-md-end gap-1">
                <select className="adminpos-control">
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
                <select className="adminpos-control">
                  <option>Confirmed</option>
                  <option>Delivered</option>
                </select>
                <ButtonComponent
                  variant="blueclr"
                  style={{ height: "30px" }}
                  className="adminpos-control"
                >
                  <BiPrinter
                    style={{ fontSize: "10px" }}
                    className="me-1"
                    size={14}
                    onClick={printPage}
                  />
                  <small style={{ fontSize: "8px" }}>Print Invoice</small>
                </ButtonComponent>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="adminpos-card p-3 mb-3">
                  <h6 className="adminpos-section-title">Order Details</h6>
                  <hr />
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={viewedOrder.image}
                      alt="Product"
                      className="adminpos-product-image"
                    />
                    <div>
                      <p className="adminpos-product-name mb-1 fw-semibold">
                        Wella Elements 2.0 Shampoo 1000 ML
                      </p>
                      <p className="adminpos-product-price text-muted mb-0">
                        ₹{viewedOrder.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="adminpos-card p-3 mb-3">
                  <div className="adminpos-summary-row d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>₹1921.00</span>
                  </div>
                  <div className="adminpos-summary-row d-flex justify-content-between">
                    <span>Tax Fee</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="adminpos-summary-row d-flex justify-content-between">
                    <span>Discount</span>
                    <span>₹0.00</span>
                  </div>
                  <hr />
                  <div className="adminpos-summary-total d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{viewedOrder.amount}</span>
                  </div>
                </div>

                <div className="adminpos-card p-3">
                  <h6 className="adminpos-section-title">Information</h6>
                  <hr />
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={poscustomer}
                      alt="User"
                      className="adminpos-customer-img rounded-circle me-2"
                    />
                    <span className="fw-semibold">Walking Customer</span>
                  </div>
                  <div className="adminpos-customer-contact d-flex align-items-center mb-1">
                    <MdEmail className="me-2" /> walkingcustomer@ex.com
                  </div>
                  <div className="adminpos-customer-contact d-flex align-items-center">
                    <FaPhoneAlt className="me-2" /> 1234567890
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default PosOrder;
