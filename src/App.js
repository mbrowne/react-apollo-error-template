import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      results {
        id
        name
        friends {
          id
          name
          favoriteColors {
            id
            label
          }
        }
      }
      totalCount
    }
  }
`

let cacheUpdated = false
function updateCache(client, person) {
  const updatedPerson = {
    ...person,
    name: 'Foo'
  }

  client.writeData({
    data: updatedPerson,
    id: 'Person:' + person.id
  })

  cacheUpdated = true
}

const App = () => (
  <main>
    <h1>Apollo Client Error Template</h1>
    <p>
      This is a template that you can use to demonstrate an error in Apollo
      Client. Edit the source code and watch your browser window reload with the
      changes.
    </p>
    <p>
      The code which renders this component lives in <code>./src/App.js</code>.
    </p>
    <p>
      The GraphQL schema is in <code>./src/graphql/schema</code>. Currently the
      schema just serves a list of people with names and ids.
    </p>
    <Query query={ALL_PEOPLE}>
      {({ client, loading, error, data }) => {
        if (error) {
          throw error
        }
        if (loading) {
          return <p>Loading…</p>
        }

        const people = data.people.results
        console.log('people: ', people)
        if (!cacheUpdated) {
          updateCache(client, people[0])
        }

        return (
          <ul>
            {people.map(person => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
        )
      }}
    </Query>
  </main>
)

export default App
