import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneSpeciesByName } from '../api/utilities';

function SpeciesDetail() {
  const { speciesName } = useParams();
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesData = await fetchOneSpeciesByName(speciesName);
        setSpecies(speciesData);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchData();
  }, [speciesName]);

  if (!species) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{species.speciesName}</h2>
      <p>Common Name: {species.commonName}</p>
      <p>Genus: {species.genusName}</p>
    </div>
  );
}

export default SpeciesDetail;
