import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { NextRequest } from 'next/server';

import { typeDefs } from '../../../graphql/typedefs'; 
import { resolvers } from '../../../graphql/resolvers'; 
import { connectDB } from '../../../lib/db';

await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
  ],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };