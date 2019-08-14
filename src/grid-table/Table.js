import React from 'react';

import Stripe from './Stripe';

const Table = ({ columnsQty, animals, updateAnimals }) => {
  const getVerticalLines = () => {
    const lines = [];
    for (let i = 0; i < columnsQty; i++) {
      lines.push(<span key={i} />)
    }
    return lines;
  };

  const getTableBody = () => {
    const row = [];
    const cells = [];

    animals.forEach((animal) => {
      const endColumn = animal.end + 1;
      cells.push(
        <Stripe
          key={`${animal.id}`}
          animalData={animal}
          style={{
            gridColumn: `${animal.start}/${endColumn}`,
          }}
          stripeColumns={{
            start: Number(animal.start),
            end: Number(endColumn),
          }}
          updateAnimals={updateAnimals}
          columnsQty={columnsQty}
        />,
      );
    });
    row.push(
      <ul
        key="row-1"
        className="row"
        style={{ gridTemplateColumns: `repeat(${columnsQty}, 1fr)` }}
      >{cells}</ul>);
    return row;
  };

  return (
    <div className="table-striped">
      <div
        className="row lines"
        style={{ gridTemplateColumns: `repeat(${columnsQty}, 1fr)` }}
      >{getVerticalLines()}</div>
      {getTableBody()}
    </div>
  )
};

export default Table;
