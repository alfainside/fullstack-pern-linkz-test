import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Home = () => {
    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);
   
    useEffect(() => {
        let token = localStorage.getItem('token');
        console.log('token home', token);
        if(!token){
            usenavigate('/login');
        }
        /* fetch("https://localhost:44308/Customer", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            listupdate(resp);
        }).catch((err) => {
            console.log(err.messsage)
        }); */

    }, []);

    return (
        <div>
            
            <h1 className="text-center">Home page</h1>

            {/* <GoogleOAuthProvider clientId="60099894394-ehhe72hk5fjfrq6sl121o5h02k5rsnlr.apps.googleusercontent.com">
                <GoogleLogin
                   onSuccess={async (credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider> */}
            
            {/* <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Credit Limit</td>
                    </tr>
                </thead>
                <tbody>
                    {customerlist &&
                        customerlist.map(item => (
                            <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.creditLimit}</td>
                            </tr>

                        ))
                    }
                </tbody>

            </table> */}
        </div>
    );
}

export default Home;