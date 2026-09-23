import os

OUT_DIR = "client/public/pets"
os.makedirs(OUT_DIR, exist_ok=True)

def svg_wrapper(content):
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
{content}
</svg>"""

def get_eyes(expr, color="#4A342A", dy=0):
    ey = 240 + dy
    if expr == "great":
        return f"""
        <path d="M140 {ey+10} Q170 {ey-30} 200 {ey+10}" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round"/>
        <path d="M312 {ey+10} Q342 {ey-30} 372 {ey+10}" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round"/>
        <!-- Sparkles -->
        <path d="M120 {ey-30} L110 {ey-50} M220 {ey-30} L230 {ey-50}" stroke="#F2C94C" stroke-width="6" stroke-linecap="round"/>
        <path d="M302 {ey-30} L292 {ey-50} M392 {ey-30} L402 {ey-50}" stroke="#F2C94C" stroke-width="6" stroke-linecap="round"/>
        """
    elif expr == "good":
        return f"""
        <path d="M140 {ey+10} Q170 {ey-10} 200 {ey+10}" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round"/>
        <path d="M312 {ey+10} Q342 {ey-10} 372 {ey+10}" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round"/>
        """
    elif expr == "normal":
        return f"""
        <circle cx="170" cy="{ey}" r="22" fill="{color}"/>
        <circle cx="342" cy="{ey}" r="22" fill="{color}"/>
        <circle cx="178" cy="{ey-6}" r="8" fill="#FFFFFF"/>
        <circle cx="350" cy="{ey-6}" r="8" fill="#FFFFFF"/>
        """
    elif expr == "low":
        return f"""
        <circle cx="170" cy="{ey+10}" r="20" fill="{color}"/>
        <circle cx="342" cy="{ey+10}" r="20" fill="{color}"/>
        <path d="M130 {ey-10} Q170 {ey-30} 210 {ey}" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        <path d="M382 {ey-10} Q342 {ey-30} 302 {ey}" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M130 {ey} Q170 {ey-20} 210 {ey+20}" fill="none" stroke="{color}" stroke-width="14" stroke-linecap="round"/>
        <path d="M382 {ey} Q342 {ey-20} 302 {ey+20}" fill="none" stroke="{color}" stroke-width="14" stroke-linecap="round"/>
        <!-- Tears -->
        <path d="M170 {ey+30} L170 {ey+70}" stroke="#56CCF2" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
        <path d="M342 {ey+30} L342 {ey+70}" stroke="#56CCF2" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
        <circle cx="170" cy="{ey+30}" r="7" fill="#56CCF2" opacity="0.8"/>
        <circle cx="342" cy="{ey+30}" r="7" fill="#56CCF2" opacity="0.8"/>
        """

def get_mouth(expr, color="#4A342A", dy=0):
    my = 310 + dy
    if expr == "great":
        return f"""
        <path d="M216 {my} Q256 {my+70} 296 {my} Z" fill="#EB5757" stroke="{color}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M236 {my+30} Q256 {my+50} 276 {my+30} Z" fill="#FF9AA8"/>
        """
    elif expr == "good":
        return f"""
        <path d="M226 {my} Q256 {my+30} 286 {my}" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr == "normal":
        return f"""
        <path d="M236 {my+10} Q256 {my+20} 276 {my+10}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """
    elif expr == "low":
        return f"""
        <path d="M226 {my+20} Q256 {my-10} 286 {my+20}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M226 {my+20} Q256 {my} 286 {my+20}" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        <path d="M236 {my+25} Q256 {my+15} 276 {my+25}" fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round"/>
        """

