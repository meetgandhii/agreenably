
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import '../../Stylesheet/style1.css';
function UserNavigation() {


    return (
        <ul style={{ listStyle: "none", padding: "0", marginBottom: "60px", textAlign: "left" }}>
            <li>
                <h6 className='user-Heading-nav'>User</h6>
            </li>
            <li>
                <img src="/images/Dashboard.png" width="15px" alt="Dashboard" />
                <h6 className='user-menu' style={{ display: "inline", marginLeft: "5px" }}>
                    Dashboard
                </h6>
            </li>
            <li>
                <img src="/images/Recommendations.png" width="15px" alt="Recommendations" />
                <h6 className='user-menu' style={{ display: "inline", marginLeft: "5px" }}>
                    Recommendations
                </h6>
            </li>
            <li>
                <img src="/images/Manage.png" width="15px" alt="Manage" />
                <h6 className='user-menu' style={{ display: "inline", marginLeft: "5px" }}>
                    Manage
                </h6>
            </li>
        </ul>
    );
}

export default UserNavigation;
