import './DelAcc.css'
import React, { useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const DeleteAcc = (props) =>
{
    const delAcc = () =>
    {
        props.accDelete(props.state.ModalReducer.id)
        if (props.state.ModalReducer.id===props.state.Users.logged) {
            props.loggedReset()
        }
        props.modalReset()
    }

    window.document.onkeydown = function (eve)
    {
        const key = eve.key
        if (key === "Enter") {

        } else if (key === "Escape") {
            cancel()
        }
    }

    const cancel = () =>
    {
        props.modalReset()
    }

    return (
        <div className='delAccBody' >
            <h3>Czy napewno chcesz usunac konto?</h3>
            <div className="btnsDiv">
                <button className="saveBtn" onClick={delAcc} >Skasuj</button>
                <button className="cancelBtn" onClick={cancel}>Anuluj</button>
            </div>
        </div>
        
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteAcc)