import React from 'react'

const DataField = ({ labelText, value }) => {
  return (
    <div className="data">
      <span className="key">{labelText}</span>
      <span className="value">{value}</span>
    </div>
  )
}

export default DataField