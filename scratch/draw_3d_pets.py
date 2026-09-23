import os

OUT_DIR = "client/public/pets"
os.makedirs(OUT_DIR, exist_ok=True)

def svg_wrapper(content, defs=""):
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- 3D Bevel Filter for soft 3D look (highlights + inner shadow + drop shadow) -->
    <filter id="bevel3D" x="-20%" y="-20%" width="140%" height="140%">
      <!-- Ambient Drop Shadow -->
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#000000" flood-opacity="0.12" result="drop"/>
      
      <!-- Top Highlight (simulating overhead light) -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blurLight"/>
      <feOffset in="blurLight" dx="0" dy="-8" result="offsetLight"/>
      <feComposite in="offsetLight" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="lightDiff"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.6" result="lightColor"/>
      <feComposite in="lightColor" in2="lightDiff" operator="in" result="highlight"/>

      <!-- Bottom Inner Shadow (simulating 3D volume/ambient occlusion) -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blurShadow"/>
      <feOffset in="blurShadow" dx="0" dy="10" result="offsetShadow"/>
      <feComposite in="offsetShadow" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
      <feFlood flood-color="#000000" flood-opacity="0.25" result="shadowColor"/>
      <feComposite in="shadowColor" in2="shadowDiff" operator="in" result="innerShadow"/>
      
      <!-- Combine -->
      <feMerge>
        <feMergeNode in="drop"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="innerShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>

    <!-- Softer Bevel for smaller parts -->
    <filter id="softBevel" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" result="drop"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blurLight"/>
      <feOffset in="blurLight" dx="0" dy="-4" result="offsetLight"/>
      <feComposite in="offsetLight" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="lightDiff"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.5" result="lightColor"/>
      <feComposite in="lightColor" in2="lightDiff" operator="in" result="highlight"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blurShadow"/>
      <feOffset in="blurShadow" dx="0" dy="5" result="offsetShadow"/>
      <feComposite in="offsetShadow" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
      <feFlood flood-color="#000000" flood-opacity="0.15" result="shadowColor"/>
      <feComposite in="shadowColor" in2="shadowDiff" operator="in" result="innerShadow"/>
      <feMerge>
        <feMergeNode in="drop"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="innerShadow"/>
        <feMergeNode in="highlight"/>
      </feMerge>
    </filter>
    
    {defs}
  </defs>
{content}
</svg>"""

def get_corgi_eyes(expr):
    color = "#3D2616"
    if expr == "great":
        return f"""
        <path d="M170 230 Q190 200 210 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        <path d="M302 230 Q322 200 342 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr in ["good", "normal"]:
        return f"""
        <ellipse cx="190" cy="220" rx="10" ry="16" fill="{color}"/>
        <ellipse cx="322" cy="220" rx="10" ry="16" fill="{color}"/>
        <circle cx="193" cy="214" r="4" fill="#FFFFFF"/>
        <circle cx="325" cy="214" r="4" fill="#FFFFFF"/>
        """
    elif expr == "low":
        return f"""
        <ellipse cx="190" cy="225" rx="12" ry="12" fill="{color}"/>
        <ellipse cx="322" cy="225" rx="12" ry="12" fill="{color}"/>
        <path d="M165 205 Q190 195 210 215" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M347 205 Q322 195 302 215" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M170 220 L210 240 M170 240 L210 220" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M302 220 L342 240 M302 240 L342 220" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M190 250 L190 280" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        <path d="M322 250 L322 280" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        """

