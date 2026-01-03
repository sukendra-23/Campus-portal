 HEAD
# Campus-portal
Event management 
=======
# College Event Management Portal

A frontend-only web application for managing and displaying college events. Built with HTML5, CSS3, and Vanilla JavaScript.

## 📋 Project Requirements Met

✅ **Minimum 3 pages** - Created 5 pages (login.html, index.html, events.html, dashboard.html, contact.html)  
✅ **Minimum 4 distinct sections** - Home, About, Events Gallery, Contact sections in index.html  
✅ **Navigation bar** - Links all sections and pages  
✅ **JavaScript interactions** - FAQ toggle, form validation, dynamic event loading, filters  
✅ **Contact form** - With JavaScript validation  
✅ **Consistent design** - Across all pages  
✅ **No backend/frameworks** - Pure HTML, CSS, and JavaScript  
✅ **External CSS only** - All styles in separate CSS files  

## 📁 Project Structure

```
college-event-portal/
│
├── login.html              # Login/Registration page (Entry point)
├── index.html              # Main page with all sections
├── events.html             # Events listing page
├── dashboard.html          # User dashboard
├── contact.html            # Contact form page
│
├── css/
│   ├── style.css          # Main stylesheet
│   ├── navbar.css         # Navigation bar styles
│   ├── events.css         # Events page styles
│   ├── dashboard.css      # Dashboard page styles
│   ├── forms.css          # Form and modal styles
│   └── login.css          # Login/Registration page styles
│
├── js/
│   ├── main.js            # Main page JavaScript
│   ├── events.js          # Events page functionality
│   ├── dashboard.js       # Dashboard functionality
│   ├── form-validation.js # Form validation logic
│   ├── auth.js            # Authentication logic
│   └── utils.js           # Utility functions
│
├── assets/
│   ├── images/            # Event images
│   └── icons/             # Icon files (if needed)
│
├── data/
│   └── events.json        # Events data
│
└── components/
    ├── navbar.html        # Navigation bar component
    └── footer.html        # Footer component
```

## 🚀 Getting Started

1. **Start with login page**: Open `login.html` in a web browser (this is the entry point)
2. **Register or Login**: Create a new account or login with existing credentials
3. **No installation required**: This is a frontend-only project with no dependencies
4. **Local server recommended**: For best results, use a local server (due to CORS for loading JSON)

### Using a Local Server

**Python:**
```bash
python -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server
```

**VS Code Live Server:** Use the Live Server extension

Then navigate to `http://localhost:8000/login.html` (start here!)

## 🎯 Features

### Pages

1. **login.html** - Login/Registration page with:
   - User login form
   - User registration form
   - Form validation
   - Auto-redirect after login/registration

2. **index.html** - Main page with:
   - Hero section with call-to-action
   - About section
   - Events gallery (dynamically loaded)
   - Contact form section
   - FAQ section with toggle functionality

3. **events.html** - Events listing page with:
   - All events displayed as cards
   - Category filters
   - Registration functionality (mock)

4. **dashboard.html** - User dashboard with:
   - User information display
   - Registered events list
   - Mock payment button

5. **contact.html** - Contact page with:
   - Contact form with validation
   - Contact information

### JavaScript Features

- ✅ User authentication (login/registration)
- ✅ Session management with LocalStorage
- ✅ Protected routes (events, dashboard, contact require login)
- ✅ Dynamic event loading from JSON
- ✅ Form validation with real-time feedback
- ✅ FAQ show/hide toggle
- ✅ Event category filtering
- ✅ Smooth scrolling navigation
- ✅ LocalStorage for user data (mock)
- ✅ Mock registration and payment flow
- ✅ Responsive mobile menu

### CSS Features

- ✅ Responsive design (mobile-friendly)
- ✅ Modern gradient backgrounds
- ✅ Smooth animations and transitions
- ✅ Card-based layouts
- ✅ Consistent color scheme

## 📝 Mock Features (Demo Only)

- **User Authentication**: Login/Registration using LocalStorage (no real backend)
- **Event Registration**: Simulated registration using LocalStorage
- **Payment**: Mock payment modal (no real transactions)
- **Data Storage**: Uses browser LocalStorage (not persistent across devices)

All mock features are clearly marked with comments and labels.

## 🎨 Design Guidelines

- **Color Scheme**: Blue (#3498db), Purple gradients, Clean whites
- **Typography**: Segoe UI font family
- **Layout**: Card-based, grid layouts
- **Responsive**: Mobile-first approach

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## ⚠️ Important Notes

1. **Images**: Add actual event images to `assets/images/` folder
2. **Local Server**: Use a local server to avoid CORS issues when loading JSON
3. **No Backend**: This is a frontend-only project - no real data persistence
4. **Mock Features**: Registration and payment are demonstrations only

## 🔧 Customization

- **Events**: Edit `data/events.json` to add/modify events
- **Colors**: Modify CSS variables in style files
- **Content**: Edit HTML files directly
- **Functionality**: Extend JavaScript files as needed

## 📄 License

This project is created for educational purposes.

---

**Note**: This project strictly follows PDF requirements - HTML5, CSS3, and Vanilla JavaScript only. No frameworks or backend technologies are used.

 4d22d76 (initial commit)
