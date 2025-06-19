// MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SettingsHeader from '../components/SHeader/SHeader';
import SuppliersTable from '../components/STable/STable';
import SupplierDetails from '../components/SupplierDetails/SDetails';
import './SPage.css';
import THeader from '../components/Header/THeader';

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('Suppliers');
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSupplier(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Suppliers':
        if (currentView === 'details' && selectedSupplier) {
          return (
            <SupplierDetails 
              supplier={selectedSupplier} 
              onBack={handleBackToList}
            />
          );
        }
        return (
          <SuppliersTable 
            onViewSupplier={handleViewSupplier}
          />
        );
      case 'Social Media':
        return (
          <div className="coming-soon">
            <h2>Social Media Settings</h2>
            <p>This section is under development.</p>
          </div>
        );
      case 'Analytics':
        return (
          <div className="coming-soon">
            <h2>Analytics Settings</h2>
            <p>This section is under development.</p>
          </div>
        );
      default:
        return (
          <div className="coming-soon">
            <h2>{activeTab}</h2>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  // Dynamic page title based on current view
  const getPageTitle = () => {
    if (activeTab === 'Suppliers' && currentView === 'details') {
      return 'Supplier Details';
    }
    return 'Settings';
  };

  // Dynamic breadcrumb based on current view
  const getBreadcrumb = () => {
    if (activeTab === 'Suppliers' && currentView === 'details') {
      return (
        <>
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">&gt; </span>
          <span className="breadcrumb-item">Settings</span>
          <span className="breadcrumb-separator">&gt; </span>
          <span className="breadcrumb-item">Suppliers</span>
          <span className="breadcrumb-separator">&gt; </span>
          <span className="breadcrumb-item active">Details</span>
        </>
      );
    }
    return (
      <>
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-separator">&gt; </span>
        <span className="breadcrumb-item active">Settings</span>
      </>
    );
  };

  return (
    <div className="main-layout">
      {/* Header at the very top, spanning full width */}
      <THeader/>
      
      {/* Main content area with sidebar and content */}
      <div className="layout-body">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        <div className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="breadcrumb">
              {getBreadcrumb()}
            </div>
          </div>
          
          {/* Settings Content Area */}
          <div className="settings-content">
            {/* Settings Navigation Sidebar - Always visible */}
            <div className="settings-sidebar">
              <SettingsHeader 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
              />
            </div>
            
            {/* Main Content */}
            <div className="content-area">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;