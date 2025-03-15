import { StyledHeader, Nav, Logo, Image } from "./styled/header.styled"; 
import { Container } from "./styled/container.styled"; 
import { Flex } from "./styled/flex.styled";
import { StyledButton } from "./styled/button.styled"; 
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    
    const handleStartPlanning = () => {
        // Smooth scroll to search form
        document.getElementById('flight-search').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };
    
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src='./images/logo.svg' alt='FlightPlanner Logo'/>
                </Nav>
                <Flex>
                    <div>
                        <h1>Plan Your Perfect Flight Experience</h1>
                        <p>
                            FlightPlanner makes booking and managing your flights effortless.  
                            Explore destinations, find the best seats, and customize your travel experience with ease.
                        </p>
                        <StyledButton 
                            bg='#ff0099' 
                            color='#fff'
                            onClick={handleStartPlanning}
                        >
                            Start Planning Now
                        </StyledButton>
                    </div>
                    <Image src='./images/illustration-mockups.svg' alt='Flight Illustration'/>
                </Flex>
            </Container>
        </StyledHeader>
    );
}