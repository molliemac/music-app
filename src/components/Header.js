import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import HeadsetTwoToneIcon from "@mui/icons-material/HeadsetTwoTone";

// const useStyles = styles({
//   title: {
//     marginLeft: "18px",
//   },
// });

function Header() {
  //   const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <HeadsetTwoToneIcon />
        <Typography variant="h6" component="h1">
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
