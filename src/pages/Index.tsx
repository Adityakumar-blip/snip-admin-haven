
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialize theme based on saved preference
    const savedTheme = localStorage.getItem("snip-admin-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);
  
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference to localStorage
    localStorage.setItem("snip-admin-theme", newDarkMode ? "dark" : "light");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-gradient-2 dark:bg-darkblack relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF7E51_1px,transparent_1px)] [background-size:20px_20px] opacity-20 dark:opacity-10"></div>
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-primary dark:text-white"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
      
      {/* Logo and product name */}
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white dark:bg-darkbox shadow-soft">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary">
            <path d="M4 9h8"></path>
            <path d="M12 15h8"></path>
            <path d="M12 5h8"></path>
            <path d="M4 19h8"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-darkgray dark:text-white">Snip AI</h1>
        <p className="text-gray dark:text-coolGray">Admin Panel</p>
      </div>
      
      <LoginForm />
      
      <div className="absolute bottom-4 text-xs text-gray dark:text-coolGray opacity-70">
        © {new Date().getFullYear()} Snip AI. All rights reserved.
      </div>
    </div>
  );
};

export default Index;
