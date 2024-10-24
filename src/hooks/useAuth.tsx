import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("accessToken");
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  const isAuthenticated =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  return (
    <AuthContext.Provider value={{ logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
