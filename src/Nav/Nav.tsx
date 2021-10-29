import React, { useState } from 'react'
import './Nav.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const search = <FontAwesomeIcon icon={faSearch} />

const Nav = () => {

    return (
        <>

            <div className="nav">
                <div className="nav_div1"><img alt="" src="logo.jpg" /><b>Diga Search</b></div>
                <div className="nav_search">
                    <input
                        className="nav_search_input"
                        placeholder="Search"
                    />
                    <button
                        className="nav_button_search"
                    >
                        {search}
                    </button>
                </div>
                <div className="nav_div2">
                    <div className="avatar_container">
                        <img
                            alt=""
                            className="avatar_container_img"
                            id="avatarimg"
                            src=""
                            data-test-id="user_avatar" />
                    </div>
                    <span id="username">Jon Doe</span>
                </div>
            </div>


        </>
    )
}


export default Nav
