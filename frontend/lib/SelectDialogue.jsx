import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog({
  data,
  setData,
  label,
  setButtonText,
}) {
  const { url, token, loading, authors, setAuthors } =
    React.useContext(StoreContext);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    name: "",
    bio: "",
  });

  const handleClose = () => {
    setDialogValue({
      name: "",
      bio: "",
    });
    toggleOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      url + "/api/author/addauthor",
      dialogValue,
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      setData({
        ...data,
        author: dialogValue,
      });
      setAuthors([...authors, dialogValue]);
      handleClose();
    } else {
      alert("Error Occurred");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Autocomplete
        id="free-solo-dialog-demo"
        options={authors}
        value={data.author}
        sx={{ width: 300, backgroundColor: "white" }}
        isOptionEqualToValue={(option, value) => true}
        // freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                bio: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              bio: "",
            });
          } else {
            setButtonText("Save");
            setData({
              ...data,
              author: newValue,
            });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (
            params.inputValue !== "" &&
            !options.reduce((p, c) => p || c.name === params.inputValue, false)
          ) {
            filtered.unshift({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          // for example value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} required />
        )}
      />

      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Add A New Author</DialogTitle>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", width: "300px" }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              required
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              required
              value={dialogValue.bio}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  bio: event.target.value,
                })
              }
              label="Bio"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
