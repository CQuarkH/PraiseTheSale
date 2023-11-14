import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { updateUserProfile } from '../services/updateUserProfileService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: localStorage.getItem('authToken'),
        role: localStorage.getItem('authRole'),
        user: null, 
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedRole = localStorage.getItem('authRole');

        if (storedToken) {
            setAuthData(prevState => ({ ...prevState, token: storedToken, role: storedRole }));

            axios.get("http://localhost:8080/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            .then(response => {
                setAuthData(prevState => ({ ...prevState, user: response.data }));
            })
            .catch(error => {
                console.error("Error fetching user's profile", error);
            });
        }
    }, [, authData.token]);

    const login = (token, role) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authRole', role);
        setAuthData({ token, role, user: null });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authRole');
        setAuthData({ token: null, role: null, user: null });
    };

    const updateUserData = async (axiosInstance, newUserData) => {
        try{
         const updatedUser = await updateUserProfile(axiosInstance, newUserData);
         setAuthData(prevState => ({ ...prevState, user: updatedUser }));
        } catch (error){
          console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{ authData, login, logout, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
