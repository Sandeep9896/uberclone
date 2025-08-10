# UberClone Project Report

Date: 10 Aug 2025

## 1. Executive Summary
UberClone is a full‑stack ride hailing prototype replicating core workflows of platforms like Uber: user & captain (driver) onboarding, authentication, ride request creation, fare estimation, mapping utilities, and real‑time ride lifecycle scaffolding. The system is structured for extensibility toward payments, live tracking (WebSockets), surge pricing, and notifications.

## 2. Objectives
- Provide a modular, documented backend API (Node/Express + MongoDB)
- Support user & captain registration/login with JWT auth
- Allow authenticated users to request rides & obtain fare estimates
- Provide mapping utilities (geocoding, distance, suggestions abstraction)
- Maintain clean separation of concerns (routes → controllers → services → models)
- Prepare codebase for future real‑time and payment integrations

## 3. System Overview
Client (React + Context) communicates with REST API (Express). MongoDB stores domain entities. JWT secures protected endpoints. Validation via express-validator; password hashing via bcrypt. Mapping & fare logic encapsulated in services.

## 4. High-Level Architecture
```
[React Frontend]
      |
      | HTTPS (JSON, Bearer JWT)
      v
[Express Server]
  Routes → Controllers → Services → Models (Mongoose) → MongoDB
                 |            
                 |__ Auth Middleware (JWT verify)
                 |__ Validation (express-validator)
```

## 5. Technology Stack
- Frontend: React, Vite, Context API
- Backend: Node.js, Express, Mongoose
- Auth: JWT, bcrypt
- Validation: express-validator
- Runtime Env: dotenv (implied), Node 18+
- Potential: Socket.IO (future), Payment Gateway, Map Provider API

## 6. Key Features
### User
- Register / Login / Logout / Profile retrieval
- Create ride request
- Get fare estimate
### Captain (Driver)
- Register vehicle & profile
- Authenticate & access profile
- (Future) Accept / start / complete rides
### Shared / Map
- Geocode address → coordinates
- Distance & ETA calculation abstraction
- Location suggestions (placeholder logic)

## 7. Backend Layering
- routes/: HTTP method + path + validation rules
- controller/: Orchestrates request flow & error handling
- services/: Business logic, DB interactions, external API stubs
- models/: Mongoose schemas + methods (auth token, password compare)
- middleware/: Authentication (authUser, authCaptain), future role logic

## 8. API Summary (Detailed examples in Backend/readme.md)
| Domain   | Method | Path                      | Auth        | Purpose |
|----------|--------|---------------------------|-------------|---------|
| User     | POST   | /users/register           | No          | Register user |
| User     | POST   | /users/login              | No          | Login user |
| User     | GET    | /users/profile            | User JWT    | Get profile |
| User     | GET    | /users/logout             | User JWT    | Logout |
| Captain  | POST   | /captains/register        | No          | Register captain |
| Captain  | POST   | /captains/login           | No          | Login captain |
| Captain  | GET    | /captains/profile         | Captain JWT | Get profile |
| Captain  | GET    | /captains/logout          | Captain JWT | Logout |
| Ride     | POST   | /rides/create-ride        | User JWT    | Create ride |
| Ride     | GET    | /rides/get-fares          | User JWT    | Fare estimate |
| Map      | GET    | /map/get-coordinates      | Auth (user) | Geocode |
| Map      | GET    | /map/get-distance-time    | Auth (user) | Distance & ETA |
| Map      | GET    | /map/get-suggestions      | Auth (user) | Suggestions |

## 9. Data Models (Essential Fields)
### User
```
fullname: { firstname, lastname }
email (unique)
password (hashed, select:false)
socketId
```
### Captain
```
fullname { firstname, lastname }
email (unique)
password (hashed, select:false)
status: inactive | active | banned (default inactive)
vehicle: { color, plate (unique), capacity, vechileType (car|bike|auto), location { lat, lon } }
socketId
```
### Ride
```
pickupLocation, dropLocation
userId (ref user)
captain (ref captain, optional until assigned)
vehicleType (car|bike|auto)
status: pending|accepted|completed|cancelled (default pending)
fare (Number)
duration (seconds) optional
distance (meters) optional
otp (6-digit)
paymentID, orderID, signature (future payment integration)
createdAt
```
### Blacklist Token (Implied)
Used to invalidate JWTs on logout (not detailed here but typical: token + expiry).

