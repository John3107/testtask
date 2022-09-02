import style from './TestAssignment.module.scss'
import testAssignment from '../../assets/pexels-alexandr-podvalny-1227513.jpeg'
import ButtonBase from "../../facades/buttons/ButtonBase"

const TestAssignment = () =>
    <div className={style.test}>
        <img src={testAssignment} alt="test assignment"/>
        <div className={style.text}>
            <div className={style.title}>Test assignment for front-end developer</div>
            <div className={style.description}>What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building
                web interfaces with accessibility in mind. They should also be excited to learn, as the world of
                Front-End Development keeps evolving.
            </div>
            <ButtonBase title={'Sign up'}/>
        </div>
    </div>

export default TestAssignment;
