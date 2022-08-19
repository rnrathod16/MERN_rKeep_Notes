import React from 'react'

const Notes = (props) => {
    const da = new Date();

    const fu = () => {
        props.fun(props.idx);
    }
    return (
        <>
            <div className="card col-md-3 m-1 shadow p-3 mb-2 bg-body rounded">
                <div className="card-header">
                    Date :- {da.getDate()}/ {da.getMonth()}/ {da.getFullYear()}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.value.noteTitle}</h5>
                    <p className="card-text">{props.value.noteDesc}</p>
                    <submit className="btn btn-primary" onClick={fu}>Delete</submit>
                </div>
            </div>
        </>
    )
}

export default Notes