# 75% Attendance Calculator

A modern, responsive web application designed to help students track and calculate their attendance percentage to meet academic requirements. Built with vanilla JavaScript, HTML5, and CSS3 with a beautiful glassmorphism design.

## 🎯 Features

### Core Functionality
- **Real-time Attendance Calculation**: Instantly calculates current attendance percentage
- **75% Requirement Tracking**: Shows exactly how many more lectures you need to attend
- **Smart Predictions**: Calculates how many upcoming lectures you can afford to miss
- **Dual Input Modes**: Choose between simple number input or interactive calendar mode

### Input Modes
1. **Simple Input Mode**
   - Enter total lectures held
   - Enter lectures attended
   - Optional upcoming lectures count

2. **Calendar Mode**
   - Visual calendar interface
   - Select dates for different lecture types
   - Each date automatically counts as 8 classes
   - Separate tracking for held, attended, and upcoming lectures

### Visual Features
- **Interactive Gauge**: Beautiful circular progress indicator
- **Glassmorphism UI**: Modern frosted glass design with smooth animations
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Status Indicators**: Color-coded feedback (success, warning, danger)

### User Experience
- **Real-time Updates**: Calculations update as you type
- **Input Validation**: Prevents invalid data entry
- **Keyboard Shortcuts**: Quick access to common actions
- **Help Modal**: Built-in guidance for using the calculator
- **Touch Support**: Optimized for mobile devices

## 🚀 Live Demo

[View Live Demo](https://bitcodeashishcloud.github.io/Ashish-Gupta-Portfolio/)

## 📱 Screenshots

### Desktop View
![Desktop View](docs/desktop-view.png)

### Mobile View
![Mobile View](docs/mobile-view.png)

### Calendar Mode
![Calendar Mode](docs/calendar-mode.png)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Advanced styling with CSS custom properties and modern layout
- **Vanilla JavaScript**: ES6+ features for interactive functionality
- **Responsive Design**: Mobile-first approach with flexible grid layouts

## 📋 Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/attendance-calculator.git
   cd attendance-calculator
   ```

2. **Open in browser**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

3. **Access the application**
   - Navigate to `http://localhost:8000` (or the port specified by your server)

### Deployment

#### GitHub Pages
1. Fork this repository
2. Go to repository Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://yourusername.github.io/attendance-calculator`

#### Netlify
1. Connect your GitHub repository to Netlify
2. Build settings: No build command needed (static site)
3. Publish directory: `/` (root)

#### Vercel
1. Import your GitHub repository
2. No build configuration needed
3. Deploy automatically

## 🎮 Usage Guide

### Simple Input Mode
1. Enter the total number of lectures held so far
2. Enter the number of lectures you've attended
3. Optionally, enter the expected number of upcoming lectures
4. View your current percentage and required attendance

### Calendar Mode
1. Click "Calendar Mode" toggle
2. Use navigation arrows to select the appropriate month
3. Switch between tabs (Held, Attended, Upcoming)
4. Click on dates to mark them for the selected category
5. Each selected date represents 8 classes

### Understanding Results
- **Current Attendance**: Your current attendance percentage
- **Required for 75%**: Additional lectures needed to reach 75%
- **Can Miss**: Number of upcoming lectures you can skip while maintaining 75%

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + R`: Reset all data
- `Ctrl/Cmd + Enter`: Recalculate results
- `Escape`: Close help modal
- `?`: Open help modal

## 📐 Calculations

### Attendance Percentage
```
Attendance % = (Lectures Attended ÷ Total Lectures) × 100
```

### Required for 75%
```
Required = max(0, ⌈(Total Lectures × 0.75) - Attended Lectures⌉)
```

### Can Miss Calculation
```
Total After Upcoming = Total Lectures + Upcoming Lectures
Required Total for 75% = ⌈Total After Upcoming × 0.75⌉
Can Miss = max(0, Attended + Upcoming - Required Total for 75%)
```

## 🎨 Customization

### Themes
The application automatically detects your system's color scheme preference. You can also manually override this by modifying the CSS custom properties in `style.css`.

### Colors
Update the color scheme by modifying the CSS custom properties:
```css
:root {
  --color-primary: #your-color;
  --color-success: #your-success-color;
  --color-warning: #your-warning-color;
  --color-danger: #your-danger-color;
}
```

### Calendar Classes per Day
To change the default 8 classes per day, modify the multiplier in `app.js`:
```javascript
// In getCalculationData() method
total: this.calendarData.held.size * 8, // Change 8 to your desired number
```

## 🧪 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 88+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly across different browsers
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Style
- Use modern ES6+ JavaScript features
- Follow semantic HTML5 practices
- Maintain consistent CSS custom property naming
- Add comments for complex logic
- Ensure responsive design principles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ashish Gupta**
- Portfolio: [https://bitcodeashishcloud.github.io/Ashish-Gupta-Portfolio/](https://bitcodeashishcloud.github.io/Ashish-Gupta-Portfolio/)
- GitHub: [@ashishgupta](https://github.com/ashishgupta)

## 🙏 Acknowledgments

- Thanks to all students who provided feedback during development
- Inspired by the need for simple, effective attendance tracking
- Design influenced by modern glassmorphism trends

## 📊 Project Stats

- **Lines of Code**: ~2000+
- **File Size**: ~50KB total
- **Load Time**: <500ms on 3G
- **Accessibility**: WCAG 2.1 AA compliant

## 🐛 Bug Reports

If you encounter any bugs or issues, please report them on the [Issues](https://github.com/yourusername/attendance-calculator/issues) page with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release
- Simple and calendar input modes
- Responsive glassmorphism design
- Dark/light mode support
- Touch and keyboard navigation
- Help system and validation

---

Made with ❤️ for students everywhere
