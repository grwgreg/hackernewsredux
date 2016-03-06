import t from '../actions/actiontypes'
const initialState = {
  loading: true,
  items: []
}
function newsItems(state = initialState, action) {
                               
  switch (action.type) {

    case t.LOAD_NEWS_START:
      return Object.assign({}, state, {loading:true})

    case t.LOAD_NEWS_SUCCESS:
      //concat so infinite scroll or make that distinct action?
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload],
        loading: false
      }) 
    
    default:
      return state
  }
} 

module.exports = {
  newsItems
}
