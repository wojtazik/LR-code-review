import './Ussers.css'
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';

import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const Ussers = (props) =>
{

    const [info,setInfo] = useState(false)

    const usersArr = props.state.Users.list
    const adminsArr = props.state.Users.adminsId
    const loggedId = props.state.Users.logged




    const GiveAdmin = (e) =>
    {
        const btnId = e.currentTarget.id
        const attribute = document.getElementById(btnId)
        const userId = Number(attribute.dataset.userid)

        if (userId===loggedId) {
            setInfo(true)
            setTimeout(function(){setInfo(false)},3000)
        } else {
            if (adminsArr.indexOf(userId) >= 0) {
                props.adminIdDel(userId)
            } else {
                props.adminIdAdd(userId)
            }            
        }
    }

    const delAcc = (e) =>
    {
        const btnId = e.currentTarget.id
        const attribute = document.getElementById(btnId)
        const userId = Number(attribute.dataset.userid)

        console.log(userId)
        if (userId===loggedId) {
            setInfo(true)
            setTimeout(function(){setInfo(false)},3000)
        } else {
            props.modalSet("DelAcc",userId)
        } 
    }

    return (<div>
        {(() =>
        {
            
            return (<div className='usersBody'>
                <h3 className='titleUsers'>Lista użytkowników</h3>

                {(() =>
                {
                    if (info) {
                        return (<h4 className='infoTxt'>Nie można wprowadzić zmian w ustawieniach swojego konta</h4>)
                    }
                })()}
            
                <div className='userCardsPart'>
                    {
                        usersArr.map(x =>
                        {
                            if (Object.keys(x).length !== 1) {
                                return (
                                    <div className="singleUserCart">
                                        <div className='topCart'>
                                            <h5>ID konta - {x.id}</h5>
                                            <button onClick={delAcc} className='delBtnCart' data-userId={x.id} id={"userIdDel" + x.id}>Skasuj</button>
                                        </div>
                                        <div className='leftBox'>
                                            <h6>Nick - {x.nick}</h6>
                                            <h6>Haslo - {x.password}</h6>
                                        </div>
                                        <div className='rightBox'>
                                            <div>Uprawnienia administratora:</div>
                                            {(() =>
                                                {
                                                    if (adminsArr.indexOf(x.id)<0) {
                                                        return (
                                                            <div>
                                                                <button className="ramkabtnNo" data-userId={x.id} id={"giveAdminNo" + x.id} onClick={GiveAdmin}>
                                                                <div>Tak</div>
                                                                <div>Nie</div>
                                                                </button>
                                                            </div>
                                                        )
                                                    } else if (adminsArr.indexOf(x.id)>=0) {
                                                        return (
                                                            <div>
                                                                <button className="ramkabtnYes" data-userId={x.id} id={"giveAdminYes" + x.id} onClick={GiveAdmin}>
                                                                <div>Tak</div>
                                                                <div>Nie</div>
                                                                </button>                                              
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                        </div>                                        
                                    </div>
                                )
                            }
                        })
                    }
                </div>
           

            </div>)

            

        })()} 
    </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(Ussers)