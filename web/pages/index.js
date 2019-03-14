import React from 'react'
import Faye from 'faye'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.messageListener = this.messageListener.bind(this)
    this.messageListener(props.store)
  }

  messageListener (store) {
    const client = new Faye.Client('http://localhost:8000/')

    this.stateListener = client.subscribe('/messages', (message) => {
      console.log(message)
    })
  }

  componentWillUnmount () {
    this.stateListener = undefined
    this.messageListener = undefined
  }

  render () {
    return (
      <div>
        foobar
      </div>
    )
  }
}

export default App
