import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { spaceThunks } from "../redux/space/space.thunks";

export const Space = () => {
  const navigate = useNavigate();

  const spaceTitle = useAppSelector((state) => state.space.title);
  const dispatch = useAppDispatch();

  return (
    <div style={{ backgroundColor: "#ccc", padding: "8px" }}>
      <span>
        This is a space: <b>{spaceTitle}</b>
      </span>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disableElevation
        onClick={() => dispatch(spaceThunks.setTitle())}
      >
        Set Space Title
      </Button>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => navigate("/")}
      >
        Open Builder
      </Button>
      <Table />
    </div>
  );
};
