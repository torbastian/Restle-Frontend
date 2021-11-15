import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import List from "../components/List";
import Loading from '../components/Loading';
import Members from "../components/Members";
import UserElement from "../components/UserElement";
import UserIcon from "../components/UserIcon";
import { usePopup } from "../hooks/PopupContext";
import EditBoard from "../popup-content/EditBoard";
import NewCard from "../popup-content/NewCard";
import NewList from "../popup-content/NewList";
import '../styles/Board.scss';
import {FaSearch} from 'react-icons/fa';
import Profile from "./Profile";

function AdminOverview() {
    useEffect(() =>{
        getUsers();
        console.log("USER: " + user);
    }, []);
    const { createPopup } = usePopup();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const ws = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const requestData = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }  
      };

    function seeLog(){
        console.log("test");
    }

    function getUsers(){
        fetch(process.env.REACT_APP_API_URL + '/user/', requestData).then(res => {
            console.log(res);
            res.json().then(data => {
                console.log(data);
                setUser([data, data, data, data]);
            })
        });
    }

    function SelectUser(user){
        console.log("HEJ");
        setSelectedUser(user);
    }


    return(
        <div id="parent">
            <h1>Admin Overview</h1>
            <div id="box">
                <div id="userList">
                    <div id="serchBox">
                        <FaSearch/>
                        <input type="text"></input>
                    </div>
                    <div className="userBox">
                    { 
                        user !== [] && user.map((_user, index) =>
                        <UserElement key={index} user={_user} onClick={() => SelectUser(_user)} ></UserElement>
                    )}  
                    </div>
                </div>
                <div id="profile page">
                        {selectedUser !== null && 
                        <Profile ></Profile>
                        }
                </div>
            </div>
        </div>
    );

    //EXAMPLE
    /*
    return(
        <div>
            <h1>Admin Overview</h1>
            <div id="userList"></div>
            <div id="profile page"></div>
            {
                user !== null &&
                user.map((_user, index) =>

                <div key={index}>
                <UserIcon  user={_user} onClick={() => seeLog()}/>
                <button onClick={seeLog}></button>
                </div>
                
                )
            }

        </div>
    );
    */
}

export default AdminOverview;