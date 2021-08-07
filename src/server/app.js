const express = require('express');
const app = express();
const port = 3000;

// Generate data
data = [];
for (const userId = 1; userId <= 3; userId++) {
    const user = {
        name: `user ${userId}`,
        posts: [],
    };
    for (const postId = 1; postId <= 3; postId++) {
        const post = {
            content: `post ${userId}.${postId}`,
            comments: [],
        };
        user.posts.push(post);

    }

    data.push(user);
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/user', (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})