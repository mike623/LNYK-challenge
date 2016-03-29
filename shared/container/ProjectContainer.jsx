import React, { PropTypes, Component } from 'react';
import ProjectListView from './ProjectListView';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';


import { Link } from 'react-router';

const ListItem = ({name,onClick}) => (
  <div><Link to={`/post/${props.post.slug}-${props.post.cuid}`} onClick={props.onClick}>{name}</Link></div>
)

class ProjectContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      showAddPost: !this.state.showAddPost,
    });

    e.preventDefault();
  }


  componentDidMount() {
    if(this.props.projects.length===0)
      this.props.dispatch(Actions.fetchProjects());
  }

  render() {
    return (
      <div>
        <div className="container">
          <ProjectListView projects={this.props.projects}/>
        </div>
      </div>
    );
  }
}

ProjectContainer.need = [
  () => { return Actions.fetchProjects(); },
];

ProjectContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    projects: store.project.projects,
  };
}



// ProjectContainer.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//   })).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(ProjectContainer);
