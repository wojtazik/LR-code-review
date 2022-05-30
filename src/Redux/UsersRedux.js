

const users =
{
  usersNicks: ["a", "lukasz", "uzytkownik1","uzytkownik2","uzytkownik3"],
  
  list: [
    {
      id: 0, nick: "a", password: "a", photo: "https://zwierzaki.pl/wp-content/uploads/2021/01/kot-egzotyczny-1200x900.jpg",

      history: [
        { price: 228678, date: "10.04.2022, 20:11:10", id: 0, basket: [{ itemId: 1, value: 2 }, { itemId: 14, value: 2 }, { itemId: 2, value: 3 }] },
        { price: 244096, date: "10.04.2022, 20:11:09", id: 1, basket: [{ itemId: 15, value: 2 }, { itemId: 14, value: 2 }, { itemId: 11, value: 3 }] },
      ],

      basket: { usedId: [1, 2, 14], items: [{ itemId: 1, value: 500 }, { itemId: 14, value: 2 }, { itemId: 2, value: 3 }] },
      
      rating:[]

    },
    {
    id:1, nick:"lukasz" ,password:"1",photo:"https://hapik.pl/39160-large_default/welly-motor-118-kawasaki-zx-10rr-12845.jpg",history:[],basket: {usedId:[],items:[]},rating:[]
    },
    {
    id:2, nick:"uzytkownik1" ,password:"1",photo:"https://hapik.pl/39160-large_default/welly-motor-118-kawasaki-zx-10rr-12845.jpg",history:[],basket: {usedId:[],items:[]},rating:[]
    },
    {
    id:3, nick:"uzytkownik2" ,password:"1",photo:"https://hapik.pl/39160-large_default/welly-motor-118-kawasaki-zx-10rr-12845.jpg",history:[],basket: {usedId:[],items:[]},rating:[]
    },
    {
    id:4, nick:"uzytkownik3" ,password:"1",photo:"https://hapik.pl/39160-large_default/welly-motor-118-kawasaki-zx-10rr-12845.jpg",history:[],basket: {usedId:[],items:[]},rating:[]
    },
  ],

  logged: 0,
  
  adminsId: [0]
}



