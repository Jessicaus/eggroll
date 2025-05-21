import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const initializeAuthSession = async () => {
          const token = localStorage.getItem('access_token');
          const refresh = localStorage.getItem('refresh_token');
          if (token && refresh) {
            await supabase.auth.setSession({
              access_token: token,
              refresh_token: refresh
            });
          }
    
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
              setUserId(user.id);  
              console.log("user_id successfully fetched from supabase. User ID:", user.id);
          }
          else {
            console.log("No active session in Home.jsx");
          }
    
        };
    
        initializeAuthSession();
      }, []);
    
    return (
        <AuthContext.Provider value={{ userId, loading }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);