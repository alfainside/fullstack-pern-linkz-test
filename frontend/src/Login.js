import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from './constants/apiContants';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
        // localStorage.clear();
        let urlString = new URL(window.location.href);
        let paramToken = urlString.searchParams.get("token");
        let paramUsername = urlString.searchParams.get("username");
        let paramName = urlString.searchParams.get("name");

        let token = localStorage.getItem('token');
        
        if(token){
            usenavigate('/');
        }else if(paramToken){
            localStorage.setItem('token',paramToken);
            localStorage.setItem('username',paramUsername);
            localStorage.setItem('name',paramName);

            usenavigate('/');
        }
        
    },[]);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj={"username": username,
            "password": password};
            fetch(API_BASE_URL+"/users/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if(!resp.errors){
                    toast.success('Success');
                    localStorage.setItem('username',resp.data.username);
                    localStorage.setItem('token',resp.data.token);
                    usenavigate('/')
                }else{
                    toast.error('Login failed, invalid credentials');
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        } else if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    const ProceedLoginusingGoogle = (e) => {
      
        fetch(API_BASE_URL+"/users/google/login",{
            method:'GET',
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if(!resp.errors){
                toast.success('Success');
                localStorage.setItem('username',resp.data.username);
                localStorage.setItem('token',resp.data.token);
                usenavigate('/')
            }else{
                toast.error('Login failed, invalid credentials');
            }
        }).catch((err) => {
            toast.error('Login Failed due to :' + err.message);
        });
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> 
                            {/* <button type="button" class="login-with-google-btn" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href=API_BASE_URL+"/google/login";
                                }} >
                                Sign in with Google
                            </button> */}
                            <div style={{
                                marginTop: 10,
                                textAlign: "center",
                                maxWidth: "fit-content",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}>
                            <GoogleOAuthProvider clientId="60099894394-ehhe72hk5fjfrq6sl121o5h02k5rsnlr.apps.googleusercontent.com">
                                <GoogleLogin
                                    useOneTap={true}
                                    onSuccess={async (credentialResponse) => {
                                        console.log(credentialResponse);
                                        window.location.href=API_BASE_URL+"/google/login";
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                />
                            </GoogleOAuthProvider>
                            </div>
                            <br/>
                            Don't have account ?
                            <br/>
                            <Link to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;