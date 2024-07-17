import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from './app/pages/Layout/Layout';
import { MainPage } from './app/pages/MainPage/MainPage';
import { TaskPage } from './app/pages/TaskPage/TaskPage';
import { DesignPage } from './app/pages/DesignPage/DesignPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/design" element={<DesignPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
