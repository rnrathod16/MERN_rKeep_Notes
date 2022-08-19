import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {

    const navigate = useNavigate();

    const [getData, setgetData] = useState({})
    const checkAuth = async () => {

        try {
            const result = await fetch('/about', {
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
                navigate('/login');
                throw new Error("User is Not Logged in");
            }

            console.log(data);
            setgetData(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])
    return (
        <>
            <h1>About Page</h1>
            <h3>Welcome {getData.name} </h3>
        </>
    )
}

export default About