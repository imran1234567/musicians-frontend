import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import "react-notifications/lib/notifications.css";

// Redux provider
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';
import rootRoutes from './components/web/rootRoutes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default class App extends Component {
    render() {
        const clientId = "AfRpEn11gGlBKxxdVKlksPAM0Fij5AKz3n2_XsSai7dH778lKJafZ-iIJUtoLzHu4qEntBSN6kyZ-1tB";
        return (
            <Provider store={store}>
                <div className="App">
                    <NotificationContainer />
                    <BrowserRouter>
                        <PayPalScriptProvider options={{ "client-id": clientId }}>
                            <Switch>
                                <Route path='/' component={rootRoutes} />
                            </Switch>
                        </PayPalScriptProvider>
                    </BrowserRouter>
                </div>
            </Provider>
        )
    }
}