import React from 'react';
import {render} from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader'

const Render = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

Render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}



// ReactDOM.render(
//   <App  />,
//   document.getElementById('root')
// );

