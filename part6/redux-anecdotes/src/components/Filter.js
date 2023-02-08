import { useDispatch } from "react-redux"
import { createFilter } from "../reducers/filterReducer"

const Filter = () => {  
  const dispatch = useDispatch()

  const handleChange = (evt) => {
    dispatch(createFilter(evt.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter