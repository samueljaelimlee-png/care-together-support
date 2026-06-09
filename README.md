# 💛 HealingHeart — Care Together Support
### 혼자 싸우지 않도록 | No One Fights Alone

> A volunteer coordination and fundraising platform built for a real person in need — a church community member in her 50s, battling cancer alone, with no family nearby. This app ensures that every day is covered: meals, bathing assistance, laundry, errands, and more.

[![Live App](https://img.shields.io/badge/Live%20App-healing--heart--care.base44.app-brightgreen)](https://healing-heart-care.base44.app)
[![Built With](https://img.shields.io/badge/Built%20With-Base44%20%7C%20React%20%7C%20Vite-purple)]()
[![Purpose](https://img.shields.io/badge/Purpose-Volunteer%20Scheduling%20%7C%20Care%20Coordination-orange)]()
[![Community](https://img.shields.io/badge/Community-Church%20Based%20Care-blue)]()

---

## 💔 The Story Behind This App

A woman in her 50s. A cancer diagnosis. No family. No relatives nearby.

Her church community wanted to help — immediately and consistently. But coordinating rotating volunteers across meals, bathing, laundry, and errands through group chats and phone calls was chaotic. Slots were missed. People didn't know what was already covered. Fundraising records were scattered.

**HealingHeart** was built to solve exactly that — designed around one core belief:

> *If the app is hard to use, volunteers won't show up. Remove every barrier, and care fills every gap.*

---

## 👥 How This Was Built

This app was a collaborative effort within the church community:

- **Samuel Lee** — Technology lead: designed the user interface, built and deployed the app on Base44, and iterated on the UX based on real volunteer feedback to minimize friction and maximize accessibility
- **Jenny H. Kim, Managing Director, Ernst & Young (New York, NY) / Church Treasurer, Church of Jesus (Paramus, NJ)** — Manages the fundraising records, donation tracking, and volunteer scheduling coordination through the app

The goal was a platform where **anyone — regardless of tech skill — could sign up to help in under 30 seconds.**

---

## 💡 What This App Does

HealingHeart is a **frictionless volunteer scheduling and care coordination platform**:

- 📅 **Visual calendar** — see every day at a glance; empty slots are immediately visible
- ✍️ **No login required** — type your name and pick a slot; done
- 👥 **Duplicate volunteers welcome** — backup coverage is encouraged, not blocked
- 🍱 **Multiple care types** — meals, bathing assistance, laundry, errands, companionship
- 💰 **Fundraising tracking** — donation records and support fund managed by the finance coordinator
- 📋 **My Schedule page** — volunteers can review their upcoming commitments
- 📖 **Scripture page** — daily encouragement for the patient and the caregiving community

---

## 🗓️ How It Works

1. Open the app — **no account or login needed**
2. Browse the calendar for open care slots
3. Click a date → select care type (meal / bath / laundry / errand) → enter your name
4. Slot is saved and visible to the entire community
5. Finance coordinator tracks donations and overall support fund in the same platform

---

## 📱 App Pages

| Page | Purpose |
|------|---------|
| **Calendar** (Home) | Main scheduling view — all upcoming care slots visible at a glance |
| **My Schedule** | View your own upcoming volunteer commitments |
| **Scripture** | Daily Bible verse — encouragement for patient and volunteers |

---

## 🌟 Design Philosophy

> *"The biggest barrier to volunteer help is friction. Remove the login. Remove the form. Make it one tap."*

Most coordination tools require account creation, approval workflows, and complicated scheduling flows. For a church community responding to a crisis in real time, **that friction is the difference between care and a gap.**

HealingHeart's core design principles:
- **Zero barrier to entry** — no login, no approval, no setup
- **Visual clarity** — the calendar makes empty days impossible to miss
- **Redundancy by design** — duplicate sign-ups are allowed; more coverage is always better
- **One dashboard** — volunteer schedule and fundraising records in the same place

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| UI Components | shadcn/ui |
| Platform | Base44 |
| Version Control | GitHub |
| Deployment | Base44 (live, zero server configuration) |

---

## 📁 Project Structure

```
care-together-support/
├── src/
│   ├── components/       # UI components (Calendar, ScheduleCard, ScriptureView, etc.)
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

Built for one real person — and adaptable for any community that rallies around someone in crisis:

- 🏥 Patients living alone without family support
- ⛪ Church communities coordinating consistent care for a member
- 👨‍👩‍👧 Neighbor and friend networks needing simple, visible scheduling
- 💛 Any individual who needs daily care from a rotating group of volunteers

---

## 👤 Developer

**Samuel Lee**
- 11th Grade, Academies at Englewood / Dwight Morrow High School
- Englewood, New Jersey
- GitHub: [@samueljaelimlee-png](https://github.com/samueljaelimlee-png)

---

## 📜 License

Open source. Adapt freely for any community care situation.

---

## 🙏 A Note

This app was not built as a school project or a portfolio piece.

It was built because someone in our community needed it — and because technology should serve the most vulnerable, not just the most connected.

> *"Carry each other's burdens." — Galatians 6:2*
