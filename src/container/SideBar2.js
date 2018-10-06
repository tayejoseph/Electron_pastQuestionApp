import React from "react";

class SideBar2 extends React.Component {
    render () {
        return (
            <div id = "sideBar2">
            <ul>
            <li><a className="active" href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
            </ul>
            </div>
        )
    }
}


export default SideBar2;