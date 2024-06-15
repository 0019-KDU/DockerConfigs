import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes").then((res) => {
      console.log(res?.data);
      setNote(res?.data?.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Notes</h1>
      {note ? (
        <ul>
          {note.map((note, index) => (
            <li key={index}>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default App;
