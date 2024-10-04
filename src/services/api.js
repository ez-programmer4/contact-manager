// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust if your backend runs on a different port

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
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
  const response = await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
};
