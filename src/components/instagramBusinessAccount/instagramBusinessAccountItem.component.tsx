import { Link } from "react-router-dom";
import { IGBusinessAccount } from "../../common/interfaces/IG-business-account.interface";
import "./instagramBusinessAccountItem.component.css";

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
  igBusinessAccount: IGBusinessAccount;
}> = ({ igBusinessAccount }: { igBusinessAccount: IGBusinessAccount }) => {
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

  // return (
  //   <div className="instagramBusinessAccount">
  //     <Link to={{pathname: "/instagramBusinessAccount", state: { id: igBusinessAccount.id }}}>
  //       <img
  //         className="igBusinessAccount_profile_picture_url"
  //         src={igBusinessAccount.profile_picture_url}
  //         alt=""
  //       />
  //     </Link>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{pageName}</p>
  //       <p className="igBusinessAccount_name">{igBusinessAccount.name}</p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{userName}</p>
  //       <p className="igBusinessAccount_username">
  //         {igBusinessAccount.username}
  //       </p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{biography}</p>
  //       <p className="igBusinessAccount_biography">
  //         {igBusinessAccount.biography}
  //       </p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{followers_count}</p>
  //       <p className="igBusinessAccount_followers_count">
  //         {igBusinessAccount.followers_count}
  //       </p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{follows_count}</p>
  //       <p className="igBusinessAccount_follows_count">
  //         {igBusinessAccount.follows_count}
  //       </p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{media_count}</p>
  //       <p className="igBusinessAccount_media_count">
  //         {igBusinessAccount.media_count}
  //       </p>
  //     </div>
  //     <div className="pageDescriptionWrapper">
  //       <p className="descriptionLeadText">{website}</p>
  //       <p className="igBusinessAccount_website">{igBusinessAccount.website}</p>
  //     </div>
  //     {/* <div className="pageDescriptionWrapper">
  //               <p className="descriptionLeadText">{pageName}</p>
  //               <p className="igBusinessAccount_id">{igBusinessAccount.id}</p>
  //           </div>
  //           <div className="pageDescriptionWrapper">
  //               <p className="descriptionLeadText">{pageName}</p>
  //               <p className="igBusinessAccount_ig_id">{igBusinessAccount.ig_id}</p>
  //           </div> */}
  //   </div>
  // );
};

export default InstagramBusinessAccountItem;
