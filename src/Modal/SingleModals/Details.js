
import './Details.css'
import React from "react";
import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";


const Details = (props) =>
{
    const id = Number(props.state.ModalReducer.id)
    const card = props.state.StuffReducer.List[id]
    

    const addToBasket = (e) =>
    {
        if (props.state.Users.logged === undefined) {
            props.modalSet("login")
        } else {
            const userId = props.state.Users.logged
            props.accBasketAdd(id,userId)            
        }
    }
    const CloseDetails = () =>
    {
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
     
        <div className='detailsPage'>
            <button className='detailsEscBtn' onClick={CloseDetails}>X</button>
            <div className='detailsPhoto'>
                <img src={card.image}/>
            </div>
            <div className='detailsTitle'>{card.title}</div>
            <div className='detailsDescription'>{card.description}</div>
            <div className='detailsPrice'>Cena : {(card.price/100).toFixed(2)} PLN</div>
            {(() =>
            {
                if (card.value === 0) {
                    return(<div className='valueInfo0'>Produkt niedostepny</div>)
                } else if (card.value<=10) {
                    return(<div className='valueInfoLittle'>Ostatnie sztuki</div>)
                } else if (card.value < 100) {
                    return(<div className='valueInfoAverage'>Średni zapas</div>)
                } else {
                    return(<div className='valueInfoHigh'>Duży zapas</div>)
                }
            })()}
            {(() =>
                {
                    if (card.value > 0) {
                        return (
                            <button onClick={addToBasket} className='detailsBuyBtnOn'>
                                Dodaj do koszyka
                            </button>
                        )
                    } else {
                        return (
                            <button className='detailsBuyBtnOff'>
                                Dodaj do koszyka
                            </button>
                        )
                    }
                })()}
        </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)