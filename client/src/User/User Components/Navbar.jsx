import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../User CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../User Pages/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyNavbar() {
    const { isAuthenticated, login, logout, adminLogin } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        usertype: "user",
        // file: null
    });
    const [message, setMessage] = useState("");
    const nav = useNavigate();

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = () => setShow(true);

    const resetForm = () => {
        setUserData({
            name: "",
            email: "",
            password: "",
            usertype: "user",
            // file: null
        });
        setMessage("");
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setUserData((prevData) => ({
    //         ...prevData,
    //         file: file,
    //     }));
    // };

    const buildDataToSend = () => {
        const formData = new FormData();
        if (showForm) {
            return { email: userData.email, password: userData.password };
        } else {
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('name', userData.name);
            formData.append('usertype', userData.usertype);
            if (userData.file) {
                formData.append('UserCV', userData.file);
            }
            return formData;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = showForm 
        ? { email: userData.email, password: userData.password } // Only send email and password for login
        : userData; // Send all fields for signup
    
        try {
            const response = await axios({
                method: "POST",
                url: showForm ? 'http://localhost:8000/user/login' : 'http://localhost:8000/user/signup',
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(dataToSend)  
            });
    
            console.log("Response:", response.data); // Log response for debugging
    
            if (response.data.token) {
                const { usertype, _id: userId } = response.data.data;
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("UserID", userId);
    
                toast.success("Login success", { /* toast options */ });
                setTimeout(() => {
                    handleClose();
                    usertype === 'user' ? login() : adminLogin(); // Update auth context state
                    nav(usertype === 'user' ? '/' : '/admin', { replace: true });
                }, 2000);
            } else if (response.data.message === "Signup successful!") {
                toast.success("Account created successfully!", { /* toast options */ });
                setTimeout(() => {
                    resetForm();
                    setShowForm(true);
                }, 2100);
            } else {
                setMessage("Something went wrong, please try again.");
            }
        } catch (error) {
            console.error("Error during submit:", error); // Log error for debugging
            toast.error(error.response?.data?.message || "Something went wrong", { /* toast options */ });
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };
    
    
    const handleLogout = () => {
        toast.dismiss(); // Dismiss previous toasts
        toast.success("Logout success", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
        setTimeout(() => {
            localStorage.clear();
            logout();
            nav('/');
        }, 2000);
    };
    

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                    <Modal.Title>{showForm ? "Login" : "SignUp"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && <p className="custom-alert-message">{message}</p>}
                    <form onSubmit={handleSubmit} className="custom-modal-form">
                        {!showForm && (
                            <TextField id="name" label="Name" variant="outlined" name="name" value={userData.name} onChange={handleInputChange} className="custom-modal-input" />
                        )}
                        <TextField id="email" label="Email" variant="outlined" name="email" value={userData.email} onChange={handleInputChange} className="custom-modal-input" />
                        <TextField id="password" label="Password" variant="outlined" name="password" value={userData.password} onChange={handleInputChange} className="custom-modal-input" />
                        {/* {!showForm && (
                          <input
                          type="file"
                          accept=".pdf, application/pdf" // Accepts both the .pdf extension and the PDF MIME type
                          required
                          name="UserCV"
                          onChange={handleFileChange}
                          style={{ marginTop: '10px' }}
                      />
                        )} */}
                        <Button variant="contained" type="submit" className="custom-modal-btn">
                            {showForm ? "Login" : "Create Account"}
                        </Button>
                        <p className="custom-modal-link" onClick={() => setShowForm(!showForm)}>
                            {showForm ? "Don't have an account? SignUp" : "Already have an account? Login"}
                        </p>
                    </form>
                </Modal.Body>
            </Modal>

            <Navbar expand="lg" className="custom-navbar">
                <Navbar.Brand href="/" className="navbar-brand ms-lg-5 ms-3">
                    MY APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='me-5'>
                    <Nav className="ms-lg-auto ms-3 me-lg-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                            HOME
                        </NavLink>
                        <NavLink to="/userjobs" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                           JOBS
                        </NavLink>
                        <NavLink to="/userappliedjobs" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                           APPLIED JOBS
                        </NavLink>
                        <NavLink to="/userprofile" className={({ isActive }) => isActive ? 'nav-link active' : "nav-link"}>
                           PROFILE
                        </NavLink>
                    </Nav>
                    <Form inline className="ms-lg-5 ms-3 search-form">
                        {
                            isAuthenticated ? (
                                <Button variant="contained" color='success' onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Button variant="contained" color='success' onClick={handleShow}>
                                    {showForm ? "Login" : "SignUp"}
                                </Button>
                            )
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default MyNavbar;