def get_corgi_mouth(expr):
    color = "#3D2616"
    if expr in ["great", "good"]:
        return f"""
        <!-- Tongue -->
        <path d="M 236 290 L 276 290 L 276 320 Q 276 340 256 340 Q 236 340 236 320 Z" fill="#FF577F" filter="url(#softBevel)"/>
        <path d="M 256 290 L 256 330" stroke="#CC2E55" stroke-width="4" stroke-linecap="round"/>
        <path d="M 256 270 Q 236 290 216 270" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M 256 270 Q 276 290 296 270" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "normal":
        return f"""
        <path d="M 256 280 Q 236 290 226 280" fill="none" stroke="{color}" stroke-width="6" stroke-linecap="round"/>
        <path d="M 256 280 Q 276 290 286 280" fill="none" stroke="{color}" stroke-width="6" stroke-linecap="round"/>
        """
    elif expr == "low":
        return f"""
        <path d="M 236 300 Q 256 280 276 300" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M 236 300 Q 256 270 276 300" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M 246 310 Q 256 295 266 310" fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round"/>
        """

def render_corgi(expr):
    defs = """
    <linearGradient id="corgiHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCE6C9"/>
      <stop offset="100%" stop-color="#CA9C78"/>
    </linearGradient>
    <linearGradient id="corgiEar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6B4E3A"/>
      <stop offset="100%" stop-color="#4F3827"/>
    </linearGradient>
    """
    content = f"""
    <!-- Ears -->
    <rect x="130" y="80" width="90" height="130" rx="40" fill="url(#corgiEar)" filter="url(#bevel3D)" transform="rotate(-15 170 140)"/>
    <rect x="292" y="80" width="90" height="130" rx="40" fill="url(#corgiEar)" filter="url(#bevel3D)" transform="rotate(15 342 140)"/>
    
    <!-- Head -->
    <rect x="116" y="140" width="280" height="230" rx="95" fill="url(#corgiHead)" filter="url(#bevel3D)"/>
    
    <!-- Eyebrows -->
    <ellipse cx="190" cy="170" rx="10" ry="14" fill="#6B4E3A"/>
    <ellipse cx="322" cy="170" rx="10" ry="14" fill="#6B4E3A"/>
    
    <!-- Muzzle / White marking -->
    <path d="M 186 210 Q 256 160 326 210 Q 376 370 256 370 Q 136 370 186 210 Z" fill="#FFF8F0" filter="url(#softBevel)"/>
    
    {get_corgi_eyes(expr)}
    {get_corgi_mouth(expr)}
    
    <!-- Nose -->
    <ellipse cx="256" cy="250" rx="22" ry="14" fill="#3D2616"/>
    <ellipse cx="262" cy="245" rx="8" ry="4" fill="#80624E"/>
    """
    return svg_wrapper(content, defs)


def get_cat_eyes(expr):
    color = "#4A2012"
    if expr == "great":
        return f"""
        <path d="M160 230 Q180 200 200 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        <path d="M312 230 Q332 200 352 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr in ["good", "normal"]:
        return f"""
        <circle cx="180" cy="220" r="12" fill="{color}"/>
        <circle cx="332" cy="220" r="12" fill="{color}"/>
        <circle cx="184" cy="216" r="4" fill="#FFFFFF"/>
        <circle cx="336" cy="216" r="4" fill="#FFFFFF"/>
        """
    elif expr == "low":
        return f"""
        <circle cx="180" cy="220" r="12" fill="{color}"/>
        <circle cx="332" cy="220" r="12" fill="{color}"/>
        <path d="M150 200 L200 210" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M362 200 L312 210" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M160 220 Q180 200 200 230" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M352 220 Q332 200 312 230" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M180 240 L180 270" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        <path d="M332 240 L332 270" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        """

def get_cat_mouth(expr):
    color = "#901C1C"
    if expr in ["great", "good"]:
        return f"""
        <path d="M 236 260 Q 256 310 276 260 Z" fill="{color}" filter="url(#softBevel)"/>
        <path d="M 242 275 Q 256 295 270 275 Z" fill="#FF7EB3"/>
        """
    elif expr == "normal":
        return f"""
        <path d="M 256 260 Q 246 270 236 260" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M 256 260 Q 266 270 276 260" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "low":
        return f"""
        <path d="M 246 280 Q 256 265 266 280" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M 240 280 Q 256 260 272 280" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        """

def render_cat(expr):
    defs = """
    <!-- Softer, brighter gradient for cat -->
    <linearGradient id="catHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF2A3"/>
      <stop offset="50%" stop-color="#FFAD6E"/>
      <stop offset="100%" stop-color="#E86B85"/>
    </linearGradient>
    <linearGradient id="catEar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFD659"/>
      <stop offset="100%" stop-color="#FF9B5E"/>
    </linearGradient>
    """
    content = f"""
    <!-- Ears -->
    <path d="M140 180 L 140 80 Q 160 100 230 160 Z" fill="url(#catEar)" filter="url(#bevel3D)"/>
    <path d="M155 160 L 155 110 L 200 155 Z" fill="#FF9A95"/>
    <path d="M372 180 L 372 80 Q 352 100 282 160 Z" fill="url(#catEar)" filter="url(#bevel3D)"/>
    <path d="M357 160 L 357 110 L 312 155 Z" fill="#FF9A95"/>
    
    <!-- Head -->
    <rect x="126" y="140" width="260" height="210" rx="80" fill="url(#catHead)" filter="url(#bevel3D)"/>
    
    <!-- Whiskers -->
    <path d="M 120 250 L 70 240 M 110 270 L 60 270" stroke="#FFD1B3" stroke-width="6" stroke-linecap="round"/>
    <path d="M 392 250 L 442 240 M 402 270 L 452 270" stroke="#FFD1B3" stroke-width="6" stroke-linecap="round"/>
    
    {get_cat_eyes(expr)}
    {get_cat_mouth(expr)}
    
    <!-- Nose -->
    <path d="M 246 240 L 266 240 L 256 250 Z" fill="#FF4D79"/>
    """
    return svg_wrapper(content, defs)


