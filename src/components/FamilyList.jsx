import React, { useEffect, useState } from "react";
import { fetchFamilies, createFamily } from "../api/utilities";
import { Link } from "react-router-dom";

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const [newFamily, setNewFamily] = useState({
    familyName: "",
    derivation: "",
    meaning: "",
    orderName: "",
    uses: [],
    description: "",
    genera: [],
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewFamily((prevNewFamily) => ({
      ...prevNewFamily,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createFamily(newFamily);
      setNewFamily({
        familyName: "",
        derivation: "",
        meaning: "",
        orderName: "",
        uses: [],
        description: "",
        genera: [],
      });
      const updatedFamilies = await fetchFamilies();
      setFamilies(updatedFamilies);
    } catch (error) {
      console.error("Error creating family:", error);
    }
  };

  return (
    <div>
      <h2>Family List</h2>
      <ul>
        {families.map((family) => (
          <li key={family._id}>
            <Link to={`/families/${family.familyName}`}>{family.familyName}</Link>
          </li>
        ))}
      </ul>
      <h2>Create New Family</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Family Name:
          <input
            type="text"
            name="familyName"
            value={newFamily.familyName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Derivation:
          <input
            type="text"
            name="derivation"
            value={newFamily.derivation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Meaning:
          <input
            type="text"
            name="meaning"
            value={newFamily.meaning}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Order Name:
          <input
            type="text"
            name="orderName"
            value={newFamily.orderName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Uses (comma-separated):
          <input
            type="text"
            name="uses"
            value={newFamily.uses.join(", ")}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newFamily.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Genera (comma-separated):
          <input
            type="text"
            name="genera"
            value={newFamily.genera.join(", ")}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Family</button>
      </form>
    </div>
  );
};

export default FamilyList;
