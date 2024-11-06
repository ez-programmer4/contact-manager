import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddContact from "./components/AddContact"; // Component for adding contacts
import EditContact from "./components/EditContact"; // Component for editing contacts
import ContactList from "./components/ContactList"; // Component for displaying contacts
import NotFound from "./components/NotFound"; // Component for handling 404 errors
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile"; // Import UserProfile component

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />{" "}
        {/* New route for UserProfile */}
        <Route path="/contactlist" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="*" element={<NotFound />} /> {/* Handle 404 errors */}
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
