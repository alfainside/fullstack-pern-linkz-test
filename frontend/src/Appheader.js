import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from './constants/apiContants';
import { googleLogout } from "@react-oauth/google";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = localStorage.getItem('username');
            if (username === '' || username === null) {
                // usenavigate('/login');
            } else {
                if(validateEmail(username)){
                    displayusernameupdate(localStorage.getItem('name'));
                }else{
                    displayusernameupdate(username);
                }
            }
        }

    }, [location])
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const LogoutProccess = () => {
        googleLogout();
        localStorage.clear();
        usenavigate('/login');
        window.location.href='/login';
    }

    return (
        <div>
            {showmenu &&
                <div className="header">
                    <Link to={'/'}>Home</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    {/* <Link style={{ float: 'right' }} to={'/login'}>Logout</Link> */}
                    <button type="button" className="btn btn-danger" style={{ float: 'right' }}
                        onClick={LogoutProccess} >
                        Logout
                    </button>
                </div>
            }
        </div>
    );
}

export default Appheader;