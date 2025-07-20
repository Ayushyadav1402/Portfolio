# 🚀 VS Code Setup Guide

This guide will help you set up the Mysterious Portfolio project in VS Code for standalone development.
## 🚀 Live Demo
👉 [View Portfolio](https://portfolio-psi-swart-48.vercel.app/)


## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** (optional) - [Download here](https://git-scm.com/)

## 🛠️ Setup Instructions

### 1. Create New Folder

```bash
mkdir mysterious-portfolio
cd mysterious-portfolio
```

### 2. Copy Project Files

Copy all the following files and folders to your new directory:

- `client/` folder (entire folder with all components)
- `public/` folder
- `index.html`
- `package-standalone.json` → rename to `package.json`
- `vite-standalone.config.ts` → rename to `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `tsconfig.json`
- `README.md`

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## 🔧 VS Code Configuration

### Recommended Extensions

Install these VS Code extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Importer**
4. **Auto Rename Tag**
5. **Prettier - Code formatter**
6. **ESLint**
7. **GitLens**

### Settings Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.suggest.autoImports": true,
  "css.validate": false,
  "scss.validate": false,
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## 📁 Project Structure

```
mysterious-portfolio/
├── client/                 # React source code
│   ├── components/        # All React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── CommentBox.tsx
│   │   ├── Footer.tsx
│   │   ├── Background.tsx
│   │   └── ParticleSystem.tsx
│   ├── global.css         # Global styles & theme
│   └── App.tsx           # Main app component
├── public/                # Static assets
├── index.html            # HTML entry point
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🎨 Customization

### 1. Profile Picture

Replace the placeholder in `Hero.tsx`:

```tsx
{
  /* Replace this section with your actual image */
}
<div className="w-full h-full bg-gradient-to-br from-mystery-700 to-mystery-600 flex items-center justify-center">
  <img
    src="/path-to-your-image.jpg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>;
```

### 2. Personal Information

Update the following files:

- `Hero.tsx` - Name, title, status
- `Projects.tsx` - Your actual projects
- `Skills.tsx` - Your skills and levels
- `Footer.tsx` - Contact information

### 3. Colors & Theme

Modify colors in `client/global.css`:

```css
:root {
  --mystery-900: 240 15% 5%; /* Deep space black */
  --neon-purple: 280 100% 70%; /* Electric purple */
  --neon-blue: 200 100% 60%; /* Cyan blue */
  /* Add your custom colors */
}
```

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run typecheck # Check TypeScript types
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port 3000 is busy**

   - Change port in `vite.config.ts`
   - Or kill process: `npx kill-port 3000`

2. **TypeScript errors**

   - Run: `npm run typecheck`
   - Check import paths use `@/` prefix

3. **Tailwind styles not working**

   - Ensure `client/global.css` is imported
   - Check Tailwind config paths

4. **GSAP animations not working**
   - Verify GSAP is installed: `npm list gsap`
   - Check ScrollTrigger plugin registration

## 🌟 Features Available

- ✅ Responsive design
- ✅ Dark theme with neon accents
- ✅ GSAP animations & scroll triggers
- ✅ Profile picture support
- ✅ Skills progress bars
- ✅ Project showcase
- ✅ Live comment system
- ✅ Floating particle effects
- ✅ Glass morphism design
- ✅ Mobile-friendly navigation

## 📱 Testing Responsiveness

1. Open Chrome DevTools (F12)
2. Click device toggle icon
3. Test on various screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px+

## 🎯 Next Steps

1. Add your actual profile picture
2. Update personal information
3. Add your real projects
4. Customize colors to match your brand
5. Deploy to Netlify/Vercel

Happy coding! 🌙✨
