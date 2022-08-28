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
import { useSubscription } from "@apollo/client";
import { GET_SONGS } from "../graphql/subscriptions";

function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

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

  if (error) return <div>Error fetching songs</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
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
