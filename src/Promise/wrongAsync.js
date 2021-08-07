const api = require('./libs/apiNormal');
const http = require('./libs/http');

var user = api.getUser('user 1', () => {});
var posts = api.getPostsOfUser(user, () => {});
var comments = api.getCommentsOfPosts(posts, () => {});