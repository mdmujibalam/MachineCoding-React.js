import React,{ useState } from "react";
import "./App.css";
import { CheckboxesData } from "./utils/data";
import CheckBox from "./components/CheckBox";

function App() {
  const [checked, setChecked] = useState({});
  console.log("checked", checked);

  const parentMap = React.useMemo(() => {
    const map = new Map();
    const createMap = (nodes, parent = null) => {
      nodes.forEach((node) => {
        if (parent) map.set(node.id, parent);
        if (node.children) createMap(node.children, node);
      });
    };
    createMap(CheckboxesData);
    return map;
  }, []);

  return (
    <>
      <CheckBox
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
        parentMap={parentMap}
      />
    </>
  );
}

export default App;