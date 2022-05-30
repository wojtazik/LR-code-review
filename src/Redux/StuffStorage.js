

const StuffList = {
  ApiListAdd: false,
  ApiCatAdd:false,
  List: [{id: 0,category: "women's clothing",
    description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    price: 9859999,
    rating: { voices: 0, ratingSum: 0 },
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
    value: 1}],
  Categories: [],
  CatFromStuffs:[]
}

// pierwsze obj w List musi byc póżniej {id:0}. map sprawdza dlugosc objektów przy rendereowaniu

const stuffReducer = (state = StuffList, action) =>
{
  switch (action.type) {
    case "api-List": return { ...state, ApiListAdd: true }
    case "api-Cat": return { ...state, ApiCatAdd: true }
    

    case "add-stuff": return { ...state, List: [...state.List, action.obj] }

    case "change-stuff": return {
      ...state, List: state.List.map(x =>
      {
        if (x.id !== action.obj.id) {
          return x
        } else {
          return action.obj
        }
      })
    }
    
    case 'change-value': return { ...state, List: state.List.map( x => {
      if (x.id !== action.itemId) {
        return x
      } else {
        return ({...x,value:action.newValue})
      }
    })}

    case "reset-stuff": return { ...state, List: [] }

    case "delete-stuff": return {
      ...state, List: state.List.map( (x) =>
      {
        if (x.id !== parseFloat(action.id)) {
          return x
        } else {
          return ({ id: x.id })
        }
      })}
    case 'add-rating': return {
      ...state, List: state.List.map(x =>
      {
        if (x.id === action.itemId) {
          return {...x,rating:{voices:x.rating.voices+1,ratingSum:x.rating.ratingSum+action.value}}
        } else {
          return x
        }
      })
    }
    
    case "add-category":return {...state,Categories:[...state.Categories,action.name]}
    case "reset-category": return { ...state, Categories: [] }
    case "delete-category": return { ...state, Categories: state.Categories.filter(x => x !== action.name) }
    case "change-category": return {
      ...state, Categories: state.Categories.map(x =>
      {
        if (x !== action.oldName) {
          return x
        } else {
          return action.newName
        }
      }),
      List: state.List.map(x =>
      {
        if (x.category !== action.oldName) {
          return x
        } else {
          x.category = action.newName
          return x
        }
      })
    }



    case "add-catFromStuffs":return {...state,CatFromStuffs:[...state.CatFromStuffs,action.name]}
    case "reset-catFromStuffs": return { ...state, CatFromStuffs: [] }
    case "delete-catFromStuffs": return { ...state, CatFromStuffs: state.CatFromStuffs.filter(x => x !== action.name) }
    case "change-catFromStuffs": return {
      ...state, CatFromStuffs: state.CatFromStuffs.map(x =>
      {
        if (x !== action.oldName) {
          return x
        } else {
          return action.newName
        }
    })}    
    default : return state
  }
}


const apiList = () => ({ type: 'api-List' })
const apiCat = () => ({ type: 'api-Cat' })


const addStuff = (obj) => ({ type: 'add-stuff', obj })
const changeStuff = (obj) => ({ type: "change-stuff", obj })
const changeValue = (itemId,newValue) =>({type:'change-value',itemId,newValue})
const resetStuff = () => ({ type: 'reset-stuff' })
const deleteStuff = (id) => ({ type: "delete-stuff", id })
const addRating = (itemId,value) =>({type:'add-rating',itemId,value})


const addCategory = (name) => ({ type: "add-category", name })
const resetCategory = () => ({ type: "reset-category" })
const deleteCategory = (name) => ({ type: "delete-category", name })
const changeCategory = (newName,oldName) =>({ type:"change-category",newName,oldName})

const addCatFromStuffs = (name) => ({ type: "add-catFromStuffs", name })
const resetCatFromStuffs = () => ({ type: "reset-catFromStuffs" })
const deleteCatFromStuffs = (name) => ({ type: "delete-catFromStuffs", name })
const changeCatFromStuffs = (newName,oldName) =>({ type:"change-catFromStuffs",newName,oldName})


export { apiList, apiCat, addStuff, changeStuff,changeValue, resetStuff, deleteStuff,addRating, addCategory, resetCategory, deleteCategory,changeCategory, addCatFromStuffs, resetCatFromStuffs, deleteCatFromStuffs,changeCatFromStuffs }

export default stuffReducer
