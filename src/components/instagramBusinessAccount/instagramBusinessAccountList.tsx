// Components
import React from "react";
import { IInstagramBusinessAccount } from "../../common/interfaces/IInstagramBusinessAccount";
import InstagramBusinessAccountItem from "./instagramBusinessAccountItem";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

interface InstagramBusinessAccountProps {
  arrayOfInstagramBusinessAccounts: IInstagramBusinessAccount[];
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

const InstagramBusinessAccountList: React.FC<InstagramBusinessAccountProps> = ({
  arrayOfInstagramBusinessAccounts,
}: InstagramBusinessAccountProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        {arrayOfInstagramBusinessAccounts.map((instagramBusinessAccount) => (
          <Grid className={classes.paper} item xs={12} sm={6} md={6} lg={3} key={instagramBusinessAccount.id}>
            <InstagramBusinessAccountItem instagramBusinessAccount={instagramBusinessAccount} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default InstagramBusinessAccountList;
