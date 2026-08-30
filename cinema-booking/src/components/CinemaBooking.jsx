import { useState, useMemo } from "react";

function getMappingRow(row) {
  const map = {
    0: { rowName: "A", price: 100 },
    1: { rowName: "B", price: 100 },
    2: { rowName: "C", price: 100 },
    3: { rowName: "D", price: 200 },
    4: { rowName: "E", price: 200 },
    5: { rowName: "F", price: 200 },
    6: { rowName: "G", price: 400 },
    7: { rowName: "H", price: 400 },
    8: { rowName: "I", price: 400 },
    9: { rowName: "J", price: 400 },
    10: { rowName: "K", price: 400 },
  };

  return map[row];
}

const CinemaBooking = ({ grid }) => {
  const [gridState, setGridState] = useState(grid);

  const partitionIndex = gridState[0]?.length / 2 - 1;

  function handleClick(row, col) {
    setGridState((prev) => {
      const temp = prev.map((row) => [...row]);
      temp[row][col] = 1 - temp[row][col];

      return temp;
    });
  }

  const selectedSeats = useMemo(() => {
    let seats = [];
    const row = gridState.length;
    const col = gridState[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (gridState[i][j] === 0) {
          const rowName = getMappingRow(i).rowName;
          seats.push(`${rowName}${j + 1}`);
        }
      }
    }

    return seats;
  }, [gridState]);

  const selectedSeatsString = selectedSeats?.join(", ");

  const totalPrice = useMemo(() => {
    let cost = 0;
    const row = gridState.length;
    const col = gridState[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (gridState[i][j] === 0) {
          cost += getMappingRow(i).price;
        }
      }
    }

    return cost;
  }, [gridState]);

  return (
    <div>
      <div className="grid">
        {gridState.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid-row">
              <div className="cell">{getMappingRow(rowIndex).rowName}</div>
              {row.map((col, colIndex) => (
                <div key={colIndex}>
                  {colIndex === partitionIndex && (
                    <div className="grid-spacing"></div>
                  )}
                  <button
                    className={
                      col === -1
                        ? "grid-cell booked"
                        : col === 0
                          ? "grid-cell success"
                          : rowIndex <= 2
                            ? "grid-cell regular"
                            : rowIndex <= 5
                              ? "grid-cell premium"
                              : "grid-cell vip"
                    }
                    onClick={() => handleClick(rowIndex, colIndex)}
                    disabled={col === -1 ? true : false}
                  >
                    {colIndex + 1}
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="summary-section">
        <div>Booking Summary</div>
        <div>Selected Seats : {selectedSeatsString}</div>
        <div>Number of Seats : {selectedSeats.length}</div>
        <div>Total Amount : {totalPrice}</div>
      </div>

      <div className="book-btn-container">
        <button className="book-btn">Book Now</button>
      </div>
    </div>
  );
};

export default CinemaBooking;
