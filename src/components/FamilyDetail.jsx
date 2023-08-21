import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchFamilies,
  updateFamily,
  deleteFamily
} from '../api/utilities';

function FamilyDetail() {
  const { familyName } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedFamily, setUpdatedFamily] = useState({
    familyName: '',
    derivation: '',
    meaning: '',
    orderName: '',
    uses: [],
    description: '',
    genera: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familiesData = await fetchFamilies();
        const selectedFamily = familiesData.find(
          family => family.familyName === familyName
        );
        setFamily(selectedFamily);
        setUpdatedFamily(selectedFamily);
      } catch (error) {
        console.error('Error fetching families:', error);
      }
    };

    fetchData();
  }, [familyName]);

  const handleUpdate = async () => {
    try {
      await updateFamily(family.familyName, updatedFamily);
      setFamily(updatedFamily);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating family:', error);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete ${family.familyName}?`)
    ) {
      try {
        await deleteFamily(family.familyName);
        navigate('/families');
      } catch (error) {
        console.error('Error deleting family:', error);
      }
    }
  };

  if (!family) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{family.familyName}</h2>
      {editMode ? (
        <div>
          <label>
            Family Name:
            <input
              type="text"
              value={updatedFamily.familyName}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  familyName: e.target.value
                })
              }
            />
          </label>
          <label>
            Derivation:
            <input
              type="text"
              value={updatedFamily.derivation}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  derivation: e.target.value
                })
              }
            />
          </label>
          <label>
            Meaning:
            <input
              type="text"
              value={updatedFamily.meaning}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  meaning: e.target.value
                })
              }
            />
          </label>
          <label>
            Order Name:
            <input
              type="text"
              value={updatedFamily.orderName}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  orderName: e.target.value
                })
              }
            />
          </label>
          <label>
            Uses:
            <input
              type="text"
              value={updatedFamily.uses.join(', ')}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  uses: e.target.value.split(', ')
                })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={updatedFamily.description}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  description: e.target.value
                })
              }
            />
          </label>
          <label>
            Genera:
            <input
              type="text"
              value={updatedFamily.genera.join(', ')}
              onChange={e =>
                setUpdatedFamily({
                  ...updatedFamily,
                  genera: e.target.value.split(', ')
                })
              }
            />
          </label>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Derivation: {family.derivation}</p>
          <p>Meaning: {family.meaning}</p>
          <p>Order Name: {family.orderName}</p>
          <p>Uses: {family.uses.join(', ')}</p>
          <p>Description: {family.description}</p>
          <p>Genera: {family.genera.join(', ')}</p>
          <button onClick={() => setEditMode(true)}>Edit Family</button>
          <button onClick={handleDelete}>Delete Family</button>
        </div>
      )}
    </div>
  );
}

export default FamilyDetail;
