import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../store/actions/authActions';
import Hero from "../components/Hero";

const loginWithToken = async (token) => {
    try {
        const response = await axios.get('http://localhost:8080/api/users/validateToken', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.response;
    } catch (error) {
        console.log('Error', error);
        if (error.message === 'Request failed with status code 401') {
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Limpiar usuario si el token no es válido
            return null;
        }
    }
};

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (token) {
            localStorage.setItem('token', token)

            loginWithToken(token).then((user) => {
                dispatch(setUser({ user, token }))
            })
            navigate('/home')
        }
    }, [dispatch, navigate])

    return (
        <>
            <Hero />
        </>
    );
}