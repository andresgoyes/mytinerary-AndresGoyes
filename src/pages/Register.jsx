import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCities } from "../store/actions/citiesActions"; 
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCreateUser = () => {
    const navigate = useNavigate(); 

    const createUser = async (formData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/users/register", formData);
            alert(response.data.message || "User created successfully");
            navigate("/login"); 
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message?.join(", ") || 
                                 error.response?.data?.response || 
                                 "Error";
            alert(errorMessage);
            return error;
        }
    };

    return { createUser };
};

const UserForm = () => {
    const dispatch = useDispatch();
    const { cities, loading } = useSelector((state) => state.cities);
    const { createUser } = useCreateUser();

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        photoUrl: "",
        country: "",
    });

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
            alert(`Los siguientes campos son obligatorios: ${missingFields.join(", ")}`);
            return;
        }

        await createUser(formData);
    };

    const uniqueCountries = useMemo(() => [
        ...new Set(cities.map((city) => city.country)),
    ], [cities]);

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
                <Typography>Loading...</Typography>
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
        </Box>
    );
};

export default UserForm;