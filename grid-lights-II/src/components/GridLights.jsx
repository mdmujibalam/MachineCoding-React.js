import { useState, useRef, useEffect } from "react";

const TOTAL_ACTIVATABLE = 8; // 3x3 grid minus 1 permanently inactive cell
const AUTO_DEACTIVATE_DELAY = 500; // ms between auto deactivations

const GridLights = () => {
  const [grid, setGrid] = useState([
    [0, 0, 0],
    [0, -1, 0],
    [0, 0, 0],
  ]);

  //   function handleClick(row, col) {
  //     if (grid[row][col] === -1) return;

  //     setGrid((prev) => {
  //       const temp = prev?.map((r) => [...r]);
  //       temp[row][col] = 1 - temp[row][col];
  //       return temp;
  //     });
  //   }

  //   useEffect(() => {
  //     const activeCount = grid.reduce((prev, curr) => {
  //       let currActive = curr.reduce((acc, c) => {
  //         let sum = 0;

  //         if (c == 1) sum += 1;

  //         return sum + acc;
  //       }, 0);

  //       return currActive + prev;
  //     }, 0);

  //     if (activeCount == 8) console.log("Hii");
  //   }, [grid]);

  // Stack of "row-col" keys in the order cells were activated.
  const orderRef = useRef([]);
  const intervalRef = useRef(null);
  const isAutoRunningRef = useRef(false);

  function cellKey(row, col) {
    return `${row}-${col}`;
  }

  function pushToOrder(row, col) {
    orderRef.current.push(cellKey(row, col));
  }

  function removeFromOrder(row, col) {
    const key = cellKey(row, col);
    orderRef.current = orderRef.current.filter((k) => k !== key);
  }

  function stopAutoSequence() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isAutoRunningRef.current = false;
  }

  function handleClick(row, col) {
    if (grid[row][col] === -1) return;

    setGrid((prev) => {
      const temp = prev.map((r) => [...r]);
      const turningOn = temp[row][col] === 0;

      temp[row][col] = 1 - temp[row][col];

      if (turningOn) {
        pushToOrder(row, col);
      } else {
        // Manual deactivation — keep stack in sync.
        removeFromOrder(row, col);
      }

      return temp;
    });
  }

  function getActiveCount(g) {
    return g.reduce(
      (total, row) =>
        total + row.reduce((acc, c) => acc + (c === 1 ? 1 : 0), 0),
      0,
    );
  }

  // Start the auto-deactivation sequence once the grid is full.
  useEffect(() => {
    const activeCount = getActiveCount(grid);

    if (activeCount === TOTAL_ACTIVATABLE && !isAutoRunningRef.current) {
      isAutoRunningRef.current = true;

      intervalRef.current = setInterval(() => {
        if (orderRef.current.length === 0) {
          stopAutoSequence();
          return;
        }

        // Pop the most recently activated cell (LIFO).
        const lastKey = orderRef.current.pop();
        const [r, c] = lastKey.split("-").map(Number);

        setGrid((prev) => {
          const temp = prev.map((row) => [...row]);
          temp[r][c] = 0;
          return temp;
        });

        if (orderRef.current.length === 0) {
          stopAutoSequence();
        }
      }, AUTO_DEACTIVATE_DELAY);
    }

    // If the grid drops below full (e.g. user manually toggled one off
    // right as we hit 8, before the interval fired), don't auto-run.
    if (activeCount < TOTAL_ACTIVATABLE && isAutoRunningRef.current === false) {
      // no-op, just guards against stray starts
    }

    return () => {
      // Clean up only on unmount; the interval itself manages its own
      // lifecycle across renders via isAutoRunningRef.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoSequence();
  }, []);

  return (
    <div className="grid-container">
      {grid?.map((row, rowIndex) => {
        return (
          <div className="grid-row" key={rowIndex}>
            {row?.map((val, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={
                  val !== -1
                    ? val == 1
                      ? "grid-cell active"
                      : "grid-cell"
                    : "grid-cell inactive"
                }
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GridLights;
