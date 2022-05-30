

const currentlyModal = {
  modal:"",id:undefined
}


const currentlyModalReducer = (state = currentlyModal, action) =>
{
  switch (action.type) {
    case 'modal-reset': return {modal:"",id:undefined }
    case "modal-set": return { modal: action.nameModal, id:action.id, arr:action.arr }
    default : return state
  }
}


const modalReset = () => ({ type: "modal-reset" })
const modalSet = (nameModal,id,arr) => ({ type: 'modal-set', nameModal,id,arr })


export {modalSet,modalReset}
export default currentlyModalReducer