const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getallThought(req, res){
        Thought.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get a single thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select("-__v")
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought with that ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    // insert mind control.... jk.. lets add a thought to the user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // update thought
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body,
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // add reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));

    },

    // remove thought and take reactions with it 
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if(!deletedThought){
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(deletedThought)
        })
        .catch((err) => res.status(500).json(err));
        
    },
    // remove just the reaction and leave thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .select("-__v")
        .then(deletedReaction => {
            if(!deletedReaction){
                return res.status(404).json({ message: 'No reaction with this id!' });
            }
            res.json(deletedReaction)
        })
        .catch((err) => res.status(500).json(err));
        
    },
}

module.exports = thoughtController;