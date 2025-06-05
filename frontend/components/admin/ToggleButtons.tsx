"use client";
import { Button } from "@/components/ui/button";

interface ToggleButtonsProps {
  activeTab: "posts" | "conditions";
  setActiveTab: (tab: "posts" | "conditions") => void;
}

const ToggleButtons = ({ activeTab, setActiveTab }: ToggleButtonsProps) => (
  <div className="flex gap-2">
    <Button
      variant={activeTab === "posts" ? "contained" : "outlined"}
      onClick={() => setActiveTab("posts")}
    >
      Posts
    </Button>
    <Button
      variant={activeTab === "conditions" ? "contained" : "outlined"}
      onClick={() => setActiveTab("conditions")}
    >
      Conditions
    </Button>
  </div>
);

export default ToggleButtons;
