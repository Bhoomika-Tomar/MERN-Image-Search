🖼️ MERN + OAuth Image Search & Multi-Select

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and OAuth authentication using Google and GitHub.
It allows authenticated users to search images from Unsplash, multi-select, and view search history and top global searches.

🚀 Features

✅ OAuth Authentication (Google & GitHub using Passport.js)
✅ Protected Search Access – only logged-in users can search
✅ Unsplash API Integration for image results
✅ Multi-Select Grid with dynamic counter
✅ Top 5 Global Searches banner
✅ User Search History with timestamps
✅ Responsive UI styled with Tailwind CSS

🗂️ Folder Structure
mern-oauth-image-search/
│
├── 📁 client/                      # React frontend
│   ├── 📁 public/
│   │   └── index.html
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TopSearchesBanner.jsx
│   │   │   ├── ImageGrid.jsx
│   │   │   ├── SearchHistory.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   └── History.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── utils/api.js
│   ├── .env                        # REACT_APP or VITE_BACKEND_URL
│   ├── package.json
│   └── tailwind.config.js
│
├── 📁 server/                      # Express backend
│   ├── 📁 config/
│   │   ├── passport.js
│   │   └── db.js
│   ├── 📁 models/
│   │   ├── User.js
│   │   └── Search.js
│   ├── 📁 routes/
│   │   ├── authRoutes.js
│   │   ├── searchRoutes.js
│   │   └── index.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md


⚙️ Environment Variables

Create .env in both client/ and server/ folders.

📁 server/.env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/unsplash_search
SESSION_SECRET=replace_with_secure_secret
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

UNSPLASH_ACCESS_KEY=your_unsplash_access_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

📁 client/.env
VITE_BACKEND_URL=http://localhost:5000

🧠 How to Run the Project
1️⃣ Clone the Repository
2️⃣ Install Dependencies
Server
cd server
npm install

Client
cd ../client
npm install
3️⃣ Start the Development Servers
Backend (Express)
cd server
npm run dev

Frontend (React + Vite)
cd ../client
npm run dev


Then open http://localhost:5173


🛠️ Tech Stack

Frontend: React.js (Vite) + Tailwind CSS
Backend: Node.js + Express.js
Database: MongoDB Atlas
Authentication: Passport.js (Google & GitHub OAuth)
API: Unsplash Developer API
