const express = require('express');
const router = express.Router();
const commentService = require('./comment.service');

// routes
router.get('/:id', getById);

module.exports = router;

function getById(req, res, next) {
    commentService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}