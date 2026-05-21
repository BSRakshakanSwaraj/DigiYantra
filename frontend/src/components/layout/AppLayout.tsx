import { ReactNode } from "react";
import { TopNavBar } from "./TopNavBar";
import { TabBar } from "./TabBar";
import { UserRole } from "../../data/mockData";

interface AppLayoutProps {
  children: ReactNode;
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export function AppLayout({
  children,
  currentRole,
  activeTab,
  onTabChange,
  onNavigate,
  currentView,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header (logo, profile, logout) */}
      <TopNavBar
        currentRole={currentRole}
        onNavigate={onNavigate}
      />

      {/* Tabs only for dashboard view */}
      {currentView === "dashboard" && (
        <TabBar
          role={currentRole}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
