import './ColorsSet.css'
import "../.././colors.css"

import React, { useEffect, useState } from "react";
import { SketchPicker } from 'react-color';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../Redux/allReducers";

const ColorsSet = (props) =>
{
    const [pickerColor, setPickerColor] = useState()
    const [catToSet, setCatToSet] = useState()
    const [colorToSet, setColorToSet] = useState()
    const [colorsChanged, setColorsChanged] = useState(false)
    
    const changeColor = (color) =>
    {
        setPickerColor(color)  

        changeColorInCss(color.hex)
        setColorsChanged(true)
    }

    const changeThis = e =>{
        const id = e.currentTarget.id
        const article = document.getElementById(id);
        setCatToSet(article.dataset.cat)
        setColorToSet(article.dataset.btn)

        pickerColorSet(article.dataset.cat,article.dataset.btn)
    }

    const pickerColorSet = (cat, btn) =>
    {
        if (cat === "Przyciski") {

            if (btn === "Akceptuj") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--btnGreenMin');
                setPickerColor(x)
            } else if (btn === "Anuluj") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--btnRedMin');
                setPickerColor(x)
            } else if (btn === "Zmień") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--btnBlueMin'); 
                setPickerColor(x)
            } else if (btn === "Nieaktywny") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--btnGreyMin'); 
                setPickerColor(x)
            } else if (btn === "Tło") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--btnWhiteMin')
                setPickerColor(x)
            }

        } else if (cat === "Ramki") {

            if (btn === "Główna") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--borderFirstMin')
                setPickerColor(x)
            } else if (btn === "Poboczna I") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--borderSecondMin')
                setPickerColor(x)
            } else if (btn === "Poboczna II") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--borderThirdMin')  
                setPickerColor(x)
            } else if (btn === "Karta") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--borderCardsMin')   
                setPickerColor(x)
            } else if (btn === "Modal") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--borderModalsMin')  
                setPickerColor(x)
            }

        } else if (cat === "Tła") {

            if (btn === "Główne") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--backgroundFirstMin') 
                setPickerColor(x)
            } else if (btn === "Poboczne I") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--backgroundSecondMin') 
                setPickerColor(x)
            } else if (btn === "Poboczne II") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--backgroundThirdMin')   
                setPickerColor(x)
            } else if (btn === "Karta") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--backgroundCardsMin')
                setPickerColor(x)
            } else if (btn === "Modal") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--backgroundModalsMin')
                setPickerColor(x)
            }            
        } else if (cat === "Kolory informacji") {

            if (btn === "Czerwony") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--infoColorRedMin')
                setPickerColor(x)
            } else if (btn === "Zółty") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--infoColorYellowMin')
                setPickerColor(x)
            } else if (btn === "Zielony") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGreenMin')
                setPickerColor(x)
            } else if (btn === "Szary") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGreyMin')
                setPickerColor(x)
            } else if (btn === "Czarny") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--infoColorBlackMin')
                setPickerColor(x)
            }            

        } else if (cat === "Różne") {

            if (btn === "Tło strony") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--appBackgroundColorMin')
                setPickerColor(x)
            } else if (btn === "Czcionka") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--appFontColorMin')
                setPickerColor(x)
            } else if (btn === "Ramka input") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtnMin')
                setPickerColor(x)
            } else if (btn === "Tło input") {
                const x = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtnBackgroundMin')
                setPickerColor(x)
            }          
        }     
    }


    const changeColorInCss = color =>
    { 
        if (catToSet === "Przyciski") {

            if (colorToSet === "Akceptuj") {
                document.documentElement.style.setProperty('--btnGreenMin', color);               
            } else if (colorToSet === "Anuluj") {
                document.documentElement.style.setProperty('--btnRedMin', color);
            } else if (colorToSet === "Zmień") {
                document.documentElement.style.setProperty('--btnBlueMin', color); 
            } else if (colorToSet === "Nieaktywny") {
                document.documentElement.style.setProperty('--btnGreyMin', color); 
            } else if (colorToSet === "Tło") {
                document.documentElement.style.setProperty('--btnWhiteMin', color); 
            }

        } else if (catToSet === "Ramki") {

            if (colorToSet === "Główna") {
                document.documentElement.style.setProperty('--borderFirstMin', color);
            } else if (colorToSet === "Poboczna I") {
                document.documentElement.style.setProperty('--borderSecondMin', color);
            } else if (colorToSet === "Poboczna II") {
                document.documentElement.style.setProperty('--borderThirdMin', color);                 
            } else if (colorToSet === "Karta") {
                document.documentElement.style.setProperty('--borderCardsMin', color);                 
            } else if (colorToSet === "Modal") {
                document.documentElement.style.setProperty('--borderModalsMin', color);                 
            }

        } else if (catToSet === "Tła") {

            if (colorToSet === "Główne") {
                document.documentElement.style.setProperty('--backgroundFirstMin', color);                 
            } else if (colorToSet === "Poboczne I") {
                document.documentElement.style.setProperty('--backgroundSecondMin', color);                 
            } else if (colorToSet === "Poboczne II") {
                document.documentElement.style.setProperty('--backgroundThirdMin', color);                 
            } else if (colorToSet === "Karta") {
                document.documentElement.style.setProperty('--backgroundCardsMin', color);                 
            } else if (colorToSet === "Modal") {
                document.documentElement.style.setProperty('--backgroundModalsMin', color);                 
            }            
        } else if (catToSet === "Kolory informacji") {

            if (colorToSet === "Czerwony") {
                document.documentElement.style.setProperty('--infoColorRedMin', color);                 
            } else if (colorToSet === "Zółty") {
                document.documentElement.style.setProperty('--infoColorYellowMin', color);                 
            } else if (colorToSet === "Zielony") {
                document.documentElement.style.setProperty('--infoColorGreenMin', color);                 
            } else if (colorToSet === "Szary") {
                document.documentElement.style.setProperty('--infoColorGreyMin', color);                 
            } else if (colorToSet === "Czarny") {
                document.documentElement.style.setProperty('--infoColorBlackMin', color);                 
            }            

        } else if (catToSet === "Różne") {

            if (colorToSet === "Tło strony") {
                document.documentElement.style.setProperty('--appBackgroundColorMin', color);                 
            } else if (colorToSet === "Czcionka") {
                document.documentElement.style.setProperty('--appFontColorMin', color);                 
            } else if (colorToSet === "Ramka input") {
                document.documentElement.style.setProperty('--inputAndInputBtnMin', color);                
            } else if (colorToSet === "Tło input") {
                document.documentElement.style.setProperty('--inputAndInputBtnBackgroundMin', color);                 
            }          
        }
    }

    const updateColors = () =>
    {
        setColorsChanged(false)

        const a = getComputedStyle(document.documentElement).getPropertyValue('--btnGreenMin')
        document.documentElement.style.setProperty('--btnGreen', a);

        const b = getComputedStyle(document.documentElement).getPropertyValue('--btnRedMin')
        document.documentElement.style.setProperty('--btnRed', b);

        const c = getComputedStyle(document.documentElement).getPropertyValue('--btnBlueMin')
        document.documentElement.style.setProperty('--btnBlue', c);

        const d = getComputedStyle(document.documentElement).getPropertyValue('--btnGreyMin')
        document.documentElement.style.setProperty('--btnGrey', d);

        const e = getComputedStyle(document.documentElement).getPropertyValue('--btnWhiteMin')
        document.documentElement.style.setProperty('--btnWhite', e);

        const f = getComputedStyle(document.documentElement).getPropertyValue('--borderFirstMin')
        document.documentElement.style.setProperty('--borderFirst', f);

        const g = getComputedStyle(document.documentElement).getPropertyValue('--borderSecondMin')
        document.documentElement.style.setProperty('--borderSecond', g);

        const h = getComputedStyle(document.documentElement).getPropertyValue('--borderThirdMin')
        document.documentElement.style.setProperty('--borderThird', h);

        const i = getComputedStyle(document.documentElement).getPropertyValue('--borderCardsMin')
        document.documentElement.style.setProperty('--borderCards', i);

        const j = getComputedStyle(document.documentElement).getPropertyValue('--borderModalsMin')
        document.documentElement.style.setProperty('--borderModals', j);

        const k = getComputedStyle(document.documentElement).getPropertyValue('--backgroundFirstMin')
        document.documentElement.style.setProperty('--backgroundFirst', k);

        const l = getComputedStyle(document.documentElement).getPropertyValue('--backgroundSecondMin')
        document.documentElement.style.setProperty('--backgroundSecond', l);

        const m = getComputedStyle(document.documentElement).getPropertyValue('--backgroundThirdMin')
        document.documentElement.style.setProperty('--backgroundThird', m);

        const n = getComputedStyle(document.documentElement).getPropertyValue('--backgroundCardsMin')
        document.documentElement.style.setProperty('--backgroundCards', n);

        const o = getComputedStyle(document.documentElement).getPropertyValue('--backgroundModalsMin')
        document.documentElement.style.setProperty('--backgroundModals', o);

        const p = getComputedStyle(document.documentElement).getPropertyValue('--infoColorRedMin')
        document.documentElement.style.setProperty('--infoColorRed', p);

        const r = getComputedStyle(document.documentElement).getPropertyValue('--infoColorYellowMin')
        document.documentElement.style.setProperty('--infoColorYellow', r);

        const s = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGreenMin')
        document.documentElement.style.setProperty('--infoColorGreen', s);

        const t = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGreyMin')
        document.documentElement.style.setProperty('--infoColorGrey', t);

        const u = getComputedStyle(document.documentElement).getPropertyValue('--infoColorBlackMin')
        document.documentElement.style.setProperty('--infoColorBlack', u);

        const w = getComputedStyle(document.documentElement).getPropertyValue('--appBackgroundColorMin')
        document.documentElement.style.setProperty('--appBackgroundColor', w);

        const x = getComputedStyle(document.documentElement).getPropertyValue('--appFontColorMin')
        document.documentElement.style.setProperty('--appFontColor', x);

        const y = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtnMin')
        document.documentElement.style.setProperty('--inputAndInputBtn', y);

        const z = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtnBackgroundMin')
        document.documentElement.style.setProperty('--inputAndInputBtnBackground', z);
    }

    const resetColors = () =>
    {
        setColorsChanged(false)

        const a = getComputedStyle(document.documentElement).getPropertyValue('--btnGreen')
        document.documentElement.style.setProperty('--btnGreenMin', a);

        const b = getComputedStyle(document.documentElement).getPropertyValue('--btnRed')
        document.documentElement.style.setProperty('--btnRedMin', b);

        const c = getComputedStyle(document.documentElement).getPropertyValue('--btnBlue')
        document.documentElement.style.setProperty('--btnBlueMin', c);

        const d = getComputedStyle(document.documentElement).getPropertyValue('--btnGrey')
        document.documentElement.style.setProperty('--btnGreyMin', d);

        const e = getComputedStyle(document.documentElement).getPropertyValue('--btnWhite')
        document.documentElement.style.setProperty('--btnWhiteMin', e);

        const f = getComputedStyle(document.documentElement).getPropertyValue('--borderFirst')
        document.documentElement.style.setProperty('--borderFirstMin', f);

        const g = getComputedStyle(document.documentElement).getPropertyValue('--borderSecond')
        document.documentElement.style.setProperty('--borderSecondMin', g);

        const h = getComputedStyle(document.documentElement).getPropertyValue('--borderThird')
        document.documentElement.style.setProperty('--borderThirdMin', h);

        const i = getComputedStyle(document.documentElement).getPropertyValue('--borderCards')
        document.documentElement.style.setProperty('--borderCardsMin', i);

        const j = getComputedStyle(document.documentElement).getPropertyValue('--borderModals')
        document.documentElement.style.setProperty('--borderModalsMin', j);

        const k = getComputedStyle(document.documentElement).getPropertyValue('--backgroundFirst')
        document.documentElement.style.setProperty('--backgroundFirstMin', k);

        const l = getComputedStyle(document.documentElement).getPropertyValue('--backgroundSecond')
        document.documentElement.style.setProperty('--backgroundSecondMin', l);

        const m = getComputedStyle(document.documentElement).getPropertyValue('--backgroundThird')
        document.documentElement.style.setProperty('--backgroundThirdMin', m);

        const n = getComputedStyle(document.documentElement).getPropertyValue('--backgroundCards')
        document.documentElement.style.setProperty('--backgroundCardsMin', n);

        const o = getComputedStyle(document.documentElement).getPropertyValue('--backgroundModals')
        document.documentElement.style.setProperty('--backgroundModalsMin', o);

        const p = getComputedStyle(document.documentElement).getPropertyValue('--infoColorRed')
        document.documentElement.style.setProperty('--infoColorRedMin', p);

        const r = getComputedStyle(document.documentElement).getPropertyValue('--infoColorYellow')
        document.documentElement.style.setProperty('--infoColorYellowMin', r);

        const s = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGreen')
        document.documentElement.style.setProperty('--infoColorGreenMin', s);

        const t = getComputedStyle(document.documentElement).getPropertyValue('--infoColorGrey')
        document.documentElement.style.setProperty('--infoColorGreyMin', t);

        const u = getComputedStyle(document.documentElement).getPropertyValue('--infoColorBlack')
        document.documentElement.style.setProperty('--infoColorBlackMin', u);

        const w = getComputedStyle(document.documentElement).getPropertyValue('--appBackgroundColor')
        document.documentElement.style.setProperty('--appBackgroundColorMin', w);

        const x = getComputedStyle(document.documentElement).getPropertyValue('--appFontColor')
        document.documentElement.style.setProperty('--appFontColorMin', x);

        const y = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtn')
        document.documentElement.style.setProperty('--inputAndInputBtnMin', y);

        const z = getComputedStyle(document.documentElement).getPropertyValue('--inputAndInputBtnBackground')
        document.documentElement.style.setProperty('--inputAndInputBtnBackgroundMin', z);
    }


    return (
        <div className='colorsBody'>

            <h2 className='colorstitle'>
                Zmiana kolorów na stronie
            </h2>

            <div className='changeResetColors'>
                {(() =>
                {
                    if (colorsChanged===false) {
                        return(<button title='Nie wprowadziłeś zmian w kolorach' className='saveNewColorsOff'>Aktualizuj kolory na stronie</button>)
                    } else {
                        return(<button title='Zapisuje nowe kolori i zmienia kolory na stronie'  onClick={updateColors} className='saveNewColors' >Aktualizuj kolory na stronie</button>)
                    }
                })()}
                
                <button onClick={resetColors} title='Ustawia kolory poczatkowe' className='resetNewColors'>Reset kolorów</button>

            </div>


            <div className='changeColors'>

                <div className='colorGroup'>

                    <h5>Przyciski</h5>

                    <div className='changeBtnGreen'>
                        <h6>Akceptuj</h6>
                        <div className='changeBtnGreenColor'/>
                        <button id="btnGreen" data-cat="Przyciski" data-btn="Akceptuj" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBtnRed'>
                        <h6>Anuluj</h6>
                        <div className='changeBtnRedColor'/>
                        <button id="btnRed" data-cat="Przyciski" data-btn="Anuluj" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBtnBlue'>
                        <h6>Zmień</h6>
                        <div className='changeBtnBlueColor'/>
                        <button id="btnBlue" data-cat="Przyciski" data-btn="Zmień" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBtnGrey'>
                        <h6>Nieaktywny</h6>
                        <div className='changeBtnGreyColor'/>
                        <button id="btnGrey" data-cat="Przyciski" data-btn="Nieaktywny" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBtnWhite'>
                        <h6>Tło</h6>
                        <div className='changeBtnWhiteColor'/>
                        <button id="btnWhite" data-cat="Przyciski" data-btn="Tło" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>

                </div>

                <div className='colorGroup'>
                    <h5>Ramki</h5>
                    <div className='changeBorderFirst'>
                        <h6>Główna</h6>
                        <div className='changeBorderFirstColor'/>
                        <button id="borderFirst" data-cat="Ramki" data-btn="Główna" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBorderSecond'>
                        <h6>Poboczna I</h6>
                        <div className='changeBorderSecondColor'/>
                        <button id="borderSecond" data-cat="Ramki" data-btn="Poboczna I" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBorderThird'>
                        <h6>Poboczna II</h6>
                        <div className='changeBorderThirdColor'/>
                        <button id="borderThird" data-cat="Ramki" data-btn="Poboczna II" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBorderCards'>
                        <h6>Karta</h6>
                        <div className='changeBorderCardsColor'/>
                        <button id="borderCards" data-cat="Ramki" data-btn="Karta" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBorderModals'>
                        <h6>Modal</h6>
                        <div className='changeBorderModalsColor'/>
                        <button id="borderModals" data-cat="Ramki" data-btn="Modal" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                </div>

                <div className='colorGroup'>
                    <h5>Tła</h5>
                    <div className='changeBackgroundFirst'>
                        <h6>Główne</h6>
                        <div className='changeBackgroundFirstColor'/>
                        <button id="backgroundFirst" data-cat="Tła" data-btn="Główne" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBackgroundSecond'>
                        <h6>Poboczne I</h6>
                        <div className='changeBackgroundSecondColor'/>
                        <button id="backgroundSecond" data-cat="Tła" data-btn="Poboczne I" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBackgroundThird'>
                        <h6>Poboczne II</h6>
                        <div className='changeBackgroundThirdColor'/>
                        <button id="backgroundThird" data-cat="Tła" data-btn="Poboczne II" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBackgroundCards'>
                        <h6>Karta</h6>
                        <div className='changeBackgroundCardsColor'/>
                        <button id="backgroundCards" data-cat="Tła" data-btn="Karta" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeBackgroundModals'>
                        <h6>Modal</h6>
                        <div className='changeBackgroundModalsColor'/>
                        <button id="backgroundModals" data-cat="Tła" data-btn="Modal" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                </div>

                <div className='colorGroup'>
                    <h5>Kolory informacji</h5>

                    <div className='changeInfoRed'>
                        <h6>Czerwony</h6>
                        <div className='changeInfoRedColor'/>
                        <button id="infoRed" data-cat="Kolory informacji" data-btn="Czerwony" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInfoYellow'>
                        <h6>Zółty</h6>
                        <div className='changeInfoYellowColor'/>
                        <button id="infoYellow" data-cat="Kolory informacji" data-btn="Zółty" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInfoGreen'>
                        <h6>Zielony</h6>
                        <div className='changeInfoGreenColor'/>
                        <button id="infoGreen" data-cat="Kolory informacji" data-btn="Zielony" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInfoGrey'>
                        <h6>Szary</h6>
                        <div className='changeInfoGreyColor'/>
                        <button id="infoGrey" data-cat="Kolory informacji" data-btn="Szary" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInfoBlack'>
                        <h6>Czarny</h6>
                        <div className='changeInfoBlackColor'/>
                        <button id="infoBlack" data-cat="Kolory informacji" data-btn="Czarny" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                </div>
                <div className='colorGroup'>
                    <h5>Różne</h5>

                    <div className='changePage'>
                        <h6>Tło strony</h6>
                        <div className='changePageColor'/>
                        <button id="pageBackground" data-cat="Różne" data-btn="Tło strony" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeFont'>
                        <h6>Czcionka</h6>
                        <div className='changeFontColor'/>
                        <button id="fontColor" data-cat="Różne" data-btn="Czcionka" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInputBorder'>
                        <h6>Ramka input</h6>
                        <div className='changeInputBorderColor'/>
                        <button id="inputBorderChange" data-cat="Różne" data-btn="Ramka input" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                    <div className='changeInputBackground'>
                        <h6>Tło input</h6>
                        <div className='changeInputBackgroundColor'/>
                        <button id="inputBackgroundChange" data-cat="Różne" data-btn="Tło input" onClick={changeThis}><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/25/000000/external-arrows-circle-arrows-kmg-design-glyph-kmg-design.png"/></button>
                    </div>
                </div>
            </div>

            <div className='picker'>

                <div className='pickerTxt'>
                    <div>Zmieniana kategoria - {catToSet}</div>
                    <div>Zmieniany kolor - {colorToSet}</div>
                </div>

                <div>
                <SketchPicker disableAlpha={true} color={pickerColor} onChange={changeColor}/>                          
                </div>
        
            </div>


            
            <div className='screenModel'>

                <div className='monitorTitle'>Podglad nowych kolorów</div>    

                <div className='monitor'>
                    <div className='screen'>
                        <div className='navBarMini'>
                            <div className='navBarMiniLogo'>SklepOnlineV2</div>
                            <div className='navBarMiniBtns'>
                                <div>Home</div>
                                <div>Oferta</div>
                                <div>Koszyk</div>
                                <div>Kontakt</div>
                            </div>
                            <div className='navBarMiniLogin'>Zaloguj</div>
                            
                        </div>
                        <div className='firstContainer'>Głowny
                            <div className='miniScreenCard'>Karta</div>
                            <div className='miniScreenCard'>Karta</div>
                            <div className='miniScreenCardBtns'>
                                Karta
                                <div className='miniScreenBtns'>
                                    <button className='miniBtnAccept'>Akceptuj</button>
                                    <button className='miniBtnCancel'>Anuluj</button>
                                    <button className='miniBtnChange'>Zmien</button>
                                    <button className='miniBtnGrey'>Nieaktywny</button>
                                </div>                            
                            </div>
                        
                            <div className='miniScreenBtns'>
                                <button className='miniBtnAccept'>Akceptuj</button>
                                <button className='miniBtnCancel'>Anuluj</button>
                                <button className='miniBtnChange'>Zmien</button>
                                <button className='miniBtnGrey'>Nieaktywny</button>
                            </div>
                        </div>
                        <div className='secondContainer'>poboczny I
                            <div className='miniScreenCard'>Karta</div>
                            <div className='miniScreenBtns'>
                                <button className='miniBtnAccept'>Akceptuj</button>
                                <button className='miniBtnCancel'>Anuluj</button>
                                <button className='miniBtnChange'>Zmien</button>
                                <button className='miniBtnGrey'>Nieaktywny</button>
                            </div>
                                               
                        </div>
                        <div className='thirdContainer'>
                            poboczny II
                             <div className='miniScreenCard'>Karta</div>                       
                        
                        </div>
                        <div className='modalContainer'>
                            Modal   
                            <input className='miniScreenInp' ></input>

                                <div className='miniScreenInfoColors'>
                                    <div className='miniScreenInfoRed'>Czerwony</div>
                                    <div className='miniScreenInfoYellow'>Zółty</div>
                                    <div className='miniScreenInfoGreen'>Zielony</div>
                                    <div className='miniScreenInfoGrey'>Szary</div>
                                    <div className='miniScreenInfoBlack'>Czarny</div>
                                </div>
                        </div>
                    </div>                   
                </div>                
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(ColorsSet)