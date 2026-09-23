import os

OUT_DIR = "client/public/pets"
os.makedirs(OUT_DIR, exist_ok=True)

def svg_wrapper(content, defs=""):
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Ultra Soft Drop Shadow -->
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#000000" flood-opacity="0.12"/>
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.1"/>
    </filter>
    
    <!-- 3D Bevel for Heads -->
    <filter id="headBevel" x="-20%" y="-20%" width="140%" height="140%">
      <!-- Bottom shadow for volume -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blurShadow"/>
      <feOffset in="blurShadow" dx="0" dy="15" result="offsetShadow"/>
      <feComposite in="offsetShadow" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
      <feFlood flood-color="#000000" flood-opacity="0.25" result="shadowColor"/>
      <feComposite in="shadowColor" in2="shadowDiff" operator="in" result="innerShadow"/>
      
      <!-- Top highlight for volume -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blurLight"/>
      <feOffset in="blurLight" dx="0" dy="-8" result="offsetLight"/>
      <feComposite in="offsetLight" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="lightDiff"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.7" result="lightColor"/>
      <feComposite in="lightColor" in2="lightDiff" operator="in" result="innerHighlight"/>
      
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="innerShadow"/>
        <feMergeNode in="innerHighlight"/>
      </feMerge>
    </filter>
    
    <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15"/>
    </filter>
    
    <!-- Glossy Eye Material -->
    <radialGradient id="eyeShine" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#4F3628"/>
      <stop offset="100%" stop-color="#140804"/>
    </radialGradient>
    <radialGradient id="eyeShineGreen" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#216B40"/>
      <stop offset="100%" stop-color="#0C361E"/>
    </radialGradient>
    {defs}
  </defs>
{content}
</svg>"""

def get_eyes(expr, color="#24140C", dx=0, dy=0, rx=12, ry=18, spacing=55, gradient="url(#eyeShine)"):
    lx = 256 - spacing + dx
    rx_pos = 256 + spacing + dx
    y = 220 + dy
    
    if expr == "great":
        return f"""
        <path d="M{lx-15} {y+5} Q{lx} {y-20} {lx+15} {y+5}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M{rx_pos-15} {y+5} Q{rx_pos} {y-20} {rx_pos+15} {y+5}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """
    elif expr in ["good", "normal"]:
        return f"""
        <ellipse cx="{lx}" cy="{y}" rx="{rx}" ry="{ry}" fill="{gradient}"/>
        <ellipse cx="{rx_pos}" cy="{y}" rx="{rx}" ry="{ry}" fill="{gradient}"/>
        <!-- Specular highlights -->
        <ellipse cx="{lx-3}" cy="{y-6}" rx="{rx*0.4}" ry="{ry*0.4}" fill="#FFFFFF"/>
        <circle cx="{lx+4}" cy="{y+6}" r="{rx*0.25}" fill="#FFFFFF" opacity="0.6"/>
        
        <ellipse cx="{rx_pos-3}" cy="{y-6}" rx="{rx*0.4}" ry="{ry*0.4}" fill="#FFFFFF"/>
        <circle cx="{rx_pos+4}" cy="{y+6}" r="{rx*0.25}" fill="#FFFFFF" opacity="0.6"/>
        """
    elif expr == "low":
        return f"""
        <ellipse cx="{lx}" cy="{y+5}" rx="{rx}" ry="{ry*0.9}" fill="{gradient}"/>
        <ellipse cx="{rx_pos}" cy="{y+5}" rx="{rx}" ry="{ry*0.9}" fill="{gradient}"/>
        <path d="M{lx-15} {y-10} L{lx+15} {y}" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M{rx_pos+15} {y-10} L{rx_pos-15} {y}" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M{lx-15} {y-5} Q{lx} {y-20} {lx+15} {y}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M{rx_pos+15} {y-5} Q{rx_pos} {y-20} {rx_pos-15} {y}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <!-- Tears -->
        <path d="M{lx} {y+10} Q{lx-5} {y+40} {lx} {y+50} Q{lx+5} {y+40} {lx} {y+10}" fill="#89D9FA" opacity="0.9"/>
        <path d="M{rx_pos} {y+10} Q{rx_pos-5} {y+40} {rx_pos} {y+50} Q{rx_pos+5} {y+40} {rx_pos} {y+10}" fill="#89D9FA" opacity="0.9"/>
        """

