import './AddNew.css'
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../../Redux/allReducers"
import React, { useEffect, useState } from "react"



const AddNew = (props) =>
{
    const [photo, setPhoto] = useState("")
    const [title,setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [value, setValue] = useState(0)
    const [cat, setCat] = useState("")

    const addNew = () =>
    {
        const obj = {}
        obj.image = photo
        obj.title = title
        obj.description = desc
        obj.price = price
        obj.value = value
        obj.category = cat
        obj.rating = { rate: undefined, count: 0 }
        obj.id=props.state.StuffReducer.List.length
        
        props.addStuff(obj)

        const usedCat = props.state.StuffReducer.CatFromStuffs

        if (usedCat.indexOf(cat) < 0) {     //====dodaje nowa kat do uzywanych jesli nigdy nie byla uzyta
            props.addCatFromStuffs(cat)
        }
        
        cancel()
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

        if (cat.length === 0) {
            document.documentElement.style.setProperty("--catBorder", "var(--infoColorRed)");    
        } else {
            document.documentElement.style.setProperty("--catBorder", "var(--infoColorGreen)"); 
        }
    })
    
    return (
        <div className='bodyNewOffert'>
            <div className='newOffTop'>
                <h2>Nowy produkt</h2>
            </div>
            <img src={photo} alt="" />
            <div className='newPhoto'>
                <div>Link do zdjecia</div>
                <input onChange={photoChange} value={photo}></input>
            </div>
            <div className='newTitle'>
                <h5>Tytuł</h5>
                <textarea maxLength="100" onChange={titleChange} type="text" value={title} />
                <div>{title.length}/100</div>
            </div>
            <div className='newDesc'>
                <h5>Opis</h5>
                <textarea maxLength="800"  onChange={descChange} type="text" value={desc}/>
                <div>{desc.length}/800</div>
            </div>

            <div className='newCatList'>

                <div className="catSetNew">
                    <button className="catSetBtnNew" >Zmień kategorie</button>
                    <div className="catSetMenuNew">
                      
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


            <div className='newPrice'>
                <div>Cena</div>
                <input type="number" min="0.01" value={price/100} onChange={priceChange}></input>
            </div>
            <div className='newValue'>
                <div>Ilość</div>
                <input onChange={valueChange} value={value}></input>
            </div>
            <button className='newBtnAccept'>Akceptuj</button>

            {(() =>
            {
                if (price>=1&&Number.isInteger(value)&&title!==""&&desc!==""&&cat!=="") {
                   return(<button className='newBtnAccept' onClick={addNew} >Akceptuj</button>)
                } else {
                   return(<button className='newBtnAcceptOff' title="Uzupełnij wszystkie pola">Akceptuj</button>)
                }
            })()}

            <button className='newBtnCancel' onClick={cancel}>Anuluj</button>
        </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(AddNew)