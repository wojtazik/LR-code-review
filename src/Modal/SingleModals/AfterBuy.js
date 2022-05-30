import "./AfterBuy.css"

import React from "react"
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../Redux/allReducers";

const AfterBuy = (props) =>
{

    window.document.onkeydown = function (eve)
    {
        const key = eve.key
        
        if (key === "Escape") {
            props.modalReset()
        }
    }
    React.useEffect(() =>
    {
        setTimeout(function(){props.modalReset()},2000)

    },[])

    return (
        <div className="BuyThx">
            Dziekujemy za zakupy
            <img src="https://img.icons8.com/ios/50/000000/happy--v1.png"/>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(AfterBuy)