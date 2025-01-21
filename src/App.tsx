import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {Todolist} from "./todolist/todolist.tsx";


function App() {

  return (
      <Router>
          <Routes>
              <Route path={'/'} element={<Todolist/>}>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
