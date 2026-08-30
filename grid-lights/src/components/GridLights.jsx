import { useState } from "react";

const GridRow = ({ row, rowIndex, updateGrid }) => {
  function handleClick(col) {
    updateGrid(rowIndex, col);
  }

  return (
    <div className="grid-row">
      {row?.map((item, index) => (
        <button
          className={item == 1 ? "grid-cell active" : "grid-cell inactive"}
          onClick={() => handleClick(index)}
        ></button>
      ))}
    </div>
  );
};

const GridLights = ({ n }) => {
  const [gridState, setGridState] = useState(
    Array.from({ length: n }, () => new Array(n).fill(0)),
  );

  function updateGrid(row, col) {
    setGridState((prev) => {
      // create a new grid: new array of new row-arrays
      const grid = prev.map((r) => [...r]);

      const dx = [1, 0, -1, 0];
      const dy = [0, -1, 0, 1];

      if (row >= 0 && row < n && col >= 0 && col < n) {
        grid[row][col] = 1 - grid[row][col];
      }

      for (let i = 0; i < 4; i++) {
        const x = row + dx[i];
        const y = col + dy[i];

        if (x >= 0 && x < n && y >= 0 && y < n) {
          grid[x][y] = 1 - grid[x][y];
        }
      }

      return grid;
    });
  }

  console.log(gridState);
  return (
    <div className="grid-container">
      {gridState?.map((row, index) => (
        <GridRow
          row={row}
          key={index}
          rowIndex={index}
          updateGrid={updateGrid}
        />
      ))}
    </div>
  );
};

export default GridLights;
