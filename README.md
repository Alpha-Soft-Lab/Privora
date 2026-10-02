# 🔒 Privora

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?logo=webrtc&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)

**Privora** is a fast, private **voice and video calling PWA**. Start a call, share a **four digit room code**, and the other person joins instantly. No sign up, no accounts.

Calls run **peer to peer using WebRTC**, so audio and video go directly between devices.

**Live URL:** https://privora-1ahs.onrender.com

> **Fast. Private. Direct.**

---

## 🚀 Features

- 📞 **Voice and Video Calls**: choose audio only or video when you start a call
- 🔢 **Four Digit Room Codes**: share a short code to let someone join
- 🔒 **Privacy First**: media is sent directly between peers using WebRTC
- 👥 **Two Person Rooms**: each room holds up to 2 participants (configurable)
- ⏳ **Auto Expiring Rooms**: rooms are removed after a set time (24 hours by default)
- 🎙️ **Call Controls**: mute the mic, turn the camera on or off, leave the call
- 📲 **PWA Support**: install Privora like a native app
- 🌐 **Different Networks**: works across Wi-Fi and mobile data when a connection can be established
- 🔑 **No Accounts**: nothing to register

---

## 🛠️ Tech Stack

**Frontend**

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 📱 PWA (`vite-plugin-pwa`)

**Backend / Signaling**

- 🟢 Node.js
- 🚂 Express.js
- 🔌 WebSocket (`ws`)
- 🍃 MongoDB with Mongoose (stores room codes only)

**Calling**

- 🌐 WebRTC
- 🧊 STUN / TURN (TURN is optional)

---

## 🔄 How It Works

1. A user creates a room and chooses a voice or video call.
2. The server generates a four digit room code.
3. The user shares the code with a friend.
4. The friend enters the code to join.
5. The WebSocket server passes the signaling messages (offer, answer, ICE candidates) between the two users.
6. WebRTC creates a direct peer to peer connection.
7. Audio and video flow directly between the two devices.

The server only helps the two devices find each other. **The call media does not pass through it** whenever a direct connection is possible.

> **Note:** WebRTC connectivity depends on the network. On restrictive networks (some mobile data or office Wi-Fi), a **TURN server** may be needed for a reliable connection.

---

## 📁 Project Structure

```text
Privora/
│
├── client/                 # React + Vite frontend (PWA)
│   ├── src/
│   │   ├── components/     # Logo, PinInput, JoinRoomCard, CreateRoomCard, CallControls...
│   │   ├── config/         # appconfig.js (app name, tagline)
│   │   ├── pages/          # Home, Room
│   │   ├── services/       # API calls
│   │   └── utils/
│   ├── public/             # PWA icons
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Node.js + Express + WebSocket
│   ├── app.js
│   ├── server.js
│   ├── src/
│   │   ├── config/         # env.js, db.js
│   │   ├── routes/         # room routes
│   │   └── sockets/        # signaling.js
│   └── package.json
│
└── README.md
```

---

## 💻 Installation

### Requirements

- Node.js 18 or newer
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/Privora.git
cd Privora
```

### 2️⃣ Set up the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/private-calls
CLIENT_ORIGIN=http://localhost:5173
MAX_PARTICIPANTS=2
ROOM_TTL_HOURS=24
```

Start the server:

```bash
npm start
```

### 3️⃣ Set up the client

Open a new terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000/ws
VITE_TURN_URL=
VITE_TURN_USERNAME=
VITE_TURN_CREDENTIAL=
```

Start the client:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## ⚙️ Environment Variables

### Server

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port (set automatically on Render) | `5000` |
| `NODE_ENV` | `development` or `production` | `development` |
| `MONGODB_URI` | MongoDB connection string | local MongoDB |
| `CLIENT_ORIGIN` | Frontend URL allowed by CORS (no trailing slash) | `http://localhost:5173` |
| `MAX_PARTICIPANTS` | People allowed in one room | `2` |
| `ROOM_TTL_HOURS` | Hours before a room expires | `24` |

### Client

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL, for example `https://your-backend.onrender.com/api` |
| `VITE_WS_URL` | Backend WebSocket URL, for example `wss://your-backend.onrender.com/ws` |
| `VITE_TURN_URL` | TURN server URL (optional) |
| `VITE_TURN_USERNAME` | TURN username (optional) |
| `VITE_TURN_CREDENTIAL` | TURN credential (optional) |

> Vite reads `VITE_*` variables **at build time**. After changing them, rebuild or redeploy the client.

---

## ☁️ Deploying on Render

### Backend (Web Service)

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Environment variables: `NODE_ENV=production`, `MONGODB_URI`, `CLIENT_ORIGIN` (your static site URL, with `https` and no trailing slash).

### Frontend (Static Site)

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Environment variables: `VITE_API_URL` and `VITE_WS_URL` (use `https://` and `wss://`).

Add a rewrite rule so page refreshes work: Source `/*` → Destination `/index.html` → Action **Rewrite**.

> The free Render tier sleeps after about 15 minutes of inactivity. The first request afterward can take up to a minute.

---

## 📲 Install as an App (PWA)

- **Android / Desktop (Chrome, Edge):** tap the **Install** button in the app, or use the browser menu and choose **Install app**.
- **iPhone (Safari):** tap **Share**, then **Add to Home Screen**.

---

## 🔊 Audio Output Note

Web apps cannot choose the phone's earpiece. Mobile browsers play web call audio through the loudspeaker. For private audio, use **wired or Bluetooth earphones** and connect them before you start the call.

---

## 🔐 Privacy

Privora does not require accounts and does not store call audio or video. The database stores only temporary room codes, which expire automatically. The signaling server helps two devices connect, while the call itself travels peer to peer.

---

## 🧰 Troubleshooting

| Problem | Fix |
|---|---|
| `Failed to fetch` | Check `VITE_API_URL` on the client and that the backend is awake |
| CORS error | `CLIENT_ORIGIN` must match the frontend URL exactly, with no trailing `/` |
| Call connects but there is no audio or video | Add a TURN server, and allow camera and mic permissions |
| Install option not showing | Use HTTPS, check that the PWA icons exist, and check DevTools → Application → Manifest |

---

## 🔒 Privora

**Fast. Private. Direct.**

Powered by **Alpha Software Lab**.

Built with ❤️ using **React + Vite + Tailwind CSS + Node.js + Express + WebSocket + WebRTC**.
