import React from "react";
import { Typography, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { Delete } from "@mui/icons-material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function QueuedSongList() {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "LUNE",
    artist: "MOON",
    thumbnail:
      "https://images.unsplash.com/photo-1503455637927-730bce8583c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bWJuYWlsfGVufDB8fDB8fA%3D%3D&",
  };

  return (
    greaterThanMd && (
      <div style={{ maring: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

const songStyles = {
  avatar: css({
    width: 44,
    height: 44,
  }),
  text: css({
    textOverflow: "ellipsis",
    overflow: "hidden",
  }),
  container: css({
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  }),
  songInfoContainer: css({
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),
};

function QueuedSong({ song }) {
  const { thumbnail, artist, title } = song;

  return (
    <div css={songStyles.container}>
      <Avatar src={thumbnail} alt="Song thumbnail" css={songStyles.avatar} />
      <div css={songStyles.songInfoContainer}>
        <Typography variant="subtitle2" css={songStyles.text}>
          {title}
        </Typography>
        <Typography css={songStyles.text} variant="body2" color="textSecondary">
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
