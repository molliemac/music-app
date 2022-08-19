import React from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
} from "@mui/material";
import { PlayArrow, SkipPrevious, SkipNext } from "@mui/icons-material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cssStyles = {
  container: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  details: css({
    display: "flex",
    flexDirection: "column",
    padding: "8px 15px",
  }),
  content: css({
    flex: "1 0 auto",
  }),
  thumbnail: css({
    width: "150",
  }),
  controls: css({
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
    paddingRight: "8px",
  }),
  playIcon: css({
    height: "38px",
    width: "38px",
  }),
};

function SongPlayer() {
  return (
    <>
      <Card variant="outlined" css={cssStyles.container}>
        <div css={cssStyles.details}>
          <CardContent css={cssStyles.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div css={cssStyles.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow css={cssStyles.PlayArrow} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          css={cssStyles.thumbnail}
          image="https://images.unsplash.com/photo-1503455637927-730bce8583c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bWJuYWlsfGVufDB8fDB8fA%3D%3D&"
        />
      </Card>
      <QueuedSongList />
    </>
  );
}

export default SongPlayer;
