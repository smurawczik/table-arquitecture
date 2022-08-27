import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";

export const TableBuilder = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: red["200"], padding: "8px" }}>
      <span>This is a builder</span>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disableElevation
        color="secondary"
        onClick={() => navigate("/space")}
      >
        Back to space
      </Button>
      <Table />
    </div>
  );
};
