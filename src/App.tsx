import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';
import { Landing, Login, Dashboard, Flashcards, Console, PBQLab, Glossary, Progress } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="console" element={<Console />} />
          <Route path="pbq" element={<PBQLab />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
