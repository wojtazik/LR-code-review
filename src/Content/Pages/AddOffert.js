import './AddOffert.css'

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../Redux/allReducers";

import React, { useEffect, useState } from "react";
    

const AddOffert = (props) =>
{
    const [newCatValue, setNewCatValue] = useState("")
    const [sortCat, setSortCat] = useState("wszystkie")
    

    
    const deleteOffert = (e) =>
    {
        const id = e.currentTarget.id
        const attribute = document.getElementById(id)
        const dataModal = attribute.dataset.del
        const dataId = attribute.dataset.id
        props.modalSet(dataModal, dataId)
    }

    const addNewOffert = () =>
    {
        props.modalSet("addNew")
    }

    const editOffert = (e) =>
    {
        const id = e.currentTarget.id
        const attribute = document.getElementById(id)
        const dataModal = attribute.dataset.modal
        const dataId = attribute.dataset.id
        props.modalSet(dataModal, dataId)
    }


    const showDetails = (e) =>
    {   // ------------------------- ModalSet - Details(btn)
        const id = e.currentTarget.id
        const attribute = document.getElementById(id)
        const dataModal = attribute.dataset.modal
        const dataId = attribute.dataset.id
        props.modalSet(dataModal, dataId)
    }

    const DelCat = (e) =>
    {
        const id = e.currentTarget.id
        const attrib = document.getElementById(id)
        const dataId = attrib.dataset.id
        const name = props.state.StuffReducer.Categories[dataId]
        
        props.deleteCategory(name)

        if (props.state.StuffReducer.Categories[dataId] === sortCat) {
            setSortCat("wszystkie")
        }
    }

    const InputCat = (e) =>
    {
        setNewCatValue(e.target.value)
    }


    const addNewCat = () =>
    {
        props.addCategory(newCatValue)
        setNewCatValue("")
    }

    const changeCatName = (e) =>
    {
        const id = e.currentTarget.id
        const attrib = document.getElementById(id)
        const dataId = attrib.dataset.id
        props.modalSet('ChangeCatName',dataId)
    }
    
    const page = (e) =>
    {
        const article = document.getElementById(e.currentTarget.id);
        setSortCat(article.dataset.cat)
    }

    return (
        <div>
            {(() =>
            {   
                if (props.state.StuffReducer.ApiListAdd === true && props.state.StuffReducer.ApiCatAdd === true) {

                    return (
                        <div className="bodyAddChange">
                            <div className="categoriesPart" >
                                <div className='addNewCategories'>
                                    <input maxLength="15" value={newCatValue} onChange={InputCat}></input>
                                    <div className='namelength'>{newCatValue.length}/15</div>
                                </div>

                                {(() =>
                                {
                                    if (newCatValue.length >= 1) {
                                        if (props.state.StuffReducer.Categories.indexOf(newCatValue)<0) {
                                            return(<button onClick={addNewCat} className='addNewCatBtn'>Dodaj nowa kategorie</button>)
                                        } else {
                                            return(<button title="Taka kategoria istnieje!" className='addNewCatBtnGrey'>Dodaj nowa kategorie</button>)
                                        }  
                                    } else {
                                        return(<button title="Wprowadz nazwe kategorii" className='addNewCatBtnGrey'>Dodaj nowa kategorie</button>)
                                    } 
                                 
                                })()}

                                <div>
                                    {props.state.StuffReducer.Categories.map((x, id) =>
                                    {
                                        return (
                                            <div className='singleCat'>
                                                <div className='singleCatName'>{x}</div>
                                                <button data-id={id} id={x} onClick={changeCatName} className='singleCatRenameBtn'>Zmień nazwę</button>
                                                
                                                {(() =>
                                                {
                                                    if (props.state.StuffReducer.CatFromStuffs.indexOf(x) < 0) {
                                                        return (
                                                            <button data-id={id} onClick={DelCat} id={x} className='singleCatDelBtn'>Skasuj</button>
                                                        )
                                                    } else {
                                                        return (
                                                            <button title="Nie można skasować kategorii z produktami" id={x} className='singleCatDelBtnGrey'>Skasuj</button>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>


                            <div className="offertsPart">


                                <div className="catSet">
                                    <button className="catSetBtn">Kategorie - {sortCat}</button>
                                    <div className="catSetMenu">
                                        <button data-cat="wszystkie" id={"wszystkie" + "changeSetBtn"} onClick={page} >wszystkie</button>
                                        {props.state.StuffReducer.Categories.map(x =>
                                        {
                                            return (
                                                <button data-cat={x} id={x + "changeSetBtn"} onClick={page} > {x} </button>
                                            )
                                            })}
                                    </div>
                                </div>


                                <div className='addNew'>
                                    <button onClick={addNewOffert}>Dodaj produkt</button>
                                </div>

                                {props.state.StuffReducer.List.map( x =>
                                {
                                    if (Object.keys(x).length > 1 && sortCat==="wszystkie") {
                                        return (
                                            <div className='singleStuffCard'>
                                                {(() =>
                                                {
                                                    if (x.value === 0) {
                                                        return(<div className='valueColor0'></div>)
                                                    } else if (x.value<=100) {
                                                        return(<div className='valueColorLow'></div>)
                                                    } else if (x.value < 200) {
                                                        return(<div className='valueColorMid'></div>)
                                                    } else {
                                                        return(<div className='valueColorHigh'></div>)
                                                    }
                                                })()}
                                                <img src={x.image} />
                                                <div className='cardTitle'>{x.title}</div>
                                                <div className='infoDiv'>
                                                    <div className='infoCat'>
                                                        <h5>Kategoria</h5>
                                                        <div>{x.category}</div>
                                                    </div>  
                                                    <div className='infoPrice'>
                                                        <h5>Cena</h5>
                                                        <div>{(x.price/100).toFixed(2)} PLN</div>
                                                    </div>  
                                                    <div className='infoValue'>
                                                        <h5>Zapas</h5>
                                                        <div>{x.value} szt</div>
                                                    </div>  
                                                    <button
                                                        data-modal="modalDetails"
                                                        data-id={x.id}
                                                        id={x.id+"detailsOffertBtn"}
                                                        onClick={showDetails}
                                                        className='detailsBtn'>
                                                        Szczegóły
                                                    </button>

                                                    <button data-modal="EditOffert" data-id={x.id} id={x.id + "changeOffBtn"} className='changeBtn' onClick={editOffert}>Zmień</button>
                                                    
                                                    <button className='delBtn' data-del="DelOffert" data-id={x.id} id={x.id + "DelOffBtn"} onClick={deleteOffert}>Skasuj</button>
                                                </div>
                                            </div>   
                                        )
                                    } else if (Object.keys(x).length > 1&&sortCat===x.category) {
                                        return (
                                            <div className='singleStuffCard'>
                                                {(() =>
                                                {
                                                    if (x.value === 0) {
                                                        return(<div className='valueColor0'></div>)
                                                    } else if (x.value<=100) {
                                                        return(<div className='valueColorLow'></div>)
                                                    } else if (x.value < 200) {
                                                        return(<div className='valueColorMid'></div>)
                                                    } else {
                                                        return(<div className='valueColorHigh'></div>)
                                                    }
                                                })()}
                                                <img src={x.image} />
                                                <div className='cardTitle'>{x.title}</div>
                                                <div className='infoDiv'>
                                                    <div className='infoCat'>
                                                        <h5>Kategoria</h5>
                                                        <div>{x.category}</div>
                                                    </div>  
                                                    <div className='infoPrice'>
                                                        <h5>Cena</h5>
                                                        <div>{(x.price/100).toFixed(2)} PLN</div>
                                                    </div>  
                                                    <div className='infoValue'>
                                                        <h5>Zapas</h5>
                                                        <div>{x.value} szt</div>
                                                    </div>  
                                                    <button
                                                        data-modal="modalDetails"
                                                        data-id={x.id}
                                                        id={x.id+"detailsOffertBtn"}
                                                        onClick={showDetails}
                                                        className='detailsBtn'>
                                                        Szczegóły
                                                    </button>

                                                    <button data-modal="EditOffert" data-id={x.id} id={x.id + "changeOffBtn"} className='changeBtn' onClick={editOffert}>Zmień</button>
                                                    
                                                    <button className='delBtn' data-del="DelOffert" data-id={x.id} id={x.id + "DelOffBtn"} onClick={deleteOffert}>Skasuj</button>
                                                </div>
                                            </div>   
                                        )
                                    }                                 
                                })}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <img className='loadingPage' src="https://i.stack.imgur.com/MEBIB.gif" alt=""></img>
                    )
                }
            })()}    
        </div>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(AddOffert)