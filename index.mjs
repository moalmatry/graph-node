import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.mjs";
import { typeDefs } from "./schema.mjs";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(parent, args, context) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(parent, args, context) {
      return db.authors.find((author) => author.id === args.id);
    },

    reviews() {
      return db.reviews;
    },
    review(parent, args, context) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log("Server ready at port 4000");
