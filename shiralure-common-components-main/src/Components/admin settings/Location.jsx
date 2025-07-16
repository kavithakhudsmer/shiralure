import React, { useState, useEffect } from 'react';
import { Search, X, AlertCircle, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight ,Save} from 'lucide-react';
import './Location.css';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    countries: '',
    states: '',
    cities: '',
    status: ''
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationForm, setLocationForm] = useState({
    country: '',
    state: '',
    city: '',
    status: 'Active'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API to fetch dynamic data
  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, country: 'United States', state: 'New York', city: 'New York City', status: 'Active' },
            { id: 2, country: 'United States', state: 'Illinois', city: 'Chicago', status: 'Active' },
            { id: 3, country: 'India', state: 'Tamil Nadu', city: 'Chennai', status: 'Active' },
            { id: 4, country: 'Canada', state: 'Ontario', city: 'Toronto', status: 'Inactive' },
            { id: 5, country: 'United Kingdom', state: 'England', city: 'London', status: 'Active' },
            { id: 6, country: 'Australia', state: 'New South Wales', city: 'Sydney', status: 'Inactive' },
          ]);
        }, 1000);
      });
      setLocations(response);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch locations');
      setIsLoading(false);
    }
  };

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Dynamic options for select inputs
  const countries = [...new Set(locations.map(loc => loc.country))];
  const states = [...new Set(locations.map(loc => loc.state))];
  const cities = [...new Set(locations.map(loc => loc.city))];

  const filteredLocations = locations.filter(location => {
    return (
      location.country.toLowerCase().includes(searchFilters.countries.toLowerCase()) &&
      location.state.toLowerCase().includes(searchFilters.states.toLowerCase()) &&
      location.city.toLowerCase().includes(searchFilters.cities.toLowerCase()) &&
      (searchFilters.status === '' || location.status === searchFilters.status)
    );
  });

  const handleSearch = () => {
    console.log('Search applied');
  };

  const handleClear = () => {
    setSearchFilters({
      countries: '',
      states: '',
      cities: '',
      status: ''
    });
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setLocationForm({
      country: location.country,
      state: location.state,
      city: location.city,
      status: location.status
    });
    setShowLocationModal(true);
  };

  const handleDelete = (location) => {
    setSelectedLocation(location);
    setShowDeleteModal(true);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      setLocations(locations.map(loc =>
        loc.id === selectedLocation.id
          ? { ...loc, ...locationForm }
          : loc
      ));
    } else {
      const newLocation = {
        id: Date.now(),
        ...locationForm
      };
      setLocations([...locations, newLocation]);
    }
    
    setShowLocationModal(false);
    setSelectedLocation(null);
    setLocationForm({
      country: '',
      state: '',
      city: '',
      status: 'Active'
    });
  };

  const handleConfirmDelete = () => {
    setLocations(locations.filter(loc => loc.id !== selectedLocation.id));
    setShowDeleteModal(false);
    setSelectedLocation(null);
  };

  const handleAddNew = () => {
    setSelectedLocation(null);
    setLocationForm({
      country: '',
      state: '',
      city: '',
      status: 'Active'
    });
    setShowLocationModal(true);
  };

  if (error) {
  return (
    <div className="location7-error7-boundary7">
      <h2>Error</h2>
      <p>{error}</p>
      <button onClick={fetchLocations}>Retry</button>
    </div>
  );
}

