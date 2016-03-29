import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

// import Table from 'material-ui/lib/table/table';
// import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
// import TableRow from 'material-ui/lib/table/table-row';
// import TableHeader from 'material-ui/lib/table/table-header';
// import TableRowColumn from 'material-ui/lib/table/table-row-column';
// import TableBody from 'material-ui/lib/table/table-body';

import {Table,Tr } from 'reactable';

import Toggle from 'material-ui/lib/toggle';

import moment from 'moment'

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

function formatDate(date){
  return moment(date).format("MM-DD-YYYY HH:mm");
}

const formatHistory = ({action, date, projectName, expertName },i) => {return { projectName, expertName, action, date:formatDate(date),  }}

const RowItem = ({action, date, projectName, expertName }) => (

  <TableRow>
    <TableRowColumn>{projectName}</TableRowColumn>
    <TableRowColumn>{expertName}</TableRowColumn>
    <TableRowColumn>{action}</TableRowColumn>
    <TableRowColumn>{formatDate(date)}</TableRowColumn>

  </TableRow>
)


class ProjectHistoryView extends Component {

  constructor(props, context) {
    super(props, context);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleLogoClick = this.handleLogoClick.bind(this);
    // this.onToggle = this.onToggle.bind(this,i);
  }


  componentDidMount() {
    if(this.props.histories.length === 0) {
      this.props.dispatch(Actions.fetchHistory());
    }
  }


  render() {
    return (
      <div className="HistoryContainer">
        <div className="title">History</div>
        <div className="desc">click table header for sort</div>
        <Table sortable={true} className="table" data={this.props.histories.map(formatHistory)} >
        </Table>
      </div>
    )
  }
}

ProjectHistoryView.need = [
  () => { return Actions.fetchHistory(); },
];

ProjectHistoryView.contextTypes = {
  router: React.PropTypes.object,
};
//



function mapStateToProps(store) {
  return {
    histories: (store.history.histories),
    // projects: (store.project.projects),
    // project: (store.project.project),
  };
}

export default connect(mapStateToProps)(ProjectHistoryView);


// return (
//   <div>
//     <div className="detail container">
//       <h3>History</h3>
//       <Table className="detailTb">
//        <TableHeader
//          adjustForCheckbox={false}
//          displaySelectAll={false}
//          enableSelectAll={false}
//          >
//          <TableRow>
//            <TableHeaderColumn>Project Name</TableHeaderColumn>
//            <TableHeaderColumn>Expert Name</TableHeaderColumn>
//            <TableHeaderColumn>Action</TableHeaderColumn>
//            <TableHeaderColumn>time</TableHeaderColumn>
//          </TableRow>
//        </TableHeader>
//        <TableBody displayRowCheckbox={false} >
//          {this.props.histories.map((item,i) => {
//            return <RowItem {...item} key={i}  />
//          })}
//        </TableBody>
//      </Table>
//      </div>
//   </div>
// );
