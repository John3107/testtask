import style from './UserView.module.scss'
import withoutPhoto from '../../../assets/without-photo.svg'

const UserView = props => {

    const {email, name, phone, photo, position} = props.user
    const checkedPhoto = photo.split('/')[5].split('.')[0] === 'placeholder' ? withoutPhoto : photo

    return <div className={style.userView}>
        <img src={checkedPhoto} alt="photo" className={style.avatar}/>
        <span className={style.name}>{name}</span>
        <span>{position}</span>
        <span>{email}</span>
        <span>{phone}</span>
    </div>
}

export default UserView;
