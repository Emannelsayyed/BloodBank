# 🚀 Quick Reference Guide

## File Organization

### Components (`src/components/`)
- **Header.jsx** - Top banner with logo and action buttons
- **Navigation.jsx** - Tab navigation (Dashboard, Donors, Inventory, Requests)
- **DonorForm.jsx** - Modal form for adding/editing donors
- **RequestForm.jsx** - Modal form for adding/editing requests
- **InventoryUpdateForm.jsx** - Modal for updating blood stock
- **ConfirmDialog.jsx** - Confirmation dialog for deletions

### Pages (`src/pages/`)
- **Dashboard.jsx** - Statistics overview and recent activity
- **Donors.jsx** - Full donor management with table view
- **Inventory.jsx** - Blood stock management
- **Requests.jsx** - Blood request management

### Main Files
- **App.js** - Main application logic and state management
- **index.js** - React entry point
- **styles/main.css** - All application styles

## Component Props

### Navigation
```javascript
<Navigation 
  activeTab={string}      // Current active tab
  setActiveTab={function} // Function to change tabs
/>
```

### Dashboard
```javascript
<Dashboard 
  donors={array}      // Array of donor objects
  inventory={array}   // Array of inventory objects
  requests={array}    // Array of request objects
/>
```

### Donors
```javascript
<Donors 
  donors={array}              // Array of donor objects
  onAddDonor={function}       // Handler for adding donor
  onUpdateDonor={function}    // Handler for updating donor
  onDeleteDonor={function}    // Handler for deleting donor
/>
```

### Inventory
```javascript
<Inventory 
  inventory={array}            // Array of inventory objects
  onUpdateInventory={function} // Handler for updating stock
/>
```

### Requests
```javascript
<Requests 
  requests={array}             // Array of request objects
  onAddRequest={function}      // Handler for adding request
  onUpdateRequest={function}   // Handler for updating request
  onDeleteRequest={function}   // Handler for deleting request
  onApproveRequest={function}  // Handler for approving request
/>
```

## State Management Functions

### Donor Functions
```javascript
// Add new donor
handleAddDonor(donorData)
// donorData: { name, email, phone, bloodType, age, address, lastDonation, status }

// Update existing donor
handleUpdateDonor(id, donorData)
// id: donor ID number
// donorData: updated donor object

// Delete donor
handleDeleteDonor(id)
// id: donor ID to remove
```

### Inventory Functions
```javascript
// Update blood stock
handleUpdateInventory(bloodType, units)
// bloodType: "A+", "A-", etc.
// units: number of units (integer)
```

### Request Functions
```javascript
// Add new request
handleAddRequest(requestData)
// requestData: { patient, bloodType, units, urgency, hospital, date, status }

// Update existing request
handleUpdateRequest(id, requestData)
// id: request ID number
// requestData: updated request object

// Delete request
handleDeleteRequest(id)
// id: request ID to remove

// Approve or reject request
handleApproveRequest(id, status)
// id: request ID
// status: "approved" or "rejected"
```

## Common Tasks

### Adding a New Donor
1. User clicks "Add Donor" button
2. `setShowDonorForm(true)` opens modal
3. User fills form
4. Form calls `onAddDonor(donorData)`
5. App.js adds donor to state
6. Success alert shows
7. Modal closes

### Editing a Donor
1. User clicks edit icon
2. `setSelectedDonor(donor)` sets current donor
3. `setShowDonorForm(true)` opens modal with data
4. User modifies form
5. Form calls `onUpdateDonor(id, donorData)`
6. App.js updates donor in state
7. Success alert shows
8. Modal closes

### Deleting a Donor
1. User clicks delete icon
2. `setDonorToDelete(donor)` stores donor
3. `setShowDeleteDialog(true)` opens confirmation
4. User confirms
5. Calls `onDeleteDonor(id)`
6. App.js removes donor from state
7. Success alert shows
8. Dialog closes

### Approving a Request
1. User clicks "Approve" button
2. Calls `handleApproveRequest(id, 'approved')`
3. System checks inventory availability
4. If sufficient: deducts units from inventory
5. Updates request status to "approved"
6. Shows success message
7. If insufficient: shows error alert

