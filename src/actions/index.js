import * as news from './news'
import * as comments from './comments'
import * as users from './users'
import * as notify from './notify'

module.exports = {
  ...news,
  ...comments,
  ...users,
  ...notify
}
