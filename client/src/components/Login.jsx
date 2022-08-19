import React, { useContext, useState } from 'react'
import logo from '../images/log.svg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Login = () => {

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [log, setLog] = useState({
        email: "", password: ""
    });

    const handelInp = (e) => {
        const { name, value } = e.target;

        setLog((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const postData = async (e) => {
        e.preventDefault();

        try {
            const { email, password } = log;

            const result = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const statusNum = result.status;
            const msg = await result.json();


            if (statusNum !== 200) {
                window.alert(msg.message);
                throw new Error(msg.messgae);
            }

            // window.alert(msg.message);

            dispatch({ type: "USER", payload: true });
            navigate("/", { replace: "true" })

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container row m-auto mt-5 shadow p-3 mb-2 bg-body rounded">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={logo} alt="logo" className='w-75 h-75' />
                </div>
                <div className="col-md-6 mt-4">
                    <h2>Login Form</h2>
                    <form>

                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control" name="email" value={log.email} onChange={handelInp} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" value={log.password} onChange={handelInp} id="exampleInputPassword1" />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={postData}>Submit</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login