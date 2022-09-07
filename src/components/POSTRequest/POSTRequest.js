import style from './POSTRequest.module.scss'
import s from '../GETRequest/GETRequest.module.scss'
import ButtonBase from "../../facades/buttons/ButtonBase"
import validator from "../../utils/validator/validator"
import registerSuccess from "../../assets/successfully-registered.svg"
import {useDispatch, useSelector} from "react-redux"
import {newUserDataTC, setIsSubmittingAC, setNewUserDataAC} from "../../bll/app-reducer"
import Preloader from "../../facades/preloader/Preloader";

const POSTRequest = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.app)
    const {request, isSuccessfullyRegistered, isSubmitting, isInitialized} = data
    const {name, email, phone, position_id, photo} = request

    const signUpHandler = e => {
        //sing up user
        e.preventDefault()
        //validator
        if (validator.name(name) || validator.email(email) || validator.phone(phone) || validator.photo(photo)) {
            dispatch(setIsSubmittingAC(true))
            return
        }
        dispatch(newUserDataTC(request))
    }

    const uploadHandler = e => {
        //photo uploader
        const file = e.target.files[0]
        validator.photo(file)
        dispatch(setNewUserDataAC({...request, photo: file}))
    }

    return <div className={style.post}>
        {isSuccessfullyRegistered ? <span className={s.title}>User successfully registered</span> :
            <span className={s.title}>Working with POST request</span>}
        {isInitialized === 'load-set-user' ? <Preloader/> : isSuccessfullyRegistered ?
            <img src={registerSuccess} alt="registration success"/> : <form className={style.main}>
                <div className={style.inputTextPart}>
                    <input className={style.inputText}
                           placeholder={'Your name'}
                           type="text"
                           style={{border: isSubmitting && validator.name(name) ? '2px solid #CB3D40' : null}}
                           onFocus={() => dispatch(setIsSubmittingAC(false))}
                           onChange={(name) => dispatch(setNewUserDataAC({...request, name: name.target.value}))}/>
                    {isSubmitting &&
                        <span className={style.error} style={{marginTop: '110px'}}>{validator.name(name)}</span>}
                    <input className={style.inputText}
                           placeholder={'Email'}
                           type="email"
                           style={{border: isSubmitting && validator.email(email) ? '2px solid #CB3D40' : null}}
                           onFocus={() => dispatch(setIsSubmittingAC(false))}
                           onChange={(email) => dispatch(setNewUserDataAC({...request, email: email.target.value}))}/>
                    {isSubmitting &&
                        <span className={style.error} style={{marginTop: '216px'}}>{validator.email(email)}</span>}
                    <input className={style.inputText}
                           placeholder={'Phone'}
                           type="tel"
                           style={{border: isSubmitting && validator.phone(phone) ? '2px solid #CB3D40' : null}}
                           onFocus={() => dispatch(setIsSubmittingAC(false))}
                           onChange={(phone) => dispatch(setNewUserDataAC({...request, phone: phone.target.value}))}/>
                    {isSubmitting &&
                        <span className={style.error} style={{marginTop: '332px'}}>{validator.phone(phone)}</span>}
                    <span className={style.numberExample}>+38 (XXX) XXX - XX - XX</span>
                </div>
                <div className={style.inputCheckboxPart}>
                    <span className={style.checkboxPartTitle}>Select your position</span>
                    <div className={style.inputContainer}>
                        <input type="radio" id="1" checked={position_id === 1}
                               name="position" value="frontend"
                               onChange={(e) => dispatch(setNewUserDataAC({...request, position_id: +e.target.id}))}/>
                        <label htmlFor="frontend">Frontend developer</label>
                    </div>
                    <div className={style.inputContainer}>
                        <input type="radio" id="2" checked={position_id === 2}
                               name="position" value="backend"
                               onChange={(e) => dispatch(setNewUserDataAC({...request, position_id: +e.target.id}))}/>
                        <label htmlFor="backend">Backend developer</label>
                    </div>
                    <div className={style.inputContainer}>
                        <input type="radio" id="3" checked={position_id === 3}
                               name="position" value="designer"
                               onChange={(e) => dispatch(setNewUserDataAC({...request, position_id: +e.target.id}))}/>
                        <label htmlFor="designer">Designer</label>
                    </div>
                    <div className={style.inputContainer}>
                        <input type="radio" id="4" checked={position_id === 4}
                               name="position" value="QA"
                               onChange={(e) => dispatch(setNewUserDataAC({...request, position_id: +e.target.id}))}/>
                        <label htmlFor="QA">QA</label>
                    </div>
                </div>
                <div className={style.uploadPart}>
                    <label htmlFor="file"></label>
                    <button
                        style={{border: isSubmitting && validator.photo(photo) ? '2px solid #CB3D40' : null}}>
                        Upload
                    </button>
                    <input className={style.inputText}
                           placeholder={photo?.name}
                           style={{border: isSubmitting && validator.photo(photo) ? '2px solid #CB3D40' : null}}/>
                    <input type="file"
                           className={style.file}
                           name="file"
                           accept="image/jpeg, image/jpg"
                           onChange={uploadHandler}/>
                    {isSubmitting && <div className={style.error}>{validator.photo(photo)}</div>}
                </div>
                <ButtonBase title={'Sign Up'}
                            disable={!name || !email || !phone || !photo.size}
                            onClickHandler={signUpHandler}/>
            </form>}
    </div>
}
export default POSTRequest;
