
import {
  Grid, Container, Card, CardMedia, CardContent,
  Typography, CardActions, Button, Paper
} from '@material-ui/core';
import React from 'react';
import './App.css';
import Topbar from './components/topbar';
import useStyles from './components/styles/useStyles';
import logo from './components/pics/logo.png'
import top from './components/pics/top.png'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function App() {
  const classes = useStyles();
  return (
    <>
    <main>
      <Topbar />
      <Paper className={classes.mainFeaturesPost}
        style={{ backgroundImage: `url(${top})` }}>
        <Container fixed>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturesPostContent}>
                <Typography
                  variant="h5"
                  color="inherit"
                >
                  Here is the text which
                  doesn't make any sense being here,
                  but this is the place, where
                  some other stuff is going to be,
                  so its not a big deal...
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <Grid container spacing={5}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={logo}
                  title="Whatever"
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>
                    Task
                  </Typography>
                  <Typography>
                    Description
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
    <footer>
      <Typography variant="h6" align="center" gutterBottom>Here might be navigational components</Typography>

    </footer>
    </>
  );
}
export default App;