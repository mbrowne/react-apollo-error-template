import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const testQuery = gql`
  {
    people {
      id
      name
      age
    }
  }
`

export default function Ages() {
  console.log('render Ages component')
  return (
    <Query query={testQuery}>
      {({ loading, data: { people } }) => {
        if (!loading) {
          console.log('received query result in Ages component')
        }
        return (
          <div>
            <h2>Ages</h2>
            {loading ? (
              <p>Loading…</p>
            ) : (
              <ul>
                {people.map(person => (
                  <li key={person.id}>
                    {person.name} age: {person.age}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      }}
    </Query>
  )
}
