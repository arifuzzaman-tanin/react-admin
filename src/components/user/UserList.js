import { useState, useEffect } from "react";
import Agent from "../../api/Agent";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DataGridLoader from "../animations/DataGridLoader";
import RoundLoader from "../animations/RoundLoader";
import CreateUser from "./CreateUser";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloseIcon from "@mui/icons-material/Close";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [waitingAnimationOption, setWaitingAnimationOption] = useState({
    dataGridLoader: true,
    roundLoader: false,
  });

  const getUsers = () => {
    waitingAnimationOption.dataGridLoader = true;
    setWaitingAnimationOption(waitingAnimationOption);
    Agent.user
      .list()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        waitingAnimationOption.dataGridLoader = false;
        setWaitingAnimationOption(waitingAnimationOption);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUserById = (id) => {
    waitingAnimationOption.roundLoader = true;
    setWaitingAnimationOption(waitingAnimationOption);
    Agent.user
      .getById(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickDeleteHandler = (x) => {
    getUserById(x.row.id);
  };

  const onClickEditHandler = (x) => {
    getUserById(x.row.id);
  };

  const columns = [
    { field: "id", sortable: false, headerName: "ID", width: 90 },
    { field: "name", sortable: false, headerName: "Name", width: 200 },
    { field: "email", sortable: false, headerName: "Email", width: 300 },
    { field: "phone", sortable: false, headerName: "Phone", width: 200 },
    { field: "website", sortable: false, headerName: "Website", width: 200 },
    {
      field: "action",
      sortable: false,
      headerName: "Action",
      width: 200,
      renderCell: (props) => {
        return (
          <>
            <Button onClick={() => onClickEditHandler(props)}>
              <EditTwoToneIcon />
            </Button>
            <Button color="error" onClick={() => onClickDeleteHandler(props)}>
              <CloseIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const renderUserListGrid = () => {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            disableColumnMenu
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Box>
      </>
    );
  };

  const renderUserListSkeleton = () => {
    return (
      <>
        <DataGridLoader></DataGridLoader>
        <DataGridLoader></DataGridLoader>
        <DataGridLoader></DataGridLoader>
        <DataGridLoader></DataGridLoader>
        <DataGridLoader></DataGridLoader>
      </>
    );
  };

  let render;
  if (!waitingAnimationOption.dataGridLoader) {
    render = renderUserListGrid();
  } else {
    render = renderUserListSkeleton();
  }
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item md={6}>
          <TextField size="small" label="search user" />
        </Grid>
        <Grid item md={6}>
          <CreateUser></CreateUser>
        </Grid>
      </Grid>
      {render}
    </>
  );
}
