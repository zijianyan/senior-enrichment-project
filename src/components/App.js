import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadSchools_thunk, loadStudents_thunk, reset_thunk } from '../store/thunks';

import SchoolsList from './SchoolsList';
import StudentsList from './StudentsList';
import Nav from './Nav';
import StudentsCreate from './StudentsCreate';
import SchoolsCreate from './SchoolsCreate';
import School from './School';
import Student from './Student';
import Footer from './Footer';

import { Typography, Paper, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 20,
    padding: 50,
    maxWidth: 800,
  },
  title: {
    marginTop: 0,
    marginBottom: 45
  }
};


class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.root}>
          
          <Router>
            <Fragment>
              <Typography variant='display2' align='center' gutterBottom className={classes.title} component={Link} to='/'>Acme Schools and Students</Typography>
              <Divider />
              <Nav />
              <Route exact path='/schools' component={SchoolsList}/>
              <Route exact path='/students' component={StudentsList}/>
              <Switch>
               
                <Route path='/schools/:id' component={School}/>
              </Switch>
              <Switch>
                <Route path='/students/create/:schoolId' component={StudentsCreate}/>
                <Route path='/students/:id' component={Student}/>
              </Switch>
              <Route path ='/' component={Footer}/>
            </Fragment>
          </Router>
        </Paper>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> {
      dispatch(loadSchools_thunk());
      dispatch(loadStudents_thunk());
    },
    reset: ()=> {
      dispatch(reset_thunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));

//  <Route path='/schools/create' component={SchoolsCreate}/>

                // <Route path='/students/create' component={StudentsCreate}/>
