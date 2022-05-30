import "./Registration.css"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../Redux/allReducers";


const Registration = (props) =>
{

    const [nick, setNick] = useState("")
    const [nickInfo,setNickInfo] = useState("")
    const [pass, setPass] = useState("")
    const [passInfo, setPassInfo] = useState("")
    // ==============================

    const nickUsed = "Nick jest zajety"
    const needNick = "Wprowadz nick"
    const needPass = "Wprowadz hasło"
    const passLow = "Hasło : Łatwe"
    const passMid = "Hasło : Średnie"
    const passHard = "Hasło : Trudne"

    // ======================


    const createAcc = () =>
    {
        if (nick === "") {
            setNickInfo(needNick)            
            document.documentElement.style.setProperty('--borderNickColor', 'var(--infoColorRed)');
        } else if(props.state.Users.usersNicks.includes(nick)){
            setNickInfo(nickUsed)
            document.documentElement.style.setProperty('--borderNickColor', 'var(--infoColorRed)');
        }

        if (pass === "") {
            setPassInfo(needPass)
            document.documentElement.style.setProperty('--borderPassColor', 'var(--infoColorRed)');
        }

        if (nick !== "" && pass !== "" & props.state.Users.usersNicks.includes(nick) === false) {
            props.accAdd(nick, pass)
            reset()
        }

    }

    const reset = () =>
    {
        setNick("") 
        setPass("")
        document.documentElement.style.setProperty('--borderNickColor', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--borderPassColor', 'var(--inputAndInputBtn)');
        document.documentElement.style.setProperty('--fontColor', 'var(--infoColorRed)');
        props.modalSet("login")   
    }

    const changeNick = (e) =>
    {
        const value = e.target.value
        setNick(value)
        setNickInfo("")
        document.documentElement.style.setProperty('--borderNickColor', 'var(--inputAndInputBtn)');
    }

    const changePass = (e) =>
    {
        const value = e.target.value
        setPass(value)

        const low = /[a-z]|[A-Z]/
        const mid = /[0-9]/
        const hard = /\W/

        if (low.test(value)&&mid.test(value)&&hard.test(value)) {
            setPassInfo(passHard)
            document.documentElement.style.setProperty('--fontColor', 'var(--infoColorGreen)');
            document.documentElement.style.setProperty('--borderPassColor', 'var(--inputAndInputBtn)');
        } else if ((low.test(value)&&mid.test(value))||(low.test(value)&&hard.test(value))||(hard.test(value)&&mid.test(value))) {
            document.documentElement.style.setProperty('--fontColor', 'var(--infoColorYellow)');
            document.documentElement.style.setProperty('--borderPassColor', 'var(--inputAndInputBtn)');
            setPassInfo(passMid)
        } else if (low.test(value)||mid.test(value)||hard.test(value)) {
            setPassInfo(passLow)
            document.documentElement.style.setProperty('--fontColor', 'var(--infoColorRed)');
            document.documentElement.style.setProperty('--borderPassColor', 'var(--inputAndInputBtn)');
        } else {
            setPassInfo("")
            document.documentElement.style.setProperty('--fontColor', 'var(--infoColorRed)');
            document.documentElement.style.setProperty('--borderPassColor', 'var(--inputAndInputBtn)');
        }
        
    }


    const escBtn = () =>
    {
        props.modalSet("login")
        reset()
    }

    window.document.onkeydown = function (eve)
    {
        const key = eve.key
        
        if (key === "Escape") {
        props.modalSet("login")
        } else if (key === "Enter") {
            createAcc()
        }
    }


    return (
        <div className="regBody">
            
            <button className='regEscBtn' onClick={escBtn} >X</button>
            <h2>Resjestracja</h2>

            <div className="inputsPart">
                <div className="nickTxt">Nazwa użytkownika:</div>
                <input className="nickInp" onChange={changeNick} value={nick}></input>
                <div className="nickInfo">{nickInfo}</div>

                <div className="passTxt">Hasło:</div>
                <input type="password" className="passInp" onChange={changePass} value={pass}></input>  
                <div className="passInfo">{passInfo}</div>
            </div>
            <button className="createBtn" onClick={createAcc}>Stworz konto</button>


        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Registration)