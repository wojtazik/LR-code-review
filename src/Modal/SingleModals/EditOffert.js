import './EditOffert.css'
import React from "react";
import { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";

const EditOffert = (props) =>
{
    const [photo, setPhoto] = useState("")
    const [title,setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [value, setValue] = useState(0)
    const [cat, setCat] = useState("")
    const [oldCat, setOldCat] = useState("")

    const id = props.state.ModalReducer.id
    const item = props.state.StuffReducer.List[id]

    const editAccept = () =>
    {
        const obj = {}
        Object.assign(obj, item)
        obj.image=photo
        obj.title = title
        obj.description = desc
        obj.price = price
        obj.value = value
        obj.category = cat

        props.changeStuff(obj)
   
        const usedCat = props.state.StuffReducer.CatFromStuffs

        if (usedCat.indexOf(cat) < 0) {     //====dodaje nowa kat do uzywanych jesli nigdy nie byla uzyta
            props.addCatFromStuffs(cat)
        }

        const allUsedCat = props.state.StuffReducer.List.map(x =>{return x.category})
        
        let itemCatValue = 0           //============ sprawdza ile razy uzyta kategoria wystepuje

        allUsedCat.map(x =>
        {
            if (x === oldCat) {
                itemCatValue ++
            }
        })

        if (itemCatValue === 1 && cat !== oldCat) { //==== kasuje kat z uzywanych jesli nigdzie jej nie uzywam
            props.deleteCatFromStuffs(oldCat)
        }

        props.modalReset()
    }



    const photoChange = e =>
    {
        setPhoto(e.target.value)
    }

    const titleChange = e =>
    {
        setTitle(e.target.value)
    }

    const descChange = e =>
    {
        setDesc(e.target.value)
    }

    const priceChange = e =>
    {
        setPrice(e.target.value*100)
    }

    const valueChange = e =>
    {
        const value = parseFloat(e.target.value)
        const reg = /\d/

        if (reg.test(value) && value > 0) { 
            setValue(value)
        } else {
            setValue(0)
        }
    }

    const catChange = e =>
    {
        const catId = e.target.id
        setCat(props.state.StuffReducer.Categories[catId])
    }



    useEffect(() =>
    {
        if (desc.length === 0) {
            document.documentElement.style.setProperty("--descBorder", "var(--infoColorRed)");    
        } else {
            document.documentElement.style.setProperty("--descBorder", "var(--infoColorGreen)"); 
        }

        if (title.length === 0) {
            document.documentElement.style.setProperty("--titleBorder", "var(--infoColorRed)");    
        } else {
            document.documentElement.style.setProperty("--titleBorder", "var(--infoColorGreen)"); 
        }

        if (photo.length === 0) {
            document.documentElement.style.setProperty("--imgLinkBorder", "var(--infoColorRed)");    
        } else {
            document.documentElement.style.setProperty("--imgLinkBorder", "var(--infoColorGreen)"); 
        }
    })

    useEffect(() =>
    {
        setPhoto(item.image)
        setTitle(item.title)
        setDesc(item.description)
        setPrice(item.price)
        setValue(item.value)
        setCat(item.category)
        setOldCat(item.category)
    },[])

    const cancel = () =>
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
        <div className='bodyEditOffert'>
            <div className='editOffTop'>
                <h2>Zmień oferte</h2>
            </div>
            <img src={photo} alt="" />
            <div className='editPhoto'>
                <div>Link do zdjecia</div>
                <input onChange={photoChange} value={photo}></input>
            </div>
            <div className='editTitle'>
                <h5>Tytuł</h5>
                <textarea maxLength="100" onChange={titleChange} type="text" value={title} />
                <div>{title.length}/100</div>
            </div>
            <div className='editDesc'>
                <h5>Opis</h5>
                <textarea maxLength="800"  onChange={descChange} type="text" value={desc}/>
                <div>{desc.length}/800</div>
            </div>
            <div className='editCatList'>

                <div className="catSetEdit">
                    <button className="catSetBtnEdit" >Zmień kategorie</button>
                    <div className="catSetMenuEdit">
                      
                        {props.state.StuffReducer.Categories.map((x,id) =>
                        {
                            return (
                                <button data-cat={x} id={id} onClick={catChange}  >{x}</button>
                            )
                            })}
                    </div>
                </div>
                

                <div>
                    <h5>Kategoria:</h5>
                    <div>{cat}</div>
                </div>
            </div>



            <div className='editPrice'>
                <div>Cena</div>
                <input type="number" min="0.01" value={price/100} onChange={priceChange}></input>
            </div>
            <div className='editValue'>
                <div>Ilość</div>
                <input onChange={valueChange} value={value}></input>
            </div>
            <button className='editBtnAccept'>Akceptuj</button>
            {(() =>
            {
                if (price>=1&&Number.isInteger(value)&&title!==""&&desc!=="") {
                   return(<button className='editBtnAccept' onClick={editAccept}>Akceptuj</button>)
                } else {
                   return(<button className='editBtnAcceptOff' title="Uzupełnij wszystkie pola">Akceptuj</button>)
                }
            })()}
            <button className='editBtnCancel' onClick={cancel}>Anuluj</button>
        </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(EditOffert)