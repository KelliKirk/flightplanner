Flight Planner Web Application
Project Overview
This project is a web application for flight planning and seat recommendation. It allows users to search for flights based on various criteria and receive seat recommendations based on their preferences.
Features

Flight Search: Users can view a flight schedule and filter flights by:

Destination
Date
Flight time
Price


Seat Recommendation: After selecting a flight, users can get seat recommendations based on preferences:

Window seat
Extra legroom
Proximity to exits
Adjacent seats (when purchasing multiple tickets)



Technology Stack

Backend: Java with Spring Boot
Frontend: React.js
Version Control: Git

Project Structure
The project is organized into the following main components:
Backend (Spring Boot)

Controllers: Handle HTTP requests

FlightController.java
SeatController.java
HealthController.java
BookingController.java


Models: Define data entities

Flight.java
Seat.java
Booking.java


DTOs: Data Transfer Objects

FlightDTO.java
SeatDTO.java
FlightSearchDTO.java
SeatPreferenceDTO.java
SeatRecommendationDTO.java


Repositories: Data access layer

FlightRepository.java
SeatRepository.java
BookingRepository.java


Services: Business logic

FlightService.java
SeatService.java
BookingService.java



Frontend (React.js)

Components:

FlightSearch.js: Flight search form
FlightTable.js: Display flight results
SeatSelection.js: Seat selection interface
SearchFilter.js: Filter options for flights
Header.js: Application header
Button.js: Reusable button component
ErrorMessage.js: Error handling component
BookingConfirmation.js: Confirmation screen


Assets:

plane.svg: Aircraft graphic
plane-window.svg: Window seat indicator



Known Issues

Flight search returns "Invalid Date" errors
Database needs optimization for proper filtering functionality

Installation and Setup

Clone the repository
Install backend dependencies:
Copycd flightplanner-api
mvn install

Install frontend dependencies:
Copycd public
npm install

Start the application:
Copymvn spring-boot:run

Open http://localhost:8081/api/flights in your browser, http://localhost:3020 for frontend

Future Improvements

Fix date formatting issues in flight search
Optimize database queries for more efficient filtering
Add different seat classes (First Class, Business Class, Economy)
Implement real airline API integration
Support for connecting flights
Add comprehensive testing
Containerize the application with Docker

Time Spent
This project was developed as part of the CGI summer internship application. The time spent on development was approximately 2 weeks.
Notes

Random generation of occupied seats is implemented
Seat recommendations are based on user preferences
The aircraft size and seat configuration are configurable

Contact Information

Author: Kelli Kirk
Email: kelkirk93@gmail.com