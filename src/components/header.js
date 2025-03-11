import { StyledHeader, Nav, Logo, Image } from "./styled/header.styled"; 
import { Container } from "./styled/container.styled"; 
import { Flex } from "./styled/flex.styled";
import { StyledButton } from "./styled/button.styled"; 

export default function Header() {
    return (
        <StyledHeader>
            <Container>
                <Nav>
                    <Logo src='./images/logo.svg' alt='FlightPlanner Logo'/>
                    <StyledButton>Try It Free</StyledButton>
                </Nav>
                <Flex>
                    <div>
                        <h1>Plan Your Perfect Flight Experience</h1>
                        <p>
                            FlightPlanner makes booking and managing your flights effortless.  
                            Explore destinations, find the best seats, and customize your travel experience with ease.
                        </p>

                        <StyledButton bg='#ff0099' color='#fff'>
                            Start Planning Now
                        </StyledButton>
                    </div>

                    <Image src='./images/illustration-mockups.svg' alt='Flight Illustration'/>
                </Flex>
            </Container>
        </StyledHeader>
    );
} 