## 10. Authentication & Security
- JWT signed with secret (7d expiry). Separate middlewares: authUser & authCaptain.
- Password hashing: bcrypt (salt rounds = 10).
- Validation layer defends against malformed input.
- Logout strategy likely blacklists tokens (improve by adding Redis TTL or rotating refresh tokens).
- Improve: rate limiting, helmet headers, CORS restriction, secret rotation, 2FA for captains.

## 11. Ride Flow Sequence (Planned)
```
User → Create Ride (pending)
System → Calculates fare & OTP
Captain App (future) → Fetch pending rides / accept
Status: accepted → captain en route → user pickup verification via OTP → in-progress → completed (fare finalize)
```

## 12. Error Handling & Validation
- express-validator collects field errors → 400 with array of { msg, param }
- Controllers wrap service calls in try/catch and respond with structured JSON { success:false, message }
- Recommendation: Add centralized error middleware + error codes.

## 13. Performance & Scalability Considerations
| Concern | Current | Scaling Recommendation |
|---------|---------|------------------------|
| Auth | JWT only | Add refresh tokens, revoke store |
| DB Queries | Direct Mongoose | Add indexes (email, ride status) |
| Fare Calc | Simple service | External microservice w/ caching |
| Geocoding | Placeholder service | Integrate Map API + response cache (Redis) |
| Real-time | Not implemented | Socket.IO / MQTT cluster |
| Horizontal Scale | Stateless (good) | Containerize + load balancer |

## 14. Testing Strategy
- Unit: services (auth, fare calc stubs)
- Integration: route + JWT + validation (supertest + Jest)
- E2E: user signup → ride request happy path
- Future: contract tests for external map/payment APIs

## 15. Deployment Plan
1. Environment variables (.env): PORT, MONGO_URI, JWT_SECRET, MAP_API_KEY, PAYMENT_KEYS
2. Build frontend (Vite) → deploy static (CDN / S3) + backend (Node) separate
3. Use process manager (PM2) or container orchestration (Docker + Kubernetes) for scaling
4. CI/CD: Lint, test, build, deploy
5. Observability: Winston logs, metrics (Prometheus), uptime monitoring

## 16. Developer Setup (Summary)
```
# Backend
cd Backend
npm install
npm run dev (or node server.js)

# Frontend
cd frontend
npm install
npm run dev
```
Configure `.env` before running backend.

## 17. Future Enhancements
- Real-time driver location & ride state (Socket.IO)
- Captain availability & matching algorithm (proximity + load balancing)
- Surge pricing & dynamic fare recalculation
- Payment integration (Razorpay/Stripe) with webhooks
- Ride cancellation logic + penalties
- Trip history & receipts (PDF/email)
- Admin dashboard (fraud detection, KPIs)
- Push notifications (FCM / APNS)
- Unit/integration test coverage >80%

## 18. Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Weak JWT secret | Account compromise | Use strong rotated secrets, env vault |
| Missing rate limits | Abuse / DoS | Implement express-rate-limit & WAF |
| Inaccurate geocoding | Bad ETAs/fare | Reputable map provider + fallback |
| Single DB instance | Downtime | Replica set, backups |
| No monitoring | Slow detection | Centralized logging + alerts |

## 19. Maintenance Plan
- Weekly dependency audit (npm audit)
- Rotate secrets quarterly
- Backup Mongo daily
- Log retention & aggregation (ELK/CloudWatch)
- Quarterly performance load test

## 20. Conclusion
The project establishes a clean, extensible foundation for a ride-hailing platform. With structured layers, documented endpoints, and clear future roadmap, it is prepared for iterative enhancement toward production readiness.

---
End of Report
