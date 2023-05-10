import { Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStylesHeader = makeStyles((theme) => ({
  root: {
    fontFamily: "Carlito",
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#0564d0",
  },
}));

export const Header = () => {
  const stylesHeader = useStylesHeader();
  return (
    <Typography className={stylesHeader.root} component="h1" variant="h5">
      Бронирование переговорной
    </Typography>
  );
};
