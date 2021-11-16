import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import UserElement from "../components/UserElement";
import { usePopup } from "../hooks/PopupContext";
import '../styles/Board.scss';
import {FaSearch} from 'react-icons/fa';
import Profile from "./Profile";
import { get } from "mongoose";

function AdminOverview() {
    useEffect(() =>{
        getUsers();
        console.log("USER: " + user);
    }, []);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
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
            res.json().then(data => {
                setUser([data, data, data, data]);
            })
        });
    }

    function Search(input){
        const params = {search: input};
        const url = new URL(process.env.REACT_APP_API_URL + '/user/findUser');
        url.search = new URLSearchParams(params).toString();

        fetch(url).then(res => {
            console.log(res);
            res.json().then(data => {
                setUser(data);
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
                        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
                        <button onClick={() => Search(search)}><FaSearch/></button>
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
}

export default AdminOverview;