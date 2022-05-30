import React from 'react';

import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../Redux/allReducers'



function Api(props)
{

    React.useEffect(() =>
    {   
        if (props.state.StuffReducer.ApiListAdd === false) {

            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(json =>
                {

                    json.map((x) =>
                    {
                        const price = x.price*100
                        const obj = {...x,value:x.rating.count, price:price, rating:{voices:Math.round(x.rating.count/x.rating.rate),ratingSum:x.rating.count}}
                        props.addStuff(obj)
                        return null
                    })
                    props.apiList()
                })
        }
    }, [])
    

    
    React.useEffect(() =>
    {   
        if (props.state.StuffReducer.ApiCatAdd === false) {
            fetch('https://fakestoreapi.com/products/categories')
                .then(res => res.json())
                .then(json =>
                {
                    json.map(x =>
                    {
                        props.addCatFromStuffs(x)
                        props.addCategory(x)
                        return null
                    })
                    props.apiCat()
                })
        }
    },[])
    
    
    return (<div></div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(Api)
