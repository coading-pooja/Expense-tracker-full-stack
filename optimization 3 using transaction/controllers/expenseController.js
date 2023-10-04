const express = require('express');
const sequelize = require('../util/database');
const User = require("../models/user");
const Expense = require("../models/expenses")
const routes = express.Router();
const path = require("path");
const bodyParser = require('body-parser');



const addexpense = async (req, res) => {
  const t = await sequelize.transaction(); // Creating transaction object

    try {
        console.log(req.body);
        const amount = req.body.amount;
        const desc = req.body.description;
        const cat = req.body.category;
        const userId = req.user.id;
        console.log(req.user.id);



          const expense = await Expense.create({ amount: amount, description: desc, category: cat,userId:userId},{ transaction: t })
        //  res.status(201).json({ data: expense });
        //  const expense = await Expense.create({ amountExp: amount, description: desc, category: cat, userId:req.user.id });
         const user = await User.findByPk(req.user.id,{ transaction: t })
                 let newTotalExpense = 0;
                 console.log(typeof newTotalExpense)
                 if(user.total === null){
                     newTotalExpense = amount;
                 }
                 else{
                     newTotalExpense = user.total+parseFloat(amount);
                 }
                 User.update({total:newTotalExpense}, {where: {id:userId}},{ transaction: t })
                 await t.commit(); // Commit the transaction
                 return newTotalExpense;
             console.log(newTotalExpense);
         res.status(201).json({ data: expense, totalExpenseData:newTotalExpense});
     }catch (err) {
      await t.rollback();
         console.log(err);
         res.status(500).json({ error: err });
     }
 }

 
  const deleteexpense = async (req, res) => {
    const t = await sequelize.transaction(); // Creating transaction object
    try {
        console.log(req.body)

        console.log(req.user.id);
        const oldExpense =await Expense.findOne({where:{id:req.body.id}})
     await Expense.destroy({
            where: { id: req.body.id },
                        transaction: t

        });
        // changing the totalExpense data in the user table
        console.log(req.user)
        
        // Find the user by primary key and update the total
        const user = await User.findByPk(req.user.id);
        console.log(oldExpense,user)
        if (user) {
            const newTotalExpense = user.total - parseFloat(oldExpense.amount);
            console.log(user.total)
            console.log(req.body.amount)
            console.log(newTotalExpense);

            // Update the user's total
            await user.update({ total: newTotalExpense }, {transaction: t });
            await t.commit(); // Commit the transaction
            console.log("expense deleted");
            res.sendStatus(204);
        } else {
            // Handle the case where the user with the given ID was not found
            await t.rollback(); // Rollback the transaction
            console.log("User not found");
            res.sendStatus(404);
        }
    }
    catch (err) {    
      await t.rollback(); // Rollback the transaction    
        console.log(err);
        res.sendStatus(500); // Handle other errors accordingly
        

    }
  }
  
  const getexpenses =  async(req, res) => {
    try {
        const allExpense = await Expense.findAll({where:{userId:req.user.id}});
        console.log(allExpense);
        // res.status(200).json({allExpense : allExpense});
                // checking if loggedin user is a premium user or not 
                User.findOne({
                    where: { id: req.user.id },
                    attributes: ['ispremiumuser'] // specify the column I want to retrieve
                  })
                  .then(user => {
                    if (user) {
                      console.log(user.ispremiumuser); // value of the 'ispremiumuser' column for the user with mentioned id of the user
                      res.status(200).json({allExpense : allExpense, isPremiumUser: user.ispremiumuser});
                    } else {
                      console.log("User not found.");
                    }
                  })
                  .catch(err => {
                    console.error('Error:', err);
                  });
                
        
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
  