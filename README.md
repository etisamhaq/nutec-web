# Blitz Learning Platform

A modern, responsive online learning platform built with React and TypeScript. This project demonstrates how to create a full-featured learning management system without using a traditional database, instead utilizing browser storage for data persistence.

## Features

- 🎨 Custom-designed UI with dark/light theme support
- 📱 Fully responsive design for all devices
- 📚 Course browsing and enrollment system
- 📊 Progress tracking for enrolled courses
- 📧 Newsletter subscription system
- 📝 Contact form with email integration
- 🎯 Custom progress tracking components
- 💾 Data persistence using localStorage

## Tech Stack

- React 18
- TypeScript
- Styled Components
- React Router
- Framer Motion
- EmailJS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutec-learning.git
cd nutec-learning
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Data Storage

This project uses browser storage (localStorage) to persist data instead of a traditional database. The following data is stored:

- Enrolled courses and progress
- Newsletter subscriptions
- User preferences (theme selection)

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── styles/        # Global styles and theme
├── types/         # TypeScript interfaces
└── data/          # Mock data
```

## Custom Features

1. **Theme Switcher**
   - Toggle between light and dark themes
   - Persists user preference in localStorage

2. **Progress Tracking**
   - Custom progress bar component
   - Visual representation of course completion
   - Real-time progress updates

3. **Responsive Design**
   - Mobile-first approach
   - Fluid layouts
   - Adaptive components

4. **Form Validation**
   - Client-side validation for all forms
   - Error handling and success messages
   - Email integration for contact form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Fonts for the typography
- Framer Motion for animations
- Styled Components for styling
- EmailJS for email functionality
