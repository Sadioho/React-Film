/**
 *
 * CardDetail
 *
 */

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EuroIcon from '@material-ui/icons/Euro';
import { Rating, Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100',
    position: 'relative',
  },
  media: {
    height: 750,
  },
  cardContent: {
    width: '600px',
    position: 'absolute',
    top: '20%',
    margin: '20px',
    color: 'white',
    backgroundColor: '#acacac9c',
    borderRadius: '20px',
  },
  boxItem2: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 0',
  },
  itemText: {
    cursor: 'pointer',
    color: 'black',
    padding: '0px 7px',
    '&:not(:last-child)': {
      borderRight: '1px solid white',
    },
  },
  bgSkeleton: {
    backgroundColor: 'white',
  },
});

function CardDetail({ ...props }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          props.url ? props.url : `https://wallpaperaccess.com/full/1668918.jpg`
        }
        title="Contemplative Reptile"
      />
      <CardContent className={classes.cardContent}>
        <Box>
          <Box>
            <Typography variant="h4">
              {props.name ? (
                props.name
              ) : (
                <Skeleton
                  classes={{
                    root: classes.bgSkeleton,
                  }}
                />
              )}
            </Typography>
            <Box className={classes.boxItem2}>
              <Typography className={classes.itemText}>
                {props.date ? (
                  props.date
                ) : (
                  <Skeleton
                    width={60}
                    classes={{
                      root: classes.bgSkeleton,
                    }}
                  />
                )}
              </Typography>
              <Typography className={classes.itemText}>13+</Typography>
              <Typography className={classes.itemText}>
                {props.minustes ? (
                  `${props.minustes}  minutes`
                ) : (
                  <Skeleton
                    width={60}
                    classes={{
                      root: classes.bgSkeleton,
                    }}
                  />
                )}
              </Typography>
              <Typography className={classes.itemText}>
                {props.genares ? (
                  props.genares
                ) : (
                  <Skeleton
                    width={200}
                    classes={{
                      root: classes.bgSkeleton,
                    }}
                  />
                )}
              </Typography>
            </Box>
            <Typography>
              {props.overview ? (
                props.overview
              ) : (
                <Skeleton
                  width={500}
                  height={200}
                  m={0}
                  classes={{
                    root: classes.bgSkeleton,
                  }}
                />
              )}
            </Typography>
            <Rating
              name="read-only"
              readOnly
              value={props.rating ? props.rating : 10}
              max={10}
              precision={0.5}
            />
            <CardActions>
              <Button size="small" variant="contained" color="secondary">
                <AddShoppingCartIcon />
                <Typography>Thuê Phim</Typography>
              </Button>

              <Button size="small" variant="contained" color="primary">
                <EuroIcon />
                <Typography>PRICE</Typography>
              </Button>
            </CardActions>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

CardDetail.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  minustes: PropTypes.number,
  genares: PropTypes.array,
  overview: PropTypes.string,
  rating: PropTypes.number,
  url: PropTypes.string,
};

export default CardDetail;
