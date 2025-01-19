import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Structure from './components/Structure/Structure';
import ToDoPage from './pages/ToDoPage/ToDoPage';
import DonePage from './pages/DonePage/DonePage';
import TrashPage from './pages/TrashPage/TrashPage';


function App() {

  return (
      <Router>
          <Structure>
              <Routes>
                  <Route path="/" element={<Navigate to="/todo" />} />
                  <Route path="/todo" element={<ToDoPage />} />
                  <Route path="/done" element={<DonePage />} />
                  <Route path="/trash" element={<TrashPage />} />
              </Routes>
          </Structure>
      </Router>
  )
}

export default App
