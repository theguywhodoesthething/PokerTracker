<p align="center">
<img src="https://github.com/theguywhodoesthething/PokerTracker/blob/master/pokertracker.png"  width="300px" height="245px">

# Summary
Poker Tracker is an event logging app that allows the user to track profits over time spent at the poker table. The user is able to log in real time, activating a new session when they sit at a new game and closing the session when they are done playing. Poker Tracker is a RESTful full stack application with full CRUD capabilities. The backend is built utilizing Spring MVC, JPA, MySQL and is deployed to an Apache Tomcat 8 Server.. The frontend is built with Angular, HTML and CSS.

## To Use This App:
When opening the app, the user lands at a page with a simple nav bar and a button that allows them to quickly and easily activate a new session. After activating a session, they are taken a form that allows them to update that session or end it if they choose. The user also has the ability to log notes in active sessions, which are tied to that specific session. The nav bar has a link to the summary page, which lists the results from every session in a table. Above the table are aggregated stats across all logged sessions. By clicking on a table row, the user view changes to a more detailed account of that session. From here they have the option to edit or delete individual sessions.

## Know Issues
- Issue with hibernate when updating tournaments.

## If More Time Were Available:
  Stretch goals for the project include:
  - Add ability to see all notes and associated notes.
  - Graphical representation of data.
  - User login.
  - Filters to sort by session attribute.
  - Drop down menus for DateTime, location, and game type.

## How to Execute
- The web-app is hosted on my AWS server:
<a href="http://52.34.71.100:8080/PokerTracker/#/">Poker Tracker</a>
- Download the entire program as a .war file
<a href="https://github.com/theguywhodoesthething/PokerTracker/blob/master/PokerTracker.war">PokerTracker.war</a>

## Class Structure and Database Overview

<p align="center">
<img src="https://github.com/theguywhodoesthething/PokerTracker/blob/master/schema.png"  width="300px" height="245px">

## Technologies Used
- Javascript
- Angular
- Bootstrap
- Java
- Java
- Persistent API
- Spring MVC and Spring STS
- Gradle Managed Dependencies
- MySQL and MySQL Workbench
- HTML
- CSS
