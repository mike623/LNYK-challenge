import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import moment from 'moment';

import * as Actions from '../redux/actions/actions';

function formatDate(date){
  return moment(date).format("MM-DD-YYYY");
}

class ProjectListItem extends Component {

  onClick(project){
    this.props.dispatch(Actions.addSelectedProject(project));
  }


  render(){
    return (
      <div className="single-post">
        <h3>{this.props.title}</h3>
          <Table>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
          enableSelectAll={false}
          >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>End Time</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {
            this.props.projects.map((project, i) => (
              <TableRow key={i}>
                <TableRowColumn>{i+1}</TableRowColumn>
                <TableRowColumn>{project.title}</TableRowColumn>
                <TableRowColumn>{project.name}</TableRowColumn>
                <TableRowColumn>{formatDate(project.dateAdded)}</TableRowColumn>
                <TableRowColumn><Link to={`/project/${project.cuid}`} onClick={this.onClick.bind(this,project)}>Edit</Link></TableRowColumn>
              </TableRow>

            ))
          }
        </TableBody>
      </Table>

      </div>
    );
  }
}



// ProjectListItem.propTypes = {
//   project: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   }).isRequired,
//
//   onClick: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default connect()(ProjectListItem);


// <h3 className="post-title ">
//   <Link to={`/project/${this.props.project.slug}-${this.props.project.cuid}`} onClick={this.props.onClick}>
//     {this.props.project.title}
//   </Link>
// </h3>
// <p className="author-name">By {this.props.project.name}</p>
// <p className="post-desc">{this.props.project.content}</p>
// <p className="post-action"><a href="#" onClick={this.props.onDelete}>Delete Post</a></p>
// <hr className="divider"/>
