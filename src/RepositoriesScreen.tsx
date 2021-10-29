import React from 'react'

interface Props{
    repo:any
}
const RepositoriesScreen =({repo}: Props) =>{
    return (
        <div className="card" key={repo.node.id}>
            <h3 className="card_h3" id="repo_card">{repo.node.name}</h3>
            <div style={{ marginLeft: "5px", marginBottom: "15px", color: "#91929E", fontSize:"13px" }}>
                {repo.node && repo.node.description}
            </div>
            <div style={{ display: "flex" }}>
                <div className="fields" id={repo.node.languages.nodes[0] && "fields"}>{repo.node.stargazers.totalCount > 1000 ?
                    Math.round(repo.node.stargazers.totalCount / 1000) + "K" :
                    repo.node.stargazers.totalCount} Stars</div>
                {/* <div style={{ color: "#91929E" }}>|</div> */}

                <div className="fields" id={repo.node.licenseInfo && "fields"}>
                    {repo.node.languages.nodes[0] && repo.node.languages.nodes[0].name}
                </div>
                {/* {repo.node.languages.nodes[0] && <div style={{ color: "#91929E" }}>|</div>} */}
                <div className="fields" id={repo.node.updatedAt && "fields"}>
                    {repo.node.licenseInfo && repo.node.licenseInfo.name}
                </div>
                {/* {repo.node.licenseInfo && <div style={{ color: "#91929E" }}>|</div>} */}

                <div className="fields">
                    Last updated: {repo.node.updatedAt}
                </div>
            </div>
        </div>
    )
}

export default RepositoriesScreen
