import './Offert.css'


import React, { useEffect, useState } from "react"
import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../../Redux/allReducers";





const Ofert = (props) =>
{
    const [listToRender, setListToRender] = useState([])
    const [categoriesToRender, setCategoriesToRender] = useState([])

    const [render,setRender] = useState(false)

    const [categories, setCategories] = useState([])

    const [minPrice,setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [minPriceRen,setMinPriceRen] = useState("")
    const [maxPriceRen, setMaxPriceRen] = useState("")
    
    const [priceFilterInfo, setPriceFilterInfo] = useState("")

     const account = props.state.Users.list[props.state.Users.logged]
    


    const addToBasket = (e) =>
    {
        if (props.state.Users.logged === undefined) {
            props.modalSet("login")
        } else {
            const itemId = Number(e.target.id)
            const userId = props.state.Users.logged
            props.accBasketAdd(itemId,userId)            
        }
    }


    const showDetails = (e) =>
    {   // ------------------------- ModalSet - Details(btn)
        const id = e.currentTarget.id
        const attribute = document.getElementById(id)
        const modalName = attribute.dataset.modal
        props.modalSet(modalName, id)
    }

    const sortSet = (e) =>
    {
        const id = e.currentTarget.id

        const aToZ = ( a, b ) =>{
            if ( a.title.toUpperCase() < b.title.toUpperCase() ){
            return -1;
            }
            if ( a.title.toUpperCase() > b.title.toUpperCase() ){
            return 1;
            }
            return 0;
            
        }
        const zToA = ( a, b ) =>{
            if ( a.title.toUpperCase() > b.title.toUpperCase() ){
            return -1;
            }
            if ( a.title.toUpperCase() < b.title.toUpperCase() ){
            return 1;
            }
        return 0;
        }

        const from1To9 = ( a, b ) =>{
            if ( a.price < b.price ){
            return -1;
            }
            if ( a.price > b.price ){
            return 1;
            }
        return 0;
        }

        const from9To1 = ( a, b ) =>{
            if ( a.price > b.price ){
            return -1;
            }
            if ( a.price < b.price ){
            return 1;
            }
        return 0;
        }

        if (id === "aToZ") {
            const newArr = []
            Object.assign(newArr, listToRender)
            newArr.sort(aToZ)
            setListToRender(newArr)

        } else if (id === "zToA") {
            const newArr = []
            Object.assign(newArr, listToRender)
            newArr.sort(zToA)
            setListToRender(newArr)
            
        } else if (id==="1To9") {
            const newArr = []
            Object.assign(newArr, listToRender)
            newArr.sort(from1To9)
            setListToRender(newArr)
        } else {
            const newArr = []
            Object.assign(newArr, listToRender)
            newArr.sort(from9To1)
            setListToRender(newArr)
        }
    }

    const addCategoryToFilter = (e) =>
    {   //-------------------------dodaje kategorie do filtrowania - btn
        const id = e.target.id
        if (categories.indexOf(id) < 0) {
            setCategories([...categories,id])
        } else {
            const arrPlace = categories.indexOf(id)
            const newArr = []
            Object.assign(newArr, categories)
            newArr.splice(arrPlace, 1)
            setCategories(newArr)
        }
    }

    
    const filterPrice = (x) =>
    {   

        let min = minPrice 
        let max = maxPrice 

        if (minPrice!==0&&maxPrice===0) {
            if (x.price >= min) {
                return x
            }
        }else if (minPrice === 0 && maxPrice !== 0) {
            if (x.price <= max) {
                return x
            }
        }else if (minPrice !== 0 && maxPrice !== 0) {
            if (x.price >= min && x.price <= max) {
                return x
            }
        } else {
            return x
        }
    }

    const priceChangeMin = (eve) =>
    {
        const value = eve.target.value
        const tester = /^[0-9]*$/
        const numArr = ["01","02","03","04","05","06","07","08","09","00"]

        if (tester.test(value)&&numArr.indexOf(value)<0) {
            setMinPriceRen(value)
            setMinPrice(Math.floor(value)*100)

        }
    }
    
    const priceChangeMax = (eve) =>
    {
        const value = eve.target.value
        const tester = /^[0-9]*$/
        const numArr = ["01","02","03","04","05","06","07","08","09","00"]

        if (tester.test(value)&&numArr.indexOf(value)<0){
            setMaxPriceRen(value)
            setMaxPrice(Math.floor(value)*100)
        }
    }

  

    useEffect(() =>
    // ========================= bledy w polu kwota
    {
        if (parseInt(maxPriceRen,10) < parseInt(minPriceRen,10)) {
            setPriceFilterInfo("Wprowadz poprawne wartości")
        } else {
            setPriceFilterInfo("")
        }
    }, [maxPriceRen, minPriceRen])
    
    useEffect(() =>
    {
        // ------------------------ tutaj sprawdza wszystkie filtry i tworzy liste do renderowania
        const arrPriceFilter = props.state.StuffReducer.List.filter(x =>
        {
            if (Object.keys(x).length > 1) {      //======sprawdza czy produkt nie jest skasowany (tylko id w {})

                return filterPrice(x)
            }

            return null
        })

        const arrStuffsAfterFilters = []
        arrPriceFilter.map((x) =>
        {
            if (categories.length === 0) {
                arrStuffsAfterFilters.push(x)
            } else if(categories.indexOf(x.category)>=0) {
                arrStuffsAfterFilters.push(x)
            }
            return null
        })

        setListToRender(arrStuffsAfterFilters)

    },[minPriceRen,maxPriceRen,categories])
    
    useEffect(() =>   
    {
        // tworzy czysta mape rzeczy do renderowania przy pierwszym uruchomieniu
        const newArr = []
        props.state.StuffReducer.List.map(x =>
        {   if(Object.keys(x).length > 1)
            newArr.push(x)
            return null
        })
        setListToRender(newArr)
    },[render])

    useEffect(() =>
    // ---------- tworzy state z kategoriami do renderowania
    {
        props.state.StuffReducer.Categories.map((x) =>
        {
            const stuffListCat = []
            props.state.StuffReducer.List.map(x =>
            {
                stuffListCat.push(x.category)
                return null
            })
            
            const CategoriesFromStuffList = []
            props.state.StuffReducer.Categories.map((x, id) =>
            {
                if (stuffListCat.indexOf(x) >= 0) {
                    CategoriesFromStuffList.push(x)
                    return null
                }
                return null
            })
            setCategoriesToRender(CategoriesFromStuffList)
            return null
        })
    },[render])

    useEffect(() =>
    {
        // ------------------------reload page after add Api
        if (props.state.StuffReducer.ApiListAdd === true&&props.state.StuffReducer.ApiCatAdd===true) {
            setRender(true)
        }
    })

    return (
        <div>
            {(() =>
            {
                if (props.state.StuffReducer.ApiListAdd === false || props.state.StuffReducer.ApiCatAdd===false) {
                    return (<img className='loadingPage' src="https://i.stack.imgur.com/MEBIB.gif" alt=""></img>)
                    
                } else {
                
                    return (
                        <div className='bodyOffert'>
                            
                            <div className='menu'>
                               
                                        <div>
                                            <h4>Filtry</h4>
                                            <div className='typeCategory'>
                                                
                                                {categoriesToRender.map((x, id) =>
                                                    {
                                                        return (
                                                            <div className='singleCategory' key={id}>
                                                                <div>{x}</div>
                                                                <input id={x} onChange={addCategoryToFilter} type="checkbox" />
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                <h4>Cena</h4>
                                <div className='priceCategory'>
                                    <input min="0" value={minPriceRen} id="minPrice" placeholder="Od" onChange={priceChangeMin} />
                                    -
                                    <input  min="0" value={maxPriceRen} id="maxPrice" placeholder="Do" onChange={priceChangeMax} />
                                </div>
                                <div className='priceCategoryInfo'>{priceFilterInfo}</div>
                            </div>
                
                            <div>
                                        <div className='offertPart'>
                                            <div className='sortPart'>
                                                <button id="aToZ" onClick={sortSet}>
                                                <img src="https://img.icons8.com/windows/20/000000/alphabetical-sorting.png" alt=""/>
                                                </button>
                                                <button id="zToA" onClick={sortSet}>
                                                <img src="https://img.icons8.com/windows/20/000000/alphabetical-sorting-2.png" alt=""/>
                                                </button>
                                                <button id="1To9" onClick={sortSet}>
                                                <img src="https://img.icons8.com/ios-filled/20/000000/positive-dynamic.png" alt=""/>
                                                </button>
                                                <button id="9To1" onClick={sortSet}>
                                                <img src="https://img.icons8.com/ios-filled/20/000000/negative-dynamic.png" alt=""/>
                                                </button>
                                            </div>
                                            {listToRender.map((x, id) =>
                                                {
                                                        return (
                                                            <div className='offertCard' key={id}>
                                                                <div className='imageCard'>
                                                                    <img src={x.image} alt=""></img>
                                                                </div>

                                                                <div className='ratingOffertCard'>
                                                                    <div>Ocena użytkowników:</div>
                                                                    {(() =>
                                                                    {
                                                                        if (x.rating.voices === 0) {
                                                                            return(<div className='ratingOffertCardvalue'>Brak oceny</div>)
                                                                            
                                                                        } else {
                                                                            return(<div className='ratingOffertCardvalue'>{(x.rating.ratingSum/x.rating.voices).toFixed(1)}/5</div>)
                                                                        }
                                                                    })()}
                                                                </div>

                                                                <div className='yourRatingOffertCard'>
                                                                    {(() =>
                                                                    {
                                                                        if (props.state.Users.logged >= 0) {

                                                                            if (account.rating.findIndex(el => el.itemId === x.id) >= 0) {

                                                                                let index = account.rating.findIndex(el => el.itemId === x.id)

                                                                                return (<div>
                                                                                    <div>Twoja ocena:</div>
                                                                                    <div>{account.rating[index].rating}</div>
                                                                                    </div>)
                                                                            } else {
                                                                                return(<div>Brak twojej oceny</div>)
                                                                            }
                                                                                
                                                                        } else {
                                                                            return(<div>Nie jesteś zalogowany</div>)
                                                                        }
                                                                    })()}
                                                                </div>            

                                                                {(() =>
                                                                {
                                                        
                                                                    if (x.value === 0) {
                                                                        return(<div className='valueInfo0'>Produkt niedostepny</div>)
                                                                    } else if (x.value<=100) {
                                                                        return(<div className='valueInfoLittle'>Ostatnie sztuki</div>)
                                                                    } else if (x.value < 200) {
                                                                        return(<div className='valueInfoAverage'>Średni zapas</div>)
                                                                    } else {
                                                                        return(<div className='valueInfoHigh'>Duży zapas</div>)
                                                                    }
                                                                })()}
                                                                
                                                                <h3 className='titleOffertCard'>{x.title}</h3>
                                                                <h5 className='priceOffertCard'>Cena: {(x.price/100).toFixed(2)} PLN</h5>
                                                                <button className='btnDetails' data-modal="modalDetails" id={x.id} onClick={showDetails}>Szczegoły oferty</button>

                                                                {(() =>
                                                                {
                                                                    if (x.value > 0) {
                                                                        return (
                                                                            <button className='btnAddToBasketOn' id={x.id} onClick={addToBasket}>
                                                                                Dodaj do koszyka
                                                                            </button>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <button className='btnAddToBasketOff'>
                                                                                Dodaj do koszyka
                                                                            </button>
                                                                        )
                                                                    }
                                                                })()}
                                                       
                                                            </div>
                                                        )                                                  
                                                }
                                            )}
                                        </div>

                            </div>                               
                        </div>
                    )
                }
            })()}
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Ofert)


