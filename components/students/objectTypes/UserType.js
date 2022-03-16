const { GraphQLObjectType, GraphQLString,GraphQLInt}=require ("graphql");

const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        class:{type:GraphQLString},
        rollNo:{type:GraphQLInt},
    })
})

module.exports=userType;

