import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Pages
import Home from './pages/Home';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />} />
          <Route path="/course/:id" element={<Course toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />} />
          <Route path="/dashboard" element={<Dashboard toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />} />
          <Route path="/contact" element={<Contact toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
