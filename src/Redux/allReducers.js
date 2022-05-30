import { createStore,combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import currentlyModalReducer from "./ModalRedux"

import { modalReset, modalSet } from "./ModalRedux"

import stuffReducer from './StuffStorage'
import {apiList, apiCat,addStuff, changeStuff,changeValue, resetStuff, deleteStuff,addRating,addCategory, resetCategory, deleteCategory,changeCategory,addCatFromStuffs, resetCatFromStuffs, deleteCatFromStuffs,changeCatFromStuffs} from './StuffStorage'

import usersReducer from'./UsersRedux'
import { accAdd, accChangePhoto, accChangeNick, accChangePass, accDelete, accBasketAdd, accBasketReset, accBasketDelItem, accBasketMin, accBasketValue, accRatingAdd,accBasketDelOffert, accHistoryAdd, accHistoryDel, loggedSet, loggedReset, adminIdAdd, adminIdDel } from "./UsersRedux"

import ContactReducer from'./ContactRedux.js'
import {setTestContacts,clearBasket,setUpdateTrue,setUpdateFalse,updateContacts,updateContactsCancel,addMessage,messageOpenClose,delMessage} from'./ContactRedux.js'


const allReducers = combineReducers({ModalReducer:currentlyModalReducer,StuffReducer:stuffReducer,Users:usersReducer,Contacts:ContactReducer})


const store = createStore(allReducers, composeWithDevTools())



const mapStateToProps = (state) =>
{
  return {state}
}

const mapDispatchToProps = dispatch => ({
  modalReset:() =>{dispatch(modalReset())},
  modalSet: (nameModal, id, arr) => { dispatch(modalSet(nameModal, id,arr)) },
  //============================================== 
  apiList: () => { dispatch(apiList()) },
  apiCat:() => { dispatch(apiCat()) },
  // ==========================
  addStuff: (obj) => { dispatch(addStuff(obj)) },
  changeStuff: (obj) => { dispatch(changeStuff(obj)) },
  changeValue:(itemId,newValue) => {dispatch(changeValue(itemId,newValue))},
  resetStuff: () => { dispatch(resetStuff()) },
  deleteStuff: (x) => { dispatch(deleteStuff(x)) },
  addRating:(itemId,value) =>{dispatch(addRating(itemId,value))},
  // ==================
  addCategory:(name) => { dispatch(addCategory(name)) },
  resetCategory: () => { dispatch(resetCategory()) },
  deleteCategory: (name) => { dispatch(deleteCategory(name)) },
  changeCategory: (newName,oldName) =>{dispatch(changeCategory(newName,oldName)) },
  // ========
  addCatFromStuffs:(name) => { dispatch(addCatFromStuffs(name)) },
  resetCatFromStuffs: () => { dispatch(resetCatFromStuffs()) },
  deleteCatFromStuffs: (name) => { dispatch(deleteCatFromStuffs(name)) },
  changeCatFromStuffs: (newName, oldName) => { dispatch(changeCatFromStuffs(newName, oldName)) },
  // ============
  accAdd: (nick, password) => { dispatch(accAdd(nick, password)) },
  accChangePhoto: (link, id) => { dispatch(accChangePhoto(link, id)) },
  accChangeNick: (newNick, oldNick, id) => { dispatch(accChangeNick(newNick, oldNick, id)) },
  accChangePass: (pass, id) => { dispatch(accChangePass(pass, id)) },
  accDelete: (id) => { dispatch(accDelete(id)) },
  accBasketAdd: (userId, itemId) => { dispatch(accBasketAdd(userId, itemId)) },
  accBasketReset: (userId) => { dispatch(accBasketReset(userId)) },
  accBasketDelItem: (userId, itemId) => { dispatch(accBasketDelItem(userId, itemId)) },
  accBasketMin: (userId, itemId) => { dispatch(accBasketMin(userId, itemId)) },
  accBasketValue: (userId, itemId, value) => { dispatch(accBasketValue(userId, itemId, value)) },
  accRatingAdd:(userId,itemId,value) => {dispatch(accRatingAdd(userId,itemId,value))},
  accBasketDelOffert: (itemId) => { dispatch(accBasketDelOffert(itemId)) },
  accHistoryAdd: (userId, date, sumPrice) => { dispatch(accHistoryAdd(userId, date, sumPrice)) },
  accHistoryDel:(userId,basketId) => {dispatch(accHistoryDel(userId,basketId))},
  // =======
  loggedSet: (id) => { dispatch(loggedSet(id)) },
  loggedReset: () => { dispatch(loggedReset()) },
  // ====================
  adminIdAdd: (id) => { dispatch(adminIdAdd(id)) },
  adminIdDel: (id) => { dispatch(adminIdDel(id)) },
  // =================================
  setTestContacts: (obj) => { dispatch(setTestContacts(obj)) },
  clearBasket:() => {dispatch(clearBasket())},
  setUpdateTrue: () => { dispatch(setUpdateTrue()) },
  setUpdateFalse: () => { dispatch(setUpdateFalse()) },
  updateContacts: (obj) => { dispatch(updateContacts(obj)) }, 
  updateContactsCancel: (obj) => { dispatch(updateContactsCancel(obj)) },
  addMessage: (obj) => { dispatch(addMessage(obj)) },
  messageOpenClose: (id) => { dispatch(messageOpenClose(id)) },
  delMessage:(id) => {dispatch(delMessage(id))}
})


export default store
export {mapStateToProps,mapDispatchToProps}


