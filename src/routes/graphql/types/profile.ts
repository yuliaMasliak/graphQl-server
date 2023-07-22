//import { PrismaClient } from '@prisma/client';
import graphql, { GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';

const { GraphQLObjectType, GraphQLNonNull } = graphql;

//const prisma = new PrismaClient();

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
