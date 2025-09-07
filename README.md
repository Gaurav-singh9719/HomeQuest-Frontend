# 🏠 Rent Rover - Property Rental Management UI

Rent Rover is a **React.js based rental property management UI** where **Owners** can add/delete properties, manage tenant requests, and **Tenants** can view properties, apply, and see their requests.  
The app is responsive and works on both **laptops** and **mobile devices** with a collapsible navigation bar.

---

## 🚀 Features

- 🔑 **Login for Owner & Tenant**
- 📊 **Owner Dashboard**
  - Add property
  - Delete property
  - View tenant requests
  - Accept / Reject tenant requests
- 👤 **Tenant Dashboard**
  - View applied requests
  - Track accepted / rejected requests
- 🏡 **Properties Page**
  - View all properties with images
  - Search & filter by location or price
  - Navigate to property details
- 📱 **Responsive Navbar**
  - Laptop → Full navbar
  - Mobile → Collapsible hamburger menu
- ✨ **UI Effects**
  - Hover effects on property cards
  - Responsive grid & spacing

---

## 🗂️ Folder Structure

src/
│── components/
│ ├
│ ├── PropertyCard/ # Individual property cards
│ └── SearchFilters/ # Filters for property search
│
│── pages/
│ ├── Dashboard/
│ │ ├── OwnerDashboard.jsx
│ │ └── TenantDashboard.jsx
│ └── Properties/
│ ├── Properties.jsx
│ └── PropertyDetails.jsx
│
│── data/
│ └── dummyData.js # Sample properties data
│
│── App.jsx # Main routes
│── index.js # Entry point


---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rent-rover-ui.git
   cd rent-rover-ui
1. Install dependencies
```bash
 npm install
```

2. Start the development server
```bash
npm start
```

3. Open in browser:
```bash
http://localhost:3000

```

🔑 Login Steps

For now, login is simulated (using dummy credentials):

1. Owner Login

    a. Email: owner@example.com

    b. Password: owner123

    c. Redirects to Owner Dashboard

2. Tenant Login

    a. Email: tenant@example.com

    b. Password: tenant123

    c. Redirects to Tenant Dashboard