def render_cat(expr):
    content = f"""
    <g id="tai">
      <path d="M 110 130 L 170 230 L 240 150 Z" fill="#F2994A" stroke="#4A342A" stroke-width="16" stroke-linejoin="round"/>
      <path d="M 145 165 L 175 210 L 205 175 Z" fill="#FF9AA8"/>
      <path d="M 402 130 L 342 230 L 272 150 Z" fill="#F2994A" stroke="#4A342A" stroke-width="16" stroke-linejoin="round"/>
      <path d="M 367 165 L 337 210 L 307 175 Z" fill="#FF9AA8"/>
    </g>
    
    <g id="dau">
      <ellipse cx="256" cy="270" rx="170" ry="140" fill="#F2994A" stroke="#4A342A" stroke-width="16"/>
      <path d="M 256 130 L 256 180 M 226 140 L 240 180 M 286 140 L 272 180" stroke="#4A342A" stroke-width="10" stroke-linecap="round" opacity="0.5"/>
      <ellipse cx="256" cy="310" rx="90" ry="60" fill="#FFFFFF"/>
      <circle cx="140" cy="290" r="25" fill="#FF9AA8" opacity="0.6"/>
      <circle cx="372" cy="290" r="25" fill="#FF9AA8" opacity="0.6"/>
    </g>
    
    <g id="mat">
      {get_eyes(expr)}
      <!-- Whiskers -->
      <path d="M 120 290 L 50 270 M 110 310 L 40 310 M 120 330 L 50 350" stroke="#4A342A" stroke-width="8" stroke-linecap="round"/>
      <path d="M 392 290 L 462 270 M 402 310 L 472 310 M 392 330 L 462 350" stroke="#4A342A" stroke-width="8" stroke-linecap="round"/>
    </g>
    
    <g id="mui">
      <ellipse cx="256" cy="285" rx="16" ry="10" fill="#EB5757"/>
    </g>
    
    <g id="mieng">
      {get_mouth(expr)}
    </g>
    """
    return svg_wrapper(content)

def render_corgi(expr):
    content = f"""
    <g id="tai">
      <path d="M 90 120 L 150 240 L 230 160 Z" fill="#E58A38" stroke="#2D1C11" stroke-width="16" stroke-linejoin="round"/>
      <path d="M 125 155 L 160 215 L 195 175 Z" fill="#FBE3C4"/>
      <path d="M 422 120 L 362 240 L 282 160 Z" fill="#E58A38" stroke="#2D1C11" stroke-width="16" stroke-linejoin="round"/>
      <path d="M 387 155 L 352 215 L 317 175 Z" fill="#FBE3C4"/>
    </g>
    
    <g id="dau">
      <ellipse cx="256" cy="280" rx="180" ry="150" fill="#E58A38" stroke="#2D1C11" stroke-width="16"/>
      <path d="M 256 130 Q 200 200 130 240 Q 180 380 256 420 Q 332 380 382 240 Q 312 200 256 130 Z" fill="#FFFFFF"/>
      <circle cx="140" cy="300" r="25" fill="#FF9AA8" opacity="0.6"/>
      <circle cx="372" cy="300" r="25" fill="#FF9AA8" opacity="0.6"/>
    </g>
    
    <g id="mat">
      {get_eyes(expr, "#2D1C11", dy=10)}
    </g>
    
    <g id="mui">
      <ellipse cx="256" cy="295" rx="22" ry="14" fill="#2D1C11"/>
    </g>
    
    <g id="mieng">
      {get_mouth(expr, "#2D1C11", dy=10)}
    </g>
    """
    return svg_wrapper(content)

