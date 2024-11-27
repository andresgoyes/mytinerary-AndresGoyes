import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCities } from "../store/actions/citiesActions"; 
import { TextField, Button, MenuItem, Typography, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCreateUser = () => {
    const navigate = useNavigate(); 

    const createUser = async (formData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/users/register", formData);
            navigate("/login"); 
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message?.join(", ") || 
                                 error.response?.data?.response || 
                                 "Error occurred during registration.";
            return errorMessage;
        }
    };

    return { createUser };
};

const UserForm = () => {
    const dispatch = useDispatch();
    const { cities, loading } = useSelector((state) => state.cities);
    const { createUser } = useCreateUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        photoUrl: "",
        country: "",
    });

    const [errorMessage, setErrorMessage] = useState("");  // State to handle error messages
    const [successMessage, setSuccessMessage] = useState("");  // State to handle success messages

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requiredFields = ["name", "lastName", "email", "password", "photoUrl", "country"];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }

        const response = await createUser(formData);

        if (response?.message) {
            setSuccessMessage(response.message || "User created successfully");
        } else {
            setErrorMessage(response || "An error occurred during registration.");
        }
    };

    const uniqueCountries = useMemo(() => {
        return [...new Set(cities.map((city) => city.country))];
    }, [cities]);

    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:8080/api/auth/signIn/google';
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Sign Up
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
                Welcome, please enter your details.
            </Typography>

            {["name", "lastName", "email", "password", "photoUrl"].map((field) => (
                <TextField
                    key={field}
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
            ))}

            {loading ? (
                <Typography>Loading countries...</Typography>
            ) : (
                <TextField
                    fullWidth
                    select
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    margin="normal"
                >
                    {uniqueCountries.map((country) => (
                        <MenuItem key={country} value={country}>
                            {country}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Register
            </Button>
            <Button
                onClick={loginWithGoogle}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={
                    <img
                        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                        alt="Google icon"
                        height={24}
                        width={24}
                    />
                }
            >
                Register with Google
            </Button>

            {/* Success Snackbar */}
            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage("")}
                message={successMessage}
            />

            {/* Error Snackbar */}
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={() => setErrorMessage("")}
                message={errorMessage}
            />
        </Box>
    );
};

export default UserForm;