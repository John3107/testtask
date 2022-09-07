import style from './UserView.module.scss'
import withoutPhoto from '../../../assets/without-photo.svg'
import ReactTooltip from "react-tooltip";
import {useState} from "react";

const UserView = props => {

    const {email, name, phone, photo, position} = props.user
    const checkedPhoto = photo.split('/')[5].split('.')[0] === 'placeholder' ? withoutPhoto : photo
    const [showTooltip, setShowTooltip] = useState(false)

    return <div className={style.userView} onMouseLeave={() => setShowTooltip(false)}>
        <img src={checkedPhoto} alt="photo" className={style.avatar}/>
        <span data-tip={name}
              id="name"
              style={{cursor: name.length > 34 ? 'pointer' : null}}
              onMouseEnter={() => name.length > 34 && setShowTooltip(true)}>{name}</span>
        <span>{position}</span>
        <span data-tip={email}
              id="email"
              style={{cursor: email.length > 34 ? 'pointer' : null}}
              onMouseEnter={() => email.length > 34 && setShowTooltip(true)}>{email}</span>
        {showTooltip && <ReactTooltip border={false} place={'bottom'} className={style.tooltip}/>}
        <span>{phone}</span>
    </div>
}

export default UserView;
