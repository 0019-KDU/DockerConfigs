import "./App.css";

function App() {
  const nameList = ["chirantha", "Ravishka", "Ravindu", "Sandeepa"];
  return (
    <div className="App">
      {nameList.map((i) => (
        <div>{i}</div>
      ))}
    </div>
  );
}

export default App;
