import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import MetricSelect from "./components/EogMetrics/MetricGrid";

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255,255,255)',
    },
    secondary: {
      main: 'rgb(255,255,255)',
    },
    background: {
      default: 'rgb(255,255,255)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <MetricSelect />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
