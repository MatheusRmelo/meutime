import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import router from './router';
import { Provider } from 'react-redux';
import reducer from "./store/reducer";
import { Store, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { AppAction, AppState, DispatchType } from './store/type';

const store: Store<AppState, AppAction> & {
  dispatch: DispatchType
} = configureStore({reducer: reducer, middleware: [thunk]},);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
