import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'

const PersonType = new GraphQLObjectType({
  name: 'Person',

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    friends: {
      type: GraphQLList(PersonType),
      resolve(person) {
        return person.friendIds.map(friendId =>
          peopleData.find(person => person.id === friendId)
        )
      }
    }
  })
})

const peopleData = [
  { id: 1, name: 'John Smith', age: 20, friendIds: [2, 3] },
  { id: 2, name: 'Sara Smith', age: 27, friendIds: [1] },
  { id: 3, name: 'Budd Deey', age: 63, friendIds: [1] }
]

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData
    }
  }
})

export const schema = new GraphQLSchema({ query: QueryType })
