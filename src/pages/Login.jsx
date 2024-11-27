import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authActions";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        const success = await dispatch(login({ email, password }));
        if (success) {
            navigate("/");
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:8080/api/auth/signIn/google";
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: "auto",
                my: 14,
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Sign In
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
                Welcome! Enter your credentials to access the app.
            </Typography>

            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>

            <Button
                onClick={loginWithGoogle}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#0186F9", color: "#fff" }}
            >
                Login with Google
            </Button>
        </Box>
    );
};

export default LoginForm;
