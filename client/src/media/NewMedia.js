import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import Card from '@material-ui/core/Card'
import {CardActions, CardContent}  from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PublishIcon from '@material-ui/icons/Publish'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {create} from './api-media.js'
import {Redirect} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class NewMedia extends Component {
  state = {
      title: '',
      video: '',
      description: '',
      genre: '',
      redirect: false,
      error: '',
      mediaId: ''
  }
  componentDidMount = () => {
    this.mediaData = new FormData()
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.mediaData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({redirect: true, mediaId: data._id})
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'video'
      ? event.target.files[0]
      : event.target.value
    this.mediaData.set(name, value)
    this.setState({ [name]: value })
  }

  render() {
    const {classes} = this.props
    if (this.state.redirect) {
      return (<Redirect to={'/media/' + this.state.mediaId}/>)
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h1" className={classes.title}>
            New Video
          </Typography>
          <input accept="video/*" onChange={this.handleChange('video')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button color="secondary" variant="raised" component="span">
              Upload
              <PublishIcon/>
            </Button>
          </label> <span className={classes.filename}>{this.state.video ? this.state.video.name : ''}</span><br/>
          <TextField id="title" label="Title" className={classes.textField} value={this.state.title} onChange={this.handleChange('title')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="genre" label="Genre" className={classes.textField} value={this.state.genre} onChange={this.handleChange('genre')} margin="normal"/><br/>
          <br/> {
                  this.state.error && (<Typography component="p" color="error">
                      <Icon color="error" className={classes.error}>error</Icon>
                      {this.state.error}
                    </Typography>)
                }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

NewMedia.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewMedia)
