import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, CheckCircle } from 'lucide-react';

const Analytics = () => {
  const [entries, setEntries] = useState([
    { id: 1, name: 'Abcd', status: 'Available' },
    { id: 2, name: 'Efgh', status: 'Available' },
    { id: 3, name: 'Ibcd', status: 'Available' }
  ]);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deletingEntry, setDeletingEntry] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Available' });

  const handleAdd = () => {
    setEditingEntry(null);
    setFormData({ name: '', status: 'Available' });
    setShowEditModal(true);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({ name: entry.name, status: entry.status });
    setShowEditModal(true);
  };

  const handleDelete = (entry) => {
    setDeletingEntry(entry);
    setShowDeleteModal(true);
  };

  const handleSave = () => {
    if (editingEntry) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, name: formData.name, status: formData.status }
          : entry
      ));
    } else {
      setEntries([...entries, { 
        id: Date.now(), 
        name: formData.name, 
        status: formData.status 
      }]);
    }
    setShowEditModal(false);
    setEditingEntry(null);
    setFormData({ name: '', status: 'Available' });
  };

  const confirmDelete = () => {
    setEntries(entries.filter(entry => entry.id !== deletingEntry.id));
    setShowDeleteModal(false);
    setDeletingEntry(null);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditingEntry(null);
    setDeletingEntry(null);
    setFormData({ name: '', status: 'Available' });
  };

  // Exclamation Icon for delete confirmation
  const ExclamationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#FFC107" strokeWidth="2" />
      <path d="M12 8V12" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#FFC107" />
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>Analytics</h1>
          <button 
            onClick={handleAdd}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
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
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#666666', // Adjusted to match Company label color
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>NAME</th>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#666666', // Adjusted to match Company label color
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>STATUS</th>
                <th style={{
                  textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#666666', // Adjusted to match Company label color
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} style={{
                  borderBottom: '1px solid #f3f4f6',
                  ':hover': { backgroundColor: '#f9fafb' }
                }}>
                  <td style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    color: '#1f2937',
                    fontWeight: '500'
                  }}>{entry.name}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#dcfce7',
                      color: '#166534'
                    }}>{entry.status}</span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(entry)}
                        style={{
                          backgroundColor: '#dcfce7',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <Edit size={16} color="#10b981" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry)}
                        style={{
                          backgroundColor: '#fef3c7',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <Trash2 size={16} color="#f59e0b" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#fafafa'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Showing 1 to {entries.length} of {entries.length} entries
          </p>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showEditModal && (
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
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>{editingEntry ? 'Edit Analytics' : 'Add Analytics'}</h2>
              <button onClick={closeModal} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: '#6b7280'
              }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px', // Adjusted to match Company labels
                  fontWeight: '500', // Adjusted to match Company labels
                  color: '#666666', // Adjusted to match Company labels
                  marginBottom: '8px'
                }}>
                  NAME <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1f2937',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter name"
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px', // Adjusted to match Company labels
                  fontWeight: '500', // Adjusted to match Company labels
                  color: '#666666', // Adjusted to match Company labels
                  marginBottom: '8px'
                }}>
                  STATUS <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      id="available"
                      name="status"
                      value="Available"
                      checked={formData.status === 'Available'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                    />
                    <label htmlFor="available" style={{
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer'
                    }}>Available</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      id="unavailable"
                      name="status"
                      value="Unavailable"
                      checked={formData.status === 'Unavailable'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                    />
                    <label htmlFor="unavailable" style={{
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer'
                    }}>Unavailable</label>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              padding: '20px 24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button onClick={handleSave} style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(99, 102, 241, 0.2)'
              }}>
                <CheckCircle size={16} />
                Save
              </button>
              <button onClick={closeModal} style={{
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}>
                <X size={16} />
                Close
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
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <ExclamationIcon />
            </div>
            
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              Are you sure ?
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 24px 0',
              lineHeight: '1.5'
            }}>
              You will not be able to recover the deleted record!
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button onClick={confirmDelete} style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(99, 102, 241, 0.2)'
              }}>
                Yes, Delete it !
              </button>
              <button onClick={closeModal} style={{
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(107, 114, 128, 0.2)'
              }}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;