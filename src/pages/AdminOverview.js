import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import UserElement from "../components/UserElement";
import { usePopup } from "../hooks/PopupContext";
import { FaSearch } from 'react-icons/fa';
import Profile from "./Profile";
import '../styles/AdminOverview.scss';

function AdminOverview() {
    useEffect(() => {
        getUsers();
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

    function getUsers() {
        fetch(process.env.REACT_APP_API_URL + '/user/getUsers/', requestData).then(res => {
            console.log("", requestData);
            res.json().then(data => {
                console.log("", data);
                setUser(data.users);
            })
        });
    }

    function Search(input) {
        const params = { search: input };
        const url = new URL(process.env.REACT_APP_API_URL + '/user/findUser');
        url.search = new URLSearchParams(params).toString();

        fetch(url, requestData).then(res => {
            res.json().then(data => {
                console.log("data ", data)
                setUser(data);
            })
        });
    }

    function SelectUser(user) {
        setSelectedUser(null);
        setSelectedUser(user);
    }


    return (
        <div id="admin-overview">
            <h1>Admin Overview</h1>
            <div id="box">
                <div id="userList">
                    <div className="search">
                        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
                        <button onClick={() => Search(search)}><FaSearch /></button>
                    </div>
                    <div className="userBox">
                        {
                            user !== [] && user.map((_user, index) =>
                                <UserElement key={index} user={_user} onClick={() => SelectUser(_user)} ></UserElement>
                            )}
                    </div>
                </div>
                <div className="profile">
                    {selectedUser !== null &&
                        <Profile _user={selectedUser}></Profile>
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminOverview;