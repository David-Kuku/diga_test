import React, { useState } from 'react'
import './Nav.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { setsearchvalue } from '../Redux/Actions'


interface ownProps {
    searchstate: boolean,
    loggedIn: any
}

interface StateProps {
    searchvalue: string
}

interface DispatchProps {
    setsearchvalue: any
}

type Props = StateProps & DispatchProps & ownProps
const search = <FontAwesomeIcon icon={faSearch} />

const Nav = (props: Props) => {
    const [searchfield, setSearchfield] = useState<string>("")

    const handlesearchchange = (val: string) => {
        setSearchfield(val)
    }

    props.loggedIn && console.log(props.loggedIn.viewer.avatarUrl)
    return (
        <>
            {
                !props.searchstate ?
                    <div className="nav">
                        <div className="nav_div1"><img alt="" src="logo.jpg" /><b>Diga Search</b></div>
                        <div className="nav_div2">
                            <div className="avatar_container">
                                <img
                                    alt=""
                                    className="avatar_container_img"
                                    id="avatarimg"
                                    src={props.loggedIn && props.loggedIn.viewer.avatarUrl} />
                            </div>
                            {props.loggedIn && props.loggedIn.viewer.login}
                        </div>
                    </div> :
                    <div className="nav">
                        <div className="nav_div1"><img alt="" src="logo.jpg" /><b>Diga Search</b></div>
                        <div className="nav_search">
                            <input
                                className="nav_search_input"
                                placeholder="Search"
                                value={searchfield}
                                onChange={(e) => handlesearchchange(e.target.value)} />
                            <button
                                className="nav_button_search"
                                disabled={searchfield === "" ? true : false}
                                onClick={() => props.setsearchvalue(searchfield)}>
                                {search}
                            </button>
                        </div>
                        <div className="nav_div2">
                            <div className="avatar_container">
                                <img
                                    alt=""
                                    className="avatar_container_img"
                                    id="avatarimg"
                                    src={props.loggedIn && props.loggedIn.viewer.avatarUrl}
                                    data-test-id="user_avatar" />
                            </div>
                            {props.loggedIn && <span id="username">{props.loggedIn.viewer.login}</span>}
                        </div>
                    </div>
            }

        </>
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

export default connect(mapState, mapDispatch)(Nav)
