# FITNESS

A full-stack fitness and training platform built as a learning and portfolio project.

FITNESS combines a Persian right-to-left interface with a Node.js and Express backend, SQLite database, authentication system, user dashboard, and admin panel.

## Features

* **Training Programs:** Browse training programs and view program details.
* **Trainers:** Explore trainer profiles, specializations, and related programs.
* **Public Pages:** Home, About, Pricing, and Contact.
* **Authentication:** User registration, login, logout, and session management.
* **User Dashboard:** A dedicated dashboard for authenticated users.
* **Admin Panel:** Role-based access to administrative features and user information.
* **REST API:** Backend endpoints for programs, trainers, authentication, and other site features.
* **Security Basics:** Password hashing, session management, input validation, login rate limiting, and security headers.
* **Responsive UI:** A dark visual theme designed for desktop and mobile screens.
* **SEO Foundations:** Page metadata, `robots.txt`, and `sitemap.xml`.

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Bootstrap Icons
* Vazirmatn font

### Backend

* Node.js
* Express.js
* REST API

### Database

* SQLite using Node.js built-in `node:sqlite` module

### Development Tools

* Git
* GitHub
* Visual Studio Code

## Getting Started

### Prerequisites

* Node.js 24.x recommended
* npm, included with Node.js
* Git

### 1. Clone the repository

```bash
git clone https://github.com/ParhamYeganeh/FITNESS.git
```

### 2. Open the project directory

```bash
cd FITNESS
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

### 5. Open the website

Visit:

```text
http://localhost:3000
```

To run the development server with Node.js watch mode, use:

```bash
npm run dev
```

## Project Structure

```text
FITNESS/
├── index.html
├── pages/
│   ├── programs.html
│   ├── program-details.html
│   ├── trainers.html
│   ├── trainer-details.html
│   ├── about.html
│   ├── pricing.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── admin.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── auth-ui.js
│   ├── dashboard.js
│   ├── admin.js
│   └── ...
├── routes/
│   ├── auth.js
│   ├── admin.js
│   ├── programs.js
│   ├── trainers.js
│   └── ...
├── database/
│   └── db.js
├── images/
├── server.js
├── package.json
├── package-lock.json
├── robots.txt
├── sitemap.xml
├── .gitignore
└── README.md
```

The local SQLite database file is generated in the `database` directory and is intentionally excluded from Git.

## Important Notes

* FITNESS is a learning and portfolio project, not a production-ready commercial service.
* Pricing and membership plans are demonstration content. Real payment processing and subscription management are not implemented.
* Some features may require further development before real-world commercial use.
* The application is currently intended to run locally. A live deployment will be added separately.
* Some features may require further development before real-world commercial use.

## Author

**Parham Yeganeh**

GitHub: [@ParhamYeganeh](https://github.com/ParhamYeganeh)

---

Built as a full-stack learning project to practice frontend development, backend APIs, databases, authentication, security fundamentals, and Git workflows.
