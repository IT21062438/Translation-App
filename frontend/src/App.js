// import "./App.css";
// import Translator from "./components/Translator";

// function App() {
//   return (
//     <div className="container">
//       <Translator></Translator>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Translator from "./components/Translator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Translator />} />
      </Routes>
    </Router>
  );
}

export default App;
