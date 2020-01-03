import React, { Component } from "react";

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import {ListItem, ListItemAvatar , ListItemSecondaryAction, ListItemText} from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user.js'
import PropTypes from 'prop-types'




const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
})

class Users extends Component {
  state = { users: [] };

  componentDidMount = () => {
    list().then(data => {
      if (data.error) console.log(data.error);
      else this.setState({ users: data });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Users
        </Typography>
        <List dense>
          {this.state.users.map(function(item, i) {
            return (
              <Link to={"/user/" + item._id} key={i}>
                <ListItem button="button">
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    );
  }
}



Users.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Users)
