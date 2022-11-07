const router = require('express').Router();
const userRoutes = require('../api/user-routes');
const thoughtRoutes = require('../api/thought-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;