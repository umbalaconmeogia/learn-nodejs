module.exports = {};

const USER_NUM = 3;
const POST_NUM = 3;
const COMMENT_NUM = 3;

const tableUsers = {};
const tablePosts = {};
const tableComments = {};

function createUsers() {
    for (const userId = 1; userId <= USER_NUM; userId++) {
        const userName = `user ${userId}`;
        const user = {
            name: userName,
            posts: createPosts(userId),
        };
        users[username] = user;
    }
}

function createPosts(userId) {
    for (const postId = 1; postId <= POST_NUM; postId++) {
        const postContent = `post ${userId}.${postId}`;
        const post = {
            content: postContent,
            comments: createComments(userId, postId),
        };
        posts[postContent] = post;
    }
}

function createComments(userId, postId) {
    var
    for (const commentId = 1; commentId <= COMMENT_NUM; commentId++) {
        const commentContent = `comment ${userId}.${postId}.${commentId}`;
        const comment = {
            content: commentContent,
        };
        comments[commentContent] = comment;
    }
}