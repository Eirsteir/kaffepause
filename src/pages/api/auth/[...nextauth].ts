import neo4j from 'neo4j-driver';
import NextAuth from 'next-auth/next';

import { Neo4jAdapter } from '@next-auth/neo4j-adapter';

const driver = neo4j.driver(
  // neo4j://neo4j:kaffepauseadmin@neo4j:7687
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'kaffepauseadmin'),
);

const neo4jSession = driver.session();

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-options
export default NextAuth({
  // https://authjs.dev/reference/providers/oauth-builtin
  providers: [],
  adapter: Neo4jAdapter(neo4jSession),
});
