import { createContext, useContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'setNMsg':
      return action.payload
    default:
      return ''
  }
}

const notifyContext = createContext()

const NotifyProvider = (props) => {
  const [notifyMsg, notifyDispatch] = useReducer(notifyReducer, '')
  return (
    <notifyContext.Provider value={[notifyMsg, notifyDispatch]}>
      {props.children}
    </notifyContext.Provider>
  )
}

export const useNotifyMsg = () => {
  return useContext(notifyContext)[0]
}

export const useNotifyDis = () => {
  return useContext(notifyContext)[1]
}

export default NotifyProvider
