import React, { useState } from 'react';
import Filters from './components/Filters';
import SearchResults from './components/SearchResults'; 

function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    owner: '',
    lawFirm: '',
    attorney: '',
  });
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');

  // Toggle function to show/hide filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle search functionality
  const handleSearch = () => {
    setStatus('Searching...');
    const queryParams = {
      query: searchTerm,
      status: filters.status !== 'all' ? filters.status : undefined,
      owner: filters.owner || undefined,
      lawFirm: filters.lawFirm || undefined,
      attorney: filters.attorney || undefined,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    fetch(`API_TRADEMARKIA?${queryString}`)
      .then(response => response.json())
      .then(data => {
        const filteredResults = data.results.filter(result => 
          result.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
        setStatus(filteredResults.length ? '' : 'No Results Found');
      })
      .catch(() => setStatus('Error Occurred'));
  };

  // Handle changes in filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    handleSearch(); // Call handleSearch to apply filters
  };

  return (
    <div className="container mx-auto p-4">
      {/* Flex container to position the search bar and results/filter side by side */}
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex items-center">
            {/* Logo */}
            <img
              src="https://www.trademarkia.com/_next/image?url=%2Fassets%2Fimages%2Flogo_trademarkia.png&w=384&q=75" // Logo path
              alt="Logo"
              className="w-18 h-7 mr-4"
            />

            
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              placeholder="Search Trademark Here eg. Mickey Mouse" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
            />
            <button 
              onClick={handleSearch} 
              className="ml-4 p-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
            <button 
              onClick={toggleFilters} 
              className={`ml-4 p-2 rounded ${showFilters ? 'bg-gray-300 text-gray-700' : 'bg-gray-100 text-gray-500'}`}
              style={{ marginTop: '8px' }} 
            >
              Filter
            </button>
          </div>

          {status && <p className="mt-4 text-center">{status}</p>}

          <div className="mt-4">
            <SearchResults results={results} /> 
          </div>
        </div>

       
        {showFilters && (
          <div className="w-1/5 ml-4">
            <Filters onFilterChange={handleFilterChange} filters={filters} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
