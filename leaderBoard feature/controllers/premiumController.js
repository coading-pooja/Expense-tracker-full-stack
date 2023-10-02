const User = require('../models/user');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');


const getUserLeaderboard = async(req, res)=>{
    try{
        //we have to send aggregate expenses of each user to showLeaderboard route
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpenses = {};
        console.log(expenses)

        expenses.forEach(expense=>{
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] += expense.amount;
            }else{
                userAggregatedExpenses[expense.userId] = expense.amount;
            }
        })
        console.log("userAggregatedExpenses>>>>>>>>",userAggregatedExpenses);
        var userLeaderboardDetails = [];
        users.forEach((user)=>{
            userLeaderboardDetails.push({name:user.name, total:userAggregatedExpenses[user.id]})
        })

        console.log("unsorted>>>>>>>>>>", userLeaderboardDetails);
        userLeaderboardDetails.forEach((user) => {
            user.total = parseInt(user.total); // Assuming 'total' is a string
          });
        //sort users based on their expenditure
        userLeaderboardDetails.sort((a,b)=>{
            return a.total - b.total;
        })
        console.log("userLeaderboardDetails>>>>>>>>>", userLeaderboardDetails);
        res.status(200).json( userLeaderboardDetails);

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports ={
     getUserLeaderboard
}
