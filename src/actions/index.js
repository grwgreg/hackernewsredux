import * as news from './news'
import * as comments from './comments'
import * as users from './users'

module.exports = {
  ...news,
  ...comments,
  ...users
}
