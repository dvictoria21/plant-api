import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenus } from '../api/utilities';

function GenusDetail() {
  const { genusName } = useParams();
  const [genus, setGenus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genusData = await fetchGenus(genusName);
        setGenus(genusData);
      } catch (error) {
        console.error('Error fetching genus:', error);
      }
    };

    fetchData();
  }, [genusName]);

  if (!genus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Genus Name: {genus.genusName}</h2>
      <p>Description: {genus.description}</p>
    </div>
  );
}

export default GenusDetail;
