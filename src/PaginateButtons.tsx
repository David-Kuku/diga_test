import React from 'react'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const arrowright = <FontAwesomeIcon style={{ color: "white" }} icon={faArrowRight} />
const arrowleft = <FontAwesomeIcon icon={faArrowLeft} />

interface Props{
    toggle: string,
    users: any,
    repo:any
}

const PaginateButtons = ({toggle, users, repo}: Props)=> {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
                
                <button
                    onClick={() => {
                        if (toggle === "users") {
                            const { endCursor, hasNextPage, startCursor } = users.data.search.pageInfo
                            
                            users.fetchMore({
                                variables: { after: endCursor },
                                updateQuery: (prevResult, { fetchMoreResult }) => {

                                    return fetchMoreResult
                                }
                            })
                        }
                        else {
                            const { endCursor } = repo.data.search.pageInfo
                            console.log(endCursor)
                            repo.fetchMore({
                                variables: { after: endCursor },
                                updateQuery: (prevResult, { fetchMoreResult }) => {

                                    return fetchMoreResult
                                }
                            })
                        }
                    }}
                    className="active_btn"
                > Load More</button>
            </div>
    )
}

export default PaginateButtons
