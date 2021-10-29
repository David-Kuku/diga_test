import React from 'react'

interface Props{
    users:any
}
const UsersScreen =({users}: Props) =>{
    return (
        <div className="card" key={users.node.id}>
            {/* <h3 className="card_h3">{users.node.login ? users.node.login : users.node.name}</h3> */}
            <h4 className="card_h3" >{users.node.login && <span id="card_users">{users.textMatches[0].fragment}</span>}</h4>
            <div style={{ display: "flex" }}>

                <div className="fields">
                    {users.node.name && <div id= "fields">Name: {users.node.name}</div>}
                </div>
                {/* {users.node.location && <div style={{ color: "#91929E" }}>|</div>} */}
                <div className="fields">
                    {users.node.location && <div id= "fields">Location: {users.node.location}</div>}
                </div>
                {/* {users.node.email && <div style={{ color: "#91929E" }}>|</div>} */}

                <div className="fields">
                    {users.node.email && <div id="fields">Email: {users.node.email}</div>}
                </div>

                {/* {users.node.company && <div style={{ color: "#91929E" }}>|</div>} */}

                <div className="fields">
                    {users.node.company && <div>Company: {users.node.company}</div>}
                </div>
            </div>
        </div>
    )
}

export default UsersScreen
