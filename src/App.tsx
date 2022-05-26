import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'

import Advanced from './Advanced'

function App () {
  const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className='app'>
      <Advanced />
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div>
    </div>
  )
}

export default App