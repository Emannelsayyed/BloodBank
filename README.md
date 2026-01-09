# 🩸 Blood Bank Management System - Modular Version

A fully modular, production-ready blood bank management system built with React. Features complete CRUD operations, separate components, and easy maintainability.

## ✨ Key Features

### Complete CRUD Operations
- ✅ **Create** - Add new donors, requests, and update inventory
- ✅ **Read** - View all data with search and filter capabilities
- ✅ **Update** - Edit donor information, request status, and inventory levels
- ✅ **Delete** - Remove donors and requests with confirmation dialogs

### Modular Architecture
- **Separate Components** - Each UI element is its own file
- **Page-based Structure** - Dashboard, Donors, Inventory, Requests
- **Reusable Forms** - Modal-based forms for all CRUD operations
- **Easy to Maintain** - Clear file structure and organization

### Professional Features
- Real-time inventory tracking with automated alerts
- Search and filter functionality
- Confirmation dialogs for destructive actions
- Responsive design for all devices
- Professional medical interface design
- Smooth animations and transitions

## 📁 Project Structure

```
bloodbank-modular/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── Navigation.jsx          # Tab navigation
│   │   ├── DonorForm.jsx          # Add/Edit donor modal
│   │   ├── RequestForm.jsx        # Add/Edit request modal
│   │   ├── InventoryUpdateForm.jsx # Update inventory modal
│   │   └── ConfirmDialog.jsx      # Delete confirmation
│   ├── pages/
│   │   ├── Dashboard.jsx          # Overview page
│   │   ├── Donors.jsx             # Donor management
│   │   ├── Inventory.jsx          # Blood inventory
│   │   └── Requests.jsx           # Blood requests
│   ├── styles/
│   │   └── main.css               # All styles
│   ├── App.js                     # Main app with state management
│   └── index.js                   # React entry point
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
```bash
cd bloodbank-modular
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🎯 How to Use

### Dashboard
- View real-time statistics
- Monitor blood inventory levels
- See recent blood requests
- Track critical stock alerts

### Donors Management
1. **View Donors** - See all registered donors in a table
2. **Search** - Find donors by name or phone number
3. **Filter** - Filter by blood type
4. **Add Donor** - Click "Add Donor" button, fill the form
5. **Edit Donor** - Click edit icon next to any donor
6. **Delete Donor** - Click trash icon, confirm deletion

### Inventory Management
1. **View Stock** - See all 8 blood types with visual indicators
2. **Update Stock** - Click "Update" button on any blood type card
3. **Monitor Alerts** - Check the Stock Alerts section for low inventory
4. **Status Indicators**:
   - 🟢 Good: 20+ units
   - 🟡 Low: 10-19 units
   - 🔴 Critical: <10 units

### Requests Management
1. **View Requests** - See all blood requests with details
2. **Add Request** - Click "New Request" button
3. **Edit Request** - Click edit icon on any request
4. **Approve Request** - Click "Approve" (automatically deducts from inventory)
5. **Reject Request** - Click "Reject" to decline
6. **Delete Request** - Click trash icon, confirm deletion

## 🔄 CRUD Operations Explained

### Create (Add)
- **Donors**: Click "Add Donor" → Fill form → Submit
- **Requests**: Click "New Request" → Fill form → Submit
- Automatically generates unique IDs
- Shows success confirmation

### Read (View)
- All data displayed in organized views
- Search functionality for donors
- Filter by blood type
- Real-time calculations for statistics

### Update (Edit)
- **Donors**: Click edit icon → Modify information → Save
- **Inventory**: Click "Update" → Enter new unit count → Save
- **Requests**: Click edit icon → Change details → Save
- Automatically updates timestamps

### Delete (Remove)
- Click trash/delete icon
- Confirmation dialog appears
- Confirm to permanently delete
- Success message displayed

## 💾 State Management

All data is managed in `App.js` using React hooks:

- `donors` - Array of donor objects
- `inventory` - Array of blood type inventory
- `requests` - Array of blood requests

Data flows down through props to child components.
Actions (add, update, delete) are handled by functions in `App.js`.

## 🎨 Customization

### Change Colors
Edit `src/styles/main.css`:
```css
/* Find and replace these hex colors */
#dc2626  /* Primary red */
#b91c1c  /* Dark red */
#fef2f2  /* Light red background */
```

### Modify Blood Bank Name
Edit `src/components/Header.jsx`:
```jsx
<h1>Your Blood Bank Name</h1>
<p>Your Tagline Here</p>
```

### Add New Fields
1. Update the state in `App.js`
2. Modify the corresponding form component
3. Update the display component

### Change Validation Rules
Edit form components (`DonorForm.jsx`, `RequestForm.jsx`):
- Modify `min` and `max` attributes
- Add custom validation logic
- Update `required` fields

## 🔌 API Integration

To connect to a backend:

1. **Install axios**
```bash
npm install axios
```

2. **Create API service** (`src/services/api.js`)
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://your-api-url/api'
});

export const donorAPI = {
  getAll: () => API.get('/donors'),
  create: (data) => API.post('/donors', data),
  update: (id, data) => API.put(`/donors/${id}`, data),
  delete: (id) => API.delete(`/donors/${id}`)
};
```

3. **Update App.js** to use API calls instead of local state

## 📊 Data Structure

### Donor Object
```javascript
{
  id: 1,
  name: "Ahmed Hassan",
  email: "ahmed@email.com",
  phone: "+20 123 456 7890",
  bloodType: "O+",
  age: 28,
  address: "Cairo, Egypt",
  lastDonation: "2024-11-15",
  status: "eligible"
}
```

### Inventory Object
```javascript
{
  bloodType: "A+",
  units: 45,
  lastUpdated: "2025-01-09"
}
```

### Request Object
```javascript
{
  id: 1,
  patient: "Khaled Mahmoud",
  bloodType: "O+",
  units: 2,
  urgency: "high",
  hospital: "Cairo University Hospital",
  date: "2025-01-09",
  status: "pending"
}
```

## 🛠️ Development Tips

### Adding a New Feature
1. Create component in appropriate folder
2. Import and use in parent component
3. Add any new state to `App.js`
4. Add styles to `main.css`

### Debugging
- Use React DevTools browser extension
- Check browser console for errors
- Use `console.log()` to track data flow
- Verify props are being passed correctly

### Testing
- Test all CRUD operations
- Try edge cases (empty fields, special characters)
- Test on different screen sizes
- Verify data persistence

## 🐛 Troubleshooting

### Forms not opening
- Check modal state in component
- Verify button onClick handlers
- Check for JavaScript errors in console

### Data not updating
- Confirm state update functions are called
- Check if correct ID is being passed
- Verify parent-child prop flow

### Styles not applying
- Ensure `main.css` is imported in `App.js`
- Clear browser cache
- Check for CSS syntax errors

### Build errors
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 TODO / Future Enhancements

- [ ] Add user authentication
- [ ] Implement data persistence (localStorage/backend)
- [ ] Add email notifications
- [ ] Generate PDF reports
- [ ] Add appointment scheduling
- [ ] Implement donor history tracking
- [ ] Add blood donation reminders
- [ ] Create admin dashboard
- [ ] Add data export (CSV/Excel)
- [ ] Implement barcode/QR code generation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on the project repository.

## 🙏 Acknowledgments

- Built with React 18
- Icons by Lucide React
- Designed for healthcare professionals
- Focus on usability and accessibility

---

**Built with ❤️ for saving lives**

*Version 2.0.0 - Modular Edition - January 2025*
