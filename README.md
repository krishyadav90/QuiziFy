<div align="center">
  <h1 style="font-size: 2.5em; color: #2563eb; margin-bottom: 10px;">🎓 Quiz Platform</h1>
  <p style="font-size: 1.2em; color: #4b5563; max-width: 800px; margin: 0 auto 30px;">✨ A modern, interactive quiz platform built with React, TypeScript, and Supabase ✨</p>
  
  <!-- Badges -->
  <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 30px;">
    <a href="https://reactjs.org/" target="_blank">
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
    </a>
    <a href="https://supabase.com/" target="_blank">
      <img src="https://img.shields.io/badge/supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
    </a>
  </div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">📋 Table of Contents</h2>
  <div style="columns: 2; column-gap: 20px;">
    <div>
      <h4 style="margin: 10px 0 5px 0; color: #1e40af;">Getting Started</h4>
      <ul style="margin: 0 0 15px 0; padding-left: 20px;">
        <li><a href="#-features" style="color: #2563eb; text-decoration: none;">✨ Features</a></li>
        <li><a href="#-getting-started" style="color: #2563eb; text-decoration: none;">🚀 Getting Started</a></li>
        <ul style="margin: 5px 0 10px 0; padding-left: 15px;">
          <li><a href="#prerequisites" style="color: #3b82f6; text-decoration: none;">Prerequisites</a></li>
          <li><a href="#installation" style="color: #3b82f6; text-decoration: none;">Installation</a></li>
          <li><a href="#environment-variables" style="color: #3b82f6; text-decoration: none;">Environment Variables</a></li>
        </ul>
      </ul>
    </div>
    <div>
      <h4 style="margin: 10px 0 5px 0; color: #1e40af;">Development</h4>
      <ul style="margin: 0 0 15px 0; padding-left: 20px;">
        <li><a href="#️-project-structure" style="color: #2563eb; text-decoration: none;">🛠️ Project Structure</a></li>
        <li><a href="#-tech-stack" style="color: #2563eb; text-decoration: none;">🧩 Tech Stack</a></li>
      </ul>
      <h4 style="margin: 10px 0 5px 0; color: #1e40af;">About</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li><a href="#-contributors" style="color: #2563eb; text-decoration: none;">🌟 Contributors</a></li>
        <li><a href="#-license" style="color: #2563eb; text-decoration: none;">📝 License</a></li>
      </ul>
    </div>
  </div>
</div>

## ✨ Features

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <h3 style="color: #1e40af; margin-top: 0;">For Students</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px;">
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">🎯</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Interactive Quiz Interface</h4>
      <p style="margin: 0; color: #4b5563;">Engaging and intuitive quiz-taking experience</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">📊</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Progress Tracking</h4>
      <p style="margin: 0; color: #4b5563;">Monitor your learning journey in real-time</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">📝</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Results & History</h4>
      <p style="margin: 0; color: #4b5563;">Review past performance and results</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">🏆</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Achievements</h4>
      <p style="margin: 0; color: #4b5563;">Earn badges and rewards</p>
    </div>
  </div>

  <h3 style="color: #1e40af; margin-top: 30px;">For Teachers</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">🎓</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Quiz Management</h4>
      <p style="margin: 0; color: #4b5563;">Create and organize quizzes</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">📊</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Analytics</h4>
      <p style="margin: 0; color: #4b5563;">Track student performance</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">📈</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Detailed Reports</h4>
      <p style="margin: 0; color: #4b5563;">In-depth result statistics</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="font-size: 24px; margin-bottom: 10px;">🏫</div>
      <h4 style="margin: 0 0 8px 0; color: #1e40af;">Class Management</h4>
      <p style="margin: 0; color: #4b5563;">Organize and manage classes</p>
    </div>
  </div>
</div>

### For Students
- 🎯 Interactive quiz interface
- 📊 Real-time progress tracking
- 📝 View quiz results and history
- 🏆 Achievement badges and rewards

### For Teachers
- 🎓 Create and manage quizzes
- 👥 Student performance analytics
- 📈 Detailed result statistics
- 🏫 Class management

### General
- 🌓 Light/Dark mode
- 🔐 Role-based authentication
- 📱 Responsive design
- ⚡ Fast and performant

<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
  <h2 style="color: #0369a1; margin-top: 0;">🚀 Getting Started</h2>

### Prerequisites
- Node.js 18+
- npm (v9+) or yarn (v1.22+)
- Supabase account (for backend services)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/krishyadav90/quiz-website.git
   cd quiz-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

</div>

## 🛠️ Project Structure

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <pre style="background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 8px; overflow-x: auto;">
    <code>src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication forms
│   ├── ui/            # Shadcn/ui components
│   └── ...
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Application pages
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   └── ...
└── styles/            # Global styles</code>
  </pre>
</div>

