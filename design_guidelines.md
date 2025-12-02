# Café Pavillon - Design Guidelines

## Design Approach
**Reference-Based**: Elegant Parisian café aesthetic - warm, sophisticated, contemporary salon atmosphere with natural materials (wood, leather, ceramics) and soft lighting.

**Tone**: Elegant, warm, discreet, contemporary. No flashiness. Modern Parisian salon ambiance.

---

## Core Design Elements

### A. Color Palette (Exact Hex Values)
- **Charcoal** `#1F2937` - Primary text
- **Warm Sand** `#C49B6E` - Accent/buttons
- **Soft Cream** `#F6F3EE` - Background
- **Terracotta** `#A83E2E` - CTA accent
- **White** `#FFFFFF` - Cards/menu surfaces

### B. Typography
**Headings**: Playfair Display (weights 400, 700) - serif, normal letter-spacing
**Body/UI**: Inter (weights 300, 400, 600, 700) - sans-serif
**Fallbacks**: serif / system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial

### C. Layout System
- **Container**: Max-width 1200px, centered
- **Section Spacing**: 64px between sections (desktop)
- **Border Radius**: 12-16px for cards
- **Shadows**: Subtle `box-shadow: 0 6px 20px rgba(31,41,55,0.08)`
- **Breakpoints**: Mobile-first - sm:640px, md:768px, lg:1024px, xl:1280px

### D. Iconography
Lucide/Feather style - stroke weight 1.5-2px, rounded caps

---

## Component Specifications

### Header (Sticky)
- Logo (text+icon) left aligned
- Anchor navigation right aligned: À propos, Menu, Galerie, Privatisations, Réserver, Contact
- "Réserver" CTA button prominent
- Mobile: Compact logo + hamburger menu
- Floating "Réserver" button (bottom right) on mobile

### Hero Section
- Large hero image (16:9 aspect desktop, reduced height mobile)
- Centered text overlay with blurred button backgrounds
- H1: "Un chaleureux rendez-vous parisien"
- Subtitle paragraph
- Dual CTAs: "Voir le menu" / "Réserver"
- Quick info cards: Address, Phone, Hours

### À propos / Vision
- Two-column layout (desktop): Text left, image right
- Heading + paragraph + 2 bullet points with icons
- Generous whitespace

### Menu Section
- Card-based layout for menu categories
- Categories: Cafés signatures, Pâtisseries, Planches
- Item name + description + price in warm sand
- "Voir le menu complet (PDF)" button

### Gallery
- Masonry or 3-column grid (desktop)
- Lazy loading implementation
- Lightbox modal for full-view (keyboard accessible)
- Mobile: 1-2 columns

### Privatisations & Événements
- Split layout: Info + visual
- Capacity details, commercial proposition
- "Demander un devis" CTA with form

### Reservation Form
- Clean, accessible form layout
- Fields: Name, Phone, Email, Date, Time, Party Size, Notes
- Client-side validation, clear error states
- Success/error messaging

### Contact & Map
- Grid layout: Contact info + Interactive map
- Address, phone (clickable tel:), email, social links
- Map integration (Leaflet or Google Maps)

### Footer
- Multi-column layout: Legal, Hours, Social, Newsletter opt-in
- Understated, organized

---

## Photography Direction
- Warm, luminous imagery with shallow depth of field
- Close-ups of coffee/pastries with slight bokeh
- Ambient shots showing discreet clientele
- Studio/professional photography style
- Prototype: Unsplash for warm café imagery

### Images to Include:
1. **Hero**: Large atmospheric café interior or signature coffee, 16:9 format
2. **About**: Warm detail shot of café environment or artisan preparation
3. **Gallery**: 9-12 images - coffee cups, pastries, interior details, ambiance shots
4. **Events**: Space setup or gathering atmosphere

---

## Animation & Interactions
**Subtle micro-animations only**:
- Hero: Gentle fade/slide-in on load
- Images: Hover scale 1.03 (160-260ms ease-out)
- Buttons: Press scale 0.98
- Smooth scroll for anchor navigation
- Gallery lightbox fade transitions

**No distracting animations** - maintain elegant restraint

---

## Accessibility Requirements
- WCAG AA contrast compliance (verified with provided colors)
- All interactive elements: visible `:focus` states
- Semantic HTML throughout
- Forms: linked labels (for/id), aria-invalid for errors
- Images: Descriptive alt text - Gallery: "Photo — [brief description]"
- Skip link to main content
- Keyboard-accessible lightbox
- `lang="fr"` on html element

---

## Responsive Behavior
**Mobile**: 
- Stacked single-column layouts
- Reduced hero image height, centered text
- Hamburger navigation
- Floating reservation CTA

**Desktop**:
- Multi-column grids where appropriate
- Generous spacing and breathing room
- Side-by-side content/image layouts

---

## Performance Considerations
- WebP images + JPEG fallback
- Responsive image sizing (srcset)
- Lazy loading for gallery/non-critical images
- Optimized font loading (woff2, font-display: swap)
- Initial JS bundle <150-200KB gzipped