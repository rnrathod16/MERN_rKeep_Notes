import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { UserContext } from '../App';
import Notes from './Notes';
import UserNote from './UserNote';

const CreateNote = () => {
    const { state, dispatch } = useContext(UserContext);

    const [getData, setgetData] = useState()
    const [note, setNote] = useState({
        noteTitle: "",
        noteDesc: ""
    })

    const [arr, setArr] = useState([]);
    const [not, setnot] = useState([]);


    const handelInp = (e) => {
        const { name, value } = e.target;

        setNote((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const sub = (e) => {
        e.preventDefault();

        setArr((pre) => {
            return [
                ...pre,
                note
            ]
        })

        setNote({
            noteTitle: "",
            noteDesc: ""
        });
    }

    const del = (id) => {

        setArr(() => {
            return arr.filter((a, idx) => {
                return id !== idx;
            })
        })
    }

    const getNotes = async () => {

        try {

            const result = await fetch('/ab', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const statusNum = result.status;
            const data = await result.json();

            setnot(data.no);

            setgetData(statusNum);
            if (statusNum !== 401) {

                dispatch({ type: "USER", payload: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNotes();
    })


    const postData = async (e) => {
        e.preventDefault();

        try {
            const { noteTitle, noteDesc } = note;
            // const userId = getData;

            const result = await fetch('/ab', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: noteTitle, description: noteDesc
                })
            })

            const statusNum = result.status;
            const msg = await result.json();

            if (statusNum !== 200) {
                window.alert(msg.message);
                throw new Error(msg);
            }

            dispatch({ type: "USER", payload: false });
            setNote({
                noteTitle: "",
                noteDesc: ""
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form className='container mt-5 noteContainer'>
                <h1 className='shadow p-3 mb-3 bg-body rounded'>📓 Store Your Notes in rKeep 📓 </h1>
                <div className="container col-md-6 shadow p-3 mb-5 bg-body rounded">
                    <input type="text" class="form-control mb-2" id="floatingInput" name="noteTitle" value={note.noteTitle} onChange={handelInp} placeholder="Note Title" />
                    <textarea className="form-control" name="noteDesc" value={note.noteDesc} onChange={handelInp} placeholder="Notes Description" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                    {getData !== 401 ? <button type="submit" onClick={postData} className="btn btn-primary mt-3 float-end">Add Note</button> : <button type="submit" onClick={sub} className="btn btn-primary mt-3 float-end">Add Note</button>}

                </div>

            </form>
            <div className="container row d-flex flex-row-reverse" style={{
                justifyContent: "center",
                alignItems: "center",
                margin: "auto"
            }}>{getData !== 401 ? not.map((val, id) => {
                return <UserNote value={val} key={id} idx={id} fun={del} />
            }) : arr.map((val, id) => {
                return <Notes value={val} key={id} idx={id} fun={del} />
            })}

            </div>

        </>
    )
}

export default CreateNote