const express = require('express');
const router = express.Router();
const postService = require('./post.service');

// routes
router.get('/', getAll);
// router.get('/search', getAll);
router.get('/:id', getById);

module.exports = router;

function getAll(req, res, next) {
    postService.getAll(req.query)
        .then(posts => res.json(posts))
        .catch(next);
}

function getById(req, res, next) {
    postService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}
