const router = require('express').Router();

// bring in the user controller to set routes 
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//  /api/users
router
.route('/')
.get(getAllUser)
.post(createUser);

// /api/users/:id  --- by "id" routes
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;