const Notification = ({ msg, color }) => {
  const defaultStyle = {
    padding: '1em',
    marginBottom: '1em',

    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 3,

    backgroundColor: '#d3d3d3',
    fontSize: 16
  }
  if (msg === '') {
    return null
  } else {
    return (
      <div style={{ ...defaultStyle, borderColor: color, color: color }}>
        {msg}
      </div>
    )
  }
}


export default Notification