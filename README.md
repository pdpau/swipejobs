# SwipeTalentYouz
A job matching platform that implements a Tinder-like swiping interface for job opportunities.

## Overview
SwipeTalentYouz is a Next.js application that allows users to browse job offers through an intuitive swipe interface. Users can register, view job details, and express interest in positions by swiping right, or pass on opportunities by swiping left.

## Features
- User registration system
- Swipeable job card interface
- Job details including company info, requirements, and functions
- Mobile-responsive design
- Real-time match tracking
- Integration with Supabase backend

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS, Shadcn/ui
- **Backend**: Supabase
- **State Management**: React Hooks
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables. Create a `.env.local` file in the root directory and add the following variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-anon-key]
```

4. Run the development server
```bash
npm run dev
```

## Project Structure

```bash
├── app/
│   ├── components/     # Reusable UI components
│   ├── fonts/          # Custom fonts
│   ├── offers-page/    # Job offers view
│   ├── register-page/  # User registration
│   └── thankyou-page/  # Success page
├── page.tsx           # Main page component
├── globals.css        # Global styles
├── layout.tsx         # Main layout component
├── types.d.ts         # TypeScript types
├── components/
│   └── ui/            # Shadcn components
├── lib/               # Utilities and configurations
└── public/           # Static assets
```

## Database Schema
The project uses Supabase with the following tables:
- Users: User registration information
- Offers: Jobs available for swiping
- Users_Offers: Match tracking between users and job offers

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a pull request
