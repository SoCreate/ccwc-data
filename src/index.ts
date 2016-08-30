///<reference path="types.d.ts"/>
const graphqlHTTP = require('express-graphql');
const express = require('express');

import { schema } from './schema/schema';

express()
  .use('/graphql', graphqlHTTP({schema: schema, pretty: true, graphiql: true}))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');