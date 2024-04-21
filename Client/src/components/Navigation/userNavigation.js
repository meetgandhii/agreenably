
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
                <a href="/">
                    <h6 className='user-menu'>
                        Dashboard
                    </h6>
                </a>
            </li>
            <li>
                <img src="/images/Recommendations.png" width="15px" alt="Recommendations" />
                <a href='/get-recommendation'>
                    <h6 className='user-menu'>
                        Recommendations
                    </h6></a>
            </li>
            {/* <li>
                <img src="/images/Manage.png" width="15px" alt="Manage" />
                <a href="/">
                    <h6 className='user-menu'>
                        Manage
                    </h6>
                </a>
            </li> */}
        </ul>
    );
}

export default UserNavigation;
