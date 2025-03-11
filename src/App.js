import { ThemeProvider } from "styled-components"; 
import Header from "./components/header";
import { Container } from "./components/styled/container.styled"; 
import GlobalStyles from "./components/styled/global";
import FlightSearch from "./components/FlightSearch";

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
    <>
    <GlobalStyles />
    <Header />
    <Container>
      <h1>Lennuplaneerija</h1>
      <FlightSearch />
    </Container>
    </>
    </ThemeProvider> 
  );
}

export default App;