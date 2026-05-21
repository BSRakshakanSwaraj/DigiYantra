import { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { UserDashboard } from "./UserDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { ServiceDashboard } from "./ServiceDashboard";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { NotificationsPage } from "./NotificationsPage";
import { UserRole } from "../data/mockData";

type ViewType = "dashboard" | "profile" | "settings" | "notifications";

export function DashboardPage() {

  const [currentRole, setCurrentRole] = useState<UserRole>("user");
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  // ✅ LOAD ROLE FROM LOGIN
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentRole(user.role); // 🔥 IMPORTANT
    }

  }, []);


  // ✅ NAVIGATION EVENTS (USER + ADMIN)
  useEffect(() => {

    // USER
    const goDevices = () => setActiveTab("My Devices");
    const goComplaints = () => setActiveTab("My Complaints");

    // ADMIN
    const goUsers = () => setActiveTab("Users");
    const goComplaintsAdmin = () => setActiveTab("All Complaints");
    const goDevicesAdmin = () => setActiveTab("Devices");

    window.addEventListener("goDevices", goDevices);
    window.addEventListener("goComplaints", goComplaints);

    window.addEventListener("goUsers", goUsers);
    window.addEventListener("goComplaintsAdmin", goComplaintsAdmin);
    window.addEventListener("goDevicesAdmin", goDevicesAdmin);

    return () => {
      window.removeEventListener("goDevices", goDevices);
      window.removeEventListener("goComplaints", goComplaints);

      window.removeEventListener("goUsers", goUsers);
      window.removeEventListener("goComplaintsAdmin", goComplaintsAdmin);
      window.removeEventListener("goDevicesAdmin", goDevicesAdmin);
    };

  }, []);


  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("dashboard");
  };


  const renderContent = () => {

    // FULL PAGE VIEWS
    if (currentView === "profile") return <ProfilePage />;
    if (currentView === "settings") return <SettingsPage onBack={handleBack} />;
    if (currentView === "notifications") return <NotificationsPage />;

    // ROLE BASED DASHBOARDS
    if (currentRole === "admin")
      return <AdminDashboard activeTab={activeTab} />;

    if (currentRole === "service")
      return <ServiceDashboard activeTab={activeTab} />;

    return <UserDashboard activeTab={activeTab} />;
  };


  return (
    <AppLayout
      currentRole={currentRole}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onNavigate={handleNavigate}
      currentView={currentView}
    >
      {renderContent()}
    </AppLayout>
  );
}