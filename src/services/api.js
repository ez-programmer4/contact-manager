import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust if your backend runs on a different port

const api = axios.create({
  baseURL: API_URL,
});

// User authentication
export const registerUser = (userData) => api.post("/user/register", userData);
export const loginUser = (userData) => api.post("/user/login", userData);

// Contacts
export const getContacts = () => api.get("/contacts");
export const createContact = (contact) => api.post("/contacts", contact);
export const updateContact = (id, contact) =>
  api.put(`/contacts/${id}`, contact);
export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
};

// Toggle favorite
export const toggleFavoriteContact = (id, data) => {
  return api.put(`/contacts/${id}`, data);
};

// Import/Export Contacts
export const importContacts = (formData) => {
  return api.post(`/contacts/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const exportContacts = () => {
  return api.get(`/contacts/export`, { responseType: "blob" });
};
