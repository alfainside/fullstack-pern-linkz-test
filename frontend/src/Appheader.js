import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])

    const LogoutProccess = () => {
        localStorage.clear();
        usenavigate('/');
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