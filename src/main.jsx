import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home.jsx'
import Todos from './pages/todos.jsx'
import Habits from './pages/habits.jsx'
import EventPlanner from './pages/EventPlanner.jsx'
import Header from './components/header.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/event-planner" element={<EventPlanner />} />
    </Routes>
  </BrowserRouter>
)
