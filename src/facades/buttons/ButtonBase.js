
const ButtonBase = ({title, disable, onClickHandler}) =>
    <button disabled={disable && true} onClick={onClickHandler}>{title}</button>

export default ButtonBase;
