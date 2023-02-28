import { useDispatch } from 'react-redux'
import { detectLoggined } from '../reduces/userReduce'

export const useDetectLoggined = () => {
  const dispatch = useDispatch()
  return () => {
    dispatch(detectLoggined())
  }
}
