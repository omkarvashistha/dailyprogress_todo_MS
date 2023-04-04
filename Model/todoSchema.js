const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to todo DB");
}).catch(()=>{
    console.log("Some error in todo schema");
})

const todoSchema = new mongoose.Schema({ 
        username : {
            type : String,
            required : true,
            unique : true,               
        },
        todoData :{
            type : Array,
            id : {
                type : Number,
                required : true,
                unique : true
            },
            title : {
                type : String,
                required : true,
            },
            description : {
                type : String,
                required : true,
            },
            complete : {
                type : Boolean,
                required : true,
            },
            dateAdded : {
                type : Date,
                required : true,
            }
        }
    },
    {
        timestamps : {
            createdAt : true,
            updatedAt : true,
        },
    }
);

const todoModel = mongoose.model('todo',todoSchema);

module.exports = todoModel;