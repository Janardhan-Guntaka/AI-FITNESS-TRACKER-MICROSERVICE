import { Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router"
import { setCredentials } from "./store/authSlice";
import Box from '@mui/material/Box';
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import ActivityDetail from "./components/ActivityDetail";

function ActivitiesPage() {
  return (
    <Box
      component="section"
      sx={{
        p: 4,
        minHeight: '100vh',
        background: 'radial-gradient(circle at 60% 40%, #232526 70%, #111 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
}



function App() {

  const {token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token && tokenData) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true); // Only then allow rendering
    }
  }, [token, tokenData, dispatch]);

  if (!authReady) return <div>Loading...</div>;

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 60% 40%, #232526 70%, #111 100%)',
          }}
        >
          <Box
            sx={{
              p: 5,
              borderRadius: '2rem',
              background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
              color: '#fff',
              boxShadow: '0 2px 16px #0006',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 320,
            }}
          >
            <img src="/vite.svg" alt="App Logo" style={{ width: 64, marginBottom: 24 }} />
            <h2 style={{ margin: 0, marginBottom: 16, fontWeight: 700 }}>Welcome to Fitness App</h2>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: '1rem',
                fontWeight: 600,
                px: 4,
                background: 'linear-gradient(90deg, #1e88e5 0%, #1976d2 100%)',
                color: '#fff',
                boxShadow: '0 2px 8px #0004',
                mt: 2,
                mb: 1
              }}
              onClick={() => logIn()}
            >
              Login
            </Button>
            <span style={{ color: '#bbb', fontSize: 14, marginTop: 8 }}>Sign in to track your activities</span>
          </Box>
        </Box>
      ) : (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token ? <Navigate to={"/activities"} replace/> : <div>Welcome please login</div> } />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App