import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PaymentRequest } from './Components/Stripe/PaymentRequest';
import { SplitFieldsDemo } from './Components/Stripe/CardPayment';
import { AsyncDemo } from './Components/Stripe/DelayedCardPayment';
import CheckoutPage from './pages/Checkout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/:id">
            <div className="App">
              <header className="App-header">
                <CheckoutPage />
                {/* <AsyncDemo stripePublicKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}/> */}
                {/* <SplitFieldsDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw'/> */}
                {/* <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' /> */}
              </header>
            </div>
          </Route>
          <Route path="/">
            {/* <p>hi</p> */}
            <PaymentRequest stripePublicKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} amount={10} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
