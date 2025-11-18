# Design Guidelines: Netflix-Inspired Bible Study Application

## Design Approach
**Reference-Based: Netflix-Inspired Interface**
Taking direct inspiration from Netflix's content-first, carousel-heavy interface adapted for biblical study and devotional content. This creates an engaging, modern experience that makes Bible content feel accessible and inviting.

## Typography System
**Font Families:**
- Primary: 'Inter' for UI elements and body text
- Display: 'Playfair Display' for biblical passages and devotional headlines
- Monospace: 'Source Code Pro' for verse references

**Hierarchy:**
- Hero/Section Titles: text-4xl to text-6xl, font-bold
- Card Titles: text-xl to text-2xl, font-semibold
- Body Text (Bible verses): text-base to text-lg, leading-relaxed
- Metadata/Labels: text-sm, font-medium, uppercase tracking-wide

## Layout System
**Spacing Primitives:** Standardize on Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-24
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl

## Core Navigation Structure

**Top Navigation Bar:**
- Fixed header with logo left, tab navigation center, user profile/theme toggle right
- Height: h-16
- Tabs: Bible, Devotional, Reading Plan, Q&A, Multimedia, Favorites
- Active tab indicator with bottom border accent

**Horizontal Carousel Pattern (Netflix-style):**
- Section header with title and "See All" link
- Scrollable row of cards with smooth horizontal scroll
- Card spacing: gap-4
- Peek next card on viewport edge to suggest scrollability
- Navigation arrows on hover for desktop

## Component Library

**Bible Reading Interface:**
- Split layout: Book selector sidebar (w-64) + Reading panel (flex-1)
- Chapter navigation as numbered pills
- Verse display with generous line-height (leading-loose)
- Verse numbers as subtle superscripts
- Highlight/notes toolbar as sticky bottom bar when text selected

**Content Cards (Devotional, Multimedia):**
- Aspect ratio 16:9 for video/image cards
- Card dimensions: w-64 to w-80 on desktop, full-width stacked on mobile
- Overlay gradient on hover with title/metadata
- Play icon center for video content
- Save/favorite icon top-right corner

**Book Selection Grid:**
- Testament headers (Old/New) with visual separation
- Book cards in responsive grid: grid-cols-2 md:grid-cols-4 lg:grid-cols-6
- Each card shows book abbreviation, full name, chapter count

**Daily Devotional Feature Card:**
- Hero-style featured card at top: h-96
- Large background image with text overlay
- Blur background for text readability
- CTA button with backdrop-blur-sm
- Date badge top-left corner

**Reading Progress Tracker:**
- Visual calendar grid showing completed days
- Streak counter with flame icon
- Progress bar with percentage
- Achievement badges display

**Q&A Section:**
- Accordion-style FAQ list
- Question cards with expand/collapse
- Search bar at top with icon
- Category filters as pills

**Quiz Interface:**
- Question card centered with generous padding (p-8)
- Multiple choice buttons as full-width options
- Progress indicator top: "Question 3 of 10"
- Score display and feedback panel

**Flashcard Component:**
- Card with flip animation
- Front: Verse reference, Back: Full verse text
- Navigation arrows and card counter
- Shuffle and mark as learned buttons

**Profile Dashboard:**
- Stats grid: grid-cols-1 md:grid-cols-3
- Stat cards with large numbers, icons, labels
- Recent activity timeline
- Achievement showcase carousel

## Images

**Hero/Featured Sections:**
- Daily Devotional: Inspirational nature/spiritual imagery (mountains, light, peaceful scenes)
- Multimedia section hero: Biblical scene artwork or documentary stills
- Profile header: Customizable background banner

**Content Cards:**
- Devotional cards: Thematic photos matching devotional topic
- Video thumbnails: Documentary/teaching content previews
- Book covers: Stylized book imagery for Bible books

**Decorative Elements:**
- Background patterns: Subtle biblical motifs (scrolls, ancient text textures) as overlays
- Achievement badges: Custom icon illustrations
- Empty states: Welcoming illustrations for no saved items

## Responsive Behavior

**Desktop (lg+):**
- Full horizontal carousels with 4-6 visible cards
- Sidebar navigation for Bible books
- Multi-column layout for comparison views

**Tablet (md):**
- 2-3 cards visible in carousels
- Collapsible sidebar to drawer
- Stacked sections maintain carousel pattern

**Mobile (base):**
- Single card view with horizontal scroll
- Bottom tab bar for main navigation
- Full-screen reading mode
- Swipe gestures for chapter navigation

## Interactive Patterns

**Carousel Behavior:**
- Smooth scroll with snap points
- Drag to scroll on touch devices
- Arrow navigation on desktop
- Auto-scroll disabled for user control

**Bible Reading:**
- Tap verse to highlight
- Long-press for notes/share menu
- Pinch-to-zoom for text size
- Bookmark icon in header for saving position

**Search:**
- Global search overlay with backdrop
- Recent searches display
- Filter by content type (verses, devotionals, videos)
- Instant results as you type

This design creates an immersive, content-rich experience that makes biblical study feel modern and accessible while respecting the sacred nature of the content.