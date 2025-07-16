import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const RolePermissions = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full access to all features',
      permissions: 'All Access',
      status: 'Active',
      detailedPermissions: [
        'User Management',
        'Role Management', 
        'System Settings',
        'Reports & Analytics',
        'Data Export/Import',
        'Security Configuration'
      ],
      createdDate: '2024-01-15',
      lastModified: '2024-06-20'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Manage products, orders, reports',
      permissions: 'Products, Orders, Reports',
      status: 'Active',
      detailedPermissions: [
        'Product Management',
        'Order Processing',
        'Generate Reports',
        'View Analytics',
        'Manage Staff',
        'Customer Support'
      ],
      createdDate: '2024-01-20',
      lastModified: '2024-06-18'
    },
    {
      id: 3,
      name: 'Staff',
      description: 'Handle orders and customer queries',
      permissions: 'Orders, Customers',
      status: 'Active',
      detailedPermissions: [
        'Process Orders',
        'Handle Customer Queries',
        'Update Order Status',
        'View Customer Information',
        'Create Support Tickets'
      ],
      createdDate: '2024-02-01',
      lastModified: '2024-06-15'
    },
    {
      id: 4,
      name: 'Inventory Clerk',
      description: 'Manage stock and damages',
      permissions: 'Products, Damages',
      status: 'Active',
      detailedPermissions: [
        'Stock Management',
        'Inventory Tracking',
        'Damage Reports',
        'Product Updates',
        'Supplier Coordination'
      ],
      createdDate: '2024-02-10',
      lastModified: '2024-06-12'
    },
    {
      id: 5,
      name: 'Marketing',
      description: 'Manage promotions and notifications',
      permissions: 'Promotions, Communications',
      status: 'Active',
      detailedPermissions: [
        'Campaign Management',
        'Promotion Creation',
        'Email Marketing',
        'Social Media Management',
        'Analytics Tracking'
      ],
      createdDate: '2024-02-15',
      lastModified: '2024-06-10'
    }
  ];

  const handleViewDetails = (role) => {
    setSelectedRole(role);
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  return (
    <div className="user-role-permissions20">
      <div className="user-role-permissions__header20">
        <h2 className="user-role-permissions__title20">Role & Permissions</h2>
      </div>
      
      <div className="user-role-permissions__table-container20">
        <table className="user-role-permissions__table20">
          <thead className="user-role-permissions__thead20">
            <tr>
              <th className="user-role-permissions__th20">Role Name</th>
              <th className="user-role-permissions__th20">Description</th>
              <th className="user-role-permissions__th20">Permissions</th>
              <th className="user-role-permissions__th20">Status</th>
              <th className="user-role-permissions__th20">Action</th>
            </tr>
          </thead>
          <tbody className="user-role-permissions__tbody20">
            {roles.map((role) => (
              <tr key={role.id} className="user-role-permissions__tr20">
                <td className="user-role-permissions__td20 user-role-permissions__td--name20">
                  {role.name}
                </td>
                <td className="user-role-permissions__td20 user-role-permissions__td--description20">
                  {role.description}
                </td>
                <td className="user-role-permissions__td20 user-role-permissions__td--permissions20">
                  {role.permissions}
                </td>
                <td className="user-role-permissions__td20 user-role-permissions__td--status20">
                  <span className="user-role-permissions__status-badge20">
                    {role.status}
                  </span>
                </td>
                <td className="user-role-permissions__td20 user-role-permissions__td--action20">
                  <button 
                    className="user-role-permissions__action-btn20"
                    onClick={() => handleViewDetails(role)}
                    aria-label={`View details for ${role.name}`}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Role Details */}
      {selectedRole && (
        <div className="user-role-permissions__modal-overlay20" onClick={closeModal}>
          <div className="user-role-permissions__modal-content20" onClick={(e) => e.stopPropagation()}>
            <div className="user-role-permissions__modal-header20">
              <h3 className="user-role-permissions__modal-title20">
                {selectedRole.name} Role Details
              </h3>
              <button 
                className="user-role-permissions__modal-close20"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="user-role-permissions__modal-body20">
              <div className="user-role-permissions__detail-section20">
                <h4 className="user-role-permissions__detail-label20">Description</h4>
                <p className="user-role-permissions__detail-value20">{selectedRole.description}</p>
              </div>
              
              <div className="user-role-permissions__detail-section20">
                <h4 className="user-role-permissions__detail-label20">Status</h4>
                <span className="user-role-permissions__status-badge20">
                  {selectedRole.status}
                </span>
              </div>
              
              <div className="user-role-permissions__detail-section20">
                <h4 className="user-role-permissions__detail-label20">Detailed Permissions</h4>
                <ul className="user-role-permissions__permissions-list20">
                  {selectedRole.detailedPermissions.map((permission, index) => (
                    <li key={index} className="user-role-permissions__permission-item20">
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="user-role-permissions__detail-row20">
                <div className="user-role-permissions__detail-section20">
                  <h4 className="user-role-permissions__detail-label20">Created Date</h4>
                  <p className="user-role-permissions__detail-value20">{selectedRole.createdDate}</p>
                </div>
                
                <div className="user-role-permissions__detail-section20">
                  <h4 className="user-role-permissions__detail-label20">Last Modified</h4>
                  <p className="user-role-permissions__detail-value20">{selectedRole.lastModified}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .user-role-permissions20 {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
        }

        .user-role-permissions__header20 {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .user-role-permissions__title20 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .user-role-permissions__table-container20 {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .user-role-permissions__table-container20::-webkit-scrollbar {
          height: 8px;
        }

        .user-role-permissions__table-container20::-webkit-scrollbar-track {
          background: #f7fafc;
        }

        .user-role-permissions__table-container20::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 4px;
        }

        .user-role-permissions__table-container20::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        .user-role-permissions__table20 {
          width: 100%;
          min-width: 800px;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .user-role-permissions__thead20 {
          background: #f9fafb;
        }

        .user-role-permissions__th20 {
          padding: 12px 24px;
          text-align: left;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
          white-space: nowrap;
        }

        .user-role-permissions__th20:first-child {
          width: 150px;
        }

        .user-role-permissions__th20:nth-child(2) {
          width: 300px;
        }

        .user-role-permissions__th20:nth-child(3) {
          width: 200px;
        }

        .user-role-permissions__th20:nth-child(4) {
          width: 100px;
        }

        .user-role-permissions__th20:last-child {
          width: 80px;
        }

        .user-role-permissions__tbody20 {
          background: #ffffff;
        }

        .user-role-permissions__tr20 {
          transition: background-color 0.15s ease;
        }

        .user-role-permissions__tr20:hover {
          background: #f9fafb;
        }

        .user-role-permissions__tr20:not(:last-child) {
          border-bottom: 1px solid #e5e7eb;
        }

        .user-role-permissions__td20 {
          padding: 16px 24px;
          vertical-align: top;
        }

        .user-role-permissions__td--name20 {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          white-space: nowrap;
        }

        .user-role-permissions__td--description20 {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.4;
          max-width: 300px;
          word-wrap: break-word;
        }

        .user-role-permissions__td--permissions20 {
          font-size: 14px;
          color: #6b7280;
          white-space: nowrap;
        }

        .user-role-permissions__td--status20 {
          padding: 16px 24px;
          vertical-align: middle;
        }

        .user-role-permissions__status-badge20 {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
          color: #065f46;
          background-color: #d1fae5;
          border-radius: 12px;
          text-transform: capitalize;
        }

        .user-role-permissions__td--action20 {
          padding: 16px 24px;
          vertical-align: middle;
          text-align: center;
        }

        .user-role-permissions__action-btn20 {
          width: 32px;
          height: 32px;
          background-color: #f8d7da; /* Light red background */
          color: #dc3545; /* Red icon */
          border: none;
          border-radius: 50%; /* Circular shape */
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s ease;
        }

        .user-role-permissions__action-btn20:hover {
          background-color: #f1aeb5;
        }

        /* Modal Styles */
        .user-role-permissions__modal-overlay20 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .user-role-permissions__modal-content20 {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .user-role-permissions__modal-header20 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .user-role-permissions__modal-title20 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .user-role-permissions__modal-close20 {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #6b7280;
          transition: all 0.15s ease;
        }

        .user-role-permissions__modal-close20:hover {
          background-color: #f3f4f6;
          color: #111827;
        }

        .user-role-permissions__modal-body20 {
          padding: 24px;
        }

        .user-role-permissions__detail-section20 {
          margin-bottom: 20px;
        }

        .user-role-permissions__detail-section20:last-child {
          margin-bottom: 0;
        }

        .user-role-permissions__detail-label20 {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .user-role-permissions__detail-value20 {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        .user-role-permissions__permissions-list20 {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .user-role-permissions__permission-item20 {
          font-size: 14px;
          color: #6b7280;
          padding: 6px 0;
          border-bottom: 1px solid #f3f4f6;
          position: relative;
          padding-left: 20px;
        }

        .user-role-permissions__permission-item20:before {
          content: '•';
          color: #10b981;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .user-role-permissions__permission-item20:last-child {
          border-bottom: none;
        }

        .user-role-permissions__detail-row20 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .user-role-permissions__header20 {
            padding: 16px 20px;
          }
          
          .user-role-permissions__title20 {
            font-size: 16px;
          }
          
          .user-role-permissions__table20 {
            min-width: 700px;
          }
          
          .user-role-permissions__th20,
          .user-role-permissions__td20 {
            padding: 12px 16px;
          }
          
          .user-role-permissions__th20:first-child,
          .user-role-permissions__td--name20 {
            width: 120px;
          }
          
          .user-role-permissions__th20:nth-child(2),
          .user-role-permissions__td--description20 {
            width: 250px;
          }
          
          .user-role-permissions__th20:nth-child(3),
          .user-role-permissions__td--permissions20 {
            width: 180px;
          }
          
          .user-role-permissions__th20:nth-child(4) {
            width: 80px;
          }
          
          .user-role-permissions__th20:last-child {
            width: 70px;
          }

          .user-role-permissions__action-btn20 {
            width: 28px;
            height: 28px;
          }

          .user-role-permissions__action-btn20 svg {
            width: 14px;
            height: 14px;
          }

          .user-role-permissions__modal-content20 {
            margin: 10px;
            max-width: none;
          }

          .user-role-permissions__modal-header20,
          .user-role-permissions__modal-body20 {
            padding: 16px 20px;
          }

          .user-role-permissions__detail-row20 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .user-role-permissions__table20 {
            min-width: 600px;
          }
          
          .user-role-permissions__th20:first-child,
          .user-role-permissions__td--name20 {
            width: 100px;
          }
          
          .user-role-permissions__th20:nth-child(2),
          .user-role-permissions__td--description20 {
            width: 200px;
          }
          
          .user-role-permissions__th20:nth-child(3),
          .user-role-permissions__td--permissions20 {
            width: 150px;
          }
          
          .user-role-permissions__th20:nth-child(4) {
            width: 70px;
          }
          
          .user-role-permissions__th20:last-child {
            width: 60px;
          }

          .user-role-permissions__action-btn20 {
            width: 24px;
            height: 24px;
          }

          .user-role-permissions__action-btn20 svg {
            width: 12px;
            height: 12px;
          }

          .user-role-permissions__modal-overlay20 {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default RolePermissions;