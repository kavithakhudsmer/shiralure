import React, { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

const Units = () => {
  const [units, setUnits] = useState([
    { id: 1, name: 'Kilogram', code: 'kg', status: 'Active' },
    { id: 2, name: 'Liter', code: 'l', status: 'Inactive' },
    { id: 3, name: 'Piece', code: 'pc', status: 'Active' },
    { id: 4, name: 'Dozen', code: 'dz', status: 'Inactive' },
    { id: 5, name: 'Meter', code: 'm', status: 'Active' },
    { id: 6, name: 'Gram', code: 'g', status: 'Active' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active'
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(units.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUnits = units.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = () => {
    setEditingUnit(null);
    setFormData({ name: '', code: '', status: 'Active' });
    setShowModal(true);
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setFormData({ name: unit.name, code: unit.code, status: unit.status });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUnits(units.filter(unit => unit.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (editingUnit) {
      setUnits(units.map(unit => 
        unit.id === editingUnit.id 
          ? { ...unit, ...formData }
          : unit
      ));
    } else {
      const newUnit = {
        id: Math.max(...units.map(u => u.id)) + 1,
        ...formData
      };
      setUnits([...units, newUnit]);
    }
    setShowModal(false);
    setFormData({ name: '', code: '', status: 'Active' });
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: '', code: '', status: 'Active' });
  };

  // Exclamation Icon SVG (for delete confirmation)
  const ExclamationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#FFC107" strokeWidth="2" />
      <path d="M12 8V12" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#FFC107" />
    </svg>
  );

  // Plus Icon SVG
  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Units</h1>
          <button 
            onClick={handleAdd} 
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(99, 102, 241, 0.2)'
            }}
          >
            <PlusIcon />
            Add Unit
          </button>
        </div>

        {/* Table Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Code</th>
                  <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUnits.map((unit) => (
                  <tr key={unit.id} style={{ ':hover': { backgroundColor: '#f9fafb' } }}>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #f3f4f6' }}>{unit.name}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #f3f4f6' }}>{unit.code}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        backgroundColor: unit.status.toLowerCase() === 'active' ? '#dcfce7' : '#fee2e2',
                        color: unit.status.toLowerCase() === 'active' ? '#166534' : '#dc2626'
                      }}>
                        {unit.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => alert(`Viewing unit: ${unit.name}`)} // Placeholder for view action
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#f8d7da', /* Light red background */
                            border: 'none',
                            borderRadius: '50%', /* Circular shape */
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                          }}
                        >
                          <Eye size={16} color="#dc3545" /> {/* Red icon for view */}
                        </button>
                        <button
                          onClick={() => handleEdit(unit)}
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#d1e7dd', /* Light green background */
                            border: 'none',
                            borderRadius: '50%', /* Circular shape */
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                          }}
                        >
                          <Edit size={16} color="#28a745" /> {/* Green icon for edit */}
                        </button>
                        <button
                          onClick={() => handleDelete(unit.id)}
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#fff3cd', /* Light orange background */
                            border: 'none',
                            borderRadius: '50%', /* Circular shape */
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            opacity: 0.9
                          }}
                        >
                          <Trash2 size={16} color="#f0ad4e" /> {/* Orange icon for delete */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, units.length)} of {units.length} entries
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  borderRadius: '4px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                ‹
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    border: '1px solid #d1d5db',
                    background: currentPage === i + 1 ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'white',
                    color: currentPage === i + 1 ? 'white' : '#374151',
                    borderColor: currentPage === i + 1 ? '#4f46e5' : '#d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  borderRadius: '4px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 20px 0' }}>
                {editingUnit ? 'Edit Unit' : 'Add Unit'}
              </h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Name*
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#1f2937',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter unit name"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Code*
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#1f2937',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter unit code"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Status*
                </label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                    />
                    Active
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button 
                  onClick={handleClose} 
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Close
                </button>
                <button 
                  onClick={handleSave} 
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <ExclamationIcon />
              </div>
              
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                Are you sure ?
              </h2>
              
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0', lineHeight: '1.5' }}>
                You will not be able to recover the deleted record!
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  onClick={confirmDelete} 
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  Yes, Delete it !
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)} 
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(107, 114, 128, 0.2)'
                  }}
                >
                  No, Cancel !
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Units;