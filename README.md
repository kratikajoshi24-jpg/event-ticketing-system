# Event Ticketing System

## Project Description

A web-based event ticketing and QR check-in system for campus events.

The system allows participants to register for events and provides a QR-based ticket for entry. Organizers can verify tickets using the organizer portal.

## Features

- Participant event registration
- Event capacity handling
- QR-based event ticket
- Organizer verification portal
- QR code scanning
- Manual token input for testing
- Ticket validation
- Duplicate ticket detection
- Check-in status tracking
- Invalid ticket detection

## Technologies Used

- HTML
- CSS
- JavaScript

## Project Structure

- `index.html` - Participant registration interface
- `organizer.html` - Organizer verification interface
- `organizer.js` - Organizer-side verification logic
- `app.js` - Application logic
- `styles.css` - Styling

## How to Run Locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Open `organizer.html` in another browser tab for organizer verification.

## Organizer Check-in Testing

1. Register a participant through the participant interface.
2. Generate/obtain the ticket QR/token.
3. Open the organizer portal.
4. Scan the QR code using the scanner.
5. Verify that a valid ticket is marked as `CHECKED-IN`.
6. Scan the same ticket again.
7. The second attempt should be identified as `ALREADY USED`.
8. Test an invalid or modified token and verify that it is rejected as `INVALID TICKET`.

## Environment Variables

If environment variables are required for email or other external services, configure them locally and do not commit secret keys or passwords to GitHub.

## Security

API keys, passwords, and other private credentials should not be stored directly in the repository.
