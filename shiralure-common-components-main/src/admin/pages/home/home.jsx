import React from 'react';
import "./home.scss";
import Widgets from '../../components/widgets/widgets';
import SalesOverview from '../../components/SalesOverview/SalesOverview';
import TopCustomer from '../../components/topcostumers/topcustomers';
import UpcomingProducts from '../../components/upcomingproducts/upcomingproducts';
import TopSellingProducts from '../../components/topproduct sales/TopSellingProducts';
import RecentOrders from '../../components/resentorder/RecentOrders'; // Ensure this path is correct based on your project structure
 
 
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
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
 
  return (
<div className={`muthu-home ${darkMode ? 'muthu-dark-mode' : ''}`}>
<div className="muthu-home-header">
<h1 className="muthu-home-title">Dashboard</h1>
<div className="muthu-breadcrumb">
<a href="#">Home</a>
<span className="muthu-separator">&gt;&gt;</span>
<a href="#">Dashboard</a>
</div>
</div>
<div className="muthu-main-content">
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
            {/* RecentOrders is called here as a component within the Home layout */}
<RecentOrders darkMode={darkMode} />
</div>
</div>
</div>
</div>
  );
};
 
export default Home;