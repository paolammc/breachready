import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, BottomNav, TopBar } from './components/layout';
import { Dashboard, Flashcards, Console, PBQLab, Glossary, Progress } from './pages';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-deep-navy">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TopBar />

          <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/console" element={<Console />} />
              <Route path="/pbq" element={<PBQLab />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
