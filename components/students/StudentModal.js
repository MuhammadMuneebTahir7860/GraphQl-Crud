var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        // required: [true, "Email required"]
    },
    rollNo: {
        type: Number,
    },
    class:{
        type:String,
    },
})

var studentsCollection=mongoose.model('students',studentSchema);
module.exports=studentsCollection;