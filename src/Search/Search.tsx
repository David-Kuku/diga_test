import { useQuery, gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import './Search.css'
import { GET_USER, GET_REPOS } from '../Queries'
import Repocard from '../Repocard'
import { connect } from 'react-redux'
import { setsearchvalue } from '../Redux/Actions'


interface StateProps {
    searchvalue: string
  }
  
  interface DispatchProps {
    setsearchvalue: any
  }

  type Props = StateProps & DispatchProps

const Search = (props: Props) => {
    const [searchfield, setSearchfield] = useState<string>("")
    const [searchstate, setSeachstate] = useState<boolean>(false)
    // const [searchvalue, setSearchvalue] = useState<string>("")
    const [loggedIn, setLoggedIn] = useState<any>()

    const handlesearchchange = (val: string) => {
        setSearchfield(val)
    }

    const user = useQuery(GET_USER)

    const handlesearchstate = () => {
        searchfield && setSeachstate(true)
        // setSearchvalue(searchfield)
        props.setsearchvalue(searchfield)
        
    }

    console.log(searchfield)
    console.log(props.searchvalue)

    useEffect(() => {
        console.log(user.data)
        setLoggedIn(user.data)
    }, [user.data])
    return (
        <>
            <Nav searchstate={searchstate} loggedIn={loggedIn} />
            <div className="search_page">
                {!searchstate ?
                    <div className="div_search">
                        <input
                            id="search_id"
                            className="search_input"
                            placeholder="Search"
                            onChange={(e) => handlesearchchange(e.target.value)} />
                        <button className="button_search" disabled={searchfield==="" ? true : false} onClick={handlesearchstate}>search</button></div>
                :
                <Repocard/>}
            </div>


        </>
    )
}

// export default Search
const mapState = (state) => {
    return {
        searchvalue: state.searchvalue
    }
  }
  
  const mapDispatch =(dispatch)=> {
      return {
          setsearchvalue : (val)=>{dispatch(setsearchvalue(val))}
      }
  }
  

export default connect(mapState, mapDispatch)(Search)
