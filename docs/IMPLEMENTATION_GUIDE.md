# Implementation Guide: React Landing Page & E-commerce

**Version:** 0.1.0
**Date:** May 8th, 2025

## 1. Introduction

This document outlines the implementation steps for building a modern React-based landing page with an integrated shopping experience using:

- React with functional components
- React Router for routing
- Tanstack Query
- Zustand for state management
- Shadcn/ui for components
- Stripe for payments

## 2. Implementation Checklist

### Initial Setup

- [x] Setup project with Vite

    - [x] Create new React TypeScript project
    - [] Configure project structure

- [] Install dependencies

    - [x] Core dependencies (React, TypeScript)
    - [x] React Router
    - [x] Tanstack Query
    - [x] Zustand
    - [ ] Stripe libraries

- [x] Setup Shadcn/UI

    - [x] Initialize Tailwind CSS
    - [x] Run shadcn-ui init
    - [x] Configure component styles (colors, theme)
    - [x] Add initial components (button, card, etc.)

- [x] Configure tooling
    - [x] ESLint
    - [x] Prettier
    - [x] TypeScript settings
    - [x] Path aliases (@/ imports)

### Project Structure

- [x] Set up directory structure
    - [x] `/public` - Static assets
    - [x] `/src/assets` - Images, fonts
    - [x] `/src/components` - Components organized by type
        - [x] `/ui` - Shadcn UI components
        - [x] `/shared` - Reusable components
        - [x] `/features` - Feature-specific components
    - [x] `/src/config` - Configuration files
    - [x] `/src/hooks` - Custom React hooks
    - [x] `/src/layouts` - Layout components
    - [x] `/src/lib` - Utility functions
    - [x] `/src/pages` - Top-level route components
    - [x] `/src/services` - API service definitions
    - [x] `/src/store` - Zustand stores
    - [x] `/src/styles` - Global styles

### React Router Implementation

- [x] Configure Router

    - [x] Install React Router: `npm install react-router-dom`
    - [x] Create basic router setup

- [x] Create Routes

    - [x] Create root layout with outlet
    - [x] Create home page route
    - [x] Create product listing page
    - [x] Create product detail page (with URL parameters)
    - [x] Create cart page
    - [x] Create checkout page
    - [x] Create payment success/failure pages

- [x] Setup router instance
    - [x] Configure in main.tsx
    - [x] Set up BrowserRouter provider
    - [x] Define routes using createBrowserRouter or RouteProvider

### Tanstack Query Implementation

- [x] Configure Query Client

    - [x] Set up QueryClientProvider
    - [x] Configure default options

- [x] Create services

    - [x] Define product data types
    - [x] Create product service (mock or real)
    - [x] Set up query functions

- [x] Create query hooks
    - [x] Product listing hooks
    - [x] Product detail hooks
    - [x] Order hooks (if needed)

### State Management with Zustand

- [x] Create stores
    - [x] Cart store
        - [x] Define cart item type
        - [x] Implement cart operations (add, remove, update, clear)
        - [x] Total calculation functions
    - [x] UI state store (if needed)
- [x] Implement cart functionality
    - [x] Add to cart button in product components
    - [x] Cart quantity controls
    - [x] Cart summary display

### Stripe Integration

- [ ] Set up Stripe environment

    - [ ] Configure environment variables
    - [ ] Create Stripe configuration file

- [ ] Create checkout experience

    - [ ] Implement Stripe Elements
    - [ ] Create payment form
    - [ ] Handle payment submission

- [ ] Plan server-side endpoints (conceptual)
    - [ ] PaymentIntent creation endpoint
    - [ ] Webhook handler considerations

### UI Implementation with Shadcn/ui

- [x] Create shared components

    - [x] Navbar
    - [x] Footer
    - [x] Product card
    - [x] Cart summary

- [x] Implement page layouts

    - [x] Main layout
    - [x] Product listing grid
    - [x] Product detail layout
    - [x] Cart page layout
    - [x] Checkout page layout

- [x] Style and theming
    - [x] Configure global styles
    - [x] Ensure responsive design
    - [x] Implement dark/light mode (optional)

### Testing

- [ ] Set up testing environment

    - [ ] Configure Vitest or Jest
    - [ ] Set up testing utilities

- [ ] Create tests
    - [ ] Component tests
    - [ ] Hook tests
    - [ ] Store tests

### Build and Deployment

- [ ] Configure build process

    - [ ] Optimize assets
    - [ ] Environment variable handling

- [ ] Prepare for deployment
    - [ ] Create build scripts
    - [ ] Document deployment options
    - [ ] Consider CI/CD pipeline

