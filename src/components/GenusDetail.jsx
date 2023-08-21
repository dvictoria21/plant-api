import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenus } from '../api/utilities'; // Make sure to import the correct function

function GenusDetail() {
  const { id } = useParams();
  const [genus, setGenus] = useState(null);

  useEffect(() => {
    // Fetch genus data when the component mounts
    const fetchData = async () => {
      try {
        const genusData = await fetchGenus(id);
        setGenus(genusData);
      } catch (error) {
        console.error('Error fetching genus:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!genus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{genus.genusName}</h2>
      <p>Family: {genus.familyName}</p>
      {/* Display other genus information */}
    </div>
  );
}

export default GenusDetail;
