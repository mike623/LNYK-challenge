import * as ActionTypes from '../constants/constants';

const initialState ={
  histories:[]
}

export default (state = initialState, action={}) => {
  switch (action.type) {
    case ActionTypes.HISTORY_ADD:
      console.log("reducer ActionTypes.HISTORY_ADD");
      console.log("reducer action",action);
      const nhistories = state.histories.slice(0);
      nhistories.push(action.history);
      return {
        histories: nhistories
      }
    case ActionTypes.HISTORY_GET:
      return Object.assign({},state,{
        histories:action.histories.histories
      })
    default:
      return state;

  }
}
