const BASE_URL = "https://manfredjoa-plants-api-56ca2fc58166.herokuapp.com/api";

const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong.");
  }
};

export const fetchFamilies = async () => {
  const response = await fetch(`${BASE_URL}/families`);
  return handleResponse(response);
};

export const fetchGenera = async () => {
  const response = await fetch(`${BASE_URL}/genera`);
  return handleResponse(response);
};

export const fetchSpecies = async () => {
  const response = await fetch(`${BASE_URL}/species`);
  return handleResponse(response);
};

export const createFamily = async (familyData) => {
  const response = await fetch(`${BASE_URL}/families`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(familyData),
  });
  return handleResponse(response);
};

export const updateFamily = async (familyName, updatedData) => {
  const response = await fetch(`${BASE_URL}/families/edit/${familyName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

export const deleteFamily = async (familyName) => {
  const response = await fetch(`${BASE_URL}/families/delete/${familyName}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const createGenus = async (genusData) => {
  const response = await fetch(`${BASE_URL}/genera`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genusData),
  });
  return handleResponse(response);
};

export const updateGenus = async (genusName, updatedData) => {
  const response = await fetch(`${BASE_URL}/genera/edit/${genusName}`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

export const deleteGenus = async (genusName) => {
  const response = await fetch(`${BASE_URL}/genera/delete/${genusName}`, { 
  });
  return handleResponse(response);
};

export const createSpecies = async (speciesData) => {
  const response = await fetch(`${BASE_URL}/species`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(speciesData),
  });
  return handleResponse(response);
};

export const updateSpecies = async (speciesName, updatedData) => {
  const response = await fetch(`${BASE_URL}/species/edit/${speciesName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

export const deleteSpecies = async (speciesName) => {
  const response = await fetch(`${BASE_URL}/species/delete/${speciesName}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const fetchFamilyByName = async (familyName) => {
  const response = await fetch(`${BASE_URL}/families/${familyName}`);
  return handleResponse(response);
};

export const fetchGenus = async (genusName) => {
  const response = await fetch(`${BASE_URL}/genera/${genusName}`);
  const data = await handleResponse(response);
  console.log('Fetched Genus Data:', data); 
  return data;
};


export const fetchOneSpeciesByName = async (speciesName) => {
  const response = await fetch(`${BASE_URL}/species/${speciesName}`);
  return handleResponse(response);
};