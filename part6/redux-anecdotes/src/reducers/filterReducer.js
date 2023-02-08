const initState = ''

const filter = (state = initState, action) => {
  console.log(`'filter state:' ${state}`)
  switch (action.type) {
    case 'FILTER':
      return action.payload.filter
    default:
      return state
  }
}

export const createFilter = input => {
  return {
    type: 'FILTER',
    payload: { filter: input }
  }
}

export default filter