def get_owl_eyes(expr):
    bg = "#F6DC65"
    border = "#B36236"
    pupil = "#2A1D13"
    
    if expr == "great":
        return f"""
        <circle cx="196" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <circle cx="316" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <path d="M 176 230 Q 196 190 216 230" fill="none" stroke="{pupil}" stroke-width="12" stroke-linecap="round"/>
        <path d="M 296 230 Q 316 190 336 230" fill="none" stroke="{pupil}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="170" cy="180" r="6" fill="#FFFFFF"/>
        <circle cx="210" cy="180" r="6" fill="#FFFFFF"/>
        <circle cx="300" cy="180" r="6" fill="#FFFFFF"/>
        <circle cx="340" cy="180" r="6" fill="#FFFFFF"/>
        """
    elif expr == "good":
        return f"""
        <circle cx="196" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <circle cx="316" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <circle cx="196" cy="220" r="22" fill="{pupil}"/>
        <circle cx="316" cy="220" r="22" fill="{pupil}"/>
        <circle cx="204" cy="212" r="8" fill="#FFFFFF"/>
        <circle cx="324" cy="212" r="8" fill="#FFFFFF"/>
        """
    elif expr == "normal":
        return f"""
        <circle cx="196" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <circle cx="316" cy="220" r="45" fill="{bg}" stroke="{border}" stroke-width="12" filter="url(#softBevel)"/>
        <circle cx="196" cy="220" r="18" fill="{pupil}"/>
        <circle cx="316" cy="220" r="18" fill="{pupil}"/>
        """
    elif expr == "low":
        return f"""
        <g stroke="{border}" stroke-width="12" filter="url(#softBevel)">
            <path d="M 151 220 A 45 45 0 0 0 241 220 Z" fill="{bg}"/>
            <path d="M 271 220 A 45 45 0 0 0 361 220 Z" fill="{bg}"/>
        </g>
        <circle cx="196" cy="230" r="14" fill="{pupil}"/>
        <circle cx="316" cy="230" r="14" fill="{pupil}"/>
        <path d="M151 210 L241 220" stroke="{border}" stroke-width="12" stroke-linecap="round"/>
        <path d="M361 210 L271 220" stroke="{border}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <g stroke="{border}" stroke-width="12" filter="url(#softBevel)">
            <path d="M 151 230 A 45 45 0 0 0 241 230 Z" fill="{bg}"/>
            <path d="M 271 230 A 45 45 0 0 0 361 230 Z" fill="{bg}"/>
        </g>
        <circle cx="196" cy="240" r="12" fill="{pupil}"/>
        <circle cx="316" cy="240" r="12" fill="{pupil}"/>
        <path d="M151 220 L241 230" stroke="{border}" stroke-width="12" stroke-linecap="round"/>
        <path d="M361 220 L271 230" stroke="{border}" stroke-width="12" stroke-linecap="round"/>
        <path d="M196 260 L196 290" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        <path d="M316 260 L316 290" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        """

def render_owl(expr):
    defs = """
    <linearGradient id="owlHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8B6953"/>
      <stop offset="100%" stop-color="#553A28"/>
    </linearGradient>
    <linearGradient id="owlBelly" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCE1D4"/>
      <stop offset="100%" stop-color="#EAAFA1"/>
    </linearGradient>
    """
    
    beak = ""
    if expr in ["great", "good"]:
        beak = f"""
        <path d="M 236 260 L 276 260 L 256 300 Z" fill="#E2672B" filter="url(#softBevel)"/>
        <path d="M 246 290 L 266 290 L 256 310 Z" fill="#C14B15"/>
        """
    elif expr == "danger":
        beak = f"""<path d="M 236 280 L 276 280 L 256 260 Z" fill="#E2672B" filter="url(#softBevel)"/>"""
    else:
        beak = f"""<path d="M 236 260 L 276 260 L 256 290 Z" fill="#E2672B" filter="url(#softBevel)"/>"""
        
    content = f"""
    <!-- Feet -->
    <path d="M 186 360 A 20 20 0 0 0 226 360 Z" fill="#E2672B"/>
    <path d="M 286 360 A 20 20 0 0 0 326 360 Z" fill="#E2672B"/>
    
    <!-- Tufts / Ears -->
    <path d="M 150 160 Q 140 80 180 120" fill="none" stroke="#553A28" stroke-width="20" stroke-linecap="round"/>
    <path d="M 362 160 Q 372 80 332 120" fill="none" stroke="#553A28" stroke-width="20" stroke-linecap="round"/>
    
    <!-- Head -->
    <rect x="136" y="130" width="240" height="240" rx="100" fill="url(#owlHead)" filter="url(#bevel3D)"/>
    
    <!-- Belly -->
    <path d="M 136 270 Q 256 220 376 270 L 376 310 Q 256 390 136 310 Z" fill="url(#owlBelly)" filter="url(#softBevel)"/>
    
    {get_owl_eyes(expr)}
    {beak}
    """
    return svg_wrapper(content, defs)


