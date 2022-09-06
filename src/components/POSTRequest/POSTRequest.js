import style from './POSTRequest.module.scss'
import s from '../GETRequest/GETRequest.module.scss'
import ButtonBase from "../../facades/buttons/ButtonBase"
import {useState} from "react"
import {testAssignmentAPI} from "../../api/api"
import validator from "../../utils/validator/validator"

const POSTRequest = () => {

    const [request, setRequest] = useState(
        {name: '', email: '', phone: '', position_id: 1, photo: {name: 'Upload your photo'}})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {name, email, phone, position_id, photo} = request

    const signUpHandler = e => {
        e.preventDefault()
        if (validator.name(name) || validator.email(email) || validator.phone(phone) || validator.photo(photo)) {
            setIsSubmitting(true)
            setTimeout(() => setIsSubmitting(false), 3000)
            return
        }
        debugger
        testAssignmentAPI.getToken()
            .then((res) => {
                let formData = new FormData()
                formData.append("name", name)
                formData.append("email", email)
                formData.append("phone", phone)
                formData.append("position_id", position_id)
                formData.append("photo", photo)
                testAssignmentAPI.setUsers(formData, res.data.token)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const uploadHandler = e => {
        const photo = e.target.files[0]
        validator.photo(photo)
        setRequest({...request, photo})
    }

    return <div className={style.post}>
        <span className={s.title}>Working with POST request</span>
        <form className={style.main}>
            <div className={style.inputTextPart}>
                <input className={style.inputText}
                       placeholder={'Your name'}
                       type="text"
                       style={{border: isSubmitting && validator.name(name) ? '2px solid #CB3D40' : null}}
                       onChange={(name) => setRequest({...request, name: name.target.value})}/>
                {isSubmitting &&
                    <span className={style.error} style={{marginTop: '110px'}}>{validator.name(name)}</span>}
                <input className={style.inputText}
                       placeholder={'Email'}
                       type="email"
                       style={{border: isSubmitting && validator.email(email) ? '2px solid #CB3D40' : null}}
                       onChange={(email) => setRequest({...request, email: email.target.value})}/>
                {isSubmitting &&
                    <span className={style.error} style={{marginTop: '216px'}}>{validator.email(email)}</span>}
                <input className={style.inputText}
                       placeholder={'Phone'}
                       type="tel"
                       style={{border: isSubmitting && validator.phone(phone) ? '2px solid #CB3D40' : null}}
                       onChange={(phone) => setRequest({...request, phone: phone.target.value})}/>
                {isSubmitting &&
                    <span className={style.error} style={{marginTop: '332px'}}>{validator.phone(phone)}</span>}
                <span className={style.numberExample}>+38 (XXX) XXX - XX - XX</span>
            </div>
            <div className={style.inputCheckboxPart}>
                <span className={style.checkboxPartTitle}>Select your position</span>
                <div className={style.inputContainer}>
                    <input type="radio" id="1" checked={request.position_id === 1}
                           name="position" value="frontend" onChange={(e) =>
                        setRequest({...request, position_id: +e.target.id})}/>
                    <label htmlFor="frontend">Frontend developer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="2" checked={request.position_id === 2}
                           name="position" value="backend"
                           onChange={(e) => setRequest({...request, position_id: +e.target.id})}/>
                    <label htmlFor="backend">Backend developer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="3" checked={request.position_id === 3}
                           name="position" value="designer" onChange={(e) =>
                        setRequest({...request, position_id: +e.target.id})}/>
                    <label htmlFor="designer">Designer</label>
                </div>
                <div className={style.inputContainer}>
                    <input type="radio" id="4" checked={request.position_id === 4}
                           name="position" value="QA" onChange={(e) =>
                        setRequest({...request, position_id: +e.target.id})}/>
                    <label htmlFor="QA">QA</label>
                </div>
            </div>
            <div className={style.uploadPart}>
                <label htmlFor="file"></label>
                <button style={{border: isSubmitting && !validator.photo(photo) ? '2px solid #CB3D40' : null}}>Upload</button>
                <input className={style.inputText}
                       placeholder={request.photo?.name}
                       style={{border: isSubmitting && !validator.photo(photo) ? '2px solid #CB3D40' : null}}/>
                <input type="file"
                       className={style.file}
                       name="file"
                       accept="image/jpeg, image/jpg"
                       onChange={uploadHandler}/>
                {isSubmitting && <div className={style.error}>{validator.photo(photo)}</div>}
            </div>
            <ButtonBase title={'Sign Up'}
                        disable={!request.name || !request.email || !request.phone || !request.photo.size}
                        onClickHandler={signUpHandler}/>
        </form>
    </div>
}
export default POSTRequest;
