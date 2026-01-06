// server.js
import "dotenv/config";
import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import connectDB from "./configs/database.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const app = Fastify();

await connectDB();

app.register(cors, { origin: true });

app.register(mercurius, {
  schema: typeDefs,
  resolvers,
  graphiql: true,
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}/graphiql`);
});
