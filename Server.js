const express=require('express');
const Port=5000;
const {graphqlHTTP}=require('express-graphql');
const cors=require('cors');
const bodyParser=require('body-parser');
const schema=require('./Schema');
const DbConnection=require('./config/Db');
const studentsCollection=require('./components/students/StudentModal');
const app=express();
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql:true,
    })
)

DbConnection();
app.get("/", async (req, res) =>{
    const data=await studentsCollection.find({});
    res.send(data);
  });
  
app.listen(Port,()=>{
    console.log('Server is working');
})