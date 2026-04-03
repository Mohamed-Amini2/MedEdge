import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login_Page from "./pages/auth/login";
import HomePage from "./pages/HomePage";
import Complete_Profile_Page from "./pages/auth/Complete_Profile_Page";
import Register_Page from "./pages/auth/signup";
import Appointments_Client from "./pages/Client_Dashboard/Appointments_Client";
import Layout from "./components/Sections/Dashboard/Layout";
import Dashboard_Client from "./pages/Client_Dashboard/Dashboard_Client";
import Chat_Client from "./pages/Client_Dashboard/Chat_Client"
import Record_Client from "./pages/Client_Dashboard/Record_Client";
import Settings_Client from "./pages/Client_Dashboard/Settings_Client";
import Prescriptions_Client from "./pages/Client_Dashboard/Prescriptions_Client";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        //* Public Routes *//

        <Route path="/" element={<HomePage />} />

        //* Authentication Routes *//

        <Route path="/login" element={<Login_Page />} />
        <Route path="/signup" element={<Register_Page />} />
        <Route path="/verify-email" element={<Complete_Profile_Page />} />

        //* Client Dashboard *//

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard_Client />} />
          <Route path="appointments" element={<Appointments_Client />} />
          <Route path="prescriptions" element={<Prescriptions_Client />} />
          <Route path="messages" element={<Chat_Client />}/>
          <Route path="records" element={<Record_Client />} />
          <Route path="settings" element={<Settings_Client />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
