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
    
    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:8080/api/auth/signIn/google'
    }

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
            <button onClick={() => loginWithGoogle()} className="py-2 w-80">
                <div className="flex items-center bg-[#0186F9]">
                    <div className="w-[50px] p-[1px]">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABVlBMVEX////qQzU0qFNChfT7vAVBiPY+g/RflvbpIwvuw7b7ugD7uADqQTMrpk78twD/vADpOio1f/TpLRrqPS78wQD7//8NoT5YsmYZokRDg/p8wYf48+z39eEjpEkzqkb/8vHpMyLpNTj0uwD///Cq0qro8OFDgf83onlBiec5nZY/j9L+7Oj2vrTtTj3rWErrXlHzp53ud2n32NHx0ML3xcDyfyj4qBbsUjP1kSH26cH24qtQj/fF1vSQs+3+8Np8s1DEvD6puUdWsFgQp1iPx5GYzJ+IsPgzqzw7l6/T59G93b88lLs2pGzzkYzsb2Dyi3/wc2v1npnqaFH4s6jtg3Dz49bpAADyt1/tWzHzyFL21IL33tjvay7125btnIz00XPqYUj3zmf0xTvY5PG1zfhwn+zw9fttovrXuyP0wi6ux/nS4fl5tFRquYVAq2E9kcc6mqPX6eafI9sQAAAJkElEQVR4nO2ba3/bRBaHFcdJ1USOZalWhF0lIrXL7tpOHDe7LAQoUJusTZ2QCwttaVhuLZctu3z/NyvZsmPJuswczUXKzvOm/fEimYeZOf+ZOaokCQQCgUAgEAgEAoFAIBAI/t+o7u7uthycP6q8x0KW3V57PL7qdGRtjqzvn56Nu0etXd6DS0vv8mxf1mxbVXVFWVlAUXRdVW1N00+7Ry94DxNG/Wh8INu27hNbRtEdT0czb5Yvuo6dmiDn09S0w3ad97BR6Y1XNFVHtbuxtOXTyxxIts4dPeTJC+BIftHmbRDP0akM1ptJquct3hpR1Luqjb04l1FU+bSXxcBsncFXZxBdOzji7ROkdZV2eQYd9zPlWB/LBJanH0U7eMTba861ppL2c9G1w2zUnCOMaMd1tMe87ZwNeKrR8ltx62qnx1nwXCO+AQOO2hVPv9a+TXECPVSd3zR2SQR8Mop8zcevfspgAqfYBzxO5D3yERiNLrNfqV2Z1QROUOQuW7/qoc3Sz4VxTe1QOcTEo16we7b6Ev8GTwJ9hVW96dE8xcQqymwUH/ESXJHvMhG8y7aIshe8lDn5sRJs33bBR7ddkFsVZSX44rYLSrdesHPbBQ85nEWZCnbT3iYURVc9Au3SbAj20uSE2wWVO/tX4/Nu97J7PT67cDvDalL3lKngLvispqi2fDFuL73t7vYuzzpaYo+YlaB0AbsvKarWuY5+gKi22ofxjXBmguegTahrHYT+/F1HMsqRmeALwCZUVPkQsbVSv3w33JGZICAJneWJ1co92g85TrATvMZeo7p2jXsdP9KD88hOsIW7RhXtCvJo1PX3QNgJSgeYa9TeBz7f1hf7WAwF23hrVJGv4Z8ZtOeKDAUlvKxXV75M88ta3kssS8Ex1oFbu0r5ncj0NZ2lYAunwUSku9DVmApKVxjHNUUj0iFq/5OlIM5pRtEIPUmn2sm4fIU+hezaCiS5v1n8+u3bLCg92yje+yuSopJPwQebxWLx3t8QFBU7l4LS842iq7j1bqKglrfvtKdUJ4Ku4zcJ06hl/MveKF5uFmeKf49VtDl98JKavdkcupsxRlC/4D1SIB9tFW+4Fx0bea0ykvTtRnGRyNjQWB6yiOIXjIwNnevHg2l4b7MYVAyLDUXjPVAw3wbnMDw27JwGxUIY+hWDsaEf8B4omOVFGhobWnY+qMclbJEux0Zuo9BhL1wwEBs5PY+63N+KNFxYqcq/eI8Tzvvh29BTnMUGmYcZPnwXsQ1njpPYUDq8h5mC6G3oKbqxYV/yHiacuG14sxlze+SWItPQz9df8B5mCp7Hb0NvGt/jPcwUfI9iuAnpURyvUaDyA/Y4kgqNy8Z3AEFpbZ0ClR9xh/EgsdC4U/g+zHCVPJUPcYeBVGi27mfGcP0n3GHEnmhm7IFahVQMV48fYA7jJYIhbBtSMqzgDiPhzDY1fJklw1eYw0AJi01YGlIyxI0LlLDYgh3ZKBl+gDeKKlIcwr5JoGSIGYgocbjxPUiQliFmIN5HKaXPsmS4fvsNX1MwhIUFLUPMQ00ODTHn8CMEQ9i5m5rhHWGYe8NVvKN3Dg3XKBhmq9JgGuawltIwfJ4lQ9wrcA7PNJi1NPnFO++G4R3uAHuZMsR9ikK6AWfpfkjFcBP0mJiRcynSSxQw8rNxP0RqzADjIht3fKQXYeAzRjbeadDevEGtp4y8tSFFPvDBNCPvpUiBCNuIGXnzRusfgjI/I30LpLiAtdfw258ohti9J6RSU/65ATB8fQcXBEX8/iFKqSl/8qQAMMSmWkEwxO4BS/Ukw3Lx8ZOCOaRgFOQDBEP8Pr4k/RK/Ecu/FBxKffJCS3yIYoj/LUbCua388RPXsGAw+CgKZR9WAOOI/Vah/HgqWLAgtQaPVyjbEPP+OyEm88t7n3qCjiJxoyA/ohh+BvnJz6IUyz/P/VhM4muURQooNNGJ6IbEArQnEWWRggpNVB94EhI+Q8rl9FcUw1XYzw7Li2lI+DCaZJUCrCH4AU40E0K+GpqFxCKlbbJKflDiHrgNQ5Zp+d7jZcEC3YPNMcq5G//q5BFYpk5IhPi5ivRiH2kKV4+hP95fTX0h4V+nNZJSPpCmEHDs9vCFfiAk/JNIKxTRCmnlN/AvuLkGl4v/jhakVk+RsnAVmhUu8wZNSEgEIKe1AMpxBnpk8/A+UQwLicBWpBEZKCfSdIvUu2CUy6Eh4YfC0eYHxDW6luq37PlvEjGYxBXR/FYrv6b6LS83k1foTHFAyMzjDuIUguN+SjUuJKgq/oQoiN1WC9KwUAXJLtTPEAXT1ZkJGIYEFZEF4Se2OSMTQ9EiFBqvkQWh14pFMASdXCwRON28OkYWXMfvVywzNLAcjdRn1N/QOhXTKUwXFR5vSliKZi3dZQrlAXg+heskBKUm3iQWStYoxS97+pe30A3JTKGTGDjFZjKN29DdODBKJ/94iDyFJHbhhN/x1qkzjUYfslQbBTebdt55C3EjkiikU3DXKcxxZHnZW9r5E9pKTZ+FcwY4uX/jiLFWX03nz+PkPygrNf1xZgF8wYnjNmLNGb0x/P8PT/6cHBnQV9JwAOt04mgZtWHCaq0Pa4a5tNF3niZ90bCe8lIRBOvw5pM0je1B1ItqczTYNqzQOlbaSYgNcmXGowbYirPBWqZp1gajYbM5nc9mszkcjWqfmma43ZT42Eh9a1pmGzcygpqup2m4uH+x4uSmxMUG6TXq0oRPIpSY2MD+jg0FzCM4EU4+D1+plTQviNGAq00KdkJjY51g1vsY8FB8GrJSKWxCjxQFFUzJWoqNhyQPMwFSFlQYJ//1b0ZSd6YMKfpjg1KV4au4GBsVosfRzCjexEaF/FlmWZFDuZnHRgXyfVdeFN3YYCMoSX0OuTiJjYeMBCWpweEAV3Bjg5Wgc4DjoUi+RRlHc/laThuDcIMyEdb1xkjxzgxkwHKllky6HwiGw3ClmlQ/D4yhxig20je0wAxZTKNV4LFC59Ro78YS8xoapFmgWlThfSyCNCxqjlaaXiRJ+gaV7VjiWGGC1Ck4ApuQ1KgPyDriNefYUB+Q24+Wla35mzP6nUQ+lsxCRupLGMN+RLcMXc/os/h3m2kYRbUEEfQso5bh6Vtg5LZ1MS1LlunoZXP3hTLsbxuxDdCg3ZtG5mpnItXhoOb2QmNms+Q2To1SLYd2c+rDRv+NOe36Wo7sBPevk/+23W+Mciy3SPOP4agxaNQmDBqN0Wj4xy1REwgEAoFAIBAIBAKBQCAQCCb8D52qdlgtGEmkAAAAAElFTkSuQmCC"
                            alt=""
                        />
                    </div>
                    <div className=" text-white w-full">
                        <p className="p-2 text-center">Register with Google</p>
                    </div>
                </div>
            </button>
        </Box>
    );
};

export default UserForm;