
import Navbar from "@/components/Navbar";
import UserTable from "@/components/UserTable";
import AddUserDrawer from "@/components/AddUserDrawer";
import { useState } from "react";

const Users = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleUserAdded = () => {
    // Trigger a refresh of the user table
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage your application users and their details.</p>
          </div>
          <AddUserDrawer onUserAdded={handleUserAdded} />
        </div>
        
        <UserTable key={refreshTrigger} />
      </main>
    </div>
  );
};

export default Users;
