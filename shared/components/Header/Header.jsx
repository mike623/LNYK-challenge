import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import Svgfolder from 'material-ui/lib/svg-icons/file/folder';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import SvgBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import SvgForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import Divider from 'material-ui/lib/divider';

import * as Actions from '../../redux/actions/actions';



class Header extends Component {

  logout(){
    this.props.dispatch(Actions.logout())
  }

  render(){
    const loginOutBtn = ()=> {
      if(this.props.user.authenticated)
        return (<ListItem primaryText="Logout" onClick={this.logout.bind(this)} leftIcon={<SvgBack />} />)
      else {
        return (<Link to={`/login`} ><ListItem primaryText="Login"  leftIcon={<SvgForward />} /></Link>)
      }
    }
    return (
      <div className="header">

        <center className="logo">
          <img src="/img/image.png" alt=""/>
        </center>
        <center className="site-title">LYNK</center>

        <List className="list">

          <Link to={`/home`} ><ListItem primaryText="Home"  leftIcon={<Svgfolder />} /></Link>


          {
          (this.props.user.authenticated)
           ? <Link to={`/History`} ><ListItem primaryText="History"  leftIcon={<ContentInbox />} /></Link>
         : null
          }

          {loginOutBtn()}


        </List>

      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user
  };
}

// Header.contextTypes = {
//   router: React.PropTypes.object,
// };
//
// Header.propTypes = {
//   // onClick: PropTypes.func.isRequired,
//   handleLogoClick: PropTypes.func,
// };

export default connect(mapStateToProps)(Header);
