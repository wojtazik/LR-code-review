import './Login.css'
import React, { useState } from "react"
import { connect } from "react-redux";
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const Login = (props) =>
{
    const [nick, setNick] = useState("")
    const [nickInfo,setNickInfo] = useState("")
    const [pass, setPass] = useState("")
    const [passInfo, setPassInfo] = useState("")



    // ========================================
    const needNick = "Wprowadz nick"
    const needPass = "Wprowadz hasło"
    const correctData = "Wprowadz poprawne dane"
    // ================== 
    const login = () =>
    {

        if (nick === "") {
            setNickInfo(needNick)
            document.documentElement.style.setProperty('--nickInfo', 'var(--infoColorRed)');
        } else if (nick !== "" && pass === "") {
            setPassInfo(needPass)
            document.documentElement.style.setProperty('--passInfo', 'var(--infoColorRed)');
        } else if (pass !== "" & nick !== "") {

            const usersList = props.state.Users.list.map((x) =>
            {
                return x.nick
            })

            if (usersList.indexOf(nick) >= 0) {
                loginCheckPass(usersList.indexOf(nick))
            } else {
                setNickInfo(correctData)
                setPassInfo(correctData)
                document.documentElement.style.setProperty('--nickInfo', 'var(--infoColorRed)');
                document.documentElement.style.setProperty('--passInfo', 'var(--infoColorRed)');              
            }
        }

    }

    const loginCheckPass = (id) =>
    {
        const user = props.state.Users.list[id]
        if (user.password === pass) {
            props.loggedSet(user.id)
            CloseLogin()
        } else {
            setNickInfo(correctData)
            setPassInfo(correctData)
        }
    }


    const changeNick = (e) =>
    {
        const value = e.target.value
        setNick(value)
        setNickInfo("")
        setPassInfo("")
        document.documentElement.style.setProperty('--nickInfo', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--passInfo', 'var(--inputAndInputBtn)');
    }

    const changePass = (e) =>
    {
        const value = e.target.value
        setPass(value)
        setNickInfo("")
        setPassInfo("")
        document.documentElement.style.setProperty('--nickInfo', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--passInfo', 'var(--inputAndInputBtn)');
    }



    const CloseLogin = () =>
    {
        props.modalReset()
        document.documentElement.style.setProperty('--nickInfo', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--passInfo', 'var(--inputAndInputBtn)');
    }

    const registration = () =>
    {
        props.modalSet("Registration")
        document.documentElement.style.setProperty('--nickInfo', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--passInfo', 'var(--inputAndInputBtn)');
    }

    window.document.onkeydown = function (eve)
        {
        const key = eve.key
        
        if (key === "Escape") {
            CloseLogin()
        } else if (key === "Enter") {
            login()
        }
    }
    
    return (
        <div className='loginPage'>
            <button className='loginEscBtn' onClick={CloseLogin}>X</button>
            <h2 className='heading'> Logowanie </h2>
            <div className='loginLeftPart'>
                <input value={nick} onChange={changeNick} className="loginInpNick"></input>
                <div>{nickInfo}</div>
                <input type="password" value={pass}onChange={changePass} className="loginInpPass"></input>
                <div>{passInfo}</div>
                <button onClick={login}>Zaloguj się</button>
            </div>
            <div className='loginRightPart'>
                <div>Nie masz konta?</div>
                <button onClick={registration}>Zarejestruj się</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)