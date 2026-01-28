# Chat Mobile App Design Guidelines

## Brand Identity

**Purpose**: A social messaging app combining direct chat with content discovery through posts and reels, enabling users to connect through conversations and shared moments.

**Aesthetic Direction**: Soft/pastel with bold accents - creating an approachable, calming atmosphere while maintaining energy through strategic color pops. The app feels friendly and inviting, encouraging daily engagement without overwhelm.

**Memorable Element**: Floating gradient action buttons that shift subtly based on context, creating a sense of living, breathing interaction.

## Navigation Architecture

**Root Navigation**: Tab Bar (4 tabs + Floating Action Button)

**Tabs**:
1. **Chats** - Active conversations list
2. **Posts** - Social feed with image posts
3. **Reels** - Short-form video content
4. **Profile** - User account and settings

**Core Action**: Floating Action Button (FAB) - Create new content (post/reel/message)

**Authentication**: Required - SSO with Apple Sign-In and Google Sign-In

## Screen-by-Screen Specifications

### Login/Signup Screens
- **Purpose**: Authenticate users
- **Layout**: Centered logo, SSO buttons stacked vertically, legal links at bottom
- **Components**: App logo, "Sign in with Apple" button, "Sign in with Google" button, terms/privacy links
- **Safe Area**: Top: insets.top + 48, Bottom: insets.bottom + 24

### Chats Screen (Tab 1)
- **Purpose**: View and access all conversations
- **Layout**: 
  - Header: Transparent, title "Chats", search icon (right), avatar button (left)
  - Content: Scrollable list of chat previews
  - FAB: Positioned bottom-right for new message
- **Components**: Search bar (reveals on search icon tap), chat list items (avatar, name, last message, timestamp, unread badge)
- **Empty State**: empty-chats.png illustration
- **Safe Area**: Top: headerHeight + 16, Bottom: tabBarHeight + 80 (for FAB clearance)

### Chat Detail Screen (Modal Stack)
- **Purpose**: View conversation history and send messages
- **Layout**:
  - Header: Default navigation with back button (left), contact name (center), video/call icons (right)
  - Content: Scrollable message list (reverse chronological)
  - Footer: Fixed message input with send button
- **Components**: Message bubbles (sent/received), timestamp clusters, input field, send button, media attachment button
- **Safe Area**: Top: 0, Bottom: insets.bottom

### Posts Screen (Tab 2)
- **Purpose**: Browse image-based social feed
- **Layout**:
  - Header: Transparent, title "Posts", filter icon (right)
  - Content: Scrollable vertical feed
- **Components**: Post cards (image, username, caption, like/comment counts), like button, comment button
- **Safe Area**: Top: headerHeight + 16, Bottom: tabBarHeight + 16
- **Sample Posts**: 3-4 example posts with sample-post-1.png through sample-post-4.png

### Post Detail Screen (Stack)
- **Purpose**: View post with comments
- **Layout**:
  - Header: Default navigation with back button
  - Content: Scrollable (post image at top, caption, comments list)
  - Footer: Fixed comment input
- **Components**: Full post image, comment items, comment input
- **Safe Area**: Top: 0, Bottom: insets.bottom

### Reels Screen (Tab 3)
- **Purpose**: View short-form video content
- **Layout**:
  - Full-screen vertical swipeable list
  - No traditional header
  - Action buttons overlay (right side): like, comment, share
- **Components**: Video player, progress indicator, username overlay, caption overlay, action buttons
- **Safe Area**: Top: insets.top, Bottom: tabBarHeight + 16
- **Sample Reels**: 3 example reel thumbnails (sample-reel-1.png through sample-reel-3.png)

### Profile Screen (Tab 4)
- **Purpose**: View/edit user profile and access settings
- **Layout**:
  - Header: Transparent, title "Profile", settings icon (right)
  - Content: Scrollable (avatar, name, bio, user posts grid)
- **Components**: Profile avatar, edit profile button, posts grid, settings button
- **Safe Area**: Top: headerHeight + 16, Bottom: tabBarHeight + 16

### Settings Screen (Stack)
- **Purpose**: Manage account and app preferences
- **Layout**:
  - Header: Default navigation with back button, title "Settings"
  - Content: Scrollable list of settings options
- **Components**: Setting sections (Account, Notifications, Privacy, Appearance), logout button (red), delete account (nested under Account)
- **Safe Area**: Top: 0, Bottom: insets.bottom + 16

## Color Palette

**Primary**: #6B8AFF (Soft periwinkle blue - calming yet energetic)
**Primary Dark**: #5270E0 (For pressed states)
**Secondary**: #FF6B9D (Warm pink accent - for likes, highlights)
**Background**: #F8F9FE (Soft off-white with blue tint)
**Surface**: #FFFFFF (Pure white for cards)
**Surface Elevated**: #FAFBFF (Subtle lift)
**Text Primary**: #1A1F36 (Soft black)
**Text Secondary**: #6B7280 (Medium gray)
**Text Tertiary**: #9CA3AF (Light gray for metadata)
**Border**: #E5E7EB (Subtle borders)
**Success**: #10B981 (Green for online status)
**Error**: #EF4444 (Red for delete/errors)

## Typography

**Font**: Nunito (Google Font - friendly, approachable, highly legible)

**Type Scale**:
- Hero: 32px Bold (onboarding headlines)
- Title Large: 28px Bold (screen titles)
- Title: 20px Bold (section headers)
- Body Large: 17px Regular (chat messages, post captions)
- Body: 15px Regular (list items, descriptions)
- Caption: 13px Regular (timestamps, metadata)
- Button: 16px SemiBold (action buttons)

## Visual Design

**Touchable Feedback**: 0.7 opacity on press for all interactive elements

**Floating Action Button**:
- Gradient: Primary to Secondary (45deg)
- Shadow: offset {width: 0, height: 2}, opacity: 0.10, radius: 2
- Size: 56x56, border-radius: 28

**Cards**: 12px border-radius, no shadow, subtle border

**Input Fields**: 8px border-radius, border color, no fill unless focused

**Icons**: Feather icons from @expo/vector-icons

## Assets to Generate

1. **icon.png** - App icon: Chat bubble with gradient fill (Primary to Secondary)
2. **splash-icon.png** - Launch screen: Same as app icon
3. **empty-chats.png** - Empty state for Chats screen: Simple illustration of two people greeting
4. **empty-posts.png** - Empty state for Posts feed: Camera/photo frame illustration
5. **avatar-default.png** - Default user avatar: Soft gradient circle
6. **sample-post-1.png** - Example post 1: Scenic landscape photo
7. **sample-post-2.png** - Example post 2: Urban architecture
8. **sample-post-3.png** - Example post 3: Food/lifestyle shot
9. **sample-post-4.png** - Example post 4: Nature close-up
10. **sample-reel-1.png** - Reel thumbnail 1: Dynamic action shot
11. **sample-reel-2.png** - Reel thumbnail 2: Creative/artistic content
12. **sample-reel-3.png** - Reel thumbnail 3: Social/candid moment

All illustrations should use the app's color palette with soft, rounded shapes matching the Soft/pastel aesthetic.