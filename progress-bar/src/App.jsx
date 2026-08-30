import ProgressBar from './components/ProgressBar'
import './App.css'

function App() {
  const bars = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="App">
      <div className="progressBar-container">
        {bars?.map((item, index) => (
          <ProgressBar maxWidth={item} key={index} />
        ))}
      </div>
    </div>)
}

export default App
