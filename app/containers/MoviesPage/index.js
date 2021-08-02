/* eslint-disable prettier/prettier */
/**
 *
 * MoviesPage
 *
 */

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab';
import _debounce from 'lodash/debounce';
import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import CardDetail from '../../components/CardDetail';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from '../../helper/config';
import {
  findDataMoive,
  getDataMovies,
  getDataMoviesNew,
  getIdMovie,
  resetFlagsMovie,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectDataActor,
  makeSelectDetailMovie,
  makeSelectMoviesData,
  makeSelectStatusFlags,
} from './selectors';
const useStyles = makeStyles({
  bgHome: {
    fontFamily: '"Helvetica Neue","Helvetica","Arial","sans-serif"',
    backgroundColor: '#181818',
    padding: '30px',
    alignItems: 'center',
    color: 'white',
    minHeight: '95vh',
  },

  boxMovie: {
    padding: '40px 20px',
    cursor: 'pointer',
  },
  bgSkeleton: {
    backgroundColor: 'white',
    width: '100%',
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'black',
  },
  title: {
    flex: 1,
  },
  marginAuto: {
    margin: 'auto',
  },
  boxActor: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxContainer: {
    width: '300px',
    margin: '10px 0',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    display: 'flex',
    borderRadius: '5px',
    boxShadow: '0px 1px 8px 1px rgba(0,0,0,0.17)',
  },
  boxContent: {
    padding: '10px',
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid white',
    width: '50%',
    margin: '20px 0',
  },
  inputInput: {
    padding: '10px',
  },
  boxSkeleton: {
    flexBasis: '19%',
    maxWidth: '100%',
    margin: '20px .1%',
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export function MoviesPage(props) {
  const {
    triggerDataMovies,
    dataMovies,
    statusFlags,
    triggerIdMovie,
    triggerResetFlags,
    detailMovie,
    dataActor,
    triggerDataNewMovie,
    triggerFindDataMovie,
  } = props;
  useInjectReducer({ key: 'moviesPage', reducer });
  useInjectSaga({ key: 'moviesPage', saga });
  const [numberPage, setNumberPage] = useState(2);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = idMovie => {
    triggerIdMovie(idMovie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    triggerResetFlags();
  };

  const getPage = () => {
    setNumberPage(numberPage + 1);
    triggerDataNewMovie(numberPage);
  };

  const sendQuery = query => triggerFindDataMovie(query);
  // const delayedQuery = useRef(_debounce(q => sendQuery(q), 500)).current;
  const delayedQuery = useCallback(_debounce(q => sendQuery(q), 500), []);

  const handleOnChange = e => {
    delayedQuery(e.target.value);
  };

  useEffect(() => {
    triggerDataMovies();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.bgHome}>
      <Grid item md={6} sm={12}>
        <Typography variant="h3">Phim Việt Nam</Typography>
        <Typography>
          Điện ảnh Hàn Quốc đang nở rộ ở khắp các thể loại. Cho dù bạn đang muốn
          có được cảm giác lãng mạn, cười khúc khích, sợ hãi hay gì đi nữa,
          những bộ phim này đều có thể mang lại tất cả những gì bạn cần.
        </Typography>
      </Grid>
      <Box className={classes.boxMovie}>
        <div>
          <h2> Phổ biến trên Netflix </h2>
          <InputBase
            onChange={handleOnChange}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <Grid container wrap="wrap" spacing={2}>
            {statusFlags.isCallAPILoading ? (
              Array.from(new Array(20)).map((item, index) => (
                <Grid key={(() => `${index}`)()} xs={2} item>
                  <Skeleton
                    height={300}
                    variant="rect"
                    classes={{
                      root: classes.bgSkeleton,
                    }}
                  />
                  <Box pt={0.5}>
                    <Skeleton
                      classes={{
                        root: classes.bgSkeleton,
                      }}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <>
                {dataMovies.length > 0 ? (
                  dataMovies.map(item => (
                    <Grid
                      item
                      sm={4}
                      md={2}
                      onClick={() => handleClickOpen(item.id)}
                      key={item.id}
                    >
                      <img
                        style={{ width: '100%', height: 398 }}
                        alt={item.original_title}
                        src={
                          item.poster_path !== null
                            ? `${IMAGE_BASE_URL}w500${item.poster_path}`
                            : 'https://www.techmadeplain.com/img/2014/300x200.png'
                        }
                      />
                      <Box>
                        <Typography gutterBottom variant="body2" align="center">
                          {item.original_title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <h1>Không có dữ liệu</h1>
                )}
              </>
            )}
          </Grid>
          <Button variant="contained" color="secondary" onClick={getPage}>
            Xem Tiếp
          </Button>
        </div>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {statusFlags.isGetDataSuccess ? (
                detailMovie.original_title
              ) : (
                <Skeleton
                  width="200px"
                  classes={{
                    root: classes.bgSkeleton,
                  }}
                />
              )}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {statusFlags.isGetDataSuccess ? (
          <Box>
            <CardDetail
              name={detailMovie.original_title}
              date={detailMovie.release_date}
              minustes={detailMovie.runtime}
              genares={detailMovie.genres.map(item => `  ${item.name}`)}
              overview={detailMovie.overview}
              rating={detailMovie.vote_average}
              url={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                detailMovie.backdrop_path
              }`}
            />
          </Box>
        ) : (
          <CircularProgress className={classes.marginAuto} disableShrink />
        )}

        <Box p={3}>
          <Typography variant="h2" align="center">
            Actors
          </Typography>
          <Box className={classes.boxActor}>
            {statusFlags.isGetDataSuccess ? (
              _map(dataActor, item => (
                <Box key={item.id} className={classes.boxContainer}>
                  <Box className={classes.boxContent}>
                    <Typography variant="h5">{item.original_name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.character}
                    </Typography>
                  </Box>
                  <Box className={classes.boxImg}>
                    {statusFlags.isGetDataSuccess ? (
                      <img
                        src={
                          item.profile_path
                            ? `${IMAGE_BASE_URL}w500${item.profile_path}`
                            : `https://movie-reactjs.web.app/images/no_image.jpg`
                        }
                        alt="kkk"
                        width={133}
                        height={200}
                      />
                    ) : (
                      <Skeleton variant="rect" width={133} height={200} />
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <CircularProgress className={classes.marginAuto} disableShrink />
            )}
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}

MoviesPage.propTypes = {
  triggerDataMovies: PropTypes.func.isRequired,
  triggerIdMovie: PropTypes.func.isRequired,
  triggerResetFlags: PropTypes.func,
  dataMovies: PropTypes.array,
  statusFlags: PropTypes.object,
  detailMovie: PropTypes.object,
  dataActor: PropTypes.array,
  triggerDataNewMovie: PropTypes.func,
  triggerFindDataMovie: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataMovies: makeSelectMoviesData(),
  detailMovie: makeSelectDetailMovie(),
  dataActor: makeSelectDataActor(),
  statusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerDataMovies: () => dispatch(getDataMovies()),
    triggerIdMovie: data => dispatch(getIdMovie(data)),
    triggerDataNewMovie: data => dispatch(getDataMoviesNew(data)),
    triggerFindDataMovie: data => dispatch(findDataMoive(data)),

    triggerResetFlags: () => dispatch(resetFlagsMovie()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
