import React from "react";
import { Button } from "@mui/material";

interface ViewToggleProps {
  viewMode: "chart" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"chart" | "table">>;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <Button variant="contained" onClick={() => setViewMode(viewMode === "chart" ? "table" : "chart")}>
      Switch to {viewMode === "chart" ? "Table" : "Chart"} View
    </Button>
  );
};

export default ViewToggle;
