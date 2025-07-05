import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 text-center" style={{padding:"20px",backgroundColor: '#22B3C1'}}>
      <p className="text-sm sm:text-base">
        &copy; {year} <strong>eCommerce Website</strong> | Designed & Developed by{" "}
        <span className=" font-bold" style={{color:"yellow", fontSize:"20px"}}>Abhishek Singh</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;