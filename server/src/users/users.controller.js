const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.get('/:id', getById);

module.exports = router;

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}