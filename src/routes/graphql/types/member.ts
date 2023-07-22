//import { PrismaClient } from '@prisma/client';
import graphql, { GraphQLFloat, GraphQLInt } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

const { GraphQLObjectType, GraphQLEnumType, GraphQLNonNull } = graphql;

//const prisma = new PrismaClient();

export const memberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  },
});

export const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: new GraphQLNonNull(memberTypeIdEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
