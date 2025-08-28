import { SidebarItemParent, SidebarItem } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import {
  FaSmile,
  FaChartLine,
  FaLightbulb,
  FaMicrophone,
  FaPlus,
  FaBook
} from "react-icons/fa";
import { FiSettings, FiPieChart } from "react-icons/fi";
import { useState } from "react";

const Dashboard = () => {
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <SidebarItemParent>
      <SidebarItem
        icon={<FiPieChart />}
        text="Dashboard"
        hoverText="Dashboard"
        active={selected === "Dashboard"}
        gradient="from-teal-500 to-cyan-600"
        onClick={() => {
          navigate("/dashboard/user-dashboard");
          setSelected("Dashboard");
        }}
      />
      <SidebarItem
        icon={<FaPlus />}
        text="Create Entry"
        description="Write new diary"
        hoverText="Create"
        active={selected === "Create Entry"}
        gradient="from-emerald-500 to-green-600"
        onClick={() => {
          navigate("/dashboard/create-entry");
          setSelected("Create Entry");
        }}
      />
      <SidebarItem
          icon={<FaBook />}
          text="My Entries"
          description="View all entries"
           hoverText="Entries"
          active={selected === "My Entries"}
          gradient="from-blue-500 to-indigo-600"
          onClick={() => {
            navigate("/dashboard/my-entries");
            setSelected("My Entries");
          }}
        />
        <SidebarItem
          icon={<FaSmile />}
          text="Mood Tracker"
          description="Log your emotions"
           hoverText="Mood"
          active={selected === "Mood Tracker"}
          gradient="from-purple-500 to-pink-600"
          onClick={() => {
            navigate("/dashboard/mood-analytics");
            setSelected("Mood Tracker");
          }}
        />
      <SidebarItem
          icon={<FaChartLine />}
          text="AI Insights"
          description="Smart analytics"
           hoverText="Insights"
          active={selected === "AI Insights"}
          gradient="from-orange-500 to-red-600"
          onClick={() => {
            navigate("/dashboard/ai-insights");
            setSelected("AI Insights");
          }}
        />
        <SidebarItem
          icon={<FaLightbulb />}
          text="Recommendations"
          description="Personalized tips"
          hoverText="Tips"
          active={selected === "Recommendations"}
          gradient="from-yellow-500 to-orange-600"
          onClick={() => {
            navigate("/dashboard/recommendations");
            setSelected("Recommendations");
          }}
        />
        <SidebarItem
          icon={<FaMicrophone />}
          text="Voice Assistant"
          description="Talk it out"
          hoverText="Voice"
          active={selected === "Voice Assistant"}
          gradient="from-indigo-500 to-purple-600"
          onClick={() => {
            navigate("/dashboard/voice-page");
            setSelected("Voice Assistant");
          }}
        />
    </SidebarItemParent>
  );
};

export default Dashboard;