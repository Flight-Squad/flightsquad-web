import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PaymentRequestDemo } from './Components/PaymentForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
      </header>
    </div>
  );
}

export default App;
