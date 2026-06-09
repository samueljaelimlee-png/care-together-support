# 💛 HealingHeart — Care Together Support
### 혼자 싸우지 않도록 | No One Fights Alone

> A volunteer coordination platform built for a single person in need — a woman in her 50s, battling cancer alone, with no family nearby. This app ensures that every day is covered: meals, baths, laundry, and more.

[![Live App](https://img.shields.io/badge/Live%20App-healing--heart--care.base44.app-brightgreen)](https://healing-heart-care.base44.app)
[![Built With](https://img.shields.io/badge/Built%20With-Base44%20%7C%20React%20%7C%20Vite-purple)]()
[![Purpose](https://img.shields.io/badge/Purpose-Community%20Care%20%7C%20Volunteer%20Scheduling-orange)]()

---

## 💔 The Story Behind This App

A woman in her 50s. A cancer diagnosis. No family. No relatives nearby.

When her community wanted to help, the biggest obstacle wasn't willingness — it was **coordination**. Who is coming tomorrow? Is Tuesday covered? Does anyone know she hasn't eaten today?

**HealingHeart** was built to solve exactly that. No login required. No barriers. Just open the calendar, find an empty slot, and put your name in.

---

## 💡 What This App Does

HealingHeart is a **frictionless volunteer scheduling calendar** designed so that:

- 📅 **Every day stays covered** — visual calendar shows gaps at a glance
- ✍️ **Anyone can sign up instantly** — no account, no login required
- 👥 **Duplicate volunteers are welcome** — more help is always better
- 🍱 **Multiple care types tracked** — meals, bathing assistance, laundry, errands, companionship
- 📖 **Scripture page included** — daily encouragement for the patient and volunteers
- 📋 **My Schedule page** — volunteers can check their own upcoming commitments

---

## 🗓️ How It Works

1. Open the app — **no login needed**
2. Browse the calendar for open care slots
3. Click a date → select care type → enter your name
4. Your slot is saved and visible to everyone
5. Duplicate sign-ups are allowed — backup coverage is encouraged

---

## 📱 App Pages

| Page | Purpose |
|------|---------|
| **Calendar** (Home) | Main scheduling view — see all upcoming care slots |
| **My Schedule** | View slots you've signed up for |
| **Scripture** | Daily Bible verse for encouragement |

---

## 🌟 Design Philosophy

> *"The biggest barrier to volunteer help is friction. Remove the login. Remove the form. Make it one tap."*

Most volunteer platforms require account creation, approval workflows, and complicated scheduling. For spontaneous community care — especially in church networks and close-knit communities — **that friction kills momentum.**

HealingHeart's design principle: **zero barrier to entry.** If someone wants to bring dinner on Thursday, they should be able to commit in under 30 seconds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| UI Components | shadcn/ui |
| Platform | Base44 |
| Version Control | GitHub |
| Deployment | Base44 (live, no server setup required) |

---

## 📁 Project Structure

```
care-together-support/
├── src/
│   ├── components/       # UI components (Calendar, ScheduleCard, etc.)
│   ├── pages/            # Calendar, MySchedule, Scripture
│   └── api/              # Base44 data layer
├── base44/               # Base44 platform config
├── public/               # Static assets
├── index.html
├── vite.config.js
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- npm

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/samueljaelimlee-png/care-together-support.git

# 2. Navigate into the project
cd care-together-support

# 3. Install dependencies
npm install

# 4. Set up environment variables
```

Create a `.env.local` file:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://healing-heart-care.base44.app
```

### Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🤝 Who This Is For

This app was built for **one real person** — and for every community that rallies around someone in crisis.

It is designed for:
- 🏥 **Cancer patients** living alone without family support
- ⛪ **Church communities** coordinating care for a congregation member
- 👨‍👩‍👧 **Neighbors and friends** who want to help but need simple coordination
- 🤲 **Any individual** who needs consistent daily care from a rotating group of volunteers

---

## 👤 Developer

**Samuel Jae-rim Lee**
- 11th Grade, Academies at Englewood / Dwight Morrow High School
- Englewood, New Jersey
- GitHub: [@samueljaelimlee-png](https://github.com/samueljaelimlee-png)

---

## 📜 License

Open source. Adapt freely for any community care situation.

---

## 🙏 A Note

This app was not built as a school project or a portfolio piece.

It was built because someone needed it.

> *"Carry each other's burdens." — Galatians 6:2*
