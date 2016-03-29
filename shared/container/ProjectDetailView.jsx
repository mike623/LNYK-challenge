import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import Toggle from 'material-ui/lib/toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};


function statusToBool(status){
  return ["PENDING", "REJECTED"].includes(status) ? false : true;
}

function boolToStatus(bool){
  return bool ? "APPROVED" : "REJECTED";
}

function statusOppsite(status){
  return ["PENDING", "REJECTED"].includes(status) ? "APPROVED" : "REJECTED";
}

const RowItem = ({description, name, status, onToggle, key}) => (
  <TableRow>
    <TableRowColumn>{name}</TableRowColumn>
    <TableRowColumn>{description}</TableRowColumn>
    <TableRowColumn>
      <Toggle
        label={boolToStatus(status)}
        defaultToggled={status}
        style={styles.toggle}
        onToggle={onToggle}
        key={key}
      />
    </TableRowColumn>

  </TableRow>
)


class ProjectDetailView extends Component {

  constructor(props, context) {
    super(props, context);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleLogoClick = this.handleLogoClick.bind(this);
    // this.onToggle = this.onToggle.bind(this,i);
  }

  onToggle(key){
    console.log({key})
    const nStatus = statusOppsite(this.props.project.experts[key].status)
    const payload = {
      cuid: this.props.project.cuid,
      expertIndex: key,
      status: nStatus
    };
    this.props.dispatch(Actions.changeExpertStatus(payload));
  }

  // handleClick() {
  //   this.setState({
  //     showAddPost: true,
  //   });
  // }
  //
  // handleLogoClick() {
  //   this.props.dispatch(Actions.fetchPosts());
  // }

  render() {
    return (
      <div>
        <div className="detail container">
          <h3>{this.props.project.title}</h3>
          <h5>{this.props.project.name}</h5>
          <Table className="detailTb">
           <TableHeader
             adjustForCheckbox={false}
             displaySelectAll={false}
             enableSelectAll={false}
             >
             <TableRow>
               <TableHeaderColumn>Expert Name</TableHeaderColumn>
               <TableHeaderColumn>Description</TableHeaderColumn>
               <TableHeaderColumn>Status</TableHeaderColumn>
             </TableRow>
           </TableHeader>
           <TableBody displayRowCheckbox={false} >
             {this.props.project.experts.map((item,i) => {
               return <RowItem name={item.name} description={item.description} status={statusToBool(item.status)} key={i} onToggle={this.onToggle.bind(this,i)} />
             })}
           </TableBody>
         </Table>
         </div>
      </div>
    );
  }
}

ProjectDetailView.need = [
  (params) => { return Actions.getProjectRequest.bind(null, params.cuid)(); },
  () => { return Actions.fetchProjects(); },
];

ProjectDetailView.contextTypes = {
  router: React.PropTypes.object,
};

// <div className="container">
//   <div className="single-post post-detail">
//     <h3 className="post-title">{this.props.post.title}</h3>
//     <p className="author-name">By {this.props.post.name}</p>
//     <p className="post-desc">{this.props.post.content}</p>
//   </div>
// </div>

// ProjectDetailView.propTypes = {
//   projects: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   }).isRequired,
//   posts: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   }).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

function mapStateToProps(store) {
  return {
    projects: (store.project.projects),
    project: (store.project.project),
  };
}

export default connect(mapStateToProps)(ProjectDetailView);
