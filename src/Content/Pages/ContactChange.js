

// const ContactChange = () =>
// {
//     return (<div>
//         contact change
//     </div>)
// }

// export default ContactChange

import './ContactChange.css'
import React, { useEffect, useState, useRef } from 'react'

import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";



const ContactChange = (props) =>
{

    const [showNew,setShowNew] = useState(false)

    const [cartPhoto, setCartPhoto] = useState('')
    const [cartInp, setCartInp] = useState('')

    const place = useRef()
    const item = useRef()



    const delMessage = (e) =>
    {
        const article = document.getElementById(e.currentTarget.id);
        const id = Number(article.dataset.id)       
        props.delMessage(id)
    }

    const openCloseMessage = (e) =>
    {

        const article = document.getElementById(e.currentTarget.id);
        const id = Number(article.dataset.id)

        props.messageOpenClose(id)

    }

    const updateContactsCancel = () =>
    {
        const oldList = JSON.parse(JSON.stringify(props.state.Contacts.contacts));
        props.updateContactsCancel(oldList)
        props.setUpdateFalse()

    }

    const updateContactsOnPage = () =>
    {
        const newList = JSON.parse(JSON.stringify(props.state.Contacts.testContacts));
        props.setUpdateFalse()
        props.updateContacts(newList)
    }

    const addNewCartToList = () =>
    {
        const newList = JSON.parse(JSON.stringify(props.state.Contacts.testContacts));
        const newObj = { photo: cartPhoto, txt: cartInp }
        newList[1].push(newObj)
        props.setTestContacts(newList)
        resetNewCart()
        props.setUpdateTrue()
    }

    const resetNewCart = () =>
    {
        setShowNew(false)
        setCartInp('')
        setCartPhoto('')
    }

    const newCartPhoto = e =>
    {
        const email = "https://img.icons8.com/material-outlined/50/000000/new-post.png"
        const phone = "https://img.icons8.com/ios-filled/50/000000/phone.png"
        const facebook = "https://img.icons8.com/fluency/50/000000/facebook-new.png"
        const youtube = "https://img.icons8.com/color/50/000000/youtube-play.png"
        const instagram = "https://img.icons8.com/color/50/000000/instagram-new--v1.png"
        const tiktok = "https://img.icons8.com/color/50/000000/tiktok--v1.png"

        const id = e.currentTarget.id
        const attributes = document.getElementById(id)
        const link = attributes.dataset.link


        if (link === 'email') {
            setCartPhoto(email)
        } else if (link ==='phone') {
            setCartPhoto(phone)
        } else if (link==='facebook') {
            setCartPhoto(facebook)
        } else if (link==='youtube') {
            setCartPhoto(youtube)
        } else if (link==='instagram') {
            setCartPhoto(instagram)
        } else if (link==='tiktok') {
            setCartPhoto(tiktok)
        }

    }

    const changeUrl = e =>
    {
        const value = e.target.value
        setCartPhoto(value)
    }

    const newCartInpTxt = e =>
    {
        const value = e.target.value
        setCartInp(value)
    }

    const handleDragStart = (e,data) =>
    {
        place.current = data
        item.current = e.target
        document.documentElement.style.setProperty('--top', '75px')
        item.current.addEventListener('dragend',handleDragEnd)
    }

    const handleDragEnter = (newPlace) =>
    {      
            
        let newList = JSON.parse(JSON.stringify(props.state.Contacts.testContacts));
        const itemToMove = props.state.Contacts.testContacts[place.current.columnId][place.current.itemId]
        newList[place.current.columnId].splice(place.current.itemId, 1)
        newList[newPlace.columnId].splice(newPlace.itemId, 0, itemToMove)  
        place.current = newPlace
        props.setTestContacts(newList)
            
    }

    const handleDragEnd = () =>
    {
        item.current = null
        place.current = null
        document.documentElement.style.setProperty('--top', '132px')
        props.clearBasket()
        props.setUpdateTrue()
    }

    const addNewCart = () =>
    {
        setShowNew(true)
    }

    return (

        <div className='contactsChangeBody'>

            {(() =>
            {
                if (props.state.Contacts.needUpdate) {
                    return (
                        <div className='needUpdate'>
                            <div className='needUpdateTxt'>
                                Czy chcesz zaaktualizować kontakty na stronie?
                            </div>

                            <div className='needUpdateBtns'>


                                <button onClick={updateContactsOnPage} title='Aktuaizuje kontakty na stronie.' className='updateAccept'>
                                    Aktualizuj
                                </button>


                                <button onClick={updateContactsCancel} title='Przywraca stan kontaktów sprzed zmian.' className='updateCance'>
                                    Anuluj                                                          
                                </button>

                            </div>

                        </div>
                    )                    
                }
            })()}
            
            <div className='messageBody'>
                <div className='messageBodyTitle'>
                    Wiadomosci uzytkowników
                </div>

                    {props.state.Contacts.messages.map(x =>
                    {
                        const userNick = props.state.Users.list[x.authorId].nick
                        const userObject = props.state.Users.list[x.authorId]

                        return (
                            <div className='messageItem'>
                                    
                                <button data-id={x.messageId} onClick={openCloseMessage} className={x.openTxt ? "messageItemTopBtnOpen" : "messageItemTopBtnClose"} id={"openCloseBtn" + x.messageId}>
                                    <div>{x.date}</div>
                                                                   
                                    {(() =>
                                    {
                                        if (Object.keys(userObject).length === 1) {
                                            return(<div>Konto skasowane.</div>)
                                        } else {
                                            return(<div>{userNick}</div>)
                                        }
                                        
                                    })()}

                                    {(() =>
                                    {
                                        if (x.openTxt) {
                                            return(<img src="https://img.icons8.com/material-rounded/24/000000/collapse-arrow.png"/>)
                                        } else {
                                            return(<img src="https://img.icons8.com/material-rounded/24/000000/expand-arrow--v1.png"/>)
                                       }
                                    })()}

                                </button>
                                <div className={x.openTxt ? "itemDelAndEmailOpen" : "itemDelAndEmailClose"}>
                                    <div className={x.openTxt ? "messageItemEmailOpen" : "messageItemEmailClose"}>{x.email}</div>
                                    <button onClick={delMessage} data-id={x.messageId} id={"delMessageBtn" + x.messageId} className={x.openTxt ? "messageItemDelOpen" : "messageItemDelClose"}>Skasuj</button>
                                </div>

                                <div className={x.openTxt ? "itemTxtOpen" : "itemTxtClose"}>
                                    
                                    {(() =>
                                    {
                                        if (x.openTxt) {
                                          return(<div>{x.txt}</div>)
                                       } 
                                    })()}
                                                               
                                </div>

                            </div>
                    )
                })}

            </div>

            <div className='dndBody'>
                <div className='dndTitle'>Karty kontaktów</div>
                {props.state.Contacts.testContacts.map((column, columnId) =>
                    {
                        if (columnId === 0) {
                            return (
                                <div>
                                    <div className='delElement' onDragEnter={() => { handleDragEnter({ columnId, itemId: 0 })} }></div>
                                </div>
                            )
                        } else {
                            
                            return (
                                <div className='column'>
                                    {(() =>
                                    {
                                        if (showNew) {
                                            return (
                                                <div className='addNewDiv'>
                                                    <div className='addNewTitle'>Nowa karta kontaktu</div>
                                                    <div className='item'>
                                                        
                                                        {(() =>
                                                        {
                                                            if (cartPhoto !== '') {
                                                               return(<img className='itemPhoto' src={cartPhoto} />)
                                                            } 
                                                        })()}

                                                        <div className='itemTxt'> {cartInp}   </div>
                                                    </div>
                                                    <input className='newCartTxtInp' value={cartInp} onChange={newCartInpTxt} placeholder="Wpisz treść" />

                                                    <div className='newCartLogoTitle'>Dodaj logo:</div>
                                                    <div className='newCartLogoBtns'>
                                                        <div className='newCartBtns'>
                                                            <button id='newCartPhotoBtn1' data-link='email' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/material-outlined/24/000000/new-post.png"/>
                                                            </button>
                                                            <button id='newCartPhotoBtn2' data-link='phone' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/ios-filled/24/000000/phone.png"/>
                                                            </button>
                                                            <button id='newCartPhotoBtn3' data-link='facebook' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/fluency/24/000000/facebook-new.png"/>
                                                            </button>
                                                            <button id='newCartPhotoBtn4' data-link='youtube' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/color/24/000000/youtube-play.png"/>
                                                            </button>
                                                            <button id='newCartPhotoBtn5' data-link='instagram' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/color/24/000000/instagram-new--v1.png"/>
                                                            </button>
                                                            <button id='newCartPhotoBtn6' data-link='tiktok' onClick={newCartPhoto}>
                                                                <img src="https://img.icons8.com/color/24/000000/tiktok--v1.png"/>
                                                            </button>
                                                        </div>
                                                        <div className='newCartUrl'>
                                                            <img src="https://img.icons8.com/ios-filled/20/000000/link--v1.png"/>
                                                            <input onChange={changeUrl} />
                                                        </div>
                                                        <div className='newCartAcceptCancel'>
                                                            <button onClick={addNewCartToList} className='newCartAcceptBtn'>Akceptuj</button>
                                                            <button onClick={resetNewCart} className='newCartCancelBtn'>Anuluj</button>
                                                        </div>


                                                    </div>
                                                    
                                                </div>)
                                        } else {
                                            return(<button onClick={addNewCart} className='addNewBtn'>Dodaj kontakt</button>)
                                        }
                                        
                                    })()}

                                    {column.map((item, itemId) =>
                                    {  
                                        return (
                                            <div
                                                draggable
                                                className='item'
                                                key={"column" + columnId + "item" + itemId}
                                                id={"column" + columnId + "item" + itemId}
                                                onDragStart={(e) => { handleDragStart(e, { columnId, itemId }) }}
                                                onDragEnter={() => { handleDragEnter({ columnId, itemId }) }}
                                            >
                                                {(() =>
                                                {
                                                    if (item.photo !== '') {
                                                        return(<img className='itemPhoto' src={item.photo} />)                                                         
                                                    } 
                                                })()}

                                                <div className='itemTxt'> {item.txt}   </div>
                                                
                                            </div>         
                                        )
                                    })}
                            </div>)
                        }     
                    }
                )}                
            </div>

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactChange)