const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String
            username: String!
            email: String!
            phone: String!
            website: String!
          }
       
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            userId: ID!
            user: User
        }
            
        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }    
      `,
    resolvers: {
      Todo: {
        user: (todo) => { 
          return axios
            .get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
            .then((res) => res.data);
        },
      },
      Query: {
        getTodos: () => {
          return axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.data);
        },

        getAllUsers: () => {
          return axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.data);
        },

        getUser: (parent, { id }) => {
          return axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.data);
        },
      },
    },
  });

  app.use(cors());
  app.use(bodyParser.json());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
}

startServer();
