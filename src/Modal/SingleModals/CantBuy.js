import './CantBuy.css'
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../../Redux/allReducers"
import React, { useEffect, useState } from "react"

const CantBuy = (props) =>
{
    const cantBuyThisItems = props.state.ModalReducer.arr

    const modalReset = () =>
    {
        props.modalReset()
    }

    const changeValueToMax = () =>
    {
        cantBuyThisItems.map(x =>
        {
            const currentlyMaxValueItem = props.state.StuffReducer.List[x.itemId].value
            const itemId = x.itemId
            const userId = props.state.Users.logged
            props.accBasketValue(itemId,userId,currentlyMaxValueItem)
        })
        props.modalReset()
    }

    window.document.onkeydown = function (eve)
    {
        const key = eve.key
        
        if (key === "Escape") {
            props.modalReset()
        }
    }

    return (
        <div className='cantBuyBody'>
            <h4>Zmień ilości tych produktów</h4>

            {(() =>
            {
                return (
                <div className='itemsss'>
                    <div className='cantBuyNeed'>Chcesz kupić:</div>
                    <div className='cantBuyHave'>Dostepne:</div>
                        {cantBuyThisItems.map(x =>
                        {
                       
                            const item = props.state.StuffReducer.List[x.itemId]
                            return (
                                <div className='cantBuySingleItem'>
                                    <img src={item.image} />
                                    <h5>{item.title}</h5>
                                    <div className='needValue'>{x.needValue} szt</div>
                                    <div>{x.haveValue} szt</div>
                                </div>)
                        })}                 
                </div>
                )

            })()}
            <div className='cantBuyBtns'>
                <button className='cantBuyOkBtn' onClick={modalReset}>Ok</button>
                <button className='cantBuyChangeBtn' onClick={changeValueToMax}>Zmień na dostepna wartość</button>
            </div>

        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(CantBuy)