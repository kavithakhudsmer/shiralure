import React, { useState } from 'react';
import { Save } from 'lucide-react';

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const handleInputChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSave = () => {
    console.log('Social Media Links:', socialLinks);
    // Handle save logic here
  };

  const handleAddMoreApps = () => {
    console.log('Add more apps clicked');
    // Handle add more apps logic here
  };

  const styles = {
    container: {
      maxWidth: '768px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '24px',
      color: '#1f2937'
    },
    section: {
      marginBottom: '24px'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666666',
      marginBottom: '8px',
      textTransform: 'uppercase'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    addButtonContainer: {
      display: 'flex',
      alignItems: 'end'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#5865f2',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 24px',
      backgroundColor: '#5865f2',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '32px'
    },
    saveButtonContainer: {
      marginTop: '32px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Social Media</h2>
      
      <div>
        {/* First Row */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              FACEBOOK
            </label>
            <input
              type="text"
              value={socialLinks.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              YOUTUBE
            </label>
            <input
              type="text"
              value={socialLinks.youtube}
              onChange={(e) => handleInputChange('youtube', e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Second Row */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              INSTAGRAM
            </label>
            <input
              type="text"
              value={socialLinks.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              TWITTER
            </label>
            <input
              type="text"
              value={socialLinks.twitter}
              onChange={(e) => handleInputChange('twitter', e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Third Row */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              LINKEDIN
            </label>
            <input
              type="text"
              value={socialLinks.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.addButtonContainer}>
            <button
              onClick={handleAddMoreApps}
              style={styles.addButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <span style={{fontSize: '16px'}}>+</span>
              Add More Apps
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={styles.saveButtonContainer}>
        <button
          onClick={handleSave}
          style={styles.saveButton}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f2'}
        >
          <Save size={16} />
          Save
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;