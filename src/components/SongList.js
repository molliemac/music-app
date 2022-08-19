import React from "react";
import { CircularProgress } from "@mui/material";
import { PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SongList() {
  let loading = false;

  const song = {
    title: "LUNE",
    artist: "MOON",
    thumbnail:
      "https://images.unsplash.com/photo-1503455637927-730bce8583c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bWJuYWlsfGVufDB8fDB8fA%3D%3D&",
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
}

const listCss = {
  container: css({
    margin: "24px",
  }),
  songInfoContainer: css({
    display: "flex",
    alignItems: "center",
  }),
  songInfo: css({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  }),
  thumbnail: css({
    objectFit: "cover",
    width: "140px",
    height: "140px",
  }),
};

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  return (
    <Card css={listCss.container}>
      <div css={listCss.songInfoContainer}>
        <CardMedia image={thumbnail} css={listCss.thumbnail} />
        <div css={listCss.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
