import { gql } from "@apollo/client"

export const GET_USER = gql`
query { 
    viewer { 
      login
      avatarUrl
    }
  }
`

export const GET_REPOS = gql`
query($search_term: String!, $after: String) {
    search(query: $search_term, type: REPOSITORY, first: 10, after: $after) {
        repositoryCount,
        edges {
            node {
                ... on Repository {
                    id,
                    name,
                    stargazers {
                        totalCount
                    },
                    updatedAt,
                    description,
                    licenseInfo{
                        name
                      }
                      languages(first:10){
                        nodes{
                          name
                        }
                      }
                }
            }
            
        }
        pageInfo{
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
        }
    }
}
`

export const GET_USERS = gql`
query($search_term: String!, $after: String, $before: String){
    search(query: $search_term, type: USER, first: 10, after: $after, before: $before) {
      userCount
      edges {
        node {
          ... on User {
            login,
            id,
            name,
            location,
            email,
            company
          }
        }
        textMatches {
            fragment
            property
            highlights {
              text
            }
    
          }
      }
      pageInfo{
          endCursor
          startCursor
      }
    }
  }
`

