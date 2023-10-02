const User = require('../models/user');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');


const getUserLeaderboard = async(req, res)=>{
    try{
        //we have to send aggregate expenses of each user to showLeaderboard route
        // const users = await User.findAll();
        // const expenses = await Expense.findAll();
        // const userAggregatedExpenses = {}; //an object that will stro the all the expense of respectibe userIds as key value pairs
        
        // console.log(expenses)

        // expenses.forEach(expense=>{
        //     if(userAggregatedExpenses[expense.userId]){
        //         userAggregatedExpenses[expense.userId] += expense.amount;
        //     }else{
        //         userAggregatedExpenses[expense.userId] = expense.amount;
        //     }
        // })
        // console.log("userAggregatedExpenses>>>>>>>>",userAggregatedExpenses);
        // var userLeaderboardDetails = [];
        // users.forEach(user =>{
        //     if(userAggregatedExpenses[user.id]==undefined){ // for those user who have not added any expense
        //         userLeaderboardDetails.push({name: user.name, total: 0});
        //     }
        //     else{
        //         userLeaderboardDetails.push({name: user.name, total: userAggregatedExpenses[user.id]});
        //     }
        // })
        // userLeaderboardDetails.sort((a,b)=> a.total-b.total )
        // console.log(userLeaderboardDetails);
        // res.status(200).json(userLeaderboardDetails);
        const leaderboardData = await User.findAll({
            attributes: [
              'id',
              'name',
              [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total'],
            ],
            include: [
              {
                model: Expense,
                attributes: []
              },
            ],
            group: ['user.id'],
            order:[['total','DESC']]
          });

          // The leaderboardData variable will now contain an array of objects, each representing a user with their "id", "name", "total_expense", and "total_income".

        //console.log(leaderboardData);
        //console.log(leaderboardDataExpense);
        res.status(200).json(leaderboardData);


        }catch (err) {
        console.error(err);
      }
}

module.exports ={
     getUserLeaderboard
}
