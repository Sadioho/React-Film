/**
 *
 * CardSkeleton
 *
 */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(255 252 252 / 36%)',
  },
});
function CardSkeleton() {
  const classes = useStyles();

  return (
    <Box width={280}>
      <Skeleton
        variant="rect"
        // width={280}
        height={170}
        classes={{
          root: classes.root,
        }}
      />
      <Box pt={0.5}>
        <Skeleton
          classes={{
            root: classes.root,
          }}
          width="60%"
        />
      </Box>
    </Box>
  );
}

CardSkeleton.propTypes = {};

export default CardSkeleton;
