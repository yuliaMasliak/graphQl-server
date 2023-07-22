import { PrismaClient } from '@prisma/client';
import graphql, { GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { profileType } from './profile.js';
import { postType } from './post.js';

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const prisma = new PrismaClient();

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    // profile: {
    //   type: profileType,
    //   async resolve(user: { id: string }) {
    //     const profile = await prisma.profile.findUnique({
    //       where: { userId: user.id },
    //     });
    //     return profile;
    //   },
    // },
    // posts: {
    //   type: new GraphQLList(postType),
    //   async resolve(user: { id: string }) {
    //     return await prisma.post.findMany({
    //       where: { authorId: user.id },
    //     });
    //   },
    // },
  }),
});
