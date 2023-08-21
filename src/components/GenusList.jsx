import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenera } from '../api/utilities'; // Update the import path based on your project structure

function GenusList() {
  const [genera, setGenera] = useState([]);

  useEffect(() => {
    // Fetch genera data when the component mounts
    const fetchData = async () => {
      try {
        const generaData = await fetchGenera(); // Use the correct import path
        setGenera(generaData);
      } catch (error) {
        console.error('Error fetching genera:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Genus List</h2>
      <ul>
        {genera.map((genus) => (
          <li key={genus._id}>
            <Link to={`/genera/${genus._id}`}>{genus.genusName}</Link> - {genus.familyName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenusList;
