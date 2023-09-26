import React, { createContext, useState, useContext } from 'react';
import { USER_TYPES } from './UserTypes';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [value, setValue] = useState(USER_TYPES.BUYER);

    return (
        <UserContext.Provider value={{ value, setValue }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}
