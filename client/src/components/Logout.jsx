import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Logout = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const logUserOut = async () => {
        try {
            const result = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const statusNum = result.status;
            const data = await result.json();

            if (statusNum !== 201) {
                throw new Error();
            }

            dispatch({ type: "USER", payload: false });
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        logUserOut();
    }, [])
    return (
        <>

        </>
    )
}

export default Logout