import React, { useEffect, useState } from "react";
import { fetchGenera, createGenus } from "../api/utilities";
import { Link } from "react-router-dom";

const GenusList = () => {
  const [genera, setGenera] = useState([]);
  const [newGenus, setNewGenus] = useState({
    genusName: "",
    familyName: "",
    description: "",
    species: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenera();
        setGenera(data);
      } catch (error) {
        console.error("Error fetching genera:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGenus((prevNewGenus) => ({
      ...prevNewGenus,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createGenus(newGenus);
      setNewGenus({
        genusName: "",
        familyName: "",
        description: "",
        species: [],
      });
      const updatedGenera = await fetchGenera();
      setGenera(updatedGenera);
    } catch (error) {
      console.error("Error creating genus:", error);
    }
  };

  return (
    <div>
      <h2>Genus List</h2>
      <ul>
        {genera.map((genus) => (
          <li key={genus.genusName}>
            <Link to={`/genera/${genus.genusName}`}>{genus.genusName}</Link>
          </li>
        ))}
      </ul>
      <h2>Create New Genus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Genus Name:</label>
          <input
            type="text"
            name="genusName"
            value={newGenus.genusName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Family Name:</label>
          <input
            type="text"
            name="familyName"
            value={newGenus.familyName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newGenus.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Genus</button>
      </form>
    </div>
  );
};

export default GenusList;
