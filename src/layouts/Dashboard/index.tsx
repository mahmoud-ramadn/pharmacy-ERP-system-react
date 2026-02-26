import { AppSidebar } from "@/components/common/AppSideBar";
import TheFooter from "@/components/common/TheFooter";
import TheHeader from "@/components/common/TheHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <div className=" w-full">
        <TheHeader />
        <main className=" min-h-screen">
          <Outlet />
        </main>
        <TheFooter />
      </div>
    </SidebarProvider>
  );
}