def get_dragon_eyes(expr):
    color = "#1A5632"
    if expr == "great":
        return f"""
        <path d="M170 230 Q190 200 210 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        <path d="M302 230 Q322 200 342 230" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/>
        """
    elif expr in ["good", "normal"]:
        return f"""
        <ellipse cx="190" cy="220" rx="8" ry="12" fill="{color}"/>
        <ellipse cx="322" cy="220" rx="8" ry="12" fill="{color}"/>
        """
    elif expr == "low":
        return f"""
        <ellipse cx="190" cy="220" rx="8" ry="12" fill="{color}"/>
        <ellipse cx="322" cy="220" rx="8" ry="12" fill="{color}"/>
        <path d="M160 190 L210 205" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M352 190 L302 205" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M170 210 Q190 190 210 210" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M302 210 Q322 190 342 210" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
        <path d="M190 230 L190 260" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        <path d="M322 230 L322 260" stroke="#56CCF2" stroke-width="10" stroke-linecap="round"/>
        """

def get_dragon_mouth(expr):
    color = "#1A5632"
    if expr in ["great", "good"]:
        return f"""
        <path d="M 236 330 Q 256 360 276 330 Z" fill="#901C1C"/>
        <path d="M 246 340 Q 256 355 266 340 Z" fill="#FF7EB3"/>
        """
    elif expr == "normal":
        return f"""
        <path d="M 240 340 Q 256 350 272 340" fill="none" stroke="{color}" stroke-width="6" stroke-linecap="round"/>
        """
    elif expr == "low":
        return f"""
        <path d="M 240 350 Q 256 330 272 350" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """
    elif expr == "danger":
        return f"""
        <path d="M 236 350 Q 256 330 276 350" fill="none" stroke="{color}" stroke-width="8" stroke-linecap="round"/>
        """

def render_dragon(expr):
    defs = """
    <linearGradient id="dragonHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#80DCA4"/>
      <stop offset="100%" stop-color="#3FA574"/>
    </linearGradient>
    <linearGradient id="dragonSnout" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A5E8BB"/>
      <stop offset="100%" stop-color="#6AB988"/>
    </linearGradient>
    """
    content = f"""
    <!-- Scales / Spikes -->
    <path d="M 126 180 Q 90 150 126 120 Z" fill="#E24A75" filter="url(#softBevel)"/>
    <path d="M 386 180 Q 422 150 386 120 Z" fill="#E24A75" filter="url(#softBevel)"/>
    <path d="M 210 160 Q 256 100 302 160 Z" fill="#E24A75" filter="url(#softBevel)"/>
    
    <!-- Horns -->
    <path d="M 180 160 Q 150 60 190 70 Q 210 120 220 160 Z" fill="#F4CD54" filter="url(#softBevel)"/>
    <path d="M 332 160 Q 362 60 322 70 Q 302 120 292 160 Z" fill="#F4CD54" filter="url(#softBevel)"/>
    
    <!-- Head -->
    <rect x="126" y="150" width="260" height="220" rx="80" fill="url(#dragonHead)" filter="url(#bevel3D)"/>
    
    <!-- Snout -->
    <rect x="146" y="270" width="220" height="90" rx="45" fill="url(#dragonSnout)" filter="url(#softBevel)"/>
    
    <!-- Nostrils -->
    <ellipse cx="226" cy="300" rx="8" ry="12" fill="#20693E"/>
    <ellipse cx="286" cy="300" rx="8" ry="12" fill="#20693E"/>
    
    {get_dragon_eyes(expr)}
    {get_dragon_mouth(expr)}
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

print("All 20 high-quality 3D-enhanced SVGs generated.")
