// Components
import { Link } from "react-router-dom";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";

// Materials-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const InstagramBusinessAccountItem: React.FC<{
  igBusinessAccount: IInstagramBusinessAccount;
}> = ({ igBusinessAccount }: { igBusinessAccount: IInstagramBusinessAccount }) => {
  const pageName = "Page Name:";
  const userName = "Username:";
  const biography = "Biography:";
  const followers_count = "Followers:";
  const follows_count = "Following:";
  const media_count = "Media Count:";
  const website = "Website:";

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
          <CardMedia
            className={classes.media}
            image={igBusinessAccount.profile_picture_url}
            title={igBusinessAccount.name}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {igBusinessAccount.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {igBusinessAccount.biography}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
                <Link to={{pathname: "/instagramBusinessAccount", state: { id: igBusinessAccount.id }}}>

        <Button size="small" color="primary">
          Learn More
        </Button>
        </Link>

      </CardActions>
    </Card>
  );
};

export default InstagramBusinessAccountItem;
