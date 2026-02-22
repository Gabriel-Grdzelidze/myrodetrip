import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

import { typeDefs } from '../../../graphql/typedefs'; 
import { resolvers } from '../../../graphql/resolvers'; 

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };

function ApolloServerPluginLandingPageLocalDefault(): import("@apollo/server").ApolloServerPlugin<import("@apollo/server").BaseContext> {
    throw new Error('Function not implemented.');
}

