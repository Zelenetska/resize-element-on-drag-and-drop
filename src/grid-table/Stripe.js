import React, { useEffect, useState, useRef } from 'react';

const Stripe = ({ animalData, style, stripeColumns, updateAnimals, columnsQty }) => {
  const stripeRef = useRef(null);
  const [newEndColumn, setNewEndColumn] = useState(null);
  const [newStartColumn, setNewStartColumn] = useState(null);
  let originalStripeWidth;
  let columnWidth;
  let originalMouseX = 0;
  let resizeRight = false;
  let resizeLeft = false;
  let chosenEndColumn;
  let chosenStartColumn;

  useEffect(() => {
    originalStripeWidth = parseFloat(getComputedStyle(stripeRef.current, null)
      .getPropertyValue('width')
      .replace('px', ''));
  });

  useEffect(() => {
    if (!newEndColumn && !newStartColumn) {
      return;
    }

    const data = { id: animalData.id };
    if (newStartColumn && animalData.start !== newStartColumn) {
      data.start = newStartColumn;
    }
    if (newEndColumn && animalData.end !== newEndColumn) {
      data.end = newEndColumn;
    }

    updateAnimals(data);
  }, [newEndColumn, newStartColumn]);

  const resize = (e) => {
    let stripeLengthInColumns = stripeColumns.end - stripeColumns.start;
    if (stripeLengthInColumns === 0) {
      stripeLengthInColumns = 1;
    }
    columnWidth = originalStripeWidth / stripeLengthInColumns;

    if (resizeRight) {
      const width = originalStripeWidth + (e.pageX - originalMouseX);
      const newStripeWidth = width / columnWidth;
      chosenEndColumn = stripeColumns.start + Number(newStripeWidth.toFixed()) - 1;
    }

    if (resizeLeft) {
      const width = originalStripeWidth - (e.pageX - originalMouseX);
      const newStripeWidth = width / columnWidth;
      chosenStartColumn = stripeColumns.end - Number(newStripeWidth.toFixed());
    }
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', resize);
    resizeRight = false;
    resizeLeft = false;

    if (chosenEndColumn) {
      if (chosenEndColumn <= columnsQty && chosenEndColumn >= stripeColumns.start) {
        setNewEndColumn(chosenEndColumn);
      } else if (chosenEndColumn < stripeColumns.start) {
        setNewEndColumn(stripeColumns.start);
      }
      chosenEndColumn = null;
    }

    if (chosenStartColumn) {
      if (chosenStartColumn <= stripeColumns.end) {
        setNewStartColumn(chosenStartColumn);
      } else if (chosenStartColumn > stripeColumns.end) {
        setNewStartColumn(stripeColumns.end);
      }
      chosenStartColumn = null;
    }
  };

  return (
    <div
      className="stripe-container"
      style={style}
      ref={stripeRef}
    >
      <li className="stripe">
        {animalData.name}
      </li>

      <span
        className="resize-handle left"
        onMouseDown={(e) => {
          resizeLeft = true;
          originalMouseX = e.pageX;
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        }}
      />
      <span
        className="resize-handle right"
        onMouseDown={(e) => {
          resizeRight = true;
          originalMouseX = e.pageX;
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        }}
      />
    </div>
  )
};

export default Stripe;
