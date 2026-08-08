import "./Navbar.css";
import {Link} from "react-router-dom";


export default function Navbar()
{
    return (
        <>
         
              <nav className="navbar">
              <div >
            <img className="logoimg" src="./logo.png" alt="Company Logo" />
        </div>
        {/* <div className="logo">Yellow Pages</div> */}
        <ul class="nav-links">
            <Link to="/About"><li><a href="#">About</a></li></Link>
            <Link to="/contact"><li><a href="#">Contact</a></li> </Link>
             <Link to="/Add"><li><a href="#">Add Wokers</a></li></Link>
             <Link to="/userHome"><li><a href="#">Home</a></li></Link>
             {/* <Link to="/check"><li><a href="#"></a></li></Link> */}
        </ul>
        <button class="menu-btn">&#977;</button>
    </nav>
        </>
    );
}