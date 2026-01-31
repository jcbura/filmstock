# Filmstock

Transform your digital photos with authentic film photography effects using WebGL shaders. Filmstock lets you apply the look and feel of classic film stocks like Kodak Portra, Fuji Velvia, Cinestill 800T, and more.

## Features

### Film Emulation Effects

- **Film Grain**: Authentic texture simulation with adjustable intensity
- **Color Temperature**: Warm/cool color shifts (golden tones, blue casts)
- **Contrast Curves**: S-curve adjustments for film-like tonal response
- **Vignette**: Natural lens falloff darkening at edges
- **Fade (Blacks Lift)**: Characteristic faded look with lifted shadows
- **Halation**: Red-orange glow around bright lights (film backing effect)
- **Bloom**: Soft color-preserving glow for dreamy aesthetics
- **Saturation Control**: Full color, desaturated, or black & white

### Film Stock Presets

Choose from professionally calibrated presets that emulate real film stocks:

- **Kodak Portra**: Classic portrait film with warm, natural tones
- **Fuji Velvia**: Landscape favorite with punchy, saturated colors
- **Cinestill 800T**: Trendy night film with heavy red halation
- **Kodak Gold**: Consumer classic with golden vintage fade
- **Fuji 400H**: Soft pastel tones with green-blue shadows
- **Ilford HP5**: Classic black & white with moderate grain
- **Kodak Tri-X**: Gritty black & white with high contrast

### Core Features

- **Before/After Slider**: Interactive comparison view to see your edits in real-time
- **Drag & Drop**: Easy image upload interface
- **WebGL Acceleration**: Fast, GPU-powered shader effects
- **Flexible API**: Use presets, parameter objects, or individual values
- **TypeScript**: Full type safety with autocomplete for presets

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.4 with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Rendering**: WebGL shaders for high-performance image processing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Vega style)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (or yarn, pnpm, bun)
- A modern browser with WebGL support

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Filmulate in action.

Upload an image and watch it transform with authentic film photography effects!

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build the application for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint and fix issues
npm run format       # Format code with Prettier
```

## Usage Examples

### Using Film Stock Presets (Recommended)

```typescript
import { applyFilmShader } from '@/utils/film-webgl';

// Simple preset usage
applyFilmShader(canvas, image, 'kodak-portra');
applyFilmShader(canvas, image, 'cinestill-800t');
applyFilmShader(canvas, image, 'ilford-hp5'); // Black & white
```

### Custom Parameters

```typescript
// Use an object with custom parameters
applyFilmShader(canvas, image, {
  grainIntensity: 0.2,
  warmth: 0.7,
  contrast: 0.4,
  halation: 0.6,
  saturation: 1.0,
});
```

### Individual Parameters

```typescript
// Or pass individual parameters (advanced)
applyFilmShader(
  canvas,
  image,
  0.15, // grainIntensity
  0.65, // warmth
  0.3, // contrast
  0.4, // vignette
  0.5, // fade
  0.6, // halation
  0.4, // bloom
  1.0, // saturation
);
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Main app: drag-drop or editor view
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── drag-and-drop.tsx   # File upload interface
│   ├── editor.tsx          # Before/after slider with film effects
│   └── index.ts            # Component exports
├── utils/
│   ├── film-webgl.ts       # WebGL shader implementation & presets
│   ├── cn.ts               # Utility functions
│   └── index.ts            # Utility exports
└── styles/
    └── globals.css         # Global styles
```

## How It Works

Filmulate uses WebGL fragment shaders to apply film effects directly on the GPU for maximum performance:

1. **Image Upload**: User drags/drops or selects an image
2. **WebGL Context**: Canvas gets WebGL rendering context
3. **Shader Compilation**: Vertex and fragment shaders are compiled
4. **Effect Pipeline**: Effects are applied in optimal order:
   - Halation & Bloom (glow effects)
   - Contrast (S-curve)
   - Saturation (color/B&W)
   - Warmth (color temperature)
   - Fade (lift blacks)
   - Vignette (darken edges)
   - Grain (texture)
5. **Real-time Preview**: Before/after slider shows original vs. processed

## Film Effect Parameters

| Parameter        | Range     | Description                       |
| ---------------- | --------- | --------------------------------- |
| `grainIntensity` | 0.0 - 1.0 | Film grain texture amount         |
| `warmth`         | 0.0 - 1.0 | Color temperature (0.5 = neutral) |
| `contrast`       | 0.0 - 1.0 | S-curve contrast intensity        |
| `vignette`       | 0.0 - 1.0 | Edge darkening amount             |
| `fade`           | 0.0 - 1.0 | Black lift for faded look         |
| `halation`       | 0.0 - 1.0 | Red-orange glow around lights     |
| `bloom`          | 0.0 - 1.0 | Soft color-preserving glow        |
| `saturation`     | 0.0 - 2.0 | 0=B&W, 1=normal, >1=oversaturated |
