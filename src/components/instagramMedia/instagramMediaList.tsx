// Components
import React from "react";
import { IMedia } from "../../common/interfaces/IMedia";
import InstagramMedia from "./instagramMedia";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

interface InstagramMediaListProps {
  mediaArray: IMedia[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const InstagramMediaList: React.FC<InstagramMediaListProps> = ({
  mediaArray,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid> */}
        {mediaArray.map((media) => (
          <Grid item className={classes.paper} xs>
            <InstagramMedia key={media.id} media={media} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default InstagramMediaList;
