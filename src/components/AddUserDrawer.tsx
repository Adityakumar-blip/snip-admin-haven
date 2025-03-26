
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import AddUserForm from "./AddUserForm";
import { useState } from "react";

interface AddUserDrawerProps {
  onUserAdded?: (userData: any) => void;
}

const AddUserDrawer = ({ onUserAdded }: AddUserDrawerProps) => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleSuccess = (userData: any) => {
    if (onUserAdded) {
      onUserAdded(userData);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-custom-gradient">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <AddUserForm 
          onClose={() => setOpen(false)} 
          onSuccess={handleSuccess}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AddUserDrawer;
