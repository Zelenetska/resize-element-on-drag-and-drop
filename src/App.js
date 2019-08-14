import React, { useState } from 'react';
import './App.css';
import Table from './grid-table/Table';

function App() {
  const [animals, setAnimals] = useState([
    {
      id: 1,
      name: "Rabbits",
      start: 4,
      end: 7,
    },
    {
      id: 2,
      name: "Hamsters",
      start: 2,
      end: 5,
    },
    {
      id: 3,
      name: "Squirrels",
      start: 1,
      end: 11,
    }
  ]);

  const updateAnimals = (data) => {
    const updatedArray = [];
    animals.forEach(animal => {
      if (data.id === animal.id) {
        const updatedAnimalData = Object.assign(animal, data);
        updatedArray.push(updatedAnimalData);
      } else {
        updatedArray.push(animal);
      }
    });
    setAnimals(updatedArray);
  };

  return (
    <div className="App">
      <Table
        columnsQty={15}
        animals={animals}
        updateAnimals={updateAnimals}
      />
    </div>
  );
}

export default App;
