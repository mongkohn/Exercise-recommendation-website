"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    userId: string;
    username: string;
    fullname: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (username_or_email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>; // Added for explicit re-check
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(\`\${apiBaseUrl}/user/status\`);
            if (response.ok) {
                const data = await response.json();
                if (data.isLoggedIn) {
                    setUser({ userId: data.userId, username: data.username, fullname: data.fullname });
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (username_or_email: string, password: string):Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await fetch(\`\${apiBaseUrl}/user/login\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username_or_email, password }), // Assuming backend uses 'username' for login
            });
            if (response.ok) {
                const data = await response.json(); // Login response should also contain user data
                setUser({ userId: data.userId, username: data.username, fullname: data.fullname });
                setIsLoggedIn(true);
                setIsLoading(false);
                return true;
            }
            setIsLoading(false);
            return false;
        } catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await fetch(\`\${apiBaseUrl}/user/logout\`, { method: 'POST' });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setIsLoggedIn(false);
            setIsLoading(false);
            // Optionally, redirect or perform other cleanup
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
