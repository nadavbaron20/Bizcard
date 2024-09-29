const router = require('express').Router();
const { getAllCards, getCardById, searchInCards, createNewCard, deleteCard, updateCard } = require('../controllers/cardsControllers');

//  base path = "/api/cards"

router.get('/', getAllCards)
router.get('/:id', getCardById)
router.post('/search', searchInCards)
router.post('/', createNewCard)
router.delete('/:id', deleteCard)
router.patch('/:id', updateCard)

module.exports = router;