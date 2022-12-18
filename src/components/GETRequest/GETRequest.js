import style from './GETRequest.module.scss'
import {useEffect} from "react";
import UserView from "./UserView/UserView";
import ButtonBase from "../../facades/buttons/ButtonBase";
import {useDispatch, useSelector} from "react-redux";
import {getUsersTC} from "../../bll/app-reducer";
import Preloader from "../../facades/preloader/Preloader";

const GETRequest = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.app)
    const {users, isInitialized} = data

    useEffect(() => {
        //initial getting users
        dispatch(getUsersTC(6))
    }, [])

    const showMoreHandler = () => {
        //showing plus six users
        dispatch(getUsersTC(users.length + 6))
    }

    return <div className={style.get}>
        <span className={style.title}>Working with GET request</span>
        {isInitialized === 'load-users' ? <Preloader/> : <div className={style.usersContainer}>
            {users.map(el => <UserView user={el} key={el.id}/>)}
        </div>}
        <ButtonBase title={'Show more'} onClickHandler={showMoreHandler}/>
    </div>

}

export default GETRequest;