## CSS Classes Reference

### Layout
- `.flex` - Flexbox container
- `.grid` - Grid container
- `.space-y-6` - Vertical spacing (1.5rem)
- `.gap-4` - Gap between items (1rem)

### Cards
- `.card` - Basic white card
- `.stat-card` - Statistics card with hover effect
- `.inventory-card` - Inventory display card

### Buttons
- `.btn-primary` - Red gradient button
- `.btn-secondary` - White outlined button
- `.btn-danger` - Red button for destructive actions
- `.btn-primary-sm` - Small primary button
- `.btn-secondary-sm` - Small secondary button

### Forms
- `.modal-overlay` - Dark background overlay
- `.modal-content` - White modal container
- `.form-input` - Text input field
- `.form-label` - Form field label
- `.form-row` - Two-column form row

### Tables
- `.data-table` - Main table class
- `.blood-type-tag` - Blood type badge
- `.action-btn` - Icon button for actions

### Status Indicators
- `.status-badge` - Colored status badge
- `.urgency-badge` - Urgency level badge
- `.progress-bar` - Progress bar container
- `.progress-fill` - Progress bar fill

## Utility Classes

### Colors
- `.bg-red-500` - Red background
- `.bg-yellow-500` - Yellow background
- `.bg-emerald-500` - Green background
- `.text-red-600` - Red text
- `.text-slate-500` - Gray text

### Sizing
- `.w-4` - Width 1rem
- `.h-4` - Height 1rem
- `.max-w-md` - Max width 28rem
- `.w-full` - Full width

### Spacing
- `.mb-4` - Margin bottom 1rem
- `.p-4` - Padding 1rem
- `.mx-auto` - Margin auto (center)

### Text
- `.text-sm` - Small text
- `.text-lg` - Large text
- `.font-bold` - Bold font
- `.text-center` - Center text

## API Integration Template

```javascript
// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Donor API
export const donorAPI = {
  getAll: () => API.get('/donors'),
  getById: (id) => API.get(`/donors/${id}`),
  create: (data) => API.post('/donors', data),
  update: (id, data) => API.put(`/donors/${id}`, data),
  delete: (id) => API.delete(`/donors/${id}`)
};

// In App.js
import { donorAPI } from './services/api';

const handleAddDonor = async (donorData) => {
  try {
    const response = await donorAPI.create(donorData);
    setDonors([...donors, response.data]);
    alert('Donor added successfully!');
  } catch (error) {
    alert('Error adding donor: ' + error.message);
  }
};
```

## Environment Variables

Create `.env` file in project root:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Debugging Tips

### Check Props
```javascript
// Add to component
console.log('Props:', { donors, inventory, requests });
```

### Check State Updates
```javascript
// Add after setState
console.log('Updated state:', donors);
```

### Check Form Data
```javascript
// Add in form submit
console.log('Form data:', formData);
```

## Common Errors & Solutions

### Error: "Cannot read property 'map' of undefined"
**Solution**: Ensure data prop exists and is an array
```javascript
{donors && donors.map(donor => ...)}
```

### Error: "Maximum update depth exceeded"
**Solution**: Don't call setState directly in render
```javascript
// Wrong
onClick={handleClick()}
// Correct
onClick={handleClick}
```

### Error: "Each child should have a unique key"
**Solution**: Add key prop to mapped elements
```javascript
{items.map(item => <div key={item.id}>...</div>)}
```

## Performance Tips

1. **Use React.memo** for components that don't change often
2. **Lazy load** pages if app grows large
3. **Debounce** search input for better performance
4. **Virtualize** long lists with react-window
5. **Optimize** images and assets

## Testing Checklist

- [ ] All CRUD operations work
- [ ] Forms validate input correctly
- [ ] Confirmation dialogs appear before deletion
- [ ] Search and filter function properly
- [ ] Inventory updates correctly on approval
- [ ] Responsive on mobile devices
- [ ] No console errors
- [ ] Loading states handled
- [ ] Error messages display properly
- [ ] Success notifications appear

## Build and Deploy

```bash
# Development
npm start

# Production build
npm run build

# Test production build locally
npx serve -s build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=build
```

---

**Keep this guide handy for quick reference during development!**