return (
  <div className="location7-management7-container7">
    {/* Header */}
    <div className="location7-management7-header7">
      <div className="location7-header7-controls7">
        <button className="location7-icon7-btn7">
          <ChevronDown size={16} />
        </button>
        <button className="location7-icon7-btn7">
          <Search size={16} />
        </button>
        <button className="location7-icon7-btn7" onClick={handleAddNew}>
          <Edit size={16} />
        </button>
      </div>
    </div>

    {/* Search Filters */}
    <div className="location7-search7-section7">
      <div className="location7-search7-row7">
        <div className="location7-search7-group7">
          <label>Countries</label>
          <input
            type="text"
            placeholder="Countries"
            value={searchFilters.countries}
            onChange={(e) => setSearchFilters({...searchFilters, countries: e.target.value})}
          />
        </div>
        <div className="location7-search7-group7">
          <label>States</label>
          <input
            type="text"
            placeholder="States"
            value={searchFilters.states}
            onChange={(e) => setSearchFilters({...searchFilters, states: e.target.value})}
          />
        </div>
      </div>
      <div className="location7-search7-row7">
        <div className="location7-search7-group7">
          <label>Cities</label>
          <input
            type="text"
            placeholder="Cities"
            value={searchFilters.cities}
            onChange={(e) => setSearchFilters({...searchFilters, cities: e.target.value})}
          />
        </div>
        <div className="location7-search7-group7">
          <label>Status</label>
          <select
            value={searchFilters.status}
            onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="location7-search7-buttons7">
        <button className="location7-search7-btn7" onClick={handleSearch}>
          <Search size={16} />
          Search
        </button>
        <button className="location7-clear7-btn7" onClick={handleClear}>
          <X size={16} />
          Clear
        </button>
      </div>
    </div>

    {/* Data Table */}
    <div className="location7-table7-container7">
      {isLoading ? (
        <div className="location7-loading7">Loading...</div>
      ) : filteredLocations.length === 0 ? (
        <div className="location7-empty7-state7">
          <h3>No Locations Found</h3>
          <p>Try adjusting your search filters or add a new location.</p>
        </div>
      ) : (
        <table className="location7-data7-table7">
          <thead>
            <tr>
              <th>Countries</th>
              <th>States</th>
              <th>Cities</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((location) => (
              <tr key={location.id}>
                <td>{location.country}</td>
                <td>{location.state}</td>
                <td>{location.city}</td>
                <td>
                  <span className={`location7-status7 location7-status7-${location.status.toLowerCase()}7`}>
                    {location.status}
                  </span>
                </td>
                <td>
                  <div className="location7-action7-buttons7">
                    <button
                      className="location7-action7-btn7 location7-edit7-btn7"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="location7-action7-btn7 location7-delete7-btn7"
                      onClick={() => handleDelete(location)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* Pagination */}
    <div className="location7-pagination7">
      <span className="location7-pagination7-info7">
        Showing 1 to {filteredLocations.length} of {locations.length} entries
      </span>
      <div className="location7-pagination7-controls7">
        <button className="location7-pagination7-btn7">
          <ChevronLeft size={16} />
        </button>
        <button className="location7-pagination7-btn7 location7-pagination7-active7">1</button>
        <button className="location7-pagination7-btn7">2</button>
        <button className="location7-pagination7-btn7">3</button>
        <button className="location7-pagination7-btn7">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>

    {/* Location Modal */}
    {showLocationModal && (
      <div className="location7-modal7-overlay7">
        <div className="location7-modal7">
          <div className="location7-modal7-header7">
            <h3>Location</h3>
          </div>
          <div className="location7-modal7-body7">
            <div className="location7-form7-row7">
              <div className="location7-form7-group7">
                <label>Country</label>
                <select
                  value={locationForm.country}
                  onChange={(e) => setLocationForm({...locationForm, country: e.target.value})}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown className="location7-select7-icon7" size={16} />
              </div>
              <div className="location7-form7-group7">
                <label>State</label>
                <select
                  value={locationForm.state}
                  onChange={(e) => setLocationForm({...locationForm, state: e.target.value})}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="location7-select7-icon7" size={16} />
              </div>
            </div>
            <div className="location7-form7-row7">
              <div className="location7-form7-group7">
                <label>City</label>
                <select
                  value={locationForm.city}
                  onChange={(e) => setLocationForm({...locationForm, city: e.target.value})}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="location7-select7-icon7" size={16} />
              </div>
              <div className="location7-form7-group7">
                <label>Action</label>
                <div className="location7-radio7-group7">
                  <label className="location7-radio7-label7">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={locationForm.status === 'Active'}
                      onChange={(e) => setLocationForm({...locationForm, status: e.target.value})}
                    />
                    Active
                  </label>
                  <label className="location7-radio7-label7">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={locationForm.status === 'Inactive'}
                      onChange={(e) => setLocationForm({...locationForm, status: e.target.value})}
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="location7-modal7-footer7">
            <button
              className="location7-btn7 location7-btn7-primary7"
              onClick={handleSaveLocation}
            >
              Save
            </button>
            <button
              className="location7-btn7 location7-btn7-secondary7"
              onClick={() => setShowLocationModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <div className="location7-modal7-overlay7">
        <div className="location7-modal7 location7-delete7-modal7">
          <div className="location7-modal7-body7">
            <div className="location7-delete7-icon7">
              <AlertCircle size={48} color="#fbbf24" />
            </div>
            <h3>Are you sure?</h3>
            <p>You will not be able to recover the deleted record!</p>
          </div>
          <div className="location7-modal7-footer7">
            <button
              className="location7-btn7 location7-btn7-primary7"
              onClick={handleConfirmDelete}
            >
              Yes, Delete it!
            </button>
            <button
              className="location7-btn7 location7-btn7-secondary7"
              onClick={() => setShowDeleteModal(false)}
            >
              No, Cancel!
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Location;