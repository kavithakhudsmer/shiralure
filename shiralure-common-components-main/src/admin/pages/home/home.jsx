import React, { useEffect, useState } from 'react';
import "./home.scss";
import Widgets from '../../components/widgets/widgets';
import SalesOverview from '../../components/SalesOverview/SalesOverview';
import TopCustomer from '../../components/topcostumers/topcustomers';
import UpcomingProducts from '../../components/upcomingproducts/upcomingproducts';
import TopSellingProducts from '../../components/topproduct sales/TopSellingProducts';
import RecentOrders from '../../components/resentorder/RecentOrders';
import Dash from '../../components/resentorder/Dash';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [showDash, setShowDash] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetch('/dashboardData.json')
      .then((res) => res.json())
      .then((data) => {
        const processedData = {};
        Object.keys(data).forEach((key) => {
          const current = data[key].amount;
          const previous = data[key].previous;
          const diff = previous === 0 ? 0 : +(((current - previous) / previous) * 100).toFixed(2);
          processedData[key] = {
            amount: current,
            diff,
            extraInfo: data[key].extraInfo
          };
        });
        setDashboardData(processedData);
      });
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div className={`muthu-home`}>
      {!showDash && (
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
          <Dash id={selectedOrderId} onBack={() => setShowDash(false)} />
        ) : (
          <div className="muthu-home-container">
            <div className="muthu-widgets">
              {Object.entries(dashboardData).map(([key, value]) => (
                <Widgets
                  key={key}
                  type={key}
                  amount={value.amount}
                  diff={value.diff}
                  extraInfo={value.extraInfo}
                />
              ))}
            </div>
            <div className="muthu-sales">
              <SalesOverview />
            </div>
            <div className="muthu-top-customer">
              <TopCustomer />
            </div>
            <div className="muthu-upcoming-products">
              <UpcomingProducts />
            </div>
            <div className="muthu-admin-container">
              <TopSellingProducts />
            </div>
            <div className="muthu-order-table">
              <RecentOrders onShowDash={(id) => setSelectedOrderId(id) || setShowDash(true)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
