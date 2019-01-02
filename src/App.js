import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GALLERY_QUERY1 = gql`
    query {
        gallery(id: "demo") {
            data {
                id
                name
            }
        }
    }
`

const NotFound = () => 'Not found'

class Component1 extends PureComponent {
    render() {
        return (
            <Query query={GALLERY_QUERY1}>
                {({ loading, data }) => {
                    if (loading) {
                        return 'Component1 loading...'
                    }
                    if (!data.gallery) {
                        return <NotFound />
                    }
                    return <Component2 />
                }}
            </Query>
        )
    }
}

const GALLERY_QUERY2 = gql`
    query {
        gallery(id: "demo") {
            data {
                id
                artworks {
                    id
                    title
                }
            }
        }
    }
`

class Component2 extends PureComponent {
    render() {
        return (
            <Query query={GALLERY_QUERY2}>
                {result => {
                    console.log('Component2 result', result)
                    if (result.loading) {
                        return 'Component2 loading...'
                    }
                    return 'Component2'
                }}
            </Query>
        )
    }
}

const App = () => {
    return <Component1 />
}

export default App
