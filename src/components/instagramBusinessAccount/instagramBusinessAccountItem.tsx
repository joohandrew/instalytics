// Components
import { Link, useHistory } from "react-router-dom";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";

// Materials-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSessionContext } from "../../contexts/sessionContext";
import { Session } from "../../models/session";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const InstagramBusinessAccountItem: React.FC<{
  instagramBusinessAccount: IInstagramBusinessAccount;
}> = ({
  instagramBusinessAccount,
}: {
  instagramBusinessAccount: IInstagramBusinessAccount;
}) => {
  const pageName = "Page Name:";
  const userName = "Username:";
  const biography = "Biography:";
  const followers_count = "Followers:";
  const follows_count = "Following:";
  const media_count = "Media Count:";
  const website = "Website:";

  const classes = useStyles();
  const history = useHistory();
  const [sessionContext, updateSessionContext] = useSessionContext();
  const onLearnMoreClick = () => {
    updateSessionContext({
      ...sessionContext,
      redirectPathOnAuthentication: '/instagramBusinessAccount',
    });
    history.push({
        pathname: '/instagramBusinessAccount',
        state: { instagramBusinessAccount: instagramBusinessAccount },
      });
 };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={instagramBusinessAccount.profile_picture_url}
          title={instagramBusinessAccount.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {instagramBusinessAccount.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {instagramBusinessAccount.biography}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Button size="small" color="primary" onClick={() => onLearnMoreClick()}>
            Learn More
          </Button>
      </CardActions>
    </Card>
  );
};

export default InstagramBusinessAccountItem;
