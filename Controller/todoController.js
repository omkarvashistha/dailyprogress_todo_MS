const todoRepo = require('../Model/todoSchema');
const helper = require('../Utilities/helper');

exports.addTodo = async (req,res) => {
    try {
        const username = req.params.username;
        const title = req.body.title;
        const description = req.body.description;
        const date = new Date();
        const id = await helper.getId(username);

        const todoData = {
            id : id,
            title : title,
            description : description,
            complete : false,
            dateAdded : date
        }

        const userInfo = await todoRepo.find({username : username});

        if(userInfo.length > 0) {

            userInfo[0].todoData.push(todoData);
            await userInfo[0].save();

            res.status(201).json({
                data : "Added succesfully"
            })

        } else {

            await todoRepo.create({
                username : username,
                todoData : [todoData]
            })

            res.status(201).json({
                data : "Added succesfully"
            })

        }

    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

exports.getTodo = async(req,res)=>{
    try {

        const username = req.params.username;

        const userInfo = await helper.getTodayTodos(username);

        console.log(userInfo);

        if(userInfo.length > 0) {
            res.status(200).json({
                data : userInfo
            })
        } else {
            res.status(200).json({
                data : "No Todos created"
            })
        }

    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

exports.markComplete = async(req,res)=>{
    try {
        const username = req.params.username;
        const id = req.body.id;

        const userData = await todoRepo.find({username : username});

        if(userData) {

            const updateComplete = await todoRepo.findOneAndUpdate({
                username : username,
                'todoData.id' : id
            },{
                '$set' : {'todoData.$.complete' : true}
            })

            if(updateComplete) {
                res.status(201).json({
                    message : "Updated Succesfull"
                })
            } else {
                res.status(400).json({
                    message : "Not updated try again"
                })
            }

        }

    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}


exports.invalid = async(req,res,next) => {
    const err = new Error();
    err.message = 'Invalid Route';
    err.status = 404;
    next(err);
};