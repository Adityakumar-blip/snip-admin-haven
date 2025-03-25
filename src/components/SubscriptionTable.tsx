
import { useState } from "react";
import { 
  Table,
  TableBody,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Clock, MoreHorizontal, Search, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: "sub_1",
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    },
    plan: "Premium",
    status: "active",
    startDate: "2023-09-15T00:00:00",
    renewDate: "2023-10-15T00:00:00",
    amount: 29.99,
    paymentMethod: "card",
    cardLast4: "4242",
  },
  {
    id: "sub_2",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    plan: "Basic",
    status: "active",
    startDate: "2023-08-10T00:00:00",
    renewDate: "2023-10-10T00:00:00",
    amount: 9.99,
    paymentMethod: "paypal",
    cardLast4: null,
  },
  {
    id: "sub_3",
    user: {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
    },
    plan: "Premium",
    status: "canceled",
    startDate: "2023-07-05T00:00:00",
    renewDate: "2023-10-05T00:00:00",
    amount: 29.99,
    paymentMethod: "card",
    cardLast4: "1234",
  },
  {
    id: "sub_4",
    user: {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
    },
    plan: "Enterprise",
    status: "trialing",
    startDate: "2023-10-01T00:00:00",
    renewDate: "2023-10-31T00:00:00",
    amount: 99.99,
    paymentMethod: "card",
    cardLast4: "5678",
  },
  {
    id: "sub_5",
    user: {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
    },
    plan: "Basic",
    status: "past_due",
    startDate: "2023-09-01T00:00:00",
    renewDate: "2023-10-01T00:00:00",
    amount: 9.99,
    paymentMethod: "card",
    cardLast4: "9012",
  }
];

const SubscriptionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  
  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green" />;
      case "trialing":
        return <Clock className="h-4 w-4 text-orange" />;
      case "canceled":
      case "past_due":
        return <XCircle className="h-4 w-4 text-red" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "trialing":
        return "Trial";
      case "canceled":
        return "Canceled";
      case "past_due":
        return "Past due";
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green text-white";
      case "trialing":
        return "bg-orange text-white";
      case "canceled":
        return "bg-gray text-white";
      case "past_due":
        return "bg-red text-white";
      default:
        return "bg-gray text-white";
    }
  };
  
  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
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
            placeholder="Search subscriptions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Renewal</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id} className="transition-all-200 hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(subscription.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{subscription.user.name}</div>
                        <div className="text-sm text-muted-foreground">{subscription.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal", getPlanColor(subscription.plan))}>
                      {subscription.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(subscription.status)}
                      <Badge variant="secondary" className={cn("font-normal", getStatusColor(subscription.status))}>
                        {getStatusText(subscription.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(subscription.renewDate)}</TableCell>
                  <TableCell>{formatCurrency(subscription.amount)}/mo</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="capitalize">{subscription.paymentMethod}</span>
                      {subscription.cardLast4 && (
                        <span className="text-sm text-muted-foreground">
                          •••• {subscription.cardLast4}
                        </span>
                      )}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem>Update plan</DropdownMenuItem>
                        <DropdownMenuItem>Manage payment method</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Cancel subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No subscriptions found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
