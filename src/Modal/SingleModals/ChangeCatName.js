import './ChangeCatName.css'
import React, { useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const ChangeCatName = (props) =>
{
    const [newName,setNewName] = useState("")

    const id = props.state.ModalReducer.id

    const newCatName = (e) =>
    {
        setNewName(e.target.value)
    }

    const changeName = () =>
    {   
        const oldCatName = props.state.StuffReducer.Categories[id]

        props.changeCategory(newName, oldCatName)
        props.changeCatFromStuffs(newName,oldCatName)

        props.modalReset()
    }

    window.document.onkeydown = function (eve)
    {
        const key = eve.key
        if (key === "Enter") {
        changeName()
        } else if (key === "Escape") {
            cancel()
        }
    }

    const cancel = () =>
    {
        props.modalReset()
    }

    return (
        <div className='changeNameBody'>
            <h2>Zmiana nazwy kategorii</h2>
            <div className='currentName'>
                <h4>Aktualna nazwa:</h4>
                <h5>{props.state.StuffReducer.Categories[id]}</h5>
            </div>
            <div className='newNameCatPart'>
                <h4>Wprowadz nowa nazwe</h4>
                <input maxLength="15" value={newName} onChange={newCatName}></input>
                <div>{newName.length}/15</div>

                {(() =>
                {
                    if (props.state.StuffReducer.Categories.includes(newName)) {
                        return (
                            <button title='Istnieje już taka kategoria' className='ChangeBtnGrey'>Zmień</button>
                        )
                    } else {
                        return (
                            <button onClick={changeName} className='ChangeBtn'>Zmień</button>
                        )
                        
                    }

                })()}

                

                <button id={id} onClick={cancel} className='CancelBtn'>Anuluj</button>
            </div>

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeCatName)