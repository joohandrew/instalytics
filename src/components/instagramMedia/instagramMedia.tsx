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
    root: {},
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
const renderMediaData = (media: IMedia) => {
  switch (media.media_type) {
    case "IMAGE": {
      if (!media.insight) {
        return (
          <div className="insights">
            Image {"\n"}
            Like Count: {"\n"}
            Comments Count: {"\n"}
          </div>
        );
      }
      return (
        <div className="insights">
          {/* {media.id}
          {"\n"} */}
          Image {/* {media.media_type} */}
          {"\n"}
          {media.like_count}
          {"\n"}
          {media.comments_count}
          {"\n"}
          {media.insight?.engagement}
          {"\n"}
          {media.insight?.impressions}
          {"\n"}
          {media.insight?.reach}
          {"\n"}
          {media.insight?.saved}
          {"\n"}
          N/A
          {"\n"}
        </div>
      );
    }
    case "VIDEO": {
      return (
        <div className="insights">
          {/* {media.id}
          {"\n"} */}
          Video {/* {media.media_type} */}
          {"\n"}
          {media.like_count}
          {"\n"}
          {media.comments_count}
          {"\n"}
          {media.insight?.engagement}
          {"\n"}
          {media.insight?.impressions}
          {"\n"}
          {media.insight?.reach}
          {"\n"}
          {media.insight?.saved}
          {"\n"}
          {media.insight?.video_views}
          {"\n"}
        </div>
      );
    }
    case "CAROUSEL_ALBUM": {
      return (
        <div className="insights">
          {/* {media.id}
          {"\n"} */}
          Carousel 
          {"\n"}
          {media.like_count}
          {"\n"}
          {media.comments_count}
          {"\n"}
          {media.albumInsight?.carousel_album_engagement}
          {"\n"}
          {media.albumInsight?.carousel_album_engagement}
          {"\n"}
          {media.albumInsight?.carousel_album_reach}
          {"\n"}
          {media.albumInsight?.carousel_album_saved}
          {"\n"}
          {media.albumInsight?.carousel_album_video_views}
          {"\n"}
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

const renderContentHeaders = (media: IMedia) => {
  if (!media.albumInsight && !media.insight) {
    return (
      <div className="mediaData">
        {/* Media ID: {"\n"} */}
        Media Type: {"\n"}
        Like Count: {"\n"}
        Comments Count: {"\n"}
        The media was posted before the most recent time that the user's account was converted to a business account from a personal account.
      </div>
    );
  }
  return (
    <div className="mediaData">
      {/* Media ID: {"\n"} */}
      Media Type: {"\n"}
      Like Count: {"\n"}
      Comments Count: {"\n"}
      Engagement: {"\n"}
      Impressions: {"\n"}
      Reach: {"\n"}
      Saved: {"\n"}
      Video Views: {"\n"}
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
        subheader={new Date(media.timestamp).toLocaleString()}
      />
      <CardMedia
        className={classes.media}
        image={media.media_url}
        title={media.id}
      /> 
      <CardContent style={{ textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          component="div"
          style={{
            whiteSpace: "pre-line",
            textAlign: "left",
            display: "inline-block",
            fontWeight: "bold",
          }}
        >
          {renderContentHeaders(media)}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          component="div"
          style={{
            whiteSpace: "pre-line",
            textAlign: "left",
            display: "inline-block",
            marginLeft: "10px",
          }}
        >
          {renderMediaData(media)}
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
