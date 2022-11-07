const router = require('express').Router();

const {
    getallThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,

} = require('../../controllers/thought-controller');

// /api/thoughts get all thoughts
router
.route('/')
.get(getallThought)
.post(addThought)

// /api/thoughts/:thoughtId thoughts by id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions create reaction for a single user/delete a thought
router
.route('/:thoughtId/reactions')
.post(addReaction)

// /api/thoughts/:thoughtId/reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)


module.exports = router;