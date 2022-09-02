import style from './POSTRequest.module.scss'
import s from '../GETRequest/GETRequest.module.scss'

const POSTRequest = () =>
    <div className={style.post}>
        <span className={s.title}>Working with POST request</span>
        <div className={style.main}>
            <div className={style.inputTextPart}>
                <input placeholder={'Your name'}/>
                <input placeholder={'Email'}/>
                <input placeholder={'Phone'}/>
                <span className={style.numberExample}>+38 (XXX) XXX - XX - XX</span>
            </div>
            <div className={style.inputCheckboxPart}>
                <span className={style.checkboxPartTitle}>Select your position</span>
            </div>
        </div>
    </div>

export default POSTRequest;
