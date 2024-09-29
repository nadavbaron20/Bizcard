const router = require('express').Router();
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');

//  base path = "/api/users"

router.get('/', mustLogin, allowedRoles(['admin']), getAllUsers)
router.get('/:id', mustLogin, getUserById)
router.delete('/:id', mustLogin, allowedRoles(['admin']), deleteUser)
router.patch('/:id', mustLogin, updateUser)

module.exports = router;