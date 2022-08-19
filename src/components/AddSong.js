import React from "react";
import {
  InputAdornment,
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Link, AddBoxOutlined } from "@mui/icons-material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function AddSong() {
  const [dialog, setDialog] = React.useState(false);

  function handleSetDialog() {
    setDialog(false);
  }

  const dialogCss = {
    container: css({
      display: "flex",
      alignItems: "center",
    }),

    urlInput: css({
      margin: "8px",
    }),
    addSongButton: css({
      margin: "8px",
    }),
    dialog: css({
      textAlign: "center",
    }),
    thumbnail: css({
      width: "90%",
    }),
  };

  return (
    <div css={dialogCss.container}>
      <Dialog open={dialog} onClose={handleSetDialog} css={dialogCss.dialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src="https://media.springernature.com/w485h264/magazine-assets/d41586-022-02141-9/d41586-022-02141-9_23339972.jpg"
            alt="Song Thumbnail"
            css={dialogCss.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        css={dialogCss.urlInput}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        css={dialogCss.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  );
}

export default AddSong;
