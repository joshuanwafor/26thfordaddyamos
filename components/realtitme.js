import * as firebase from 'firebase'
import 'firebase/database'
import { FirestoreProvider, FirestoreCollection } from '@react-firebase/firestore'
import React from 'react'

export class MiniTweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pushedKey: '',
      saySomething: false,
    }
  }

  componentDidMount() {
    firebase.default
      .firestore()
      .collection('talks')
      .onSnapshot((v) => {
        console.log(v)
      })
  }
  render() {
    const { state, saySomething } = this.state
    console.log(`loaded ${this.state.saySomething}`)
    return (
      <div className="py-10">
        {this.state.saySomething == false ? (
          <div></div>
        ) : (
          <div className="">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Full name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
                id="username"
                type="text"
                placeholder="Full name"
              />

              <textarea
                className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent my-4 "
                id="message"
                type="text"
                placeholder="Type here"
              />
            </div>
          </div>
        )}
        {this.state.saySomething == false ? (
          <button
            className="py-4 px-6 bg-blue-600"
            onClick={() => {
              console.log('clicked me')
              this.setState({ saySomething: true })
            }}
          >
            Say something...
          </button>
        ) : (
          <button
            className="py-4 px-6 bg-blue-600"
            onClick={() => {
              this.setState({ saySomething: false })
            }}
          >
            Publish
          </button>
        )}
      </div>
    )
  }
}
