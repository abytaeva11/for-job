import ReactDOM from 'react-dom/client';
import './index.scss';
import App from "src/App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( <BrowserRouter><App /></BrowserRouter>);
