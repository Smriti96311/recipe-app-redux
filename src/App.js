import './App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as types from './redux/actionTypes';
import { DirectionsRun } from '@material-ui/icons';

const conUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function App() {
  const dispatch = useDispatch ();
  const classes = useStyles ();
  const classes1 = conUseStyles ();
  const [expanded, setExpanded] = React.useState(false);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {recipes} = useSelector (state => state.data);

  useEffect (() => {
    dispatch ({ type: types.FETCH_RECIPE_START, query });

  }, [ query, dispatch ]);

  const updateSearch = () => {
    setQuery (search);
    setSearch ('');
  };

  return (
    <div className="App">
      <h2>Recipe App</h2>
      <form>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch (e.target.value)}
        />
        <Button
          variant="contained"
          color="primary" 
          style={{
            width: "80px",
            height: "50px"
          }}
          onClick={updateSearch}
        >
          Search
        </Button>
       
          <Grid container className={classes1.root} spacing={2} style = {{padding: '20px'}}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {recipes && recipes.hits && recipes.hits.map((item, index) => (
                  <Grid key={index} item>
                     <Card className={classes.root}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={item.recipe.label}
                        subheader={
                          <span>
                            <DirectionsRun/>
                            {item.recipe.calories}
                          </span>
                        }
                      />
                      <CardMedia
                        className={classes.media}
                        image={item.recipe.image}
                        title={item.recipe.label}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {item.recipe.ingredientLines}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
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
                          <Typography paragraph>Meal Type</Typography>
                          <Typography paragraph>
                            {item.recipe.mealType}
                          </Typography>

                        </CardContent>
                      </Collapse>
                    </Card>
                    
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
    
      </form>
    </div>
  );
}

export default App;
