import { useState, useEffect } from "react";
import { getToken, getUser } from "../local";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkIfAdmin = () => {
      const token = getToken();
      const user = getUser();
      
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }


      if (user?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkIfAdmin();
  }, []);

  return { isAdmin, loading };
};
