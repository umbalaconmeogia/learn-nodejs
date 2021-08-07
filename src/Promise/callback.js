const api = require('./libs/apiNormal');
const http = require('./libs/http');

api.getUser('user 1', function(err, user) {
    if (err) throw err;
    console.log("user");
    console.log(user);
    api.getPostsOfUser(user, function(err, posts) {
        if (err) throw err;
        console.log("posts");
        console.log(posts);
        api.getCommentsOfPosts(posts, function(err, comments) {
            console.log("comments");
            console.log(comments);
        });
    });
});