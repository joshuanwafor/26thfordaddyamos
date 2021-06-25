import * as firebase from 'firebase'
import 'firebase/database'
import dateformat from 'dateformat'
import { FirestoreProvider, FirestoreCollection } from '@react-firebase/firestore'
import React from 'react'

export class MiniTweets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pushedKey: '',
      saySomething: false,
      fullname: '',
      body: '',
      docs: [],
    }
  }

  componentDidMount() {
    firebase.default
      .firestore()
      .collection('talks')
      .onSnapshot((v) => {
        this.setState({
          docs: v.docs.map((da) => {
            return da.data()
          }),
        })
      })
  }
  render() {
    const { state, saySomething, docs, fullname, body } = this.state

    return (
      <div>
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
                  onChange={(v) => {
                    this.setState({ fullname: v.target.value })
                  }}
                />

                <textarea
                  className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent my-4 "
                  id="message"
                  type="text"
                  placeholder="Type here"
                  onChange={(v) => {
                    this.setState({ body: v.target.value })
                  }}
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
                firebase.default.firestore().collection('talks').add({
                  fullname: fullname,
                  body: body,
                  time: Date.now(),
                  type: 'prayer',
                })

                this.setState({ saySomething: false })
              }}
            >
              Publish
            </button>
          )}
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {docs
            .sort((a, b) => b.time - a.time)
            .map((frontMatter, i) => {
              console.log(frontMatter)
              const { fullname, body, time } = frontMatter
              return (
                <li key={i} className="py-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          {dateformat(new Date(time), 'mediumTime')}
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-sm font-bold leading-8 tracking-tight">
                              {'Prayer & Wish '}
                            </h2>
                            <div className="flex flex-wrap">By, {fullname}</div>
                          </div>
                          <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                            {body}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}
