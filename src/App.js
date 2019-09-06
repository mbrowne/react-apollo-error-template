import React from "react";
import { useQuery } from '@apollo/react-hooks'
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

function Component1() {
    const { loading, data } = useQuery(GALLERY_QUERY1)
    if (loading) {
        return 'Component1 loading...'
    }
    if (!data.gallery) {
        return <NotFound />
    }
    return <Component2 />
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

function Component2() {
    const result = useQuery(GALLERY_QUERY2)
    console.log('Component2 result', result)
    if (result.loading) {
        return 'Component2 loading...'
    }
    return 'Component2'
}

const App = () => {
    return <Component1 />
}

export default App
