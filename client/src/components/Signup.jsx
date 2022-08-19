import React, { useState } from 'react'
import img from '../images/co.svg';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const navigate = useNavigate();
    const [user, setuser] = useState({
        name: "", email: "", password: ""
    })

    const handelInp = (e) => {
        const { name, value } = e.target;

        setuser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const postData = async (e) => {
        e.preventDefault();

        try {
            const { name, email, password } = user;
            const result = await fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            const statusNum = result.status;
            const msg = await result.json();

            if (statusNum !== 200) {
                window.alert(msg.message);
                throw new Error(msg);
            }


            window.alert(msg.message);
            navigate('/login', { replace: 'true' });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="container row m-auto mt-5 shadow p-3 mb-2 bg-body rounded">
                <div className="col-md-6 mt-4">
                    <h2>Registration Form</h2>
                    <form method='POST'>
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value={user.name} onChange={handelInp} id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control" name="email" value={user.email} onChange={handelInp} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" value={user.password} onChange={handelInp} id="exampleInputPasswo" />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={postData}>Submit</button>
                    </form>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={img} alt="logo" className='w-75 h-75' />
                </div>
            </div>
        </>
    )
}

export default Signup