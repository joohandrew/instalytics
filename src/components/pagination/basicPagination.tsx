import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

interface BasicPaginationProps {
  pageCount: number;
  pageChangeHandler: any;
}


const BasicPagination: React.FC<BasicPaginationProps> = ({ pageCount, pageChangeHandler }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      pageChangeHandler(event, value);
    };

    return (
      <div className={classes.root}>
        <Pagination count={pageCount} page={page} color="primary" onChange={handleChange}/>
      </div>
    );
}

export default BasicPagination;
