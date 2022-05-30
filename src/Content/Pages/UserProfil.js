import "./UserProfil.css"

import React, { useEffect,useState } from 'react'

import { connect } from 'react-redux';

import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";




const UserProfil = (props) =>
{
    const [btnsCards, setBtnsCards] = useState("")
    const [newPhoto, setNewPhoto] = useState("")
    const [newNick, setNewNick] = useState("")
    const [newNickInfo, setNewNickInfo] = useState("")
    
    const [currentPass, setCurrentPass] = useState("")
    const [currentPassInfo, setCurrentPassInfo] = useState("")

    const [newPass, setNewPass] = useState("")
    const [newPassInfo, setNewPassInfo] = useState("")
    const [newPassRepeat, setNewPassRepeat] = useState("")
    const [newPassRepeatInfo, setNewPassRepeatInfo] = useState("")

    const [basketEmpty,setBasketEmpty] = useState(true)

// ================================
    
    const account = props.state.Users.list[props.state.Users.logged]

    const txtPhoto = "changePhoto"
    const txtNick = "changeNick"
    const txtPass = "changePass"
    const txtNone = ""
    const basicPhoto = "https://img.icons8.com/external-dreamstale-lineal-dreamstale/64/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png"

    const passLow = "Hasło : Łatwe"
    const passMid = "Hasło : Średnie"
    const passHard = "Hasło : Trudne"

// =======================================

    const ratingBtns = (e) =>
    {
        const article = document.getElementById(e.currentTarget.id);
        const itemId = Number(article.dataset.id)
        const rating = Number(article.dataset.rating)
        const userId = account.id

        props.accRatingAdd(userId, itemId, rating)
        props.addRating(itemId,rating)
    }
    

    useEffect(() =>
    {
        const stuffsInHistory = []

        account.history.map(x =>
        {
            if (Object.keys(x).length > 1) {
                stuffsInHistory.push(x)
            }
        })
        
        if (stuffsInHistory.length === 0) {
            setBasketEmpty(true)
        } else {
            setBasketEmpty(false)
        }

    })
    
    const delBasket = e =>
    {
        const id = e.currentTarget.id
        const attribute = document.getElementById(id)
        const idToDel = Number(attribute.dataset.itemid)

        props.accHistoryDel(account.id,idToDel)
    }
    
    
    const delAccBtn = () =>
    {
        const id = props.state.Users.logged
        props.modalSet("DelAcc",id)
    }
    
    const newPassCancel = () =>
    {
        setBtnsCards("")
        resetState()
    }
    
    const changePass = () =>
    {
        if (currentPass === account.password) {
            
            if (newPass === "" || newPassRepeat === "") {
                setNewPassRepeatInfo("Uzupełnij wszystkie pola")
            } else if (newPass !==newPassRepeat) {
                setNewPassRepeatInfo("Hasła różnią się")
            } else if (newPass === newPassRepeat) {
                props.accChangePass(newPass, account.id)
                resetState()
                setBtnsCards("")
            }
        } else {
            setCurrentPassInfo("Aktualne hasło jest niepoprawne")
        }
    }
    
    const newPassRepeatInp = (e) =>
    {
        setNewPassRepeat(e.target.value)
        setNewPassRepeatInfo("")
    }
    
    const newPassInp = (e) =>
    {
        const value = e.target.value
        setNewPass(value)

        const low = /[a-z]|[A-Z]/
        const mid = /[0-9]/
        const hard = /\W/

        if (low.test(value)&&mid.test(value)&&hard.test(value)) {
            setNewPassInfo(passHard)
            document.documentElement.style.setProperty('--passLvlColor', 'var(--infoColorGreen)');
            setNewPassRepeatInfo("")
        } else if ((low.test(value)&&mid.test(value))||(low.test(value)&&hard.test(value))||(hard.test(value)&&mid.test(value))) {
            setNewPassInfo(passMid)
            document.documentElement.style.setProperty('--passLvlColor','var(--infoColorYellow)');
            setNewPassRepeatInfo("")
        } else if (low.test(value)||mid.test(value)||hard.test(value)) {
            setNewPassInfo(passLow)
            document.documentElement.style.setProperty('--passLvlColor', 'var(--infoColorRed)');
            setNewPassRepeatInfo("")
        } else {
            setNewPassInfo("")
        }
    }
    
    const currPassInp = (e) =>
    {
        setCurrentPass(e.target.value)
        setCurrentPassInfo("")
    }
    
    const newNickAccept = () => 
    {
        props.accChangeNick(newNick,account.nick,account.id)
        resetState()
        setBtnsCards("")
    }

    const newNickCancel = () =>
    {
        setBtnsCards("")
        resetState()
    }
    
    const newNickInp = (e) =>
    {
        setNewNick(e.target.value)
        if (props.state.Users.usersNicks.indexOf(e.target.value) >= 0) {
           setNewNickInfo('Podany nick jest zajety')            
        } else {
            setNewNickInfo('')
        }
    }
    
    const newPhotoAccept = () =>
    {
        if (newPhoto!=="") {
        props.accChangePhoto(newPhoto,account.id)
        setBtnsCards("")
        resetState()
        } else {
        props.accChangePhoto(basicPhoto,account.id)
        setBtnsCards("")
        resetState()
        }

    }
    
    const newPhotoCancel = () =>
    {
        setBtnsCards("")
        resetState()
    }
    
    const newPhotoInp = (e) =>
    {
        setNewPhoto(e.target.value)
    }
    
    const photoBtn = () =>
    {
        if (btnsCards===txtPhoto) {
            setBtnsCards(txtNone)
        } else {
            setBtnsCards(txtPhoto)
            resetState()
        }
    }

    const nickBtn = () =>
    {
        if (btnsCards===txtNick) {
            setBtnsCards(txtNone)
        } else {
            setBtnsCards(txtNick)
            resetState()
        }      
    }

    const passBtn = () =>
    {
        if (btnsCards===txtPass) {
            setBtnsCards(txtNone)
        } else {
            setBtnsCards(txtPass)
            resetState()
        }       
    }

    const resetState = () =>
    {
        setNewPhoto("")    
        setNewNickInfo("")
        setNewNick("")
        setCurrentPass("")
        setCurrentPassInfo("")
        setNewPass("")
        setNewPassInfo("")
        setNewPassRepeat("")
        setNewPassRepeatInfo("")
    }

    useEffect(() =>
    {
        if (btnsCards === txtPhoto) {
            document.documentElement.style.setProperty('--btnPhotoRadius', '0px');
            document.documentElement.style.setProperty('--btnPhotoBorder', 'none');
            document.documentElement.style.setProperty('--btnPhotoHeight', '35px');
        } else {
            document.documentElement.style.setProperty('--btnPhotoRadius', '5px');
            document.documentElement.style.setProperty('--btnPhotoBorder', '2px solid var(--btnBlue)');
            document.documentElement.style.setProperty('--btnPhotoHeight', '30px');
        }

        if (btnsCards === txtNick) {
            document.documentElement.style.setProperty('--btnNickRadius', '0px');
            document.documentElement.style.setProperty('--btnNickBorder', 'none');
            document.documentElement.style.setProperty('--btnNickHeight', '35px');             
        } else {
            document.documentElement.style.setProperty('--btnNickRadius', '5px');
            document.documentElement.style.setProperty('--btnNickBorder', '2px solid var(--btnBlue)');
            document.documentElement.style.setProperty('--btnNickHeight', '30px');            
        }

        if (btnsCards === txtPass) {
            document.documentElement.style.setProperty('--btnPassRadius', '0px');
            document.documentElement.style.setProperty('--btnPassBorder', 'none');
            document.documentElement.style.setProperty('--btnPassHeight', '35px');             
        } else {
            document.documentElement.style.setProperty('--btnPassRadius', '5px');
            document.documentElement.style.setProperty('--btnPassBorder', '2px solid var(--btnBlue)');
            document.documentElement.style.setProperty('--btnPassHeight', '30px');            
        }

    },[btnsCards])

    return (
        <div className="profilPage">
            <div className="dataPart">
                <h5 className="dataTitle">Dane profilu</h5>
                <img className="dataPhoto" src={account.photo} />
                <h7 className="dataNick">{account.nick}</h7>
                <div className="btnsDiv">
                    <button className="dataBtnPhoto" onClick={photoBtn}>Zdjecie</button>
                    <button className="dataBtnNick" onClick={nickBtn}>Nick</button>
                    <button className="dataBtnPass" onClick={passBtn}>Hasło</button>
                    <button className="dataBtnDel" onClick={delAccBtn}>Skasuj</button>
                </div>

                
                {(() =>
                {
                    if (btnsCards===txtPhoto) {
                        return (
                            <div className="photoInput">
                                <div className="photoLeft">
                                    <h6>Link do zdjęcia</h6>
                                    <input value={newPhoto} onChange={newPhotoInp} />
                                    <div className="btnsDiv">
                                        <button className="saveBtn" onClick={newPhotoAccept}>Zapisz</button>
                                        <button className="cancelBtn" onClick={newPhotoCancel}>Anuluj</button>
                                    </div>

                                </div>

                                <div className="photoRight">
                                    <h6>Podglad</h6>
                                    <img src={newPhoto}/>
                                </div>

                            </div>
                        )
                    } else if (btnsCards === txtNick) {
                        return (
                            <div className="nickInput">
                                <h5>Nowy nick</h5>
                                <div>
                                    <input onChange={newNickInp} />
                                    <div>{newNickInfo}</div>
                                </div>
                                <div className="btnsDiv">
                                    
                                    {(() =>
                                    {
                                        if (props.state.Users.usersNicks.indexOf(newNick)>=0) {
                                            return(<button title="Nick jest zajety" className="greyBtn">Zapisz</button>)
                                        } else if (newNick===""){
                                            return(<button title="Wprowadz nick" className="greyBtn">Zapisz</button>)
                                        } else {
                                            return (<button onClick={newNickAccept} className="saveBtn">Zapisz</button>)
                                        } 
                                    })()}

                                    <button onClick={newNickCancel} className="cancelBtn">Anuluj</button>
                                </div>
                            </div>
                        )
                    } else if (btnsCards === txtPass) {
                        return (
                            <div className="passInputs">
                                <div className="currentPass">
                                    <h6>Wprowadz aktualne hasło</h6>
                                    <input type="password" onChange={currPassInp} value={currentPass} />
                                    <h8>{currentPassInfo}</h8>
                                </div>

                                <div className="newPassPart">
                                    <div>
                                        <h6>Wprowadz nowe hasło</h6>
                                        <input type="password" onChange={newPassInp} value={newPass} />
                                        <h8>{newPassInfo}</h8>
                                    </div>
                                    <div>
                                        <h6>Powtórz nowe hasło</h6>
                                        <input type="password" onChange={newPassRepeatInp} value={newPassRepeat} />
                                        <h7>{newPassRepeatInfo}</h7>
                                    </div>
                                </div>

                                <div className="btnsDiv">
                                    <button className="saveBtn" onClick={changePass}>Zapisz</button>
                                    <button className="cancelBtn" onClick={newPassCancel}>Anuluj</button>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
            <div className="historyPart">
                <h4>Historia zakupów</h4>
                
                {(() =>
                {
                    if (props.state.StuffReducer.ApiListAdd === true && props.state.StuffReducer.ApiCatAdd === true) {
                        if (basketEmpty) {
                            return (<h5 className="historyEmpty">Twoja historia zakupów jest pusta.</h5>)
                        } else {
                            return (<div>
                                {account.history.map(x =>
                                {
                                    if (Object.keys(x).length > 1) {
                                        return (
                                            <div className="historySingleBasket">
                                                <div className="itemTop">
                                                    <div>Data: {x.date}</div>
                                                    <div>Kwota zakupów: {(x.price / 100).toFixed(2)}zł</div>
                                                    <button data-itemid={x.id} id={x.id + "delBasketHistory"} onClick={delBasket}>
                                                        Skasuj
                                                    </button>
                                                </div>

                                                {x.basket.map(x =>
                                                {
                                                    const itemObj = props.state.StuffReducer.List[x.itemId]
                                                    if (Object.keys(itemObj).length===1) {
                                                        return (
                                                            <div className="historySingleItemDeleted">
                                                                Przedmiot wycofany z oferty.
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="historySingleItem">
                                                                <img src={itemObj.image} />
                                                            
                                                                <div className="historySingleItemTitle"> {itemObj.title} </div>
                                                                <div className="historySingleItemPrice">{x.value}x{(itemObj.price / 100).toFixed(2)}zł</div>


                                                                {(() =>
                                                                {
                                                                    if (account.rating.findIndex(el => el.itemId === itemObj.id) < 0) {
                                                                        return (<div className="historySingleItemTxt">Ocen produkt:</div>)
                                                                    } else {
                                                                        return (<div className="historySingleItemTxt">Twoja ocena:</div>)
                                                                    }
                                                                })()}
                                                                
                                                                {(() =>
                                                                {
                                                                        
                                                                    if (account.rating.findIndex(el => el.itemId === itemObj.id) >= 0) {

                                                                        let index = account.rating.findIndex(el => el.itemId === itemObj.id)
                                                                        return (
                                                                            <div className="historySingleItemRating">{account.rating[index].rating}</div>
                                                                        )

                                                                    } else {
                                                                        return (
                                                                            <div className="historySingleItemRatio">

                                                                                <input onClick={ratingBtns} data-id={x.itemId} data-rating="5" type="radio" name={x.itemId + "star5"} id={x.itemId + "star5"} />
                                                                                <label for={x.itemId + "star5"}> </label>

                                                                                <input onClick={ratingBtns} data-id={x.itemId} data-rating="4" type="radio" name={x.itemId + "star4"} id={x.itemId + "star4"} />
                                                                                <label for={x.itemId + "star4"}> </label>

                                                                                <input onClick={ratingBtns} data-id={x.itemId} data-rating="3" type="radio" name={x.itemId + "star3"} id={x.itemId + "star3"} />
                                                                                <label for={x.itemId + "star3"}> </label>

                                                                                <input onClick={ratingBtns} data-id={x.itemId} data-rating="2" type="radio" name={x.itemId + "star2"} id={x.itemId + "star2"} />
                                                                                <label for={x.itemId + "star2"}> </label>

                                                                                <input onClick={ratingBtns} data-id={x.itemId} data-rating="1" type="radio" name={x.itemId + "star1"} id={x.itemId + "star1"} />
                                                                                <label for={x.itemId + "star1"}> </label>                                                                

                                                                            </div>                                                                                 
                    
                                                                        )
                                                                    }                                                                
                                                                })()}                                                            

                                                            </div>
                                                        )  
                                                    }
                                                    
                                                })}

                                            </div>
                                        )
                                    }
                                })}
                            </div>)
                        }
                    } else {
                        return (
                            <img className='historyLoadingPage' src="https://i.stack.imgur.com/MEBIB.gif" alt=""></img>
                        )
                    }
                })()}

            </div>
            {/* <div className="emptyPart">empty</div> */}
        </div>        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfil)