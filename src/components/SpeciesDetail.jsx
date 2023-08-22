import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAllSpecies, updateSpecies, deleteSpecies } from '../api/utilities';

function SpeciesDetail() {
  const { speciesName } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedSpecies, setUpdatedSpecies] = useState({
    speciesName: "",
    commonName: "",
    genusName: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesData = await fetchAllSpecies();
        const selectedSpecies = speciesData.find(
          species => species.speciesName === speciesName
        );
        setSpecies(selectedSpecies);
        setUpdatedSpecies(selectedSpecies);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchData();
  }, [speciesName]);

  const handleUpdate = async () => {
    try {
      await updateSpecies(species.speciesName, updatedSpecies);
      setSpecies(updatedSpecies);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating species:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${species.speciesName}?`)) {
      try {
        await deleteSpecies(species.speciesName);
        navigate('/species');
      } catch (error) {
        console.error('Error deleting species:', error);
      }
    }
  };

  if (!species) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{species.speciesName}</h2>
      {editMode ? (
        <div>
          <label>
            Species Name:
            <input
              type="text"
              value={updatedSpecies.speciesName}
              onChange={e =>
                setUpdatedSpecies({
                  ...updatedSpecies,
                  speciesName: e.target.value
                })
              }
            />
          </label>
          <label>
            Common Name:
            <input
              type="text"
              value={updatedSpecies.commonName}
              onChange={e =>
                setUpdatedSpecies({
                  ...updatedSpecies,
                  commonName: e.target.value
                })
              }
            />
          </label>
          <label>
            Genus Name:
            <textarea
              value={updatedSpecies.genusName}
              onChange={e =>
                setUpdatedSpecies({
                  ...updatedSpecies,
                  genusName: e.target.value
                })
              }
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={updatedSpecies.image}
              onChange={e =>
                setUpdatedSpecies({
                  ...updatedSpecies,
                  image: e.target.value
                })
              }
            />
          </label>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
            <p>Species Name: {species.speciesName}</p>
            <img src={species.image} alt={species.speciesName} style={{ maxWidth: '100%' }} />  
            <p>Common Name: {species.commonName}</p>
            <p>Genus Name: {species.genusName}</p>
          <button onClick={() => setEditMode(true)}>Edit Species</button>
          <button onClick={handleDelete}>Delete Species</button>
        </div>
      )}
    </div>
  );
}

export default SpeciesDetail;
