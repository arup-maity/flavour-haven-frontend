'use client';
import { axiosInstance } from "@/config/axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState, createContext, ReactNode, useCallback } from "react";

// Define types for context and session state
interface User {
  [key: string]: any; // Adjust this based on the actual user object structure
}

interface SessionState {
  loading: boolean;
  login: boolean;
  user: User;
}

interface ContextType extends SessionState {
  updateSession: (value: Partial<SessionState>) => void;
}

// Default context values
const defaultSessionState: SessionState = {
  loading: true,
  login: false,
  user: {},
};

// Create context with default values
export const sessionContext = createContext<ContextType>({
  ...defaultSessionState,
  updateSession: () => {}, // Default function to avoid undefined errors
});

// SessionProvider component
export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>(defaultSessionState);

  useLayoutEffect(() => {
    getSession();
  }, [router]);

  // Fetch session data from localStorage or API
  const getSession = useCallback(() => {
    const data = localStorage.getItem("userDetails");

    if (data) {
      try {
        const payload = JSON.parse(data);
        const currentTime = Math.floor(Date.now() / 1000);
        const oneMinuteBeforeExp = payload.exp - 60; // Subtract 60 seconds (1 minute)

        if (currentTime < oneMinuteBeforeExp) {
          setSession({ loading: false, login: true, user: payload });
          return;
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }

    storeUserDetails();
  }, []);

  // Verify token and store user details
  const storeUserDetails = useCallback(async () => {
    try {
      const res = await axiosInstance("auth/verify-token");

      if (res.data.success) {
        const user = res.data.decoded;
        setSession({ loading: false, login: true, user });
        localStorage.setItem("userDetails", JSON.stringify(user));
      } else {
        setSession((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setSession((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Update session state
  const updateSession = useCallback((value: Partial<SessionState>) => {
    setSession((prev) => ({ ...prev, ...value }));
  }, []);

  return (
    <sessionContext.Provider value={{ ...session, updateSession }}>
      {children}
    </sessionContext.Provider>
  );
};
