# Button Style Guide - BLinkOS Portal

## Button Variants & Usage

### 1. Primary Action Button
**Usage:** Main CTAs, important actions
```tsx
<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
  Action Text
</Button>
```

### 2. Secondary Action Button
**Usage:** Alternative actions, less prominent
```tsx
<Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
  Action Text
</Button>
```

### 3. Ghost Button
**Usage:** Tertiary actions, minimal visual weight
```tsx
<Button variant="ghost" className="text-gray-300 hover:text-white">
  Action Text
</Button>
```

### 4. Destructive Button
**Usage:** Delete, remove, cancel operations
```tsx
<Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
  Delete
</Button>
```

### 5. Icon Button
**Usage:** Icon-only buttons for compact UI
```tsx
<Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
  <Icon className="h-4 w-4" />
</Button>
```

### 6. Icon + Text Button
**Usage:** Buttons with both icon and label
```tsx
<Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
  <Icon className="h-4 w-4 mr-2" />
  Action Text
</Button>
```

## Color Scheme

| Type | Background | Hover | Text |
|------|-----------|-------|------|
| Primary | `from-purple-600 to-pink-600` | `from-purple-700 to-pink-700` | white |
| Secondary | `border-white/10 bg-transparent` | `bg-white/10` | white |
| Ghost | `transparent` | `transparent` | gray-300 → white |
| Destructive | `bg-red-600` | `bg-red-700` | white |
| Success | `bg-green-600` | `bg-green-700` | white |

## Size Variants

| Size | Padding | Font | Usage |
|------|---------|------|-------|
| `sm` | `px-2 py-1` | text-xs | Compact UI, icon buttons |
| `md` (default) | `px-4 py-2` | text-sm | Standard buttons |
| `lg` | `px-6 py-3` | text-base | Large CTAs, hero section |

## Common Patterns

### Download/Use Button
```tsx
<Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
  <Download className="h-4 w-4 mr-2" />
  Download
</Button>
```

### Copy/Share Button
```tsx
<Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
  <Copy className="h-4 w-4" />
</Button>
```

### Modal Close Button
```tsx
<Button size="sm" variant="ghost" className="text-gray-300 hover:text-white" title="Close (ESC)">
  <X className="h-4 w-4" />
</Button>
```

### View/Details Button
```tsx
<Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white">
  <ExternalLink className="h-4 w-4 mr-1" />
  Details
</Button>
```

## Accessibility

- ✅ Always include `title` attribute for icon-only buttons
- ✅ Use `aria-label` for screen readers
- ✅ Ensure sufficient color contrast (WCAG AA)
- ✅ Support keyboard navigation (Tab, Enter, Space)
- ✅ Provide visual feedback on hover/focus states

## Implementation Checklist

- [ ] All buttons have consistent styling
- [ ] Icon buttons have `title` attributes
- [ ] Hover states are clearly visible
- [ ] Buttons are keyboard accessible
- [ ] Color contrast meets WCAG AA
- [ ] Button text is clear and actionable
- [ ] Destructive actions have confirmation
- [ ] Loading states are handled
- [ ] Disabled states are visible
