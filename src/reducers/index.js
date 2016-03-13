import newsReducers from './news';
import commentsReducers from './comments';

module.exports = {
  ...newsReducers,
  ...commentsReducers
}
