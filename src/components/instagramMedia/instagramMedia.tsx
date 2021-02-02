// Components
import React from "react";
import { IMedia } from "../../common/interfaces/IMedia";

// Material-UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    media: {
      paddingTop: "100%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const renderMediaInsight = (media: IMedia) => {
  switch (media.media_type) {
    case "IMAGE": {
      return (
        <div className="insights">
          <p>Engagement: {media.insight?.engagement}</p>
          <p>Impressions: {media.insight?.impressions}</p>
          <p>Reach: {media.insight?.reach}</p>
          <p>Saved: {media.insight?.saved}</p>
          <p>Video Views: N/A</p>
        </div>
      );
    }
    case "VIDEO": {
      return (
        <div className="insights">
          <p>Engagement: {media.insight?.engagement}</p>
          <p>Impressions: {media.insight?.impressions}</p>
          <p>Reach: {media.insight?.reach}</p>
          <p>Saved: {media.insight?.saved}</p>
          <p>Video Views: {media.insight?.video_views}</p>
        </div>
      );
    }
    case "CAROUSEL_ALBUM": {
      return (
        <div className="insights">
          <p>Engagement: {media.albumInsight?.carousel_album_engagement}</p>
          <p>Impressions: {media.albumInsight?.carousel_album_engagement}</p>
          <p>Reach: {media.albumInsight?.carousel_album_reach}</p>
          <p>Saved: {media.albumInsight?.carousel_album_saved}</p>
          <p>Video Views: {media.albumInsight?.carousel_album_video_views}</p>
        </div>
      );
    }
    case "STORY": {
      break;
    }
    default: {
      break;
    }
  }
};

const renderMediaData = (media: IMedia) => {
  return (
    <div className="mediaData">
      <p>Media ID: {media.id}</p>
      <p>Media Type: {media.media_type}</p>
      <p>Like Count: {media.like_count} </p>
      <p>Comments Count: {media.comments_count}</p>
    </div>
  );
};

const InstagramMedia: React.FC<{
  media: IMedia;
}> = ({ media }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        title={media.username}
        subheader={media.timestamp}
      />
      <CardMedia
        className={classes.media}
        image={media.media_url}
        title={media.id}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="div">
          {renderMediaData(media)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {renderMediaInsight(media)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" href={media.permalink}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Caption: {media.caption}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InstagramMedia;