const usersReducer = (state = users, action) =>
{
  switch (action.type) {

    case 'acc-add': return {...state,
      usersNicks: [...state.usersNicks, action.nick], list: [...state.list, { id: state.list.length, nick: action.nick, password: action.password, photo: "https://img.icons8.com/external-dreamstale-lineal-dreamstale/64/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png", history: [],basket: {usedId:[],items:[]} }]
    }

    case 'acc-change-photo': return {
      ...state, list: state.list.map(x =>
      {
        if (action.id === x.id) {
          return {...x,photo:action.link}
        } else {
          return x
        }

      })
    }
    case 'acc-change-nick': return {
      ...state, list: state.list.map(x =>
      {
        if (action.id === x.id) {
          return {...x,nick:action.newNick}
        } else {
          return x
        }
      }), usersNicks: state.usersNicks.map(x =>
      {
        if (x === action.oldNick) {
          return action.newNick
        } else {
          return x
        }
      })
    }
    case 'acc-change-pass': return {
      ...state, list: state.list.map(x =>
      {
        if (action.id === x.id) {
          return {...x,password:action.pass}
        } else {
          return x
        }

      })
    }

    case 'acc-del': return {

      ...state,
      list: state.list.map(x =>
      {
        if (x.id === action.id) {

          return {id:action.id}

        } else {
          return x
        }
      }),
      usersNicks: state.usersNicks.filter(x => x !== state.list[action.id].nick)
    }
    case 'acc-basket-add': return {
      ...state, list: state.list.map( x =>
      {
        if (x.id !== action.userId) {
          return x
        } else if (x.id === action.userId) {

          if (x.basket.usedId.indexOf(action.itemId) >= 0){
          // jest item w koszyku
            return ({
              ...x, basket: {
                ...x.basket, items: x.basket.items.map(x =>
                  {
                  if (x.itemId === action.itemId) {
                    return({...x,value:x.value+1})
                  } else {
                    return x
                  }
                  }
                )
              }
            })
          }else if(x.basket.usedId.indexOf(action.itemId) < 0){
          // dodaje nowy item bo niema go w koszyku
            return({...x,basket:{usedId:[...x.basket.usedId,action.itemId],items:[...x.basket.items,{itemId:action.itemId,value:1}]}})
          }
        }
      })
    }
    case 'acc-basket-reset': return {
      ...state, list: state.list.map(x =>
      {
        if (x.id === action.userId) {
        return ({...x,basket:{usedId:[],items:[]}})
        } else {
          return x
      }
    })}
    case 'acc-basket-del': return {
      ...state, list: state.list.map(x =>
      {
        if (x.id === action.userId) {
          return ({
            ...x, basket: {
              usedId: x.basket.usedId.filter(x => x !== action.itemId),
              items: x.basket.items.filter(x => x.itemId !== action.itemId)
            }
          })
        } else {
          return x
        }

      })
    }
    case 'acc-basket-min': return {
      ...state, list: state.list.map(x =>
      {
        if (action.userId !== x.id) {
          return x
        } else if (x.id === action.userId) {
          return {
            ...x, basket: {
              ...x.basket, items: x.basket.items.map(x =>
              {
                if (x.itemId === action.itemId) {
                  if (x.value>1) {
                    return{...x,value:x.value - 1}
                  } else {       
                    return x
                  }
                } else {
                  return x
                }
          })}}
        }
      })
    }
    case 'acc-basket-value': return {
      ...state, list: state.list.map(x =>
      {        
        if (x.id === action.userId) {
          return {
            ...x, basket: {
              ...x.basket, items: x.basket.items.map(x =>
              {
                if (x.itemId === action.itemId) {
                  return {...x,value:action.value}
                } else {
                  return x
                }
          })}}
        } else {
          return x
        }


      })
    }

    case 'acc-rating-add': return {      // do zrobienia rating
      ...state, list: state.list.map(x =>
      {
        if (x.id === action.userId) {
          return {...x,rating:[...x.rating,{itemId:action.itemId,rating:action.value}]}
        } else {
          return x
        }
      })
    }
    case 'acc-basket-del-offert': return {
      ...state, list: state.list.map(x =>
      { console.log("to sie w ooglo kurwa dzieje?")
        if (x.basket.usedId.indexOf(action.itemId) >= 0) {
          console.log("kasuje to id", x.id)
          return {
            ...x, basket: { usedId: x.basket.usedId.filter(x => x !== action.itemIdId),items:x.basket.items.filter(x => x.itemId!==action.itemId) }
        }
        } else {
          console.log("zostawiam to id", x.id)
          return x
      }
    })}

    case 'acc-history-add': return {
      ...state, list: state.list.map(x =>
      {
        if (action.userId !== x.id) {
          return x
        } else {
          return {...x,history:[{price:action.sumPrice,date:action.date,id:x.history.length,basket:x.basket.items},...x.history]}
        }
      })
    }
    case 'acc-history-del': return {
      ...state, list: state.list.map(x =>
      {
        if (action.userId !== x.id) {
          return x
        } else {
          return {
            ...x, history: x.history.map(x =>
            {
              if (x.id !== action.basketId) {
              return x
              } else {
                return {id:x.id}
            }
          })}
        }
      })
    }

    case 'logged-set': return { ...state, logged: action.id}
    case 'logged-reset': return { ...state, logged: undefined}
    
    case 'admin-id-add': return { ...state, adminsId: [...state.adminsId, action.id] }
    case 'admin-id-del': return { ...state, adminsId: [...state.adminsId.filter(x => x !== action.id)] }
    
    default : return state
  }
}


const accAdd = (nick, password) => ({ type: 'acc-add', nick, password })
const accDelete = (id) => ({ type: 'acc-del', id })
const accChangePhoto = (link, id) => ({ type: 'acc-change-photo', link, id })
const accChangeNick = (newNick, oldNick, id) => ({ type: 'acc-change-nick', newNick, oldNick, id })
const accChangePass = (pass, id) => ({ type: 'acc-change-pass', pass, id })
const accBasketAdd = (itemId, userId) => ({ type: 'acc-basket-add', itemId, userId })
const accBasketReset = (userId) => ({ type: 'acc-basket-reset', userId })
const accBasketDelItem = (itemId, userId) => ({ type: 'acc-basket-del', itemId, userId })
const accBasketMin = (itemId, userId) => ({ type: 'acc-basket-min', itemId, userId })
const accBasketValue = (itemId, userId, value) => ({ type: 'acc-basket-value', itemId, userId, value })
const accRatingAdd = (userId,itemId,value) => ({type:'acc-rating-add',userId,itemId,value})
const accBasketDelOffert = (itemId) => ({ type: 'acc-basket-del-offert', itemId })




const accHistoryAdd = (userId, date, sumPrice) => ({ type: 'acc-history-add', userId, date, sumPrice })
const accHistoryDel = (userId,basketId) => ({type:'acc-history-del',userId,basketId})

const loggedSet = id => ({ type: 'logged-set', id })
const loggedReset = () => ({ type: 'logged-reset' })

const adminIdAdd = id => ({ type: 'admin-id-add', id })
const adminIdDel = id => ({ type: 'admin-id-del', id })


export {accAdd,accChangePhoto,accChangeNick,accChangePass,accDelete,accBasketAdd,accBasketReset,accBasketDelItem,accBasketMin,accBasketValue,accRatingAdd,accBasketDelOffert,accHistoryAdd,accHistoryDel,loggedSet,loggedReset,adminIdAdd,adminIdDel}
export default usersReducer