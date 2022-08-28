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
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutations";

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};

function AddSong() {
  const [dialog, setDialog] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [playable, setPlayable] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG);
  const [addSong, { error }] = useMutation(ADD_SONG);

  React.useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleSetDialog() {
    setDialog(false);
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }

  function handleChangeSong(e) {
    const { name, value } = e.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleSetDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("error adding song", error);
    }
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

  function handleError(field) {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  }

  const { thumbnail, title, artist } = song;

  return (
    <div css={dialogCss.container}>
      <Dialog open={dialog} onClose={handleSetDialog} css={dialogCss.dialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt="Song Thumbnail" css={dialogCss.thumbnail} />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            value={title}
            fullWidth
            onChange={handleChangeSong}
            error={handleError("title")}
            helperText={handleError("title") && "Fill out field"}
          />
          <TextField
            margin="dense"
            name="artist"
            label="Artist"
            value={artist}
            fullWidth
            onChange={handleChangeSong}
            error={handleError("artist")}
            helperText={handleError("artist") && "Fill out field"}
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            onChange={handleChangeSong}
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Fill out field"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        css={dialogCss.urlInput}
        placeholder="Add Youtube or Soundcloud Url"
        onChange={(event) => setUrl(event.target.value)}
        value={url}
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
        disabled={!playable}
        css={dialogCss.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}

export default AddSong;
