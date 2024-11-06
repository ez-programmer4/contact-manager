import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Adjust if your backend runs on a different port

const api = axios.create({
  baseURL: API_URL,
});

// Get the token from local storage or your preferred state management
const getToken = () => localStorage.getItem("token");

// User authentication
export const registerUser = (userData) => api.post("/user/register", userData);
export const loginUser = (userData) => api.post("/user/login", userData);

// User Profile Management
export const getCurrentUser = async (token) => {
  const response = await api.get("/user/current", {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
  return response.data; // Return user data
};

export const updateUserProfile = async (userData, token) => {
  const response = await api.put("/user/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
  return response.data; // Return updated user data if needed
};

// Contacts
export const getContacts = () => api.get("/contacts");

export const createContact = (contact) => {
  return api.post("/contacts", contact, {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Include the token in the header
    },
  });
};

export const updateContact = (id, contact) =>
  api.put(`/contacts/${id}`, contact, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
};

// Toggle favorite
export const toggleFavoriteContact = (id, data) => {
  return api.put(`/contacts/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Import/Export Contacts
export const importContacts = (formData) => {
  return api.post(`/contacts/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const exportContacts = () => {
  return api.get(`/contacts/export`, {
    responseType: "blob",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
