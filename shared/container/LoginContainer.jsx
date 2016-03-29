import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import * as Actions from '../redux/actions/actions';

import { connect } from 'react-redux';

import linkState from 'react-link-state';

import { bindActionCreators } from 'redux'

const style = {
  margin: '12px 0',
};


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



class LoginContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      signupOrLogin:"LOGIN",
      message:'',
    };
  }

  onSubmit(event){
    event.preventDefault()
    // this.props.dispatch(Actions.login(this.state))
    this.submitForm();
  }

  submitForm(){

    this.setState({
      message : ""
    });

    if(this.state.signupOrLogin==="LOGIN"){
      this.props.dispatch(Actions.login(this.state))
    }else {
      if(validateEmail(this.stateemail))
        this.props.dispatch(Actions.signup(this.state))
      else{
        this.setState({
          message: "seem it is not valid email ?"
        });
      }
    }
  }

  submitBtnClick(event){
    this.submitForm();
  }

  componentDidMount() {
    console.log(this.props);
    if(this.props.user.message)
      dispatch({
        type:"MESSAGE_CLEAR"
      })
  }

  onChange(type,e){
    this.setState({
      [type]: e.target.value.toString()
    });
  }

  test(){
    this.props.dispatch(Actions.test(this.state))
  }

  changeType(event){
    event.preventDefault()
    const signupOrLogin = this.state.signupOrLogin === "LOGIN" ? "SIGNUP" : "LOGIN";
    this.setState({
      signupOrLogin
    });
  }

  render(){
    return (
      <div className="LoginContainer">
        <form className="form" onSubmit={this.onSubmit.bind(this)}>
          <div>
            <center className="title">{this.state.signupOrLogin==="LOGIN" ? "Login with Email" : "Signup with Email" }</center>
            <center className="warning">{this.props.user.message}{this.state.message}</center>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              onChange={this.onChange.bind(this,"email")}
              value={this.state.email}
            /><br/>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChange.bind(this,"password")}
              value={this.state.password}
            />
          <br/>
          <RaisedButton label="login" primary={true} fullWidth={true} style={style} onClick={this.submitBtnClick.bind(this)} />
          <br/><br/>
          <center>
            {this.state.signupOrLogin==="SIGNUP" ? "Already have an account ? " : "New one ? " }
            <a href="#" onClick={this.changeType.bind(this)}>
              {this.state.signupOrLogin==="LOGIN" ? "Signup" : "Login" }
            </a>
          </center>
          </div>
          <input type="submit" />
        </form>

      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    user:store.user
  };
}

// <RaisedButton label="test" primary={true} fullWidth={true} style={style} onClick={this.test.bind(this)} />

export default connect(mapStateToProps)(LoginContainer);
