"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

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
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        try {
            // Check sessionStorage instead of server
            if (typeof window !== 'undefined') {
                const isLogin = sessionStorage.getItem('isLogin');
                const username = sessionStorage.getItem('username');
                const userId = sessionStorage.getItem('userId');
                const fullname = sessionStorage.getItem('fullname');

                if (isLogin === 'true' && username && userId) {
                    setUser({ userId, username, fullname: fullname || username });
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
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);    const login = async (username_or_email: string, password: string):Promise<boolean> => {
            setIsLoading(true);
            let apiSuccess = false;
            try {
                const response = await fetch(`${apiBaseUrl}/user/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username_or_email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Login response data:", data); // Debug log
                    
                    // More robust validation - check for userId with multiple possible field names
                    const userId = data.userId || data.id || data._id;
                    const username = data.username || data.user || username_or_email;
                    const fullname = data.fullname || data.fullName || data.name || username;

                    if (userId && username) {
                        // Store in sessionStorage with validation
                        if (typeof window !== 'undefined') {
                            sessionStorage.setItem('isLogin', 'true');
                            sessionStorage.setItem('userId', String(userId)); // Ensure string conversion
                            sessionStorage.setItem('username', String(username));
                            sessionStorage.setItem('fullname', String(fullname));
                        }
                        
                        setUser({ 
                            userId: String(userId), 
                            username: String(username), 
                            fullname: String(fullname) 
                        });
                        setIsLoggedIn(true);
                        apiSuccess = true;
                    } else {
                        console.error("Login response missing required fields:", {
                            userId: data.userId,
                            id: data.id,
                            _id: data._id,
                            username: data.username,
                            fullData: data
                        });
                        setUser(null);
                        setIsLoggedIn(false);
                        apiSuccess = false;
                    }
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    console.error("Login failed with status:", response.status, errorData);
                    setUser(null);
                    setIsLoggedIn(false);
                    apiSuccess = false;
                }
            } catch (error) {
                console.error("Login error:", error);
                setUser(null);
                setIsLoggedIn(false);
                apiSuccess = false;
            } finally {
                setIsLoading(false);
            }
            return apiSuccess;
        };    const logout = async () => {
        setIsLoading(true);
        try {
            // Clear sessionStorage
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('isLogin');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('fullname');
            }
            
            // Optional: Call server logout endpoint if needed
            await fetch(`${apiBaseUrl}/user/logout`, { method: 'POST' });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setIsLoggedIn(false);
            setIsLoading(false);
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
