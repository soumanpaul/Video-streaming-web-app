import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import Menu from './core/Menu';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import NewMedia from './media/NewMedia'
import EditMedia from './media/EditMedia';
import PlayMedia from './media/PlayMedia';

class MainRouter extends Component {
  constructor({data}) {
    super()
      this.data = data
  }
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
          <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
          <PrivateRoute path="/media/new" component={NewMedia}/>
          <PrivateRoute path="/media/edit/:mediaId" component={EditMedia}/>
          <Route path="/user/:userId" component={Profile}/>
          <Route path="/media/:mediaId" render={(props) => (
            <PlayMedia {...props} data={this.data} />  )} />
          <Route path="/media/:mediaId" component={PlayMedia}/>  
        </Switch>
      </div>
    );
  }
}
export default MainRouter;
