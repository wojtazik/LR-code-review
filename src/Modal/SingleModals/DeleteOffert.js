import './DeleteOffert.css'
import React, { useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const DeleteOffert = (props) =>
{
    const id = props.state.ModalReducer.id
    const title = props.state.StuffReducer.List[id].title
    const cat = props.state.StuffReducer.List[id].category

    const delItem = () =>
    {
        const allUsedCat = props.state.StuffReducer.List.map(x =>{return x.category})
        
        let itemCatValueDel = 0           //============ sprawdza ile razy uzyta kategoria wystepuje

        allUsedCat.map(x =>
        {
            if (x === cat) {
                itemCatValueDel ++
            }
        })        
        
        if (itemCatValueDel === 1) { //==== kasuje kat z uzywanych jesli nigdzie jej nie uzywam
            props.deleteCatFromStuffs(cat)
        }

        props.deleteStuff(id)
        props.accBasketDelOffert(Number(id))

        cancel()
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
        <div className='delOffertBody'>
            <h3>Czy chcesz skasować oferte:</h3>
            <h5>{title}</h5>
            <div>
                <button className='delItemBtn' onClick={delItem}>Skasuj</button>
                <button className='cancelItemBtn' onClick={cancel}>Anuluj</button>
            </div>
        </div>
        
        
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteOffert)