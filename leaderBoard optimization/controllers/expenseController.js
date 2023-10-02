const Expense = require("../models/expenses")

const addexpense = async (req, res) => {
    try {
        console.log(req.body);
        const amount = req.body.amount;
        const desc = req.body.desc;
        const cat = req.body.cat;
        const expense = await Expense.create({ amount: amount, description: desc, category: cat,userId:req.user.id})
        res.status(201).json({ data: expense });
  
    }
    catch (err) {
        console.log(err);
    }
  }
  const deleteexpense = async (req, res) => {
    try {
        console.log(req.body.id);
        await Expense.destroy({
            where: { id: req.body.id,userId:req.user.id },
        });
        console.log("expense deleted");
        res.sendStatus(204);
    }
    catch (err) {        
        console.log(err);
    }
  }
  
  const getexpenses =  async(req, res) => {
    try {
        const allExpense = await Expense.findAll({where:{userId:req.user.id}});
        console.log(allExpense);
        res.status(200).json({allExpense : allExpense});
        
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    addexpense,
    deleteexpense,
    getexpenses
  }
  