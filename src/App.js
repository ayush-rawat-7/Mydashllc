import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChartPage } from './components/ChartPage';
import { LandingPage } from './components/LandingPage';
import "./styles/app/app.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
