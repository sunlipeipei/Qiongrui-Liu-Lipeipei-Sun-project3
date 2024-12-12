import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SearchResultPage.css';

const SearchResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null); // reset errorMessage 
    if (query) {
      axios
        .get(`/api/user/search/${query}`, {
            withCredentials: true, })
        .then(response => setResults(response.data))
        .catch(error => {
            console.error('Error fetching search results:', error);
            setError('Unable to fetch search results.');
        });
    }
  }, [query]);

  if (!query) {
    return <p>No search query provided.</p>;
  }

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      {error && <p className="error-message">{error}</p>}
      {results.length > 0 ? (
        <ul className="results-list">
          {results.map((user) => (
            <li key={user._id}>
              <Link to={`/user/${user.username}`} className="result-link">
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found matching "{query}".</p>
      )}
    </div>
  );
};

export default SearchResultPage;
