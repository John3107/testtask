import style from './POSTRequest.module.scss'
import s from '../GETRequest/GETRequest.module.scss'
import ButtonBase from "../../facades/buttons/ButtonBase";
import {useEffect, useState} from "react";
import {testAssignmentAPI} from "../../api/api";

const POSTRequest = () => {

    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [position, setPosition] = useState(1)

    useEffect(() => {
        testAssignmentAPI.getToken()
            .then((res) => {
                setToken(res.data.token)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const signUpHandler = (e) => {
        e.preventDefault()
        const userData = {token, name, email, phone, position}
        testAssignmentAPI.setUsers(userData)
            .then((res) => {
                setToken(res.data.token)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

   // const showFile = (e) => {
       //  let reader = new FileReader();

       // console.log(e, reader)
        // let file = input.files[0];
        //
        // let reader = new FileReader();
        //
        // reader.readAsText(file);
        //
        // reader.onload = function() {
        //     console.log(reader.result);
        // };
        //
        // reader.onerror = function() {
        //     console.log(reader.error);
        // };
  //  }

    return <div className={style.post}>
        <span className={s.title}>Working with POST request</span>
        <form className={style.main}>
            <div className={style.inputTextPart}>
                <input className={style.inputText} placeholder={'Your name'}
                       onChange={(name) => setName(name.target.value)}/>
                <input className={style.inputText} placeholder={'Email'}
                       onChange={(email) => setEmail(email.target.value)}/>
                <input className={style.inputText} placeholder={'Phone'}
                       onChange={(phone) => setPhone(phone.target.value)}/>
                <span className={style.numberExample}>+38 (XXX) XXX - XX - XX</span>
            </div>
            <div className={style.inputCheckboxPart}>
                <span className={style.checkboxPartTitle}>Select your position</span>
                <div className={style.inputContainer}>
                    <input type="radio" id="1" checked={position === 1}
                           name="position" value="frontend" onChange={(e) => setPosition(+e.target.id)}/>
                    <label htmlFor="frontend">Frontend developer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="2" checked={position === 2}
                           name="position" value="backend" onChange={(e) => setPosition(+e.target.id)}/>
                    <label htmlFor="backend">Backend developer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="3" checked={position === 3}
                           name="position" value="designer" onChange={(e) => setPosition(+e.target.id)}/>
                    <label htmlFor="designer">Designer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="4" checked={position === 4}
                           name="position" value="QA" onChange={(e) => setPosition(+e.target.id)}/>
                    <label htmlFor="QA">QA</label>
                </div>
            </div>
            <div className={style.uploadPart}>
                <label htmlFor="file"></label>
                <button>Upload</button>
                <input className={style.inputText}
                       placeholder={'Upload your photo'}/>
                <input type="file"
                       className={style.file}
                       name="file"
                       accept="image/jpeg, image/jpg"
                       // onChange={showFile}
                />
            </div>
            <ButtonBase title={'Sign Up'} disable={!name || !email || !phone} onClickHandler={signUpHandler}/>
        </form>
    </div>
}
export default POSTRequest;
