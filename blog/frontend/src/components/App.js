import React,{ Fragment,useEffect } from 'react';
import { HashRouter as Router, Switch, Route ,Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './articles/Home';
import UserArticle from './articles/UserArticle';
import CategoryArticle from './articles/CategoryArticle';
import Article from './articles/Article';
import Form from './articles/Form';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Dashboard from './accounts/Dashboard';
import PrivateRoute from './common/PrivateRoute';


import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

//Alert Options
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
        // eslint-disable-next-line
    },[])

    return (

        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                        <Header />
                        <Alerts />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route  path="/user/articles/:user_id/:username" component={UserArticle} />
                            <Route  path="/category/articles/:category_name/:category_id" component={CategoryArticle} />
                            <Route  path="/read/more/:article_title/:article_id" component={Article} />
                            <PrivateRoute exact path="/add/article" component={Form} />
                            <PrivateRoute exact path="/my/dashboard" component={Dashboard} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                        </Switch>
                    </div>
                        <Footer />
                    </Fragment>
                </Router>
            </AlertProvider>
        </Provider>
        );
}

export default App;

