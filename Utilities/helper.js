const todoRepo = require('../Model/todoSchema');

exports.getId = async(username)=>{
    try {
        const userInfo = await todoRepo.findOne({username});

        if(userInfo!=null){
            return userInfo.todoData.length + 1;
        } else {
            return 1;
        }

    } catch (error) {
        console.log("error in todo helper",error.message);
    }
}

exports.getTodayTodos = async(username)=>{
    try {

        const userData = await todoRepo.find({username : username});

        let todaysDate = new Date();
        todaysDate.setHours(0);
        todaysDate.setMilliseconds(0);
        todaysDate.getMinutes(0);

        var todoList = [];

        userData.forEach(element => {
            element.todoData.forEach(ele => {
                if(ele.dateAdded >= todaysDate){
                    todoList.push(ele);
                }
            })
        })

        //console.log(todoList);
        return todoList;

    } catch (error) {
        console.log(error.message);
    }
}