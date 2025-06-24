# 💬 Xeno Chat

A modern, real-time chat application built with React and Node.js that enables seamless communication between users. Featuring a beautiful UI, video calling capabilities, and a robust friend system.

## ✨ Features

- **🔐 Secure Authentication**

  - JWT-based authentication
  - Protected routes
  - Persistent login sessions

- **💬 Real-time Messaging**

  - Instant message delivery
  - Read receipts
  - Typing indicators
  - Message history

- **👥 Friend System**

  - Send/receive friend requests
  - Accept/reject requests
  - View friend status
  - Friend recommendations

- **📹 Video Calling**

  - One-on-one video calls
  - High-quality video streaming
  - Call notifications

- **🎨 Modern UI/UX**
  - Clean, intuitive interface
  - Dark/Light theme support
  - Responsive design
  - Loading animations

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Stream Chat SDK
- Axios

### Backend

- Node.js
- Express
- MongoDB
- JWT
- Stream Chat API
- Cloudinary

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd xeno-chat
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd chat-frontend
npm install

# Install backend dependencies
cd ../chat-backend
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `chat-backend` directory:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret
```

4. **Start the development servers**

In the root directory:

```bash
# Start both frontend and backend
npm run dev
```

## 👨‍💻 Author
Deep Narayan Mistry

---
