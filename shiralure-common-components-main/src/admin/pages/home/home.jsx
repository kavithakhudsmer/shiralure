import React from 'react';
import "./home.scss";
import Widgets from '../../components/widgets/widgets';
import SalesOverview from '../../components/SalesOverview/SalesOverview';
import TopCustomer from '../../components/topcostumers/topcustomers';
import UpcomingProducts from '../../components/upcomingproducts/upcomingproducts';
import TopSellingProducts from '../../components/topproduct sales/TopSellingProducts';
import RecentOrders from '../../components/resentorder/RecentOrders';
import Dash from '../../components/resentorder/Dash'; // Import the Dash component


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showDash, setShowDash] = React.useState(false); // State to control Dash visibility
  const [selectedOrderId, setSelectedOrderId] = React.useState(null); // State to pass ID to Dash

  const monthlyData = {
    income: [2.0, 3.8, 3.9, 6.3, 4.0, 6.3, 4.5, 7.8, 5, 8.1, 4, 7.95],
    expenses: [8.0, 6.2, 7.8, 3.8, 8.0, 3.8, 5.1, 4.0, 4.1, 6.2, 5.0, 8.15]
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to handle showing the Dash component
  const handleShowDash = (id) => {
    setSelectedOrderId(id);
    setShowDash(true);
  };

  // Function to go back to the main Home view (can be passed to Dash for a back button)
  const handleHideDash = () => {
    setShowDash(false);
    setSelectedOrderId(null);
  };

  return (
    <div className={`muthu-home ${darkMode ? 'muthu-dark-mode' : ''}`}>
      {!showDash && ( // Conditionally render the header based on showDash state
        <div className="muthu-home-header">
          <h1 className="muthu-home-title">Dashboard</h1>
          <div className="muthu-breadcrumb">
            <a href="#">Home</a>
            <span className="muthu-separator">&gt;&gt;</span>
            <a href="#">Dashboard</a>
          </div>
        </div>
      )}

      <div className="muthu-main-content">
        {showDash ? (
          // Render Dash component when showDash is true, passing selectedOrderId
          <Dash id={selectedOrderId} onBack={handleHideDash} />
        ) : (
          // Render the main dashboard content when showDash is false
          <div className="muthu-home-container">
            <div className="muthu-widgets">
              <Widgets type="revenue" amount={2636262} diff={12} darkMode={darkMode} />
              <Widgets type="sales" amount={5635262} diff={8} darkMode={darkMode} />
              <Widgets type="stocks" amount={4700} diff={-2} darkMode={darkMode} />
              <Widgets type="expenses" amount={35262} diff={5} darkMode={darkMode} />
            </div>
            <div className="muthu-sales">
              <SalesOverview monthlyData={monthlyData} darkMode={darkMode} />
            </div>
            <div className='muthu-top-customer'>
              <TopCustomer darkMode={darkMode} />
            </div>
            <div className='muthu-upcoming-products'>
              <UpcomingProducts darkMode={darkMode} />
            </div>
            <div className="muthu-admin-container">
              <TopSellingProducts darkMode={darkMode} />
            </div>
            <div className="muthu-order-table">
              {/* Pass the handleShowDash function to RecentOrders */}
              <RecentOrders darkMode={darkMode} onShowDash={handleShowDash} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;