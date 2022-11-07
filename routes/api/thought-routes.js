const router = require('express').Router();

const {
    addThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId create thoughts for a single user
router
.route('/:userId')
.post(addThought)

// /api/thoughts/:userId/:thoughtId create reaction for a single user/delete a thought
router
.route('/:userId/:thoughtId/')
.post(addReaction)
.delete(deleteThought)

// /api/thoughts/:userId/:thoughtId/reactionId
router
.route('/:userId/:thoughtId/:reactionId')
.delete(deleteReaction)


module.exports = router;