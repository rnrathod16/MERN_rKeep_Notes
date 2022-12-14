import React from 'react'

const UserNote = (props) => {

    const fu = () => {
        props.fun(props.idx);
    }
    return (
        <>
            <div className="card col-md-3 m-1 shadow p-3 mb-2 bg-body rounded">
                <div className="card-header">
                    Date :- {props.value.date.substr(0, 15)}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.value.title}</h5>
                    <p className="card-text">{props.value.description}</p>

                    <submit className="btn btn-primary" onClick={fu}>Delete</submit>
                </div>
            </div>
        </>
    )
}

export default UserNote;