#!/usr/bin/env python3
"""
Vygeneruj ikony pro SaveStargate rozšíření
Spustit: python3 generate_icons.py
"""

import os
from pathlib import Path

# Vytvoř images složku pokud neexistuje
images_dir = Path(__file__).parent / "images"
images_dir.mkdir(exist_ok=True)

# SVG template pro ikonu
svg_template = '''<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Pozadí -->
  <rect width="{size}" height="{size}" fill="#667eea" rx="{radius}"/>
  
  <!-- Emoji/text -->
  <text x="{size_half}" y="{text_y}" font-size="{font_size}" font-family="system-ui" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">🚀</text>
</svg>'''

sizes = [16, 48, 128]

for size in sizes:
    radius = max(2, size // 8)  # Radius pro zaoblené rohy
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
    
    # Zkusíme uložit SVG (proto si je user pak musí sám konvertovat)
    # Nebo uložíme SVG a řekneme aby si je konvertoval
    svg_filename = images_dir / f"icon{size}.svg"
    
    with open(svg_filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"✓ Vytvořen: {svg_filename}")

print("\n✅ SVG ikony vytvořeny!")
print("\n📝 Dalekšího postupu:")
print("1. Jdi na https://cloudconvert.com/svg-to-png")
print("2. Uploaduj icon16.svg, icon48.svg a icon128.svg")
print("3. Stáhni PNG verze")
print("4. Umísti je do images/ složky (bude tam už SVG verze)")
print("\nNebo si je skopíruj do online konvertoru a máš hotovo! 🎉")

# Alternativa: zkus PIL pokud je nainstalován
try:
    from PIL import Image, ImageDraw, ImageFont
    
    print("\n🎨 PIL je nainstalován! Generuji PNG přímo...")
    
    for size in sizes:
        # Vytvoř obrázek
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Přidej emoji/text
        # (Font je kvůli emoji trošku trickier, tak to zjednodušíme)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.6))
        except:
            font = ImageFont.load_default()
        
        # Rozměry pro centrování
        text = "🚀"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.05)
        
        draw.text((x, y), text, fill='white', font=font)
        
        # Ulož PNG
        png_filename = f"images/icon{size}.png"
        img.save(png_filename)
        print(f"✓ Uložen: {png_filename}")
    
    print("\n✅ Všechny PNG ikony vytvořeny! Můžeš rozšíření instalovat. 🚀")

except ImportError:
    print("\n⚠️  PIL není nainstalován.")
    print("Instaluj: pip install Pillow")
    print("Nebo skonči s SVG verzí a sám si je konvertuj.")
