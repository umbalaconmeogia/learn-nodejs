const express = require('express');
const router = express.Router();
const commentService = require('./comment.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

function getAll(req, res, next) {
    postService.getAll(req.query)
        .then(comments => res.json(comments))
        .catch(next);
}

function getById(req, res, next) {
    commentService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}