## 3. Technical Considerations

### Authentication (Future Enhancement)

- User authentication options (Firebase, Supabase, Clerk, etc.)
- Protected routes with React Router's route protection
- User profiles

### Performance Optimization

- Code splitting with React Router
- Image optimization
- Lazy loading
- Memoization where appropriate

### Accessibility

- Ensure all components are accessible
- Test with screen readers
- Implement keyboard navigation

### SEO

- Metadata strategy
- Structured data
- Performance optimization

## 4. Development Process

- [ ] Create Git repository
- [ ] Set up branching strategy
- [ ] Define commit message conventions
- [ ] Plan iteration cycles
- [ ] Document API requirements (for backend)

## 5. Tally.so Form Integration

### 5.1. Overview

Tally.so provides a no-code form builder with a clean interface that can be easily embedded in our React application. It will handle:

- User question collection
- Email capture
- Data storage
- Dashboard for client to view responses

### 5.2. Setup Process

- [ ] Create a Tally.so account

    - [ ] Sign up at [tally.so](https://tally.so)
    - [ ] Create a new form with required fields (questions, email field)
    - [ ] Customize form appearance to match site branding
    - [ ] Configure form settings (redirects, notifications)
    - [ ] Share access with the client

- [ ] Implement form in React application
    - [ ] Choose integration method:
        - [ ] Embed code (iframe)
        - [ ] Tally React component (recommended)
        - [ ] Popup/modal implementation
    - [ ] Style container to match site design
    - [ ] Set up form visibility logic (if needed)

### 5.3. React Integration Steps

#### Method 1: Using Tally React Component (Recommended)

1. Install the Tally React package:

    ```bash
    npm install @tally.so/widgets
    # or
    yarn add @tally.so/widgets
    # or
    pnpm add @tally.so/widgets
    ```

2. Import and use in your React component:

    ```jsx
    import { TallyForm } from '@tally.so/widgets'

    function ContactForm() {
        return (
            <div className="w-full max-w-3xl mx-auto my-12 p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <TallyForm
                    formId="YOUR_TALLY_FORM_ID"
                    hideTitle={true}
                    width="100%"
                    height="500"
                    onLoad={() => console.log('Form loaded!')}
                />
            </div>
        )
    }
    ```

3. Replace `YOUR_TALLY_FORM_ID` with your actual form ID from Tally.so (found in the form share settings)

#### Method 2: Using Embed Code (iframe)

1. Create a component for your form:

    ```jsx
    function ContactForm() {
        return (
            <div className="w-full max-w-3xl mx-auto my-12 p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <div className="tally-embed-container">
                    <iframe
                        src="https://tally.so/embed/YOUR_FORM_ID?hideTitle=1&alignLeft=1"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        title="Contact Form"
                    ></iframe>
                </div>
            </div>
        )
    }
    ```

2. Add some CSS to ensure the iframe is responsive:
    ```css
    .tally-embed-container {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    ```

#### Method 3: Popup/Modal Implementation

1. Install the Tally React package as in Method 1

2. Create a modal component with Tally form:

    ```jsx
    import { useState } from 'react'
    import { TallyForm } from '@tally.so/widgets'
    import {
        Dialog,
        DialogContent,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button'

    function ContactFormModal() {
        const [open, setOpen] = useState(false)

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="lg">Contact Us</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <TallyForm
                        formId="YOUR_TALLY_FORM_ID"
                        hideTitle={true}
                        width="100%"
                        height="500"
                        onLoad={() => console.log('Form loaded!')}
                    />
                </DialogContent>
            </Dialog>
        )
    }
    ```

### 5.4. Advanced Usage

- **Custom submission handling**: Tally provides webhooks that can be configured to send form data to your backend if needed
- **Pre-filling form data**: You can pre-populate form fields using URL parameters
- **Form conditions**: Use Tally's conditional logic to show/hide questions based on previous answers
- **Customization**: Use Tally's Theme Editor to match your site's colors and typography

### 5.5. Client Access

- Share a dashboard link with your client for them to view all form submissions
- Set up email notifications so your client receives an email for each new submission
- Provide the client with instructions on how to:
    - [ ] Access the Tally dashboard
    - [ ] View/search submissions
    - [ ] Export data to CSV/Excel
    - [ ] Set up custom notification rules
    - [ ] Create response filters

### 5.6. Benefits for This Project

- No backend development needed for form functionality
- Client gets immediate access to submission data
- Automatic email collection and management
- Forms match the Shadcn UI aesthetic with proper styling
- Significantly reduces development time
