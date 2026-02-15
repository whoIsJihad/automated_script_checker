# AI Grading Platform

A modern React application for AI-powered worksheet grading with role-based access for teachers, students, and administrators.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-grading-platform.git
   cd ai-grading-platform
   ```

   > **Note**: Replace `your-username` with the actual GitHub username/organization

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   The application will be available at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

### Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Then restart
npm run dev
```

**Node version issues:**
```bash
# Check your Node version
node --version
# Should be 16 or higher
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## ✨ Features

### For Teachers
- Create and manage worksheets with AI model selection
- Configure advanced evaluation criteria and grading weights
- Monitor student submissions and AI-generated feedback
- Handle grade disputes with override capabilities
- Access comprehensive AI settings and customization

### For Students
- Submit assignments with file uploads
- View detailed AI-generated feedback and grades
- Track submission history and progress
- Report disputes for grade reviews
- Access personalized learning recommendations

### For Administrators
- System-wide monitoring and analytics
- AI model performance tracking
- User management and oversight
- Platform configuration and maintenance

### Key Capabilities
- **AI-Powered Grading**: Multiple LLM support (GPT-4o, Gemini 1.5, Claude 3)
- **Role-Based Access**: Secure, context-aware interfaces
- **Real-time Search**: Filter worksheets, submissions, and reports
- **Responsive Design**: Mobile-first approach with modern UI
- **Dispute Resolution**: Transparent grade review process

## 🏗️ Architecture

**Tech Stack:**
- React 19 + Vite
- Tailwind CSS + Framer Motion
- Lucide React icons

**Project Structure:**
```
src/
├── components/           # React components
│   ├── Layout.jsx       # Main navigation & layout
│   ├── TeacherPanel.jsx # Teacher dashboard
│   ├── StudentPanel.jsx # Student dashboard
│   ├── AdminPanel.jsx   # Admin dashboard
│   ├── UI/              # Shared UI components
│   └── [feature]/       # Feature-specific components
├── hooks/               # Custom React hooks
│   └── useMockData.js   # Data management
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

##  Understanding the Codebase

### Entry Point
Start with `src/main.jsx` → `src/App.jsx` → `src/components/Layout.jsx`

### State Management
- **Role switching**: localStorage persistence
- **Data**: Custom `useMockData` hook
- **Component state**: Local state for UI interactions

### Component Architecture
- **Layout**: Navigation + role-based panel rendering
- **Panels**: Teacher/Student/Admin dashboards
- **Features**: Modular components (forms, lists, modals)
- **UI**: Reusable design system components

### Key Components
- **TeacherPanel**: Worksheet creation, AI settings, dispute management
- **StudentPanel**: Assignment submission, feedback viewing
- **AiTutor**: AI-powered tutoring interface
- **Shared UI**: Card, Button, Modal, Input components

## 🔧 Development

### Adding Features
1. Identify target panel (Teacher/Student/Admin)
2. Create component in appropriate directory
3. Update data structures if needed
4. Test responsiveness

### Code Style
- **Components**: PascalCase, arrow functions
- **Hooks**: `use` prefix, camelCase
- **Props**: Destructure in parameters
- **Events**: `handle` prefix

### Design System
- **Colors**: slate, emerald, blue, purple, amber
- **Patterns**: Glassmorphism, gradients, hover animations
- **Responsive**: Mobile-first with breakpoints

## 🧪 Testing

**Role Switching:**
- Teacher: Create worksheets → Monitor submissions → Handle disputes
- Student: Submit assignments → View AI feedback → Report issues
- Admin: System oversight

**Key Workflows:**
1. Teacher creates worksheet with AI model selection
2. Students upload work → AI evaluates → Provides feedback
3. Students can dispute grades → Teachers review & override

## 📚 Key Concepts

### AI Integration
- **Models**: GPT-4o, Gemini 1.5, Claude 3
- **Process**: Image processing → AI analysis → Feedback generation
- **Dispute Resolution**: Student reports → Teacher override

### Data Flow
```
User Action → Component State → useMockData Hook → UI Update
Role Change → localStorage → Layout Re-render → Panel Switch
```

## 🔍 Debugging

**Common Issues:**
- Check props interface and data flow
- Verify Tailwind classes and responsive prefixes
- Ensure proper state management

**Tools:**
- React DevTools for component inspection
- Browser DevTools for CSS debugging
- Vite dev server for hot reload

## 📖 Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

---

**Happy coding!** 🎉 Modern React patterns with professional UI/UX.
