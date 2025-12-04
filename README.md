# Portfolio Website - Manav Avdesh Jaiswal

A production-ready personal portfolio website with a Stranger Things-inspired, highly interactive theme. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Theme

The website features a unique 80s synthwave aesthetic inspired by Stranger Things (without copyrighted fonts, logos, or images):

- **Normal World**: Clean modern dark AI portfolio
- **Upside Down**: Intense red/blue theme with floating particle effects
- Interactive animations and hover effects throughout
- Custom cursor effects and fairy light navbar

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (shadcn/ui style)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── case-files/        # Dynamic routes for blog posts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── navbar.tsx        # Navigation bar
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About section
│   ├── skills.tsx        # Skills section
│   ├── projects.tsx      # Projects section
│   ├── gallery.tsx       # Gallery section
│   ├── timeline.tsx      # Timeline section
│   ├── case-files.tsx    # Writing section
│   ├── contact.tsx       # Contact section
│   ├── cursor-effect.tsx # Custom cursor
│   └── upside-down-particles.tsx # Theme particles
├── data/                 # Content data
│   ├── profile.ts        # Profile information
│   ├── skills.ts         # Skills data
│   ├── projects.ts       # Projects data
│   ├── timeline.ts       # Timeline/experience data
│   ├── posts.ts          # Blog posts data
│   └── gallery.ts        # Gallery images data
├── lib/                  # Utilities
│   ├── utils.ts         # Utility functions
│   ├── theme.ts         # Theme configuration
│   └── theme-context.tsx # Theme context provider
└── public/               # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Editing Content

All content is centralized in the `data/` directory for easy updates:

### Profile Information
Edit `data/profile.ts`:
- Name, role, tagline
- Bio and location
- Education details
- Social links
- Tech stack

### Skills
Edit `data/skills.ts`:
- Add/remove skills
- Update categories, levels, descriptions
- Modify project usage counts

### Projects
Edit `data/projects.ts`:
- Add new projects with full details
- Update existing project information
- Modify categories and tech stacks

### Timeline
Edit `data/timeline.ts`:
- Add new seasons/experiences
- Update roles and descriptions
- Modify highlights

### Blog Posts
Edit `data/posts.ts`:
- Add new case files
- Update post metadata
- Add content (or use dynamic routes for full posts)

### Gallery
Edit `data/gallery.ts`:
- Add new gallery items
- Update captions and descriptions
- Add image paths (place images in `public/images/gallery/`)

## 🎯 Features

### Sections

1. **Hero** - Interactive hero with rotating roles and parallax effects
2. **About** - Bio and quick facts cards
3. **Skills** - Filterable skills grid with hover effects
4. **Projects** - Project showcase with modals and deep dive drawers
5. **Gallery** - Visual experiments with lightbox
6. **Timeline** - Experience timeline (Seasons)
7. **Case Files** - Blog posts with dynamic routes
8. **Contact** - Contact form with API integration

### Interactive Features

- **Theme Toggle**: Switch between Normal World and Upside Down modes
- **Keyboard Shortcut**: Press `Ctrl + M` to toggle theme
- **Fairy Lights**: Animated navbar lights
- **Custom Cursor**: Glowing cursor effect on interactive elements
- **Hover Effects**: Rich animations on cards, buttons, and links
- **Smooth Scrolling**: Anchor-based navigation
- **Responsive Design**: Mobile-first, fully responsive

### Accessibility

- Respects `prefers-reduced-motion` for users who prefer less animation
- Semantic HTML structure
- Keyboard navigation support
- Focus states on interactive elements

## 🔧 Configuration

### Theme Configuration

Edit `lib/theme.ts` to customize colors and theme settings.

### API Integration

The contact form API route is at `app/api/contact/route.ts`. Currently, it logs submissions to the console. To integrate with a real service:

1. **Email Service** (e.g., Resend, SendGrid):
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'portfolio@example.com',
  to: 'manavj99@gmail.com',
  subject: `Portfolio Contact: ${name}`,
  html: `<p>From: ${email}</p><p>${message}</p>`
});
```

2. **Webhook** (e.g., Zapier, Make.com):
```typescript
await fetch(process.env.WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

Add your API keys to `.env.local`:
```
RESEND_API_KEY=your_key_here
WEBHOOK_URL=your_webhook_url_here
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Add environment variables if needed
5. Deploy!

### Manual Build

```bash
npm run build
npm start
```

## 📦 Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Add your API keys here
RESEND_API_KEY=your_key_here
WEBHOOK_URL=your_webhook_url_here
```

## 📄 Resume File

To enable the "Download Resume" button in the Hero section:

1. Place your resume PDF in the `public/` directory as `resume.pdf`
2. Or update the link in `components/hero.tsx` to point to your resume URL

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:
- `neon-red`: Primary accent color
- `neon-blue`: Secondary accent color
- `neon-purple`: Tertiary accent color

### Animations

Animations are configured in:
- `tailwind.config.ts` for CSS animations
- Component files for Framer Motion animations

### Fonts

Currently using Inter from Next.js. To change:
1. Import your font in `app/layout.tsx`
2. Update the `font` variable
3. Apply to the `body` className

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

Manav Avdesh Jaiswal
- Email: manavj99@gmail.com
- LinkedIn: [linkedin.com/in/manav-jaiswal](https://linkedin.com/in/manav-jaiswal)
- GitHub: [github.com/manavj99](https://github.com/manavj99)

---

Built with ❤️ using Next.js and TypeScript

