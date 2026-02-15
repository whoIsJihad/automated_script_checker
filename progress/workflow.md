# Workflow Documentation for Setting Up the Role-Based AI Grading Platform Mock UI

Hey there! I'm an AI assistant, and this document explains step-by-step what I did to set up your React project with Tailwind CSS and Lucide-React icons. I used special tools to automate tasks like running commands, creating files, and editing code. Think of these tools as helpers that let me interact with your computer safely.

I'll explain it like you're new to this (a "noob"), so I'll keep it simple. The goal was to create a basic layout with a role switcher (teacher/student) as you requested.

## Step 1: Planning the Project Setup
- **What I did:** I used a tool called `create_new_workspace` to get information on how to set up a Vite React project. Vite is a fast build tool for modern web apps.
- **Why:** You wanted a React app, so I needed the right setup instructions.
- **Tool used:** `create_new_workspace` - This tool provides project scaffolding details based on the type (like 'vite' for Vite projects).
- **For noobs:** It's like asking a friend for a recipe before cooking.

## Step 2: Scaffolding the Project
- **What I did:** Ran the command `npx create-vite@latest . --template react` in the terminal to create the basic React project structure.
- **Why:** This gives us a starting point with React, without TypeScript (since you didn't specify it).
- **Tool used:** `run_in_terminal` - This lets me execute shell commands safely.
- **For noobs:** `npx` is like downloading a tool temporarily. The `.` means "in the current folder." It created folders like `src/`, `public/`, and files like `package.json`.

## Step 3: Installing Tailwind CSS
- **What I did:** Installed Tailwind CSS and related tools with `npm install -D tailwindcss postcss autoprefixer`.
- **Why:** Tailwind is for styling with classes like `bg-indigo-600`. The `-D` means dev dependencies (only for development).
- **Tool used:** `run_in_terminal` again.
- **For noobs:** Tailwind is a CSS framework that makes styling easy without writing custom CSS files.

## Step 4: Configuring Tailwind CSS
- **What I did:** Tried `npx tailwindcss init -p`, but it failed due to version issues. So, I manually created `tailwind.config.js` and `postcss.config.js` files with the right settings.
- **Why:** These files tell Tailwind how to work with your project.
- **Tool used:** `create_file` - This creates new files with content.
- **For noobs:** Config files are like settings. I wrote the code for them because the automatic tool didn't work.

## Step 5: Setting Up CSS
- **What I did:** Replaced the content in `src/index.css` with Tailwind's base directives (`@tailwind base;`, etc.).
- **Why:** This enables Tailwind styles in your app.
- **Tool used:** `replace_string_in_file` - This edits existing files by swapping old text with new text.
- **For noobs:** CSS files style your page. Now, Tailwind is ready to use.

## Step 6: Installing Lucide-React
- **What I did:** Ran `npm install lucide-react`.
- **Why:** For icons like the graduation cap and toggle buttons.
- **Tool used:** `run_in_terminal`.
- **For noobs:** Lucide is a free icon library. React version means it works with React components.

## Step 7: Creating the Layout Component
- **What I did:** Created a `src/components/` folder, then made `Layout.jsx` with the nav bar, role badge, toggle button, and main dashboard.
- **Why:** This is the core UI you requested, using React hooks (`useState`) for role switching.
- **Tool used:** `create_directory` and `create_file`.
- **For noobs:** Components are reusable pieces of UI. The layout shows different content based on the role.

## Step 8: Updating App.js
- **What I did:** Edited `src/App.jsx` to import and use the Layout component, managing the role state.
- **Why:** This makes the app start with the layout.
- **Tool used:** `replace_string_in_file`.
- **For noobs:** App.js is the main file. It now renders the layout instead of the default Vite content.

## Step 9: Fixing Build Issues
- **What I did:** Installed `@tailwindcss/postcss` and updated `postcss.config.js` because of a PostCSS error.
- **Why:** Newer Tailwind versions need this separate plugin.
- **Tool used:** `run_in_terminal` and `replace_string_in_file`.
- **For noobs:** PostCSS processes CSS. I fixed a compatibility issue.

## Step 10: Building and Verifying
- **What I did:** Ran `npm run build` to check for errors.
- **Why:** Ensures the code compiles without issues.
- **Tool used:** `run_in_terminal`.
- **For noobs:** Building is like checking if your code is correct before running.

## Step 11: Documentation
- **What I did:** Created `.github/` directory and `copilot-instructions.md` with a checklist of steps.
- **Why:** Tracks progress and provides instructions for future work.
- **Tool used:** `create_directory` and `create_file`.
- **For noobs:** This file helps remember what was done and what to do next.

## Step 12: Creating Mock Data Store
- **What I did:** Created a `src/hooks/` directory and added `useMockData.js` with initial arrays for worksheets and submissions, plus functions to add worksheets and filter submissions by role.
- **Why:** To provide centralized mock data for the app, with state management for future components.
- **Tool used:** `create_directory` and `create_file`.
- **For noobs:** This hook acts like a mini database. Worksheets are teacher-created assignments, submissions are student work. The hook manages adding new data and showing only relevant info based on role.

## Step 13: Building Teacher Panel
- **What I did:** Created `TeacherPanel.jsx` with a form to create worksheets, AI settings section, recommendation badge, and list of active worksheets. Updated App.jsx and Layout.jsx to integrate the mock data hook and show the panel for teachers.
- **Why:** To implement the teacher's UI for creating worksheets and configuring AI evaluation.
- **Tool used:** `create_file` and `replace_string_in_file`.
- **For noobs:** This component lets teachers add new assignments and set up how AI grades them. It only shows when the role is teacher.

## Final Notes
- **Tools I used:** Mostly `run_in_terminal` for commands, `create_file`/`replace_string_in_file` for code, and others for setup.
- **Why this workflow:** I gather context first, then perform actions step-by-step, validating with builds/tests.
- **For noobs:** Coding with AI is like having a smart assistant that follows recipes. If something fails, I iterate (try again with fixes).
- **Next:** You can run `npm run dev` to start the app locally. The layout is modular, so adding features is easy.

If you have questions, ask!