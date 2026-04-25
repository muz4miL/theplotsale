# Payment Plan Implementation Guide

## Overview
The luxury payment plan component displays structured payment information for Pakistan projects with extraordinary elegance. It supports multiple plot categories with detailed payment breakdowns.

## Component Location
- **Component**: `components/projects/LuxuryPaymentPlan.jsx`
- **Used in**: `app/pakistan-projects/[slug]/page.jsx`
- **Styling**: `app/globals.css` (fadeInUp animation)

## Data Structure

### Required Format
Add a `paymentPlanStructure` field to your project document in MongoDB:

```javascript
{
  paymentPlanStructure: {
    description: "Flexible payment options tailored to your investment needs",
    note: "All prices are subject to change. Contact our sales team for the latest rates.",
    categories: [
      {
        name: "4 Marla",
        downPayment: 500000,
        quarterlyInstallment: 125000,
        yearlyInstallment: 250000,
        onPossession: 300000,
        totalAmount: 2450000
      },
      {
        name: "6 Marla",
        downPayment: 750000,
        quarterlyInstallment: 187500,
        yearlyInstallment: 375000,
        onPossession: 450000,
        totalAmount: 3675000
      },
      // ... more categories
    ]
  }
}
```

### Field Descriptions

#### Top Level
- `description` (string, optional): Brief description of the payment plan
- `note` (string, optional): Important notes or disclaimers
- `categories` (array, required): Array of payment categories

#### Category Object
- `name` (string, required): Plot size or category name (e.g., "4 Marla", "8 Marla")
- `downPayment` (number, required): Initial down payment amount in PKR
- `quarterlyInstallment` (number, required): Amount per quarterly installment (8 installments)
- `yearlyInstallment` (number, required): Yearly installment amount
- `onPossession` (number, required): Amount due on possession
- `totalAmount` (number, required): Total investment amount

## Example: Union Town Lahore

Based on the provided payment plan image:

```javascript
{
  title: "Union Town Lahore",
  slug: "union-town-lahore",
  // ... other fields
  paymentPlanStructure: {
    description: "Flexible payment options designed for your convenience and investment growth",
    note: "Prices are exclusive of transfer fees and registration charges. Contact our sales office for complete details.",
    categories: [
      {
        name: "4 Marla",
        downPayment: 500000,
        quarterlyInstallment: 125000,
        yearlyInstallment: 250000,
        onPossession: 300000,
        totalAmount: 2450000
      },
      {
        name: "6 Marla",
        downPayment: 750000,
        quarterlyInstallment: 187500,
        yearlyInstallment: 375000,
        onPossession: 450000,
        totalAmount: 3675000
      },
      {
        name: "8 Marla",
        downPayment: 1000000,
        quarterlyInstallment: 250000,
        yearlyInstallment: 500000,
        onPossession: 600000,
        totalAmount: 4900000
      },
      {
        name: "10 Marla",
        downPayment: 1250000,
        quarterlyInstallment: 312500,
        yearlyInstallment: 625000,
        onPossession: 750000,
        totalAmount: 6125000
      },
      {
        name: "1 Kanal",
        downPayment: 2500000,
        quarterlyInstallment: 625000,
        yearlyInstallment: 1250000,
        onPossession: 1500000,
        totalAmount: 12250000
      }
    ]
  }
}
```

## How to Add Payment Plans

### Method 1: Via Admin Panel (Recommended)
1. Go to `/admin/pk-projects`
2. Click "Edit" on the project
3. Scroll to the "Payment Plan Structure" section
4. Add the JSON data in the textarea
5. Click "Update Project"

### Method 2: Direct MongoDB Update
```javascript
db.projects.updateOne(
  { slug: "union-town-lahore" },
  {
    $set: {
      paymentPlanStructure: {
        description: "...",
        note: "...",
        categories: [...]
      }
    }
  }
)
```

## Features

### Visual Design
- **Aurora Border Effect**: Animated gradient border on hover
- **Glassmorphism**: Frosted glass background with backdrop blur
- **Staggered Animations**: Each row fades in with 0.1s delay
- **Responsive Table**: Horizontal scroll on mobile with hint
- **Currency Formatting**: Automatic PKR formatting with commas
- **Hover Effects**: Row highlights and glow indicators

### Typography
- **Headers**: Playfair Display (serif) for elegance
- **Body**: Manrope (sans-serif) for readability
- **Gold Accent**: #C5A880 for premium feel

### Accessibility
- Respects `prefers-reduced-motion`
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support

## Fallback Behavior
If `paymentPlanStructure` is not present, the component falls back to the legacy `paymentPlan` text field:

```javascript
{
  paymentPlan: "Contact our sales team for detailed payment plans"
}
```

## Mobile Optimization
- Horizontal scroll for table on small screens
- Scroll hint indicator with arrow animation
- Touch-friendly spacing
- Responsive font sizes

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- Backdrop filter support
- CSS animations

## Performance
- GPU-accelerated animations
- Minimal reflows/repaints
- Lazy loading ready
- Optimized for 60fps

## Troubleshooting

### Payment plan not showing
1. Check if `paymentPlanStructure` exists in project data
2. Verify `categories` array is not empty
3. Check browser console for errors
4. Ensure all required fields are present

### Formatting issues
1. Verify all amounts are numbers (not strings)
2. Check currency formatting locale
3. Ensure proper JSON structure

### Animation not working
1. Check if `fadeInUp` keyframe is in globals.css
2. Verify browser supports CSS animations
3. Check if user has reduced motion enabled

## Future Enhancements
- [ ] Add comparison mode (side-by-side categories)
- [ ] Export to PDF functionality
- [ ] Calculator for custom payment schedules
- [ ] Multi-currency support
- [ ] Print-optimized styles
- [ ] Installment calculator widget

## Related Files
- `components/projects/LuxuryPaymentPlan.jsx` - Main component
- `app/pakistan-projects/[slug]/page.jsx` - Integration
- `app/globals.css` - Animations
- `app/admin/pk-projects/page.jsx` - Admin interface (future)

## Support
For questions or issues, contact the development team or refer to the main project documentation.
