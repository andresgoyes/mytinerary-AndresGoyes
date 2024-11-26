import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authActions";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = async (email, password) => {        
        const success = await dispatch(login({ email, password }));

        if (success) {            
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return { signIn };
};

const LoginForm = () => {
    const { signIn } = useLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) {
            alert("Please fill all");
            return;
        }
        signIn(email, password);
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
                boxShadow: 3
                
            }}
        >
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Sign In
            </Typography>
         
            <Typography variant="body1" color="text.secondary" paragraph>
                Welcome, enter your credentials.
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

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;