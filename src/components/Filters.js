import React from 'react';

function Filters({ onFilterChange, filters }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <h3 className="font-bold mb-4">Status</h3>
      <div className="flex flex-col mb-4">
        <label className="inline-flex items-center">
          <input 
            type="radio" 
            name="status" 
            value="all" 
            checked={filters.status === 'all'} 
            className="form-radio" 
            onChange={onFilterChange} 
          />
          <span className="ml-2">All</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="radio" 
            name="status" 
            value="registered" 
            checked={filters.status === 'registered'} 
            className="form-radio" 
            onChange={onFilterChange} 
          />
          <span className="ml-2">Registered</span>
        </label>
       
      </div>

      <h3 className="font-bold mb-4">Owners</h3>
      <input 
        type="text" 
        name="owner" 
        value={filters.owner} 
        placeholder="Search Owners" 
        className="mb-4 p-2 border rounded" 
        onChange={onFilterChange} 
      />

      <h3 className="font-bold mb-4">Law Firms</h3>
      <input 
        type="text" 
        name="lawFirm" 
        value={filters.lawFirm} 
        placeholder="Search Law Firms" 
        className="mb-4 p-2 border rounded" 
        onChange={onFilterChange} 
      />

      <h3 className="font-bold mb-4">Attorneys</h3>
      <input 
        type="text" 
        name="attorney" 
        value={filters.attorney} 
        placeholder="Search Attorneys" 
        className="mb-4 p-2 border rounded" 
        onChange={onFilterChange} 
      />
    </div>
  );
}

export default Filters;
