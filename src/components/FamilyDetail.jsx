import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFamily } from '../api/utilities'; // Make sure to import the correct function

function FamilyDetail() {
  const { id } = useParams();
  const [family, setFamily] = useState(null);

  useEffect(() => {
    // Fetch family data when the component mounts
    const fetchData = async () => {
      try {
        const familyData = await fetchFamily(id);
        setFamily(familyData);
      } catch (error) {
        console.error('Error fetching family:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!family) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{family.familyName}</h2>
      <p>Derivation: {family.derivation}</p>
      <p>Meaning: {family.meaning}</p>
      {/* Render other family information */}
    </div>
  );
}

export default FamilyDetail;
