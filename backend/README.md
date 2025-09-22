Backend (Node.js + Express + MongoDB)

Environment variables (create a .env file in backend/):

- PORT=5000
- MONGO_URI=mongodb://localhost:27017/testDemo
- ADMIN_USERNAME=your_admin_username
- ADMIN_PASSWORD=your_admin_password
- JWT_SECRET=your_long_random_secret

Scripts:
- npm run dev
- npm start

API Endpoints:
- POST /api/auth/login { username, password } -> { token }
- GET /api/items?type=event|hackathon|workshop
- GET /api/items/:id
- POST /api/items (admin) body: { type, title, description, date, location, imageUrl, isPublished }
- PUT /api/items/:id (admin)
- DELETE /api/items/:id (admin)

Use Authorization: Bearer <token> for admin routes.


