# Event Timeline

A modern web application for creating and managing events on an interactive timeline.

## Features

- <img src="https://unpkg.com/ionicons@7.1.0/dist/svg/calendar.svg" width="16" height="16" align="middle" /> **Interactive Timeline Visualization** - View all your events on a visual timeline
- <img src="https://unpkg.com/ionicons@7.1.0/dist/svg/create.svg" width="16" height="16" align="middle" /> **Create & Edit Events** - Add new events with title, description, date, and time
- <img src="https://unpkg.com/ionicons@7.1.0/dist/svg/trash.svg" width="16" height="16" align="middle" /> **Delete Events** - Remove events you no longer need
- <img src="https://unpkg.com/ionicons@7.1.0/dist/svg/save.svg" width="16" height="16" align="middle" /> **Persistent Storage** - All events are saved locally in your browser
- <img src="https://unpkg.com/ionicons@7.1.0/dist/svg/color-palette.svg" width="16" height="16" align="middle" /> **Modern UI** - Clean, responsive design with smooth animations

## Live Demo

Visit the live application: [https://nandiraju.github.io/add-to-timeline](https://nandiraju.github.io/add-to-timeline)

## Running Locally

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:nandiraju/add-to-timeline.git
cd add-to-timeline
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **vis-timeline** - Timeline visualization
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation

## License

MIT
