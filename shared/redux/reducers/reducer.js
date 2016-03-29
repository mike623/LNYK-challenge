import * as ActionTypes from '../constants/constants';


const initialState = {
  selectedProject: null,
  projects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.ADD_POST:
    //   return {
    //     posts: [{
    //       name: action.name,
    //       title: action.title,
    //       content: action.content,
    //       slug: action.slug,
    //       cuid: action.cuid,
    //       _id: action._id,
    //     }, ...state.posts],
    //     post: state.post
    //   };

    case ActionTypes.ADD_PROJECT:
      return Object.assign({}, state, {projects:action.projects})



    case ActionTypes.CHANGE_EXPERT_STATUS:
      const {
        cuid,
        expertIndex,
        status
      } = action.payload;
      // state.project.experts[expertIndex].status = status;
      const nArr = state.project.experts.slice(0);
      nArr[expertIndex].status = status;
      return Object.assign({}, state, {
        project: Object.assign({}, state.project, {
          experts: nArr
        })
      })

    // case ActionTypes.CHANGE_SELECTED_POST:
    //   return Object.assign({}, state, {
    //     posts: state.posts,
    //     post: action.slug,
    //   });

    // case ActionTypes.ADD_POSTS:
    //   return {
    //     posts: action.posts,
    //     post: state.post,
    //   };

    // case ActionTypes.ADD_SELECTED_POST:
    //   return {
    //     post: action.post,
    //     posts: state.posts,
    //   };

    case ActionTypes.ADD_SELECTED_PROJECT:
      return Object.assign({},state,{
        project: action.project,
      })

    // case ActionTypes.LOGIN_SUCCESS_USER:
    //   const user = Object.assign({},state.user,action.user);
    //   return Object.assign({},state,{
    //     user
    //   })

    // case ActionTypes.DELETE_POST:
    //   return {
    //     posts: state.posts.filter((post) => post._id !== action.post._id),
    //   };

    default:
      return state;
  }
};
