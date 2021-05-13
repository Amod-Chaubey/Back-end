const express = require("express");
require("./db/mongoose");
const userRouter = require("../src/router/router");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.use(userRouter);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Server is on port " + port);
});
