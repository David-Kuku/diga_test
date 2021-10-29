import { useQuery, gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import './Search.css'


const Search = () => {

    return (
        <>
            <Nav/>
            <div className="search_page">
                    <div className="div_search">
                        <input
                            id="search_id"
                            className="search_input"
                            placeholder="Search" />
                        <button className="button_search" >search</button></div>
            </div>


        </>
    )
}

// export default Search


export default Search
