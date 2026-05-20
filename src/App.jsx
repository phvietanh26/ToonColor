import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import ToonColorGame from '@/pages/ToonColorGame';
import Sidebar from '@/components/Sidebar';

function Layout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0A092D' }}>
      <Sidebar />
      <main className="flex-1 ml-[60px]">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ToonColorGame />} />
            <Route path="*" element={<ToonColorGame />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;