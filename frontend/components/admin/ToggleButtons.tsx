"use client";
import { Button } from "@/components/ui/button";

interface ToggleButtonsProps {
  activeTab: "posts" | "categories";
  setActiveTab: (tab: "posts" | "categories") => void;
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
      variant={activeTab === "categories" ? "contained" : "outlined"}
      onClick={() => setActiveTab("categories")}
    >
      Categories
    </Button>
  </div>
);

export default ToggleButtons;
