# Profile Picture Setup

## Adding Your Profile Picture

1. **Add your image** to the `public/` folder

   - Recommended name: `profile.jpg` or `profile.png`
   - Recommended size: 512x512px minimum
   - Format: JPG, PNG, or WebP

2. **Update the Hero component** (`client/components/Hero.tsx`)

Replace this section:

```tsx
{
  /* Profile Image - Replace with actual image */
}
<div className="w-full h-full bg-gradient-to-br from-mystery-700 to-mystery-600 flex items-center justify-center">
  <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-mystery-900 font-unica">
      <img src="/AyushPhotoOfficial.png" alt="Ayush Photo" />

    </span>
  </div>
</div>;
```

With:

```tsx
{
  /* Profile Image */
}
<img
  src="/profile.jpg"
  alt="Alex Blackwood"
  className="w-full h-full object-cover"
/>;
```

## Alternative: Using a URL

If you prefer to use an external image URL:

```tsx
<img
   src="/AyushPhotoOfficial.png" alt="Ayush Photo" 

  alt="Alex Blackwood"
  className="w-full h-full object-cover"
/>
```

## Image Optimization Tips

- **Size**: Keep under 500KB for faster loading
- **Dimensions**: Square aspect ratio works best
- **Quality**: Use 80-90% quality for JPG
- **Format**: WebP is preferred for modern browsers

## Fallback Option

If you don't have a profile picture yet, the current gradient design with initials works perfectly as a professional placeholder.
