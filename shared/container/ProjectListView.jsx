import React, { PropTypes, Component } from 'react';
// import PostListItem from '../components/PostListItem/PostListItem';
import ProjectListItem from '../components/ProjectListItem';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import { Link } from 'react-router';

import moment from 'moment';


function getNewProject(projects) {
  return projects.filter((item) => item.status==="NEW" && moment(item.dateAdded).isAfter(moment()) )
}
function getPendingProject(projects) {
  return projects.filter((item) => item.status==="PENDDING" && moment(item.dateAdded).isAfter(moment()) )
}
function getExpiredProject(projects) {
  return projects.filter((item) => moment(item.dateAdded).isBefore(moment()) )
}


class ProjectListView  extends Component {

  render(){
    return (
      <div className="listView">
        <ProjectListItem
          projects={getNewProject(this.props.projects)} title="New"
        />

      <ProjectListItem
        projects={getPendingProject(this.props.projects)}
        title="Pendding"
        onClick={function handleClick() {
          this.props.dispatch(Actions.addSelectedPost(projects));
        }}
        onDelete={function handleDelete() {
          if (confirm('Do you want to delete this post')) { // eslint-disable-line
            this.props.dispatch(Actions.deletePostRequest(projects));
          }
        }}
        />
      <ProjectListItem
        projects={getExpiredProject(this.props.projects)}
        title="Expired"
        onClick={function handleClick() {
          this.props.dispatch(Actions.addSelectedPost(projects));
        }}
        onDelete={function handleDelete() {
          if (confirm('Do you want to delete this post')) { // eslint-disable-line
            this.props.dispatch(Actions.deletePostRequest(projects));
          }
        }}
        />

      </div>
    );
  }
}

// ProjectListView.need = [
//   () => { return Actions.fetchPosts(); },
//   () => { return Actions.testPosts(); },
//   () => { return Actions.fetchProjects(); },
// ];

ProjectListView.contextTypes = {
  router: React.PropTypes.object,
};

// function mapStateToProps(store) {
//   return {
//     posts: store.posts,
//     projects: store.projects,
//   };
// }

// ProjectListView.propTypes = {
//   projects: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   })).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(ProjectListView);
