const router = require('express').Router();
const userRoutes = require('../api/user-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

module.exports = router;