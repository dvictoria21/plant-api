import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGenera, updateGenus, deleteGenus } from '../api/utilities';

function GenusDetail() {
  const { genusName } = useParams();
  const navigate = useNavigate();
  const [genus, setGenus] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedGenus, setUpdatedGenus] = useState({
    genusName: "",
    familyName: "",
    description: "",
    species: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const generaData = await fetchGenera();
        const selectedGenus = generaData.find(
          genus => genus.genusName === genusName
        );
        setGenus(selectedGenus);
        setUpdatedGenus(selectedGenus);
      } catch (error) {
        console.error('Error fetching genera:', error);
      }
    };

    fetchData();
  }, [genusName]);

  const handleUpdate = async () => {
    try {
      await updateGenus(genus.genusName, updatedGenus);
      setGenus(updatedGenus);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating genus:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${genus.genusName}?`)) {
      try {
        await deleteGenus(genus.genusName);
        navigate('/genera');
      } catch (error) {
        console.error('Error deleting genus:', error);
      }
    }
  };

  if (!genus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{genus.genusName}</h2>
      {editMode ? (
        <div>
          <label>
            Genus Name:
            <input
              type="text"
              value={updatedGenus.genusName}
              onChange={e =>
                setUpdatedGenus({
                  ...updatedGenus,
                  genusName: e.target.value
                })
              }
            />
          </label>
          <label>
            Family Name:
            <input
              type="text"
              value={updatedGenus.familyName}
              onChange={e =>
                setUpdatedGenus({
                  ...updatedGenus,
                  familyName: e.target.value
                })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={updatedGenus.description}
              onChange={e =>
                setUpdatedGenus({
                  ...updatedGenus,
                  description: e.target.value
                })
              }
            />
          </label>
          <label>
            Species (comma-separated):
            <input
              type="text"
              value={updatedGenus.species.join(', ')}
              onChange={e =>
                setUpdatedGenus({
                  ...updatedGenus,
                  species: e.target.value.split(',').map(item => item.trim())
                })
              }
            />
          </label>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Genus Name: {genus.genusName}</p>
          <p>Description: {genus.description}</p>
          <p>Family Name: {genus.familyName}</p>
          <p>Species: {genus.species.join(', ')}</p>
          <button onClick={() => setEditMode(true)}>Edit Genus</button>
          <button onClick={handleDelete}>Delete Genus</button>
        </div>
      )}
    </div>
  );
}

export default GenusDetail;
