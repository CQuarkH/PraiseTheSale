import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function ConfirmAccount() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const url = `http://localhost:8080/api/auth/confirm-account?token=${token}`;
    
    const hasConfirmed = useRef(false);

    useEffect(() => {
        if (!hasConfirmed.current) {
            hasConfirmed.current = true;
            axios.post(url)
                .then(response => {
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <div style={{color: 'white'}}>Loading...</div>;
    }

    if (error) {
        return <div style={{color: 'white'}}>An error occurred: {error.response.data}</div>;
    }

    return <div style={{color: 'white'}}>Your account has been successfully confirmed!</div>;
}

export default ConfirmAccount