import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_REPOS, GET_USERS } from './Queries'
import './Repocard.css'

import { connect } from 'react-redux'
import { setsearchvalue } from './Redux/Actions'
import PaginateButtons from './PaginateButtons'
import UsersScreen from './UsersScreen'
import RepositoriesScreen from './RepositoriesScreen'

interface StateProps {
    searchvalue: string
}

interface DispatchProps {
    setsearchvalue: any
}

interface fetchMoreResult {
    search: any
}

type Props = StateProps & DispatchProps

const Repocard = (props: Props) => {

    const [toggle, setToggle] = useState<string>("users")
    console.log(props)
    console.log(props.searchvalue)
    const repo = useQuery(GET_REPOS,
        { variables: { search_term: props.searchvalue, after: null } })

    repo.data && console.log(repo.data.search.repositoryCount)

    const users = useQuery(GET_USERS,
        { variables: { search_term: props.searchvalue, after: null } })

    users.data && console.log(users.data.search.userCount)
    console.log(users)
    console.log(repo)

    const changetoggle = (val) => {
        setToggle(val)
    }

    return (
        <div>
            {
                repo.data && users.data
                    ?
                    <div style={{ display: "flex", marginTop: "50px" }}>
                        <div className="toggle">
                            <div
                                id="repo_div"
                                onClick={() => changetoggle("repo")}
                                className={toggle === "repo" ? "active_toggle" : "category"}>
                                <div > Repositories </div>
                                <div id="repo_text" className="count_cont">
                                    {repo.data && repo.data.search.repositoryCount > 1000 ?
                                        Math.round(repo.data.search.repositoryCount / 1000) + "K" :
                                        repo.data.search.repositoryCount}</div>
                            </div>

                            <div
                                id="users_div"
                                onClick={() => changetoggle("users")}
                                className={toggle === "users" ? "active_toggle" : "category"}>
                                <div id="users_text"> Users </div>
                                <div className="count_cont">
                                    {users.data && users.data.search.userCount > 1000 ?
                                        Math.round(users.data.search.userCount / 1000) + "K" :
                                        users.data.search.userCount}</div>
                            </div>
                        </div>
                        {toggle == "users" ?
                            <div style={{}}>
                                {users.data && <div className="count">{users.data.search.userCount} Users</div>}
                                {users.data && users.data.search.edges.map((users) => {
                                    if (users.node.login || users.node.name) {
                                        return (
                                            
                                            <UsersScreen key={users.node.id} users={users} />
                                        )
                                    }
                                    else {
                                        return null
                                    }

                                })}
                                <PaginateButtons toggle={toggle} users={users} repo={repo} />
                            </div> :

                            <div style={{}}>
                                {repo.data && <div className="count">{repo.data.search.repositoryCount} Repositories results</div>}
                                {repo.data && repo.data.search.edges.map((repo) => {
                                    if (repo.node.name) {
                                        return (
                                            <RepositoriesScreen key={repo.node.id} repo={repo} />
                                            
                                        )
                                    }
                                    else {
                                        return null
                                    }

                                })}
                                <PaginateButtons toggle={toggle} users={users} repo={repo} />
                            </div>
                        }
                    </div>
                    : repo.loading || users.loading &&
                     <div>...loading...</div>
            }

            {/* <PaginateButtons toggle={toggle} users={users} repo={repo} /> */}
        </div>
    )
}


const mapState = (state) => {
    return {
        searchvalue: state.searchvalue
    }
}

const mapDispatch = (dispatch) => {
    return {
        setsearchvalue: (val) => { dispatch(setsearchvalue(val)) }
    }
}


export default connect(mapState, mapDispatch)(Repocard)
