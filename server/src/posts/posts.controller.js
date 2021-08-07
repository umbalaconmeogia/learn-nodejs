const express = require('express');
const router = express.Router();
const postService = require('./post.service');

// routes
router.get('/:id', getById);

module.exports = router;

function getById(req, res, next) {
    postService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}