def get_mouth(expr, color="#4A2612", dy=0, tongue="#FF477E", tongue_shadow="#CC2954", width=30):
    my = 280 + dy
    if expr in ["great", "good"]:
        return f"""
        <path d="M 256 {my+35} Q {256-width} {my+35} {256-width} {my} Q 256 {my+10} {256+width} {my} Q {256+width} {my+35} 256 {my+35} Z" fill="{color}"/>
        <path d="M 256 {my+35} Q {256-width+5} {my+35} {256-width+5} {my+15} Q 256 {my+20} {256+width-5} {my+15} Q {256+width-5} {my+35} 256 {my+35} Z" fill="{tongue}"/>
        """
    elif expr == "normal":
        return f"""
        <path d="M {256-width*0.7} {my} Q 256 {my+15} {256+width*0.7} {my}" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "low":
        return f"""
        <path d="M {256-width*0.7} {my+15} Q 256 {my} {256+width*0.7} {my+15}" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M {256-width*0.8} {my+15} Q 256 {my-5} {256+width*0.8} {my+15}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """

def render_corgi(expr):
    defs = """
    <linearGradient id="corgiBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FEE4C8"/>
      <stop offset="100%" stop-color="#C58957"/>
    </linearGradient>
    <clipPath id="corgiClip">
      <rect x="116" y="140" width="280" height="230" rx="100"/>
    </clipPath>
    """
    content = f"""
    <g filter="url(#softShadow)">
      <!-- Floppy Apple-style Dog Ears -->
      <rect x="90" y="110" width="85" height="140" rx="42" fill="#5E3A26" transform="rotate(25 132 110)"/>
      <rect x="337" y="110" width="85" height="140" rx="42" fill="#5E3A26" transform="rotate(-25 379 110)"/>
      
      <!-- Head Group with 3D Bevel -->
      <g filter="url(#headBevel)">
        <!-- Base Tan Fur -->
        <rect x="116" y="140" width="280" height="230" rx="100" fill="url(#corgiBase)"/>
        
        <!-- Clipped Face Details -->
        <g clip-path="url(#corgiClip)">
          <!-- Apple-style Cream Muzzle (No white stripe) -->
          <ellipse cx="256" cy="315" rx="120" ry="90" fill="url(#corgiMuzzle)"/>
        </g>
      </g>
    </g>
    
    <!-- Cute Eyebrows -->
    <ellipse cx="190" cy="175" rx="10" ry="14" fill="#5E3A26"/>
    <ellipse cx="322" cy="175" rx="10" ry="14" fill="#5E3A26"/>
    
    {get_eyes(expr, spacing=60, dy=0)}
    {get_mouth(expr, width=35, dy=15)}
    
    <!-- Wet Dog Nose -->
    <ellipse cx="256" cy="265" rx="28" ry="18" fill="#2A1610"/>
    <ellipse cx="256" cy="255" rx="14" ry="6" fill="#8C5C38"/>
    <ellipse cx="264" cy="257" rx="6" ry="3" fill="#FFFFFF" opacity="0.8" transform="rotate(-10 264 257)"/>
    """
    return svg_wrapper(content, defs)

def render_cat(expr):
    defs = """
    <linearGradient id="catBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFECA1"/>
      <stop offset="40%" stop-color="#FFB366"/>
      <stop offset="100%" stop-color="#F25C78"/>
    </linearGradient>
    <linearGradient id="catEar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFD659"/>
      <stop offset="100%" stop-color="#FF9B5E"/>
    </linearGradient>
    """
    content = f"""
    <g filter="url(#softShadow)">
      <!-- Ears -->
      <path d="M120 180 L 130 70 Q 150 60 230 160 Z" fill="url(#catEar)" filter="url(#headBevel)"/>
      <path d="M140 160 L 145 95 L 200 155 Z" fill="#FFA6A0"/>
      <path d="M392 180 L 382 70 Q 362 60 282 160 Z" fill="url(#catEar)" filter="url(#headBevel)"/>
      <path d="M372 160 L 367 95 L 312 155 Z" fill="#FFA6A0"/>
      
      <!-- Head -->
      <rect x="116" y="140" width="280" height="230" rx="100" fill="url(#catBase)" filter="url(#headBevel)"/>
    </g>
    
    <!-- Cheeks Glow -->
    <circle cx="150" cy="260" r="35" fill="#FF5277" opacity="0.3" filter="url(#blurSoft)"/>
    <circle cx="362" cy="260" r="35" fill="#FF5277" opacity="0.3" filter="url(#blurSoft)"/>
    
    <!-- Whiskers -->
    <path d="M 150 240 L 80 230 M 140 265 L 70 265" stroke="#E56767" stroke-width="6" stroke-linecap="round"/>
    <path d="M 362 240 L 432 230 M 372 265 L 442 265" stroke="#E56767" stroke-width="6" stroke-linecap="round"/>
    
    {get_eyes(expr, spacing=65, dy=0)}
    {get_mouth(expr, color="#7A1325", dy=0, width=28)}
    
    <!-- Nose -->
    <path d="M 244 240 L 268 240 L 256 252 Z" fill="#FF3B65"/>
    """
    return svg_wrapper(content, defs)

def render_owl(expr):
    defs = """
    <linearGradient id="owlBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9C6B4A"/>
      <stop offset="100%" stop-color="#553420"/>
    </linearGradient>
    <linearGradient id="owlFace" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF0DF"/>
      <stop offset="100%" stop-color="#DEB693"/>
    </linearGradient>
    <linearGradient id="owlBelly" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCE1D4"/>
      <stop offset="100%" stop-color="#C58572"/>
    </linearGradient>
    <radialGradient id="owlEyeBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFDD4A"/>
      <stop offset="100%" stop-color="#E89F15"/>
    </radialGradient>
    <clipPath id="owlClip">
      <rect x="116" y="130" width="280" height="250" rx="110"/>
    </clipPath>
    <linearGradient id="owlEar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#734B31"/>
      <stop offset="100%" stop-color="#402414"/>
    </linearGradient>
    <linearGradient id="owlEarInner" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#DEB693"/>
      <stop offset="100%" stop-color="#C58572"/>
    </linearGradient>
    """
    
    beak = ""
    if expr in ["great", "good"]:
        beak = f"""
        <path d="M 236 275 L 276 275 L 256 310 Z" fill="#F47B36" filter="url(#headBevel)"/>
        <path d="M 246 300 L 266 300 L 256 320 Z" fill="#C95316"/>
        """
    elif expr == "danger":
        beak = f"""<path d="M 236 295 L 276 295 L 256 275 Z" fill="#F47B36" filter="url(#headBevel)"/>"""
    else:
        beak = f"""<path d="M 236 275 L 276 275 L 256 305 Z" fill="#F47B36" filter="url(#headBevel)"/>"""
        
    eyes_content = ""
    if expr == "great":
        eyes_content = f"""
        <circle cx="186" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <circle cx="326" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <path d="M 160 235 Q 186 185 212 235" fill="none" stroke="#2B1C11" stroke-width="12" stroke-linecap="round"/>
        <path d="M 300 235 Q 326 185 352 235" fill="none" stroke="#2B1C11" stroke-width="12" stroke-linecap="round"/>
        <!-- Eye Sparkles Removed -->
        """
    elif expr == "good":
        eyes_content = f"""
        <circle cx="186" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <circle cx="326" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <circle cx="186" cy="225" r="28" fill="url(#eyeShine)"/>
        <circle cx="326" cy="225" r="28" fill="url(#eyeShine)"/>
        <circle cx="196" cy="215" r="12" fill="#FFFFFF"/>
        <circle cx="336" cy="215" r="12" fill="#FFFFFF"/>
        <circle cx="178" cy="235" r="5" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="318" cy="235" r="5" fill="#FFFFFF" opacity="0.6"/>
        """
    elif expr == "normal":
        eyes_content = f"""
        <circle cx="186" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <circle cx="326" cy="225" r="48" fill="url(#owlEyeBg)" stroke="#B8581F" stroke-width="10" filter="url(#headBevel)"/>
        <circle cx="186" cy="225" r="22" fill="url(#eyeShine)"/>
        <circle cx="326" cy="225" r="22" fill="url(#eyeShine)"/>
        <circle cx="194" cy="217" r="8" fill="#FFFFFF"/>
        <circle cx="334" cy="217" r="8" fill="#FFFFFF"/>
        """
    elif expr == "low":
        eyes_content = f"""
        <g stroke="#B8581F" stroke-width="10" filter="url(#headBevel)">
            <path d="M 138 225 A 48 48 0 0 0 234 225 Z" fill="url(#owlEyeBg)"/>
            <path d="M 278 225 A 48 48 0 0 0 374 225 Z" fill="url(#owlEyeBg)"/>
        </g>
        <circle cx="186" cy="240" r="16" fill="url(#eyeShine)"/>
        <circle cx="326" cy="240" r="16" fill="url(#eyeShine)"/>
        <path d="M 138 210 L 234 225 M 374 210 L 278 225" stroke="#B8581F" stroke-width="10" stroke-linecap="round"/>
        """
    elif expr == "danger":
        eyes_content = f"""
        <g stroke="#B8581F" stroke-width="10" filter="url(#headBevel)">
            <path d="M 138 235 A 48 48 0 0 0 234 235 Z" fill="url(#owlEyeBg)"/>
            <path d="M 278 235 A 48 48 0 0 0 374 235 Z" fill="url(#owlEyeBg)"/>
        </g>
        <circle cx="186" cy="250" r="14" fill="url(#eyeShine)"/>
        <circle cx="326" cy="250" r="14" fill="url(#eyeShine)"/>
        <path d="M 138 220 L 234 235 M 374 220 L 278 235" stroke="#B8581F" stroke-width="10" stroke-linecap="round"/>
        <!-- Tears -->
        <path d="M186 265 L186 300 M326 265 L326 300" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        """

    content = f"""
    <g filter="url(#softShadow)">
      <!-- Feet -->
      <path d="M 176 360 A 25 25 0 0 0 226 360 Z" fill="#D45A22"/>
      <path d="M 286 360 A 25 25 0 0 0 336 360 Z" fill="#D45A22"/>
      
      <!-- Cute Cat-like Tufts (Ears) -->
      <path d="M 140 160 C 110 80, 160 50, 200 130 Z" fill="url(#owlEar)"/>
      <path d="M 372 160 C 402 80, 352 50, 312 130 Z" fill="url(#owlEar)"/>
      <!-- Inner Tufts -->
      <path d="M 150 150 C 130 90, 160 70, 185 125 Z" fill="url(#owlEarInner)"/>
      <path d="M 362 150 C 382 90, 352 70, 327 125 Z" fill="url(#owlEarInner)"/>
      
      <!-- Head Group -->
      <g filter="url(#headBevel)">
        <!-- Head Base -->
        <rect x="116" y="130" width="280" height="250" rx="110" fill="url(#owlBase)"/>
        
        <g clip-path="url(#owlClip)">
          <!-- Cream Belly -->
          <ellipse cx="256" cy="340" rx="110" ry="80" fill="url(#owlBelly)"/>
          
          <!-- Beautiful Facial Disc (Figure 8 mask) -->
          <ellipse cx="186" cy="230" rx="75" ry="85" fill="url(#owlFace)"/>
          <ellipse cx="326" cy="230" rx="75" ry="85" fill="url(#owlFace)"/>
        </g>
      </g>
    </g>
    
    <!-- Dark Brow lines -->
    <path d="M 170 160 Q 186 150 200 165" fill="none" stroke="#402414" stroke-width="8" stroke-linecap="round"/>
    <path d="M 342 160 Q 326 150 312 165" fill="none" stroke="#402414" stroke-width="8" stroke-linecap="round"/>
    
    {eyes_content}
    {beak}
    """
    return svg_wrapper(content, defs)

def render_dragon(expr):
    defs = """
    <linearGradient id="dragonBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38EF7D"/>
      <stop offset="100%" stop-color="#11998E"/>
    </linearGradient>
    <linearGradient id="dragonBelly" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF5C3"/>
      <stop offset="100%" stop-color="#F4D03F"/>
    </linearGradient>
    <linearGradient id="dragonGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDEB71"/>
      <stop offset="100%" stop-color="#F8D800"/>
    </linearGradient>
    <linearGradient id="dragonFrill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF9A9E"/>
      <stop offset="100%" stop-color="#FECFEF"/>
    </linearGradient>
    <clipPath id="dragonClip">
      <rect x="116" y="140" width="280" height="230" rx="100"/>
    </clipPath>
    <filter id="gemGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    """
    
    content = f"""
    <g filter="url(#softShadow)">
      <!-- Majestic Curved Horns -->
      <path d="M 160 160 C 100 80, 150 20, 200 40 C 180 80, 190 120, 195 150 Z" fill="url(#dragonGold)"/>
      <path d="M 352 160 C 412 80, 362 20, 312 40 C 332 80, 322 120, 317 150 Z" fill="url(#dragonGold)"/>
      
      <!-- Magical Side Frills (Axolotl/Dragon style) -->
      <!-- Top Frills -->
      <path d="M 130 180 C 80 160, 50 180, 70 210 C 90 200, 110 210, 120 220 Z" fill="url(#dragonFrill)"/>
      <path d="M 382 180 C 432 160, 462 180, 442 210 C 422 200, 402 210, 392 220 Z" fill="url(#dragonFrill)"/>
      <!-- Bottom Frills -->
      <path d="M 120 240 C 60 250, 70 280, 100 290 C 110 270, 120 270, 130 260 Z" fill="url(#dragonFrill)"/>
      <path d="M 392 240 C 452 250, 442 280, 412 290 C 402 270, 392 270, 382 260 Z" fill="url(#dragonFrill)"/>
      
      <!-- Head Group with Bevel -->
      <g filter="url(#headBevel)">
        <!-- Base Teal Scales -->
        <rect x="116" y="140" width="280" height="230" rx="100" fill="url(#dragonBase)"/>
        
        <!-- Clipped Face Details -->
        <g clip-path="url(#dragonClip)">
          <!-- Golden Belly/Chest sweeping up -->
          <ellipse cx="256" cy="350" rx="120" ry="90" fill="url(#dragonBelly)"/>
          
          <!-- Cute cheeks -->
          <circle cx="150" cy="270" r="35" fill="#1ABC9C" opacity="0.6" filter="url(#blurSoft)"/>
          <circle cx="362" cy="270" r="35" fill="#1ABC9C" opacity="0.6" filter="url(#blurSoft)"/>
        </g>
      </g>
      
      <!-- Prominent Snout (Drawn on top of face to give depth) -->
      <ellipse cx="256" cy="285" rx="85" ry="55" fill="url(#dragonBelly)" filter="url(#headBevel)"/>
    </g>
    
    <!-- Glowing Ruby Gemstone on Forehead -->
    <path d="M 256 145 L 270 165 L 256 185 L 242 165 Z" fill="#FF416C" filter="url(#gemGlow)"/>
    <path d="M 256 150 L 265 165 L 256 180 L 247 165 Z" fill="#FF8E9F"/>
    
    <!-- Dragon Eyebrows/Scales over eyes -->
    <path d="M 160 180 Q 186 160 210 180" fill="none" stroke="#0E6251" stroke-width="8" stroke-linecap="round"/>
    <path d="M 352 180 Q 326 160 302 180" fill="none" stroke="#0E6251" stroke-width="8" stroke-linecap="round"/>
    
    {get_eyes(expr, spacing=65, dy=0, color="#0E6251", gradient="url(#eyeShineGreen)")}
    {get_mouth(expr, color="#0E6251", width=35, dy=30)}
    
    <!-- Dragon Nostrils -->
    <ellipse cx="230" cy="265" rx="5" ry="8" fill="#117A65" transform="rotate(-20 230 265)"/>
    <ellipse cx="282" cy="265" rx="5" ry="8" fill="#117A65" transform="rotate(20 282 265)"/>
    """
    return svg_wrapper(content, defs)

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

print("All 20 ultra 3D-enhanced SVGs generated.")
