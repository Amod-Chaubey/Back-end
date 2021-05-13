const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User{
     id:ID!
     firstName:String
     lastName:String
     password:String
     username:String!
     email:String!
    }
    type Authdata{
        userID:ID!
        token:String!
    }

    input UserInput{
      firstName:String
      lastName:String
      password:String
      username:String!
      email:String!
    }

    type RootQuery{
     login(email:String!,password:String!):AuthData!
     readUser(email:String!,password:String!):AuthData!         
    }

    type RootMutation{
          createUser(userInput: UserInput):User
          updateUser(userInput:UserInput):User
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }`);
