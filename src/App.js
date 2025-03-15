import { ThemeProvider } from "styled-components"; 
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { Container } from "./components/styled/container.styled"; 
import GlobalStyles from "./components/styled/global";
import FlightSearch from "./components/FlightSearch";
import SeatSelection from "./components/SeatSelection";

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
    primary: '#ff0099',
    secondary: '#0099ff',
  } 
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Flight Planner</h1>
              <FlightSearch />
            </>
          } />
          <Route path="/select-seats/:flightId" element={<SeatSelection />} />
        </Routes>
      </Container>
    </ThemeProvider> 
  );
}

export default App;
