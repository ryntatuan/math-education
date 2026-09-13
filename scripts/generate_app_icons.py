import os
from PIL import Image, ImageDraw

def main():
    source_path = r"C:\Users\Nguyen Tuan\.gemini\antigravity-ide\brain\3bc168cb-1ecc-4d00-8f06-7b7398a728fc\owl_app_icon_1789303010055.jpg"
    base_dir = r"d:\1.Jobs\6.PersonalProject\Education\client"
    
    if not os.path.exists(source_path):
        print(f"Source not found: {source_path}")
        return

    orig = Image.open(source_path).convert("RGBA")
    
    # Bộ lọc tương thích mọi phiên bản Pillow
    resample_filter = getattr(Image, 'Resampling', Image).LANCZOS if hasattr(Image, 'Resampling') else getattr(Image, 'LANCZOS', getattr(Image, 'ANTIALIAS', 1))

    # 1. Cắt lấy phần icon chính (bỏ bóng mờ bên ngoài khung squircle)
    crop_box = (140, 140, 884, 884)
    cropped_icon = orig.crop(crop_box)
    
    # 2. Tạo phiên bản 1024x1024 cho iOS Full Bleed
    ios_icon = cropped_icon.resize((1024, 1024), resample_filter)
    ios_icon_rgb = Image.new("RGB", (1024, 1024), (255, 255, 255))
    ios_icon_rgb.paste(ios_icon, (0, 0), ios_icon)

    # Lưu iOS Universal Icon
    ios_dir = os.path.join(base_dir, "ios", "App", "App", "Assets.xcassets", "AppIcon.appiconset")
    os.makedirs(ios_dir, exist_ok=True)
    ios_out = os.path.join(ios_dir, "AppIcon-512@2x.png")
    ios_icon_rgb.save(ios_out, "PNG")
    print(f"Saved iOS icon: {ios_out}")

    # 3. Tạo icon tròn (Round) cho Android
    def make_round_icon(size):
        icon_resized = cropped_icon.resize((size, size), resample_filter)
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        round_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        round_img.paste(icon_resized, (0, 0), mask)
        return round_img

    # 4. Tạo Adaptive Foreground cho Android (108x108 tương đối với 48x48 icon)
    def make_foreground_icon(fg_size):
        content_size = int(fg_size * 0.72)
        pad = (fg_size - content_size) // 2
        content = cropped_icon.resize((content_size, content_size), resample_filter)
        fg_img = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
        fg_img.paste(content, (pad, pad), content)
        return fg_img

    # Các kích thước Android
    android_res = os.path.join(base_dir, "android", "app", "src", "main", "res")
    densities = {
        "mipmap-mdpi": (48, 108),
        "mipmap-hdpi": (72, 162),
        "mipmap-xhdpi": (96, 216),
        "mipmap-xxhdpi": (144, 324),
        "mipmap-xxxhdpi": (192, 432),
    }

    for folder, (square_size, fg_size) in densities.items():
        target_dir = os.path.join(android_res, folder)
        os.makedirs(target_dir, exist_ok=True)

        # Standard icon
        sq_img = cropped_icon.resize((square_size, square_size), resample_filter)
        sq_img.save(os.path.join(target_dir, "ic_launcher.png"), "PNG")

        # Round icon
        rd_img = make_round_icon(square_size)
        rd_img.save(os.path.join(target_dir, "ic_launcher_round.png"), "PNG")

        # Foreground adaptive icon
        fg_img = make_foreground_icon(fg_size)
        fg_img.save(os.path.join(target_dir, "ic_launcher_foreground.png"), "PNG")

        print(f"Generated Android icons for {folder}: {square_size}x{square_size}")

    # 5. Lưu Web / PWA icons vào client/public
    public_dir = os.path.join(base_dir, "public")
    os.makedirs(public_dir, exist_ok=True)

    # Favicon 64x64 PNG
    cropped_icon.resize((64, 64), resample_filter).save(os.path.join(public_dir, "favicon.png"), "PNG")
    # Apple Touch Icon 180x180
    cropped_icon.resize((180, 180), resample_filter).save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    # PWA 192x192
    cropped_icon.resize((192, 192), resample_filter).save(os.path.join(public_dir, "icon-192.png"), "PNG")
    # PWA 512x512
    cropped_icon.resize((512, 512), resample_filter).save(os.path.join(public_dir, "icon-512.png"), "PNG")
    print("Saved public web icons successfully!")

if __name__ == "__main__":
    main()
