import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react"; 
import logo from "../assets/logo.png";  

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة (مفتوحة أو مقفولة)

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* اللوجو */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="ARCHIVE logo" className="logo-img" />
        </Link>

        {/* زرار المنيو - بيظهر في الموبايل بس */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* الروابط - بتأخد كلاس open لما نضغط على الزرار */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link 
            to="/" 
            className={location.pathname === "/" ? "nav-item active" : "nav-item"}
            onClick={() => setIsOpen(false)} // يقفل المنيو بعد الاختيار
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === "/about" ? "nav-item active" : "nav-item"}
            onClick={() => setIsOpen(false)}
          >
            About Museum
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === "/contact" ? "nav-item active" : "nav-item"}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          
          
        </div>
      </div>
    </nav>
  );
}