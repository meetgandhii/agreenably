
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";

import '../../Stylesheet/style1.css';
function CertificationsNavigation() {


    return (
        <ul style={{ listStyle: "none", padding: "0", textAlign: "left" }}>
            <li>
                <h6 className='user-Heading-nav'>Certifications</h6>
            </li>
            <li>
                <img src="/images/Environmental.png" width="15px" alt="Environmental" />
                <h6 className='user-menu'>
                    Environmental
                </h6>
            </li>
            <li>
                <img src="/images/Social.png" width="15px" alt="Social" />
                <h6 className='user-menu'>
                    Social
                </h6>
            </li>
        </ul>
    );
}

export default CertificationsNavigation;
