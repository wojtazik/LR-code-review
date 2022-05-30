


const Contact = {
  testContacts: [[],
    [
      { photo: 'https://img.icons8.com/ios-filled/50/000000/phone.png', txt: '111-222-333' },
      { photo: 'https://img.icons8.com/color/50/000000/instagram-new--v1.png', txt: 'SklepOnlineV2' }  
    ]
  ],
  contacts: [[],
    [
      { photo: 'https://img.icons8.com/ios-filled/50/000000/phone.png', txt: '111-222-333' },
      { photo: 'https://img.icons8.com/color/50/000000/instagram-new--v1.png', txt: 'SklepOnlineV2' },  
    ]
  ],
  needUpdate: false,
  messages: [
    { messageId: 0, openTxt:true, authorId: 1, email: 'test@gmail.com', date: "22.05.2022, 23:32:39", txt: 'test test test test test test test' },
    { messageId:1, openTxt:false, authorId: 3, email:'testtesttesttest123@gmail.com' , date: "23.05.2022, 23:32:39", txt: 'wiadomosc nr 2' }
  ]
}


const ContactReducer = (state = Contact, action) =>
{
  switch (action.type) {
    case 'set-test-contacts': return { ...state, testContacts: action.obj }
    case 'clear-basket' : return {...state,testContacts:[[],[...state.testContacts[1]]]}
    
    case 'set-update-true': return {...state, needUpdate:true}
    case 'set-update-false': return { ...state, needUpdate: false }

    case 'update-contacts': return { ...state, contacts: action.obj }
    case 'update-contacts-cancel': return { ...state, testContacts: action.obj }
    
    case 'addMessage': return { ...state, messages: [...state.messages, action.obj] }
    case 'openClose': return {
      ...state, messages: state.messages.map(x =>
      {
        if (x.messageId === action.id) {

          return { ...x, openTxt:!x.openTxt }
          
        } else {

          return x
      }
      })
    }
    case "delMessage" : return {...state,messages:state.messages.filter( x => x.messageId !== action.id )}
    
    default : return state
  }
}


const setTestContacts = (obj) => ({ type: "set-test-contacts", obj })
const clearBasket = () => ({type:'clear-basket'})

const setUpdateTrue = () => ({ type: 'set-update-true' })
const setUpdateFalse = () => ({ type: 'set-update-false' })

const updateContacts = (obj) => ({ type: 'update-contacts', obj })
const updateContactsCancel = (obj) => ({ type:'update-contacts-cancel',obj})

const addMessage = (obj) => ({ type: 'addMessage', obj })
const messageOpenClose = (id) => ({ type: 'openClose', id })
const delMessage = (id) => ({type:"delMessage",id})



export {setTestContacts,clearBasket,setUpdateTrue,setUpdateFalse,updateContacts,updateContactsCancel,addMessage,messageOpenClose,delMessage}
export default ContactReducer