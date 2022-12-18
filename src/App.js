import style from './App.module.scss'
import Header from "./components/header/Header";
import TestAssignment from "./components/testAssignment/TestAssignment";
import GETRequest from "./components/GETRequest/GETRequest";
import POSTRequest from "./components/POSTRequest/POSTRequest";

const App = () =>

    <div className={style.app}>
        <Header/>
        <TestAssignment/>
        <GETRequest/>
        <POSTRequest/>
    </div>

export default App;
