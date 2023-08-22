import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllSpecies } from '../api/utilities'; 

function SpeciesList() {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllSpecies();
        setSpeciesList(data);
      } catch (error) {
        console.error('Error fetching species list:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Species List</h2>
      <ul>
        {speciesList.map((species) => (
          <li key={species._id}>
            <Link to={`/species/${species.speciesName}`}>
              {species.speciesName} - {species.commonName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeciesList;
