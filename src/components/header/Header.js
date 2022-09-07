import style from './Header.module.scss'
import logo from '../../assets/logo.svg'
import ButtonBase from "../../facades/buttons/ButtonBase"

const Header = () =>
    <div className={style.header}>
        <div className={style.main}>
            <img src={logo} alt="logo"/>
            <div className={style.buttons}>
                <ButtonBase title={'Users'}/>
                <ButtonBase title={'Sign up'}/>
            </div>
        </div>
    </div>

export default Header;
