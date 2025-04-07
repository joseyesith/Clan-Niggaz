import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { EventsPage } from "./pages/eventspage";


import { RoomPage } from "./pages/RoomPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/room" element={<RoomPage />} />
              <Route path="/events" element={<EventsPage />} />


              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
