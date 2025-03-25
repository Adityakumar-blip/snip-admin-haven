
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, MoreHorizontal, Search, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    plan: "premium",
    lastActive: "2023-10-15T14:48:00",
    filesCount: 28,
    createdAt: "2023-05-10T09:30:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    plan: "basic",
    lastActive: "2023-10-14T11:32:00",
    filesCount: 12,
    createdAt: "2023-06-22T14:15:00",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    status: "inactive",
    plan: "premium",
    lastActive: "2023-09-30T16:20:00",
    filesCount: 43,
    createdAt: "2023-04-05T10:45:00",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "active",
    plan: "enterprise",
    lastActive: "2023-10-15T09:12:00",
    filesCount: 64,
    createdAt: "2023-02-18T08:30:00",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    status: "suspended",
    plan: "basic",
    lastActive: "2023-10-10T13:45:00",
    filesCount: 7,
    createdAt: "2023-08-12T16:20:00",
  }
];

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  const formatDateWithTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green text-white";
      case "inactive":
        return "bg-gray text-white";
      case "suspended":
        return "bg-red text-white";
      default:
        return "bg-gray text-white";
    }
  };
  
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium":
        return "bg-primary text-white";
      case "enterprise":
        return "bg-secondary text-white";
      case "basic":
        return "bg-lightBlueGray text-darkgray";
      default:
        return "bg-lightBlueGray text-darkgray";
    }
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray" />
          </div>
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-custom-gradient">
          <UserCog className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Files</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="transition-all-200 hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-normal capitalize", getStatusColor(user.status))}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal capitalize", getPlanColor(user.plan))}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateWithTime(user.lastActive)}</TableCell>
                  <TableCell>{user.filesCount}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
