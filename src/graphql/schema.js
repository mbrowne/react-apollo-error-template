import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    people: PersonResults!
  }
  type PersonResults {
    results: [Person!]!
    totalCount: Int!
  }
  type Person {
    id: ID!
    name: String!
    friends: [Person!]!
    favoriteColors: [Color!]!
  }
  type Color {
    id: ID!
    label: String!
  }
`

const peopleData = [
  {
    id: 1,
    name: 'John Smith',
    friendIds: [2, 3],
    favoriteColors: [
      { id: 'green', label: 'Green' },
      { id: 'turquoise', label: 'Turquoise' }
    ]
  },
  {
    id: 2,
    name: 'Sara Smith',
    friendIds: [1],
    favoriteColors: []
  },
  {
    id: 3,
    name: 'Budd Deey',
    friendIds: [1, 2],
    favoriteColors: [{ id: 'magenta', label: 'Magenta' }]
  }
]

const resolvers = {
  Query: {
    people: () => {
      return {
        results: peopleData,
        totalCount: peopleData.length
      }
    }
  },
  Person: {
    friends: person =>
      person.friendIds.map(id => peopleData.find(p => p.id === id))
  }
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
