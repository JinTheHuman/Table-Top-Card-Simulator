import Card from "./Card";
import './App.css'
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]);

  return (
    <div className="App">
      {cards.map((card, index) => (
        <Card key={index} number={card}>card</Card>
      ))}
    </div>
  );
}

export default App;
