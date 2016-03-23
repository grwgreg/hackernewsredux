import newsReducers from './news'
import commentsReducer from './comments'
import usersReducer from './users'
import notifyReducer from './notify'

module.exports = {
  ...newsReducers,
  ...commentsReducer,
  ...usersReducer,
  ...notifyReducer
}
