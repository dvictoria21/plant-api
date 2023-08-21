// src/components/FamilyList.js

import React, { useEffect, useState } from "react";
import { fetchFamilies, deleteFamily } from "../api/utilities";

const FamilyList = () => {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFamilies();
        setFamilies(data);
      } catch (error) {
        console.error("Error fetching families:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFamily = async (familyName) => {
    try {
      await deleteFamily(familyName);
      // After deleting, update the list of families
      const updatedFamilies = families.filter((family) => family.familyName !== familyName);
      setFamilies(updatedFamilies);
    } catch (error) {
      console.error("Error deleting family:", error.message);
    }
  };

  return (
    <div>
      <h2>Family List</h2>
      <ul>
        {families.map((family) => (
          <li key={family._id}>
            {family.familyName} - {family.derivation}
            <button onClick={() => handleDeleteFamily(family.familyName)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FamilyList;
