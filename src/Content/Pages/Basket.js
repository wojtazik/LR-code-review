import React from "react"
import { useState,useEffect } from "react";

import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";
import "./Basket.css"


const Basket = (props) =>
{

    const [advertisement,setAdvertisement] = useState([])
    const [toPay, setToPay] = useState()
    const [itemsListArr,setItemsListArr] = useState([])

    const user = props.state.Users.list[props.state.Users.logged]


    const showAdvertisementDetails = (e) =>
    {
        const article = document.getElementById(e.currentTarget.id);
        const id = Number(article.dataset.id)  
        props.modalSet('modalDetails',id)
    }

    const canBuyThisValue = () =>
    {
        const cantBuyThis = []

        user.basket.items.map(x =>
        {
            const itemFromStorage = props.state.StuffReducer.List[x.itemId]

            if (itemFromStorage.value<x.value) {
                cantBuyThis.push({ itemId: x.itemId, needValue: x.value, haveValue: itemFromStorage.value })
            }
        })

        if (cantBuyThis.length === 0) {
            subtractQuantities()
            return true
        } else {
            props.modalSet("cantBuy",null,cantBuyThis)
            return false
        }
        
    }

    const subtractQuantities = () =>
    {
        const basket = user.basket.items
        

        basket.map(x =>
        {
            const valueToSubtract = x.value
            const currentValue = props.state.StuffReducer.List[x.itemId].value
            const newValue = currentValue - valueToSubtract
            props.changeValue(x.itemId,newValue)
        })
    }

    const payBtn = () =>
    {
        const now = new Date()
        const time = now.toLocaleString('pl')

        if (canBuyThisValue()) {
            props.modalSet('afterBuy')
            props.accHistoryAdd(user.id,time,toPay)
            props.accBasketReset(user.id)            
            
        } else {

        }
    }


    const titleClick = e =>
    {
        const attribute = document.getElementById(e.currentTarget.id)
        const itemId = Number(attribute.dataset.itemid) 
        props.modalSet('modalDetails',itemId)
    }

    const changeInpValue = (e) =>
    {
        const attribute = document.getElementById(e.currentTarget.id)
        const itemId = Number(attribute.dataset.itemid) 
        const value = Number(e.target.value)
        const reg = /\d/
  
        if (reg.test(value) && value > 0) { 
            props.accBasketValue(itemId, user.id, value)

        } else {
            props.accBasketValue(itemId,user.id,1)
        }
    }


    const addValue = (e) =>
    {
        const attribute = document.getElementById(e.currentTarget.id)
        const itemId = Number(attribute.dataset.itemid)   
        props.accBasketAdd(itemId, user.id)
    }

    const minValue = (e) =>
    {
        const attribute = document.getElementById(e.currentTarget.id)
        const itemId = Number(attribute.dataset.itemid)   
        props.accBasketMin(itemId, user.id)
    }


    const delItemBtn = (e) =>
    {
        const attribute = document.getElementById(e.currentTarget.id)
        const delItemId = attribute.dataset.itemid

        props.accBasketDelItem(Number(delItemId),user.id)
    }

    const resetBasket = () =>
    {
        props.accBasketReset(user.id)
    }
  
    useEffect(() =>
    {

        if (props.state.StuffReducer.ApiListAdd === true && advertisement.length <= 2) {
            
            const list = props.state.StuffReducer.List.filter((x) =>
            {
                if (Object.keys(x).length > 1) {
                    return x
                }
            })
            
            const numbers = []
            let i = 0

            do {
                const randomNumber = Math.floor(Math.random() * (list.length - 0))
                if (numbers.indexOf(randomNumber) < 0) {
                    numbers.push(randomNumber)
                    i++
                }
            }while(i<=2)
            
            const newArr = []

            numbers.map(x =>
            {
                newArr.push({ img:list[x].image,id:x })
            })

            setAdvertisement(newArr)
        }       
        
    })

    useEffect(() =>
    {

        if (props.state.StuffReducer.ApiListAdd === true) {
            let price = 0

            itemsListArr.map((x) =>
            {
                const item = props.state.StuffReducer.List[x.itemId]
                const itemPrice = item.price
                const itemValue = x.value

                price=price+(itemPrice*itemValue)
            })

            setToPay(price)            

        }       
    })

    useEffect(() =>
    {
        if (props.state.Users.logged>=0) {
            setItemsListArr(user.basket.items)
      }
    })


    return (<div>
        {(() =>
        {
            if (props.state.StuffReducer.ApiListAdd === true && props.state.StuffReducer.ApiCatAdd === true) {
                
                if (itemsListArr.length > 0) {

                    return (
                        <div className="basketPage">
                           
                            <div className="advertisement">

                                <h4>Reklama</h4>

                                {advertisement.map(x =>
                                {
                                    return (
                                    <button data-id={x.id} id={"advertisement" + x.id}  onClick={showAdvertisementDetails}>
                                        <img src={x.img}></img>
                                    </button>  
                                    )
                                })}
                   
                            </div>

                            <div className="basketPart">
                                <div className="clearBtn">
                                    <button onClick={resetBasket}>Wyczysc koszyk</button>
                                </div>


                                {
                                itemsListArr.map(x =>{
                                    const itemObj = props.state.StuffReducer.List[x.itemId]
                                    const value = x.value
                                    return (
                                        <div className="singleItem">
                                            <button className="photoBtn" id={itemObj.id + "title"} data-itemid={itemObj.id} onClick={titleClick}>
                                                <img className="itemPhoto" src={itemObj.image}/>
                                            </button>
                                            <div className="itemTitle">{itemObj.title}</div>
                                            <div className="itemPrice">{(itemObj.price/100).toFixed(2)} zł/szt</div>
                                            <div className="itemValue">
                                            <input id={itemObj.id + "value"} data-itemid={itemObj.id} value={value} onChange={changeInpValue} />
                                            <button className="addBtn" id={itemObj.id + "addBtn"} data-itemid={itemObj.id} onClick={addValue}>
                                                <img alt="" src="https://img.icons8.com/external-those-icons-fill-those-icons/20/000000/external-up-arrows-those-icons-fill-those-icons-6.png"/>        
                                            </button>
                                            <button className="minBtn" id={itemObj.id + "minBtn"} data-itemid={itemObj.id} onClick={minValue}>
                                                <img alt="" src="https://img.icons8.com/external-those-icons-fill-those-icons/20/000000/external-down-arrows-those-icons-fill-those-icons-7.png"/>       
                                            </button> 
                                            </div>
                                            <div className="itemSumPrice">{(itemObj.price*value/100).toFixed(2)} zł</div>
                                            <button className="itemDel" onClick={delItemBtn} data-itemid={itemObj.id} id={itemObj.id + "delItemBtn"}>
                                                <img alt="" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" />
                                            </button>
                                        </div>                                            
                                    )
                                })
                                }
                                
                                <div className="buyPart">
                                    <button onClick={payBtn}>Zaplac</button>
                                    <div>Do zapłaty: {(toPay / 100).toFixed(2)} zł</div>

                                </div>
                            </div>                             
                        </div>
                    )
                } else {
                    return(<div>brak itemow</div>)
                }
   

            } else {
                return (
                    <img className='loadingPage' src="https://i.stack.imgur.com/MEBIB.gif" alt=""></img>
                )
            }

        })()}
    </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket)