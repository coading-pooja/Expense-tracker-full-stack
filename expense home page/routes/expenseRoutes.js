const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController.js');
router.post('/addexpense',  expenseController.addexpense); 
router.post('/deleteexpense', expenseController.deleteexpense);
router.get('/getexpenses',  expenseController.getexpenses);

module.exports = router;                                                                                                
