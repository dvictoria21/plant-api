import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneSpecies } from '../api/utilities'; // Update the import path based on your project structure

function SpeciesDetail() {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    // Fetch species data when the component mounts
    const fetchData = async () => {
      try {
        const speciesData = await fetchOneSpecies(id); // Use the correct import path
        setSpecies(speciesData);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!species) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{species.speciesName}</h2>
      <p>Common Name: {species.commonName}</p>
      <p>Genus: {species.genusName}</p>
      {/* Display other species information */}
    </div>
  );
}

export default SpeciesDetail;
