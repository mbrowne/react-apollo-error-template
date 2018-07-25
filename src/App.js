import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Ages from './Ages'

const testQuery = gql`
  {
    people {
      id
      name
      friends {
        id
      }
      friends {
        name
      }
    }
  }
`

export default class App extends Component {
  render() {
    console.log('render App')
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{' '}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
          </p>
        </header>
        <Query query={testQuery}>
          {({ loading, data: { people } }) => {
            if (!loading) {
              console.log('received query result in App component')
            }
            return (
              <div>
                {loading ? (
                  <p>Loading…</p>
                ) : (
                  <div>
                    <ul>
                      {people.map(person => (
                        <li key={person.id}>{person.name}</li>
                      ))}
                    </ul>
                    <Ages />
                  </div>
                )}
              </div>
            )
          }}
        </Query>
      </main>
    )
  }
}
