import { fruitsList as options } from "./utils/data";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import "./App.css";

function App() {
  return (
    <>
      <MultiSelectDropdown options={options} />
    </>
  );
}

export default App;