## 🔧 Available Scripts

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px;">
    <h4 style="margin: 0 0 10px 0; color: #15803d;">Development</h4>
    <code style="background: #dcfce7; padding: 5px 10px; border-radius: 4px; display: block; margin-bottom: 5px;">npm run dev</code>
    <p style="margin: 5px 0 0 0; color: #166534;">Start development server</p>
  </div>
  
  <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px;">
    <h4 style="margin: 0 0 10px 0; color: #1d4ed8;">Build</h4>
    <code style="background: #dbeafe; padding: 5px 10px; border-radius: 4px; display: block; margin-bottom: 5px;">npm run build</code>
    <p style="margin: 5px 0 0 0; color: #1e40af;">Build for production</p>
  </div>
  
  <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px;">
    <h4 style="margin: 0 0 10px 0; color: #b91c1c;">Linting</h4>
    <code style="background: #fee2e2; padding: 5px 10px; border-radius: 4px; display: block; margin-bottom: 5px;">npm run lint</code>
    <p style="margin: 5px 0 0 0; color: #991b1b;">Run ESLint for code quality</p>
  </div>
</div>

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🧩 Tech Stack

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <h3 style="color: #1e40af; margin-top: 0;">Frontend</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
    <span style="background: #e0f2fe; color: #0369a1; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      ⚛️ <strong>React</strong> - UI Library
    </span>
    <span style="background: #e0e7ff; color: #3730a3; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      🔷 <strong>TypeScript</strong> - Type Safety
    </span>
    <span style="background: #ccfbf1; color: #0d9488; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      🎨 <strong>Tailwind CSS</strong> - Styling
    </span>
  </div>

  <h3 style="color: #1e40af; margin-top: 20px;">Backend</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
    <span style="background: #f3e8ff; color: #7e22ce; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      🔥 <strong>Supabase</strong> - Auth & Database
    </span>
    <span style="background: #fce7f3; color: #be185d; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      🛡️ <strong>Row Level Security</strong>
    </span>
    <span style="background: #f0f9ff; color: #0369a1; padding: 8px 15px; border-radius: 20px; font-size: 14px; display: flex; align-items: center; gap: 5px;">
      🌐 <strong>REST API</strong>
    </span>
  </div>
</div>

### Frontend
- ⚛️ **React** - UI Library
- 🔷 **TypeScript** - Type Safety
- 🎨 **Tailwind CSS** - Styling
- 🛠️ **Shadcn/ui** - UI Components
- 📊 **Recharts** - Data Visualization
- 🔄 **React Query** - Data Fetching

### Backend
- 🔥 **Supabase** - Authentication & Database
- 🛡️ **Row Level Security** - Data Protection
- 🌐 **REST API** - Backend Services

### Development Tools
- ⚡ **Vite** - Build Tool
- 🛠️ **ESLint** - Code Linting
- 💅 **Prettier** - Code Formatting
- 🐺 **Husky** - Git Hooks

## 📝 License

<div style="text-align: center; margin: 30px 0;">
  <p>This project is licensed under the</p>
  <a href="LICENSE" style="display: inline-block; background: #1e40af; color: white; padding: 10px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 10px 0;">
    MIT License
  </a>
  <p>Copyright 2025 Krish Yadav</p>
</div>

## 🤝 Contributing

<div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0;">
  <p>We welcome contributions from the community! If you'd like to contribute, please follow these steps:</p>
  
  <div style="background: white; border-radius: 8px; padding: 15px; margin: 15px 0;">
    <ol style="margin: 0; padding-left: 20px;">
      <li style="margin-bottom: 10px;">Fork the repository</li>
      <li style="margin-bottom: 10px;">Create your feature branch (<code>git checkout -b feature/amazing-feature</code>)</li>
      <li style="margin-bottom: 10px;">Commit your changes (<code>git commit -m 'Add some amazing feature'</code>)</li>
      <li style="margin-bottom: 10px;">Push to the branch (<code>git push origin feature/amazing-feature</code>)</li>
      <li>Open a Pull Request</li>
    </ol>
  </div>
  
  <p>Please make sure to update tests as appropriate and follow our code of conduct.</p>
</div>

## 🌟 Contributors

<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0;">
  <!-- Contributor 1 -->
  <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 24px;">
        👨‍💻
      </div>
      <div>
        <h3 style="margin: 0 0 5px 0; color: #1e40af;">Krish Yadav</h3>
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Project Owner</p>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <a href="https://github.com/krishydev" target="_blank" style="color: #1e40af; text-decoration: none; font-size: 14px; display: flex; align-items: center;">
        <span style="margin-right: 5px;">👤</span> GitHub
      </a>
    </div>
  </div>

  <!-- Contributor 2 -->
  <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: #f0f9ff; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 24px;">
        🚀
      </div>
      <div>
        <h3 style="margin: 0 0 5px 0; color: #1e40af;">Deepak</h3>
        <p style="margin: 0; color: #4b5563; font-size: 14px;">Contributor</p>
      </div>
    </div>
    <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
      Made significant contributions to the project's documentation and UI/UX improvements.
    </p>
    <a href="https://github.com/phoenixdev100" target="_blank" style="color: #1e40af; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center;">
      <span style="margin-right: 5px;">👤</span> View Profile
    </a>
  </div>
</div>

## 📞 Contact

<div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin: 30px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  <h2 style="color: #1e40af; margin-top: 0; text-align: center;">Get In Touch</h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
    <!-- Contact Card 1 -->
    <div style="background: white; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px;">
        💬
      </div>
      <h3 style="margin: 0 0 10px 0; color: #1e40af;">Have Questions?</h3>
      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 14px;">Feel free to reach out for any questions or feedback</p>
      <a href="https://github.com/krishyadav90/Quiz-website/issues" style="display: inline-block; background: #1e40af; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
        Start Discussion
      </a>
    </div>
  </div>
</div>