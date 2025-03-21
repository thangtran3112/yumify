"use client";
import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  const isRecipePage = /^\/user\/recipes\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    if (isRecipePage) {
      const match = pathname.match(/\/user\/recipes\/([^\/]+)/);
      setRecipeId(match ? match[1] : null);
    } else {
      setRecipeId(null);
    }
  }, [isRecipePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          <div className={cn("dashboard__main")} style={{ height: "100vh" }}>
            <Navbar isRecipePage={isRecipePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
