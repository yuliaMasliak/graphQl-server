import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import querySchema from './ghql.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      console.log(query);
      console.log(variables);
      const result = await graphql({
        schema: querySchema,
        source: query,
        contextValue: { prisma },
        variableValues: variables,
      });
      console.log(result);
      return result;
    },
  });
};

export default plugin;