def render_owl(expr):
    beak = f"""<path d="M 236 300 L 276 300 L 256 340 Z" fill="#F2C94C" stroke="#4A342A" stroke-width="10" stroke-linejoin="round"/>"""
    
    if expr == "great":
        eyes = f"""
        <circle cx="160" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="352" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <path d="M130 250 Q160 210 190 250" fill="none" stroke="#4A342A" stroke-width="16" stroke-linecap="round"/>
        <path d="M322 250 Q352 210 382 250" fill="none" stroke="#4A342A" stroke-width="16" stroke-linecap="round"/>
        <!-- Sparkles -->
        <path d="M110 190 L100 170 M210 190 L220 170" stroke="#F2C94C" stroke-width="6" stroke-linecap="round"/>
        <path d="M302 190 L292 170 M402 190 L412 170" stroke="#F2C94C" stroke-width="6" stroke-linecap="round"/>
        """
    elif expr == "good":
        eyes = f"""
        <circle cx="160" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="352" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="160" cy="240" r="20" fill="#4A342A"/>
        <circle cx="352" cy="240" r="20" fill="#4A342A"/>
        <circle cx="168" cy="232" r="8" fill="#FFFFFF"/>
        <circle cx="360" cy="232" r="8" fill="#FFFFFF"/>
        """
    elif expr == "normal":
        eyes = f"""
        <circle cx="160" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="352" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="160" cy="240" r="16" fill="#4A342A"/>
        <circle cx="352" cy="240" r="16" fill="#4A342A"/>
        <path d="M110 180 Q160 170 210 190" stroke="#4A342A" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M402 180 Q352 170 302 190" stroke="#4A342A" stroke-width="12" stroke-linecap="round" fill="none"/>
        """
    elif expr == "low":
        eyes = f"""
        <circle cx="160" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="352" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="160" cy="250" r="16" fill="#4A342A"/>
        <circle cx="352" cy="250" r="16" fill="#4A342A"/>
        <path d="M120 200 L200 170" stroke="#4A342A" stroke-width="12" stroke-linecap="round"/>
        <path d="M392 200 L312 170" stroke="#4A342A" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr == "danger":
        eyes = f"""
        <circle cx="160" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="352" cy="240" r="50" fill="#FFFFFF" stroke="#4A342A" stroke-width="14"/>
        <circle cx="160" cy="250" r="14" fill="#4A342A"/>
        <circle cx="352" cy="250" r="14" fill="#4A342A"/>
        <path d="M120 210 L200 180" stroke="#4A342A" stroke-width="12" stroke-linecap="round"/>
        <path d="M392 210 L312 180" stroke="#4A342A" stroke-width="12" stroke-linecap="round"/>
        <!-- Tears -->
        <path d="M160 270 L160 310" stroke="#56CCF2" stroke-width="12" stroke-linecap="round" opacity="0.8"/>
        <path d="M352 270 L352 310" stroke="#56CCF2" stroke-width="12" stroke-linecap="round" opacity="0.8"/>
        """

    content = f"""
    <g id="tai">
      <path d="M 120 120 L 160 200 L 220 140 Z" fill="#A86345" stroke="#4A342A" stroke-width="16" stroke-linejoin="round"/>
      <path d="M 392 120 L 352 200 L 292 140 Z" fill="#A86345" stroke="#4A342A" stroke-width="16" stroke-linejoin="round"/>
    </g>
    <g id="dau">
      <ellipse cx="256" cy="260" rx="160" ry="140" fill="#A86345" stroke="#4A342A" stroke-width="16"/>
      <path d="M 256 220 Q 200 130 116 230 Q 130 380 256 380 Q 382 380 396 230 Q 312 130 256 220 Z" fill="#FFF3E0"/>
    </g>
    <g id="mat">
      {eyes}
    </g>
    <g id="mui">
      {beak}
    </g>
    """
    return svg_wrapper(content)

def render_dragon(expr):
    content = f"""
    <g id="tai">
      <!-- Horns -->
      <path d="M 160 120 Q 130 60 80 80 Q 120 160 190 160 Z" fill="#F2C94C" stroke="#2D5A27" stroke-width="12" stroke-linejoin="round"/>
      <path d="M 352 120 Q 382 60 432 80 Q 392 160 322 160 Z" fill="#F2C94C" stroke="#2D5A27" stroke-width="12" stroke-linejoin="round"/>
      <!-- Ears -->
      <path d="M 110 200 L 40 220 L 90 260 Z" fill="#27AE60" stroke="#2D5A27" stroke-width="12" stroke-linejoin="round"/>
      <path d="M 402 200 L 472 220 L 422 260 Z" fill="#27AE60" stroke="#2D5A27" stroke-width="12" stroke-linejoin="round"/>
    </g>
    
    <g id="dau">
      <ellipse cx="256" cy="270" rx="160" ry="150" fill="#27AE60" stroke="#2D5A27" stroke-width="16"/>
      <!-- Snout -->
      <ellipse cx="256" cy="330" rx="120" ry="70" fill="#6FCF97" stroke="#2D5A27" stroke-width="12"/>
      <circle cx="120" cy="300" r="25" fill="#FF9AA8" opacity="0.6"/>
      <circle cx="392" cy="300" r="25" fill="#FF9AA8" opacity="0.6"/>
      <!-- Scales -->
      <path d="M 256 120 L 240 150 L 272 150 Z" fill="#F2C94C"/>
      <path d="M 256 160 L 240 190 L 272 190 Z" fill="#F2C94C"/>
    </g>
    
    <g id="mat">
      {get_eyes(expr, "#2D5A27", dy=0)}
    </g>
    
    <g id="mui">
      <circle cx="216" cy="310" r="10" fill="#2D5A27"/>
      <circle cx="296" cy="310" r="10" fill="#2D5A27"/>
    </g>
    
    <g id="mieng">
      {get_mouth(expr, "#2D5A27", dy=40)}
    </g>
    """
    return svg_wrapper(content)

pets = {
    "cat": render_cat,
    "corgi": render_corgi,
    "owl": render_owl,
    "dragon": render_dragon
}

exprs = ["great", "good", "normal", "low", "danger"]

for pet, func in pets.items():
    for expr in exprs:
        filename = f"{OUT_DIR}/{pet}-{expr}.svg"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(func(expr))

print("All 20 high-quality SVGs generated.")
