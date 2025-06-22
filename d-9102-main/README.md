# FixMyRide

## Project Report

### Project Idea (One Line)
A smart, user-friendly platform for instant vehicle breakdown assistance and maintenance management.

### Overview
FixMyRide is a comprehensive web application designed to connect vehicle owners with nearby mechanics and roadside assistance services in real-time. The platform leverages live location tracking, AI-based recommendations, and secure payment systems to ensure users get fast, reliable help during vehicle emergencies or for regular maintenance. With a focus on user experience, security, and scalability, FixMyRide aims to revolutionize the way vehicle owners manage breakdowns and maintenance.

### Key Features
- **Live Location Tracking:** View mechanics nearby in real-time and get accurate ETA updates.
- **AI-Based Recommendations:** Smart system suggests the best qualified mechanics for your issue.
- **Secure Payments:** Pay seamlessly with multiple secure options and get instant receipts.
- **SOS Emergency Assistance:** Priority service for unsafe locations with direct emergency connections.
- **User Profiles & Onboarding:** Easy onboarding and profile management for personalized service.
- **Service History:** Track all your past service requests and vehicle maintenance records.
- **Subscription Plans:** Flexible plans for different levels of service and support.

### Used Technologies

- **Frontend:** The frontend is built using React, Vite, and Tailwind CSS, providing a fast, modern, and responsive user interface. It leverages shadcn-ui and MUI for rich, customizable UI components, React Router for seamless navigation, Framer Motion for smooth animations, and Leaflet for interactive map features. These technologies work together to deliver a dynamic and engaging user experience.

- **Backend:** The backend utilizes Node.js and Express to create a robust server environment, with MongoDB (via Mongoose) for scalable data storage. Authentication is managed using Passport.js (supporting both local and Google OAuth strategies) and JWT for secure sessions. The backend also integrates OpenAI for AI-powered chatbot support, ensuring intelligent and responsive interactions.

- **Other Tools:** Axios is used for efficient API calls, Socket.io enables real-time updates, and Zod provides strong validation. Various utility libraries are incorporated to enhance the developer experience and maintain code quality throughout the project.

## Structure of Project
The project is organized into two main parts:

- **Frontend:**
  - Located in `src/` and `dashboard1/velocihelp-center-main/src/`.
  - Contains all React components, pages, context, and custom hooks for UI logic and state management.
  - Main screens/pages include: onboarding, profile, chat/support, service history, vehicles, service requests, settings, dashboard, pricing, support, waiting mechanic/tracker, and error handling (NotFound), among others.

- **Backend:**
  - Located in `backend/`.
  - Contains the Express server, API routes, authentication logic, Mongoose models, controllers, middleware, and utility functions.
  - Main API endpoints/routes include: user management, onboarding, vehicle management, assistance requests, service history, authentication (local and Google OAuth), chatbot support, and related backend services.

It consists of various routes and public pages such as signup, login, home, onboarding, profile, service requests, and support, which handle customer registration, assistance requests, and user account management.

## Database
The backend uses MongoDB with the following main collections (Mongoose models):

- **User:** Stores user credentials, Google OAuth info, and profile data.
- **Onboarding:** Captures onboarding details like email, full name, contact, vehicle info, and location.
- **Vehicle:** Stores vehicle details such as name, year, license plate, last service, image, type, and status.
- **AssistanceRequest:** Tracks user requests for roadside or maintenance help, including type, vehicle, issue, contact method, location, and status.

## Security, Validation, Documentation, User Experience, Frontend Enhancement, Testing, Scaling

### Security
- Implements authentication using Passport.js (local and Google OAuth) and JWT for secure sessions.
- Passwords are hashed using bcrypt before storage.
- Session cookies are HTTP-only and have secure/same-site settings.
- Sensitive data is protected via environment variables and secure API endpoints.

### Validation
- Backend validates required fields for all major operations (signup, onboarding, assistance requests).
- Uses Zod and Mongoose schema validation to ensure data integrity.
- Frontend forms provide real-time validation feedback to users.

### Documentation
- Code is organized and commented for clarity.
- API endpoints are structured and named for easy understanding.
- README provides a comprehensive overview for new developers.

### User Experience
- Responsive design for all devices.
- Smooth navigation with React Router and animated transitions.
- Clear feedback for user actions (toasts, alerts, modals).
- Accessible UI components and dark mode support.

### Frontend Enhancement
- Uses shadcn-ui and MUI for modern, customizable UI components.
- Real-time updates with Socket.io and live map tracking with Leaflet.
- Modular component structure for easy maintenance and scalability.

### Testing
- Manual and automated testing of core flows (signup, login, request assistance).
- Linting and type-checking for code quality.
- Error boundaries and fallback UI for robustness.

### Scaling
- Modular backend and frontend structure for easy feature addition.
- Uses MongoDB for scalable data storage.
- Ready for deployment on cloud platforms (Netlify, Vercel, etc.).

## Future Ideas
- **Mobile App:** Native mobile app for iOS and Android.
- **Mechanic Portal:** Dedicated dashboard for mechanics to manage requests and track jobs.
- **Advanced AI Diagnostics:** Integrate deeper AI for predictive maintenance and troubleshooting.
- **More Payment Options:** Add UPI, wallets, and international payment support.
- **Push Notifications:** Real-time alerts for service updates and emergencies.
- **Gamification:** Reward system for regular maintenance and referrals.
- **Multi-language Support:** Expand accessibility for users in different regions.