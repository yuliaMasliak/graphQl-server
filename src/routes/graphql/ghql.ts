import { Post, PrismaClient, Profile, User } from '@prisma/client';
import graphql, { GraphQLBoolean } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { memberType, memberTypeIdEnum } from './types/member.js';
import { postType } from './types/post.js';
import { userType } from './types/user.js';
import { profileType } from './types/profile.js';
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema } = graphql;

const prisma = new PrismaClient();

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLList(memberType),
      async resolve(parent, args, context) {
        return await prisma.memberType.findMany();
      },
    },
    posts: {
      type: new GraphQLList(postType),
      async resolve(parent, args, context) {
        return await prisma.post.findMany();
      },
    },
    users: {
      type: new GraphQLList(userType),
      async resolve(parent, args, context) {
        return await prisma.user.findMany();
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
      async resolve(parent, args, context) {
        return await prisma.profile.findMany();
      },
    },

    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(memberTypeIdEnum) },
      },
      async resolve(parent, args: { id: string }, context) {
        const memberType = await prisma.memberType.findUnique({
          where: { id: args.id },
        });
        return memberType;
      },
    },
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(parent, args: { id: string }, context) {
        const post = await prisma.post.findUnique({
          where: { id: args.id },
        });
        return post;
      },
    },
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(parent, args: { id: string }) {
        const user = await prisma.user.findUnique({
          where: { id: args.id },
        });
        return user;
      },
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(parent, args: { id: string }, context) {
        const profile = await prisma.profile.findUnique({
          where: { id: args.id },
        });
        return profile;
      },
    },
  },
});

// const RootMutation = new GraphQLObjectType({
//   name: 'RootMutationType',
//   fields: {
//     createPost: {
//       type: postType,
//       args: { dto: { type: CreatePostInput } },
//       async resolve(parent, args: { dto: Post }, context) {
//         return prisma.post.create({
//           data: args.dto,
//         });
//       },
//     },
//     // createUser: {
//     //   type: userType,
//     //   args: { dto: { type: CreateUserInput } },
//     //   async resolve(parent, args: { dto: User }, context) {
//     //     return prisma.user.create({
//     //       data: args.dto,
//     //     });
//     //   },
//     // },
//     // createProfile: {
//     //   type: profileType,
//     //   args: { dto: { type: CreateProfileInput } },
//     //   async resolve(parent, args: { dto: Profile }, context) {
//     //     return prisma.profile.create({
//     //       data: args.dto,
//     //     });
//     //   },
//     // },

//     // deletePost: {
//     //   type: GraphQLBoolean,
//     //   args: { id: { type: UUIDType } },
//     //   async resolve(parent, args: { id: string }, context) {
//     //     await prisma.post.delete({
//     //       where: {
//     //         id: args.id,
//     //       },
//     //     });
//     //     return null;
//     //   },
//     // },
//     // deleteProfile: {
//     //   type: GraphQLBoolean,
//     //   args: { id: { type: UUIDType } },
//     //   async resolve(parent, args: { id: string }, context) {
//     //     await prisma.profile.delete({
//     //       where: {
//     //         id: args.id,
//     //       },
//     //     });
//     //     return null;
//     //   },
//     // },
//     // deleteUser: {
//     //   type: GraphQLBoolean,
//     //   args: { id: { type: UUIDType } },
//     //   async resolve(parent, args: { id: string }, context) {
//     //     await prisma.user.delete({
//     //       where: {
//     //         id: args.id,
//     //       },
//     //     });
//     //     return null;
//     //   },
//     // },

//     // changePost: {
//     //   type: postType,
//     //   args: { dto: { type: ChangePostInput }, id: { type: UUIDType } },
//     //   async resolve(parent, args: { dto: Post; id: string }, context) {
//     //     return prisma.post.update({
//     //       where: { id: args.id },
//     //       data: args.dto,
//     //     });
//     //   },
//     // },
//     // // changeProfile: {
//     //   type: profileType,
//     //   args: { dto: { type: ChangeProfileInput }, id: { type: UUIDType } },
//     //   async resolve(parent, args: { dto: Profile; id: string }, context) {
//     //     return prisma.profile.update({
//     //       where: { id: args.id },
//     //       data: args.dto,
//     //     });
//     //   },
//     // },
//     // changeUser: {
//     //   type: userType,
//     //   args: { dto: { type: ChangeUserInput }, id: { type: UUIDType } },
//     //   async resolve(parent, args: { dto: User; id: string }, context) {
//     //     return prisma.user.update({
//     //       where: { id: args.id },
//     //       data: args.dto,
//     //     });
//     //   },
//     // },
//   },
// });

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation,
  types: [userType, memberType, postType, profileType],
});
export default schema;
