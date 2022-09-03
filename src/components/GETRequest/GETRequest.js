import style from './GETRequest.module.scss'
import {useEffect, useState} from "react";
import {testAssignmentAPI} from "../../api/api";
import UserView from "./UserView/UserView";
import ButtonBase from "../../facades/buttons/ButtonBase";

const GETRequest = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        testAssignmentAPI.getUsers(6)
            .then((res) => {
                setUsers(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const showMoreHandler = () => {
        testAssignmentAPI.getUsers(users.length + 6)
            .then((res) => {
                setUsers(res.data.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <div className={style.get}>
        <span className={style.title}>Working with GET request</span>
        <div className={style.usersContainer}>
            {users.map(el => <UserView user={el} key={el.id}/>)}
        </div>
        <ButtonBase title={'Show more'} onClickHandler={showMoreHandler}/>
    </div>

}

export default GETRequest;
