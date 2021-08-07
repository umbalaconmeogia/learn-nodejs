const http = require('./http');

module.exports = {
    getUser,
    getPostsOfUser,
    getCommentsOfPosts
};

function getUser(username) {
    return new Promise((resolve, reject) => {
        http.get('getUser', function(err, result) {
            callback(err, 'user 1');
        });

    });
}

function getPostsOfUser(user, callback) {
    http.get('getPostsOfUser', function(err, result) {
        callback(err, ['post 1', 'post 2', 'post 3']);
    });
}

function getCommentsOfPosts(posts, callback) {
    http.get('getCommentsOfPOsts', function(err, result) {
        callback(err, ['comment 1', 'comment 2', 'comment 3']);
    });
}