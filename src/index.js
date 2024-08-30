import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

ReactDOM.render(
    <MuiPickersUtilsProvider utils ={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>,
  document.getElementById('root')
)