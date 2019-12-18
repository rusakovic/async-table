import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const  App = () => {
  // change delay here in ms
  const delay = 5000;
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
        let dd = new Date();
        const newOffer = {
          id: count,
          date: new Date(dd.setMinutes(dd.getMinutes() + count * 10)).toLocaleDateString("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit"}),
          amount: Math.floor(Math.random() * 10) / 10,
          bid: Math.floor(9.5 + Math.random() * 100) / 100
        };
        if (count < 4) {
          setIsRunning(true);
          setCount(count + 1);
        } else {
          setIsRunning(false);
        }
        
        // Your custom logic here
        setOffers([...offers, newOffer]);
    },
    isRunning ? delay : null
  );

  return (
    <div className="container-sm">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Bid</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <tr key={offer.id}>
              <th scope="row">{offer.id}</th>
              <td>{offer.date}</td>
              <td>{offer.amount}</td>
              <td>{offer.bid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default App;
