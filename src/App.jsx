import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, Landing, Register, Login, Error } from './pages';
import {
  SharedLayout,
  Stats,
  AllJobs,
  AddJob,
  // Profile
} from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          {/* <Route path='profile' element={<Profile />} /> */}
        </Route>
        {/* Unprotected Routes */}
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
