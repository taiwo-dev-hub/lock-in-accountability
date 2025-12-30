# Lock-In Accountability App

An AI-powered accountability partner app that helps you stay focused and committed to your goals with real-time session tracking, automated penalty enforcement, and intelligent feedback powered by Google Gemini AI.

## Features

### Core Functionality
- **Real-time Session Tracking**: Monitor your focus sessions in real-time with an animated countdown timer
- **Automated Penalty System**: Set custom penalties for breaking focus and let the system enforce them automatically
- **Session Goals**: Define clear objectives for each session with focus rating system
- **Break Timer**: Structured break periods to maintain productivity and prevent burnout
- **Session Reflection**: Post-session analysis and feedback powered by AI

### Technical Stack
- **Frontend**: React.js, Next.js, TypeScript
- **AI Integration**: Google Gemini 3 Flash Preview API
- **Styling**: Modern responsive CSS with animations
- **State Management**: React hooks for session state management

## How It Works

1. **Set Your Goal**: Define what you want to accomplish in your focus session
2. **Start Session**: Click the START button and begin your focused work
3. **Real-time Progress**: Watch the progress bar fill as time progresses and the timer counts down
4. **Session End**: When time expires, get AI-powered feedback on your performance
5. **Penalties**: If you break focus, automated penalties are applied based on your rules
6. **Track Progress**: Review your session history and improvement over time

## Getting Started

### Prerequisites
- Node.js 16+ or later
- npm or yarn package manager
- Google Generative AI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/taiwo-dev-hub/lock-in-accountability.git

# Navigate to project directory
cd lock-in-accountability

# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

### Usage
1. Open the app in your browser (typically http://localhost:3000)
2. Set your focus duration and goals
3. Click **BIND** to commit to your session (you can't back out!)
4. Click **START** to begin your focus timer
5. Use **SPACE** key to quickly toggle break mode
6. Click **FORFEIT** if you need to end the session early (penalty applied)

### Keyboard Shortcuts
- **SPACE**: Start/Stop timer or toggle break mode
- **ESC**: View menu options
- **B**: Bind commitment
- **S**: Start timer
- **F**: Forfeit session

## API Integration

The app uses the Google Generative AI API to:
- Generate personalized feedback on session performance
- Suggest improvements based on your goals and focus patterns
- Provide motivational messages and accountability insights
- Analyze break patterns and recommend optimal break durations

## Development

### Project Structure
```
lock-in-accountability/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Next.js pages
│   ├── styles/         # CSS files
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript types
├── public/             # Static assets
├── package.json        # Dependencies
└── next.config.js      # Next.js configuration
```

### Building for Production
```bash
npm run build
npm run start
```

## Features Implemented

✅ Real-time session timer with countdown animation
✅ Progress bar visualization with red fill animation
✅ Animated timer display
✅ SPACE key shortcut for quick interactions
✅ Break timer with structured pause functionality
✅ Session reflection powered by Gemini AI
✅ Automated penalty enforcement system
✅ Focus rating system (1-10 scale)
✅ Session history tracking
✅ Responsive design for mobile and desktop

## Roadmap

- [ ] User authentication and cloud sync
- [ ] Leaderboard system for competitive accountability
- [ ] Integration with calendar apps
- [ ] Mobile app version
- [ ] Voice feedback and notifications
- [ ] Advanced analytics dashboard
- [ ] Team accountability features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue on the GitHub repository or contact the maintainers.

## Credits

Built with ❤️ by **Taiwo** (taiwo-dev-hub)
Powered by [Google Generative AI](https://ai.google.dev)

---

**Note**: This app is designed to be a powerful accountability tool. Use it to build better habits and achieve your goals with focused, distraction-free work sessions.
