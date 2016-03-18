import newsReducers from './news'
import commentsReducer from './comments'
import usersReducer from './users'

module.exports = {
  ...newsReducers,
  ...commentsReducer,
  ...usersReducer
}
