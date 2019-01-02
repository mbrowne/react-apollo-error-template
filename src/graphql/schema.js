import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    gallery(id: ID!): GalleryViewModel
  }

  type GalleryViewModel {
    data: Gallery!
    uiSpec: GalleryUISpec!
  }

  type Gallery {
    id: ID!
    name: String!
    artworks: [Artwork!]!
  }

  type Artwork {
    id: ID!
    title: String!
  }

  type GalleryUISpec {
    foo: String
  }
`

const resolvers = {
  Query: {
    gallery: (root, { id }) => {
      return {
        data: {
          id,
          name: 'Demo Gallery',
        },
        uiSpec: {},
      };
    },
  },

  Gallery: {
    artworks() {
      throw Error('Demo server-side error');
    },
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })

// const PersonType = new GraphQLObjectType({
//   name: 'Person',
//   fields: {
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//   },
// });

// const peopleData = [
//   { id: 1, name: 'John Smith' },
//   { id: 2, name: 'Sara Smith' },
//   { id: 3, name: 'Budd Deey' },
// ];

// const QueryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     people: {
//       type: new GraphQLList(PersonType),
//       resolve: () => peopleData,
//     },
//   },
// });

// export const schema = new GraphQLSchema({ query: QueryType });
