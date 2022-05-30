
import './Contact.css'

import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";



const Contact = (props) =>
{

    const [btnGreen, setBtnGreen] = useState(false)
    const [btnTitle,setBtnTitle] = useState('Uzupełnij wszystkie pola')
    const [areaTxt, setAreaTxt] = useState('')
    const [inpTxt,setInpTxt] = useState('')

    const resetInputs = () =>
    {
        setBtnGreen(false)
        setBtnTitle('Uzupełnij wszystkie pola')
        setAreaTxt('')
        setInpTxt('')
    }

    const sendMessage = () =>
    {   //{ messageId:0, authorId: 1, email:'', date: 0, txt: '',openTxt:false }

        const nextId = props.state.Contacts.messages.length

        const userId = props.state.Users.logged
        const now = new Date()
        const time = now.toLocaleString('pl')

        const message = {
            messageId: nextId,
            authorId: userId,
            email:inpTxt,
            date: time,
            txt: areaTxt,
            openTxt:false
        }
        props.addMessage(message)
        resetInputs()
    }

    const areaOnChange = e =>
    {
        const value = e.target.value
        setAreaTxt(value)
    }

    const inpOnChange = e =>
    {
        const value = e.target.value
        setInpTxt(value)
        checkEmail(value)
    }
    
    const checkEmail = (email) =>
    {

        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm

        if (reg.test(email)) {
            return true
        } else {
            return false
        }
    }

    useEffect(() =>
    {

        if (areaTxt === '' && checkEmail(inpTxt) === false) {
            setBtnTitle('Uzupełnij wszystkie pola')
            setBtnGreen(false)

        } else if (areaTxt===''&&checkEmail(inpTxt) === true) {
            setBtnTitle('Napisz treść wiadomości')
            setBtnGreen(false)

        } else if (areaTxt!==''&&checkEmail(inpTxt) === false) {
            setBtnTitle('Wprowadz poprawny adres e-mail')
            setBtnGreen(false)      

        } else {
            setBtnGreen(true)

        }

    },[areaTxt,inpTxt])


    return (
        <div className='contactsBody'>


            <div className='contactsContactsDiv'>

                {props.state.Contacts.contacts[1].map( (x,id) =>
                {
                    return (
                        <div className='contactsItem'>

                            {(() =>
                            {
                                if (x.photo !== '') {
                                    return(
                                    <img className='contactsItemPhoto' src={x.photo} />)                                                         
                                } 
                            })()}

                            <div className='contactsItemTxt'> {x.txt}   </div>                                                
                        </div>         
                    )                    
                })}

            </div>

            <div className='contactsMessageDiv'>
                
                <div className='messageTop'>
                    Napisz do nas wiadomość
                </div>

                <textarea value={areaTxt} onChange={areaOnChange} />
                  
                <div className='messageEmail'> Email: </div>

                <input value={inpTxt} onChange={inpOnChange}/>
        
                {(() =>
                {
                    if (btnGreen) {
                        return (<button className='messageBtnGreen' onClick={sendMessage}>Wyslij</button>) 
                    } else {          
                        return (<button title={btnTitle} className='messageBtnGrey'>Wyslij</button>)
                    }
                })()}
         
            </div>


        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Contact)