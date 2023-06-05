import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import "react-notifications/lib/notifications.css";

// Redux provider
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';
import rootRoutes from './components/web/rootRoutes';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <NotificationContainer/>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' component={rootRoutes}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        )
    }
}