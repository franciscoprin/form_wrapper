import {Component} from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import 'isomorphic-fetch'

import getStore from '../redux'

const getInitialState = reduxStore => ({
  ...reduxStore.getState()
})

// WithData(App)
export default ComposedComponent =>
  class WithData extends Component {
    static propTypes = {
      initialState: PropTypes.object.isRequired
    }
    // All of this is executed server-side just like React's componentWillUnmount, hence you don't 
    // have access to things like `window` or `document` inside this function.
    static async getInitialProps({ctx}) {
      const subProps = {}
      if (ComposedComponent.getInitialProps) {
        subProps = await ComposedComponent.getInitialProps(ctx)
      }      
      // Populate the reduxStore server-side.
      const reduxStore = getStore({})
      const props = { ...subProps }


      // Return the initialState of the application and other props.
      return {
        initialState: getInitialState(reduxStore),
        ...props
      }
    }
    constructor(props) {
      super(props)
      // Use the initialState created server-side to populate
      // the reduxStore in the browser.
      const reduxStore = getStore(this.props.initialState)
      this.reduxStore = reduxStore
    }
    render() {
      // Use <Provider /> just like you normally would with `redux`.
      return (
        <Provider store={this.reduxStore}>
          <ComposedComponent {...this.props} />
        </Provider>
      )
    }
  }