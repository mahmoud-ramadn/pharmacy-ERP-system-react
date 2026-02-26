import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TheHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState(3); // Example unread count
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="sticky  top-0 z-20  flex items-center  border-b bg-background px-4 shadow-sm">
      <SidebarTrigger />
      <div className="flex w-full  container mx-auto  py-3 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold">Pharmacy Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Main Street Pharmacy
            </p>
          </div>
        </div>

        <div className="hidden max-w-md flex-1 px-6 md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, prescriptions..."
              className="w-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date & Time */}
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
            <Clock className="ml-2 h-4 w-4" />
            <span>{formattedTime}</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@pharmacy.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
