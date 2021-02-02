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
      >
        {mediaArray.map((media) => (
          <Grid className={classes.paper} item xs={12} sm={6} md={6} lg={3} key={media.id}>
            <InstagramMedia  media={media} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default InstagramMediaList;
