const {GraphQLString, GraphQLInt} =require('graphql');
const userType=require('../objectTypes/UserType');
const studentsCollection = require('../StudentModal');
const statusType=require('../objectTypes/StatusType');
module.exports.addStudent={
    type:userType,
    args:{
        name:{type:GraphQLString},
        class:{type:GraphQLString},
        rollNo:{type:GraphQLInt},
        email:{type:GraphQLString},
    },
    resolve(parent, args){
        const newStudent = new studentsCollection({
            name: args.name,
            rollNo: args.rollNo,
            class: args.class, 
            email:args.email,   
          });
        
          newStudent.save((err, success) => {
            console.log("success", success);
            // console.log("err", err);
          });

        return newStudent;
    }
}


module.exports.updateStudent = {
    type: userType ,
    args: {
        id: {type: GraphQLString } ,
        name: { type: GraphQLString},
        rollNo:{type: GraphQLInt} ,
        class:{ type: GraphQLString} ,
        email:{type:GraphQLString},
    } ,
    resolve: async (parent , args)=> {
        const  _id = args.id ;

        const updateObj = {
            name: args.name,
            rollNo: args.rollNo,
            class: args.class,
            email:args.email,   
          }
        await  studentsCollection.findByIdAndUpdate(
            _id  ,
            updateObj ,
            {new : true} ,
            console.log("Document id: " , _id),
            console.log("Document Data: " , updateObj),
            (err, data) => {
              console.log("Data is Updated...success:", data);
            //   console.log("err", err);
            }
          );

        return args
    }
}


module.exports.deleteStudent = {
    type: statusType ,
    args: {
        id: {type: GraphQLString}
    } ,
    resolve (parent , args){    
          const  _id  = args.id;
          studentsCollection.findByIdAndRemove(_id , (err , data) => {
            console.log('Document ID will be here: ' , _id);    
            // console.log("Error" , err);
            if (err) {
                return err
            }
            console.log("Document is Deleted!! Successfully");
        });

        return {
            success: true , message: "Successfully Deleted" , err: " " 
        }
    }
}