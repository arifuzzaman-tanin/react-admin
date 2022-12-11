import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import countries from "../../helpers/CountryCode";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import Typography from "@mui/material/Typography";

export default function CreateUser() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleClickOpen("paper")}>
          <AddIcon></AddIcon>
          Add new user
        </Button>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container direction="row" alignItems="center">
            <PersonAddAltSharpIcon
              color="inherit"
              fontSize="large"
              sx={{ marginRight: 1 }}
            />
            <Typography variant="h5">Create a user</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6}>
              <TextField fullWidth label="First name" />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Last name" />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Email" />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Password" />
            </Grid>
            <Grid item md={6}>
              <Autocomplete
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Phone" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
