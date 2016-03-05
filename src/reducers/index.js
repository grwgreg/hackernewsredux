import t from '../actions/actiontypes'
const initialState = {}
function newsItems(state = initialState, action) {
                               
  switch (action.type) {

    case t.LOAD_NEWS_START:
      //todo loading state

    case t.LOAD_NEWS_SUCCESS:

      return Object.assign({}, state, {
        items: action.payload
      }) 
    
    default:
      return state
  }
} 

module.exports = {
  newsItems
}
