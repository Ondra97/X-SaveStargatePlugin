#!/usr/bin/env python3
"""
Generate icons for the SaveStargate extension
Run: python3 generate_icons.py
"""

import os
from pathlib import Path

# Create images folder if it doesn't exist
images_dir = Path(__file__).parent / "images"
images_dir.mkdir(exist_ok=True)

# SVG template for the icon
svg_template = '''<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="{size}" height="{size}" fill="#667eea" rx="{radius}"/>
  
  <!-- Emoji/text -->
  <text x="{size_half}" y="{text_y}" font-size="{font_size}" font-family="system-ui" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">🚀</text>
</svg>'''

sizes = [16, 48, 128]

for size in sizes:
    radius = max(2, size // 8)  # Radius for rounded corners
    font_size = int(size * 0.7)
    text_y = size // 2 + size // 10
    size_half = size // 2
    
    svg_content = svg_template.format(
        size=size,
        radius=radius,
        font_size=font_size,
        text_y=text_y,
        size_half=size_half
    )
    
    filename = images_dir / f"icon{size}.png"
    
    # Try to save SVG (but user will have to convert it themselves)
    # Or save SVG and tell user to convert it
    svg_filename = images_dir / f"icon{size}.svg"
    
    with open(svg_filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"✓ Vytvořen: {svg_filename}")

print("\n✅ SVG icons created!")
print("\n📝 Next steps:")
print("1. Go to https://cloudconvert.com/svg-to-png")
print("2. Upload icon16.svg, icon48.svg and icon128.svg")
print("3. Download the PNG versions")
print("4. Place them in the images/ folder (the SVG versions will be there too)")
print("\nOr copy them to an online converter and you're done! 🎉")

# Alternative: try PIL if it's installed
try:
    from PIL import Image, ImageDraw, ImageFont
    
    print("\n🎨 PIL is installed! Generating PNGs directly...")
    
    for size in sizes:
        # Create image
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Add emoji/text
        # (Font is tricky due to emoji, so we simplify)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.6))
        except:
            font = ImageFont.load_default()
        
        # Measurement for centering
        text = "🚀"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.05)
        
        draw.text((x, y), text, fill='white', font=font)
        
        # Save PNG
        png_filename = f"images/icon{size}.png"
        img.save(png_filename)
        print(f"✓ Saved: {png_filename}")
    
    print("\n✅ All PNG icons created! You can now install the extension. 🚀")

except ImportError:
    print("\n⚠️  PIL isn't installed.")
    print("Install it: pip install Pillow")
    print("Or finish with the SVG version and convert it yourself.")
