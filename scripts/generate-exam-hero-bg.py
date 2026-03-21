from __future__ import annotations

from pathlib import Path
import random

from PIL import Image, ImageColor, ImageDraw, ImageFilter


def _glow(draw: ImageDraw.ImageDraw, cx: int, cy: int, radius: int, color: str, alpha: int) -> None:
    rgb = ImageColor.getrgb(color)
    steps = 28
    for i in range(steps, 0, -1):
        t = i / steps
        a = int(alpha * (t**2))
        rr = int(radius * t)
        draw.ellipse((cx - rr, cy - rr, cx + rr, cy + rr), fill=(*rgb, a))


def main() -> None:
    out_dir = Path("img/backgrounds")
    out_dir.mkdir(parents=True, exist_ok=True)

    width, height = 2200, 1200
    base = Image.new("RGB", (width, height), "#FAF5F2").convert("RGBA")

    # Soft glows
    glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    _glow(glow_draw, 420, 180, 640, "#E8A0B4", 110)
    _glow(glow_draw, 1920, 320, 760, "#D4A574", 105)
    _glow(glow_draw, 1700, 980, 520, "#E8A0B4", 70)
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(18))
    base = Image.alpha_composite(base, glow_layer)

    # Editorial diagram marks (kept right-weighted)
    marks = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    m = ImageDraw.Draw(marks)
    navy = (30, 42, 58)

    def arc(cx: int, cy: int, rx: int, ry: int, start: int, end: int, a: int, stroke: int) -> None:
        bbox = (cx - rx, cy - ry, cx + rx, cy + ry)
        m.arc(bbox, start=start, end=end, fill=(*navy, a), width=stroke)

    arc(1760, 180, 460, 240, 210, 345, 40, 2)
    arc(1760, 212, 430, 222, 210, 345, 34, 2)
    arc(1760, 244, 400, 204, 210, 345, 28, 2)

    arc(1760, 980, 560, 290, 210, 350, 36, 2)
    arc(1760, 1006, 526, 270, 210, 350, 30, 2)

    for x in range(1180, 1180 + 14 * 70, 70):
        m.line((x, 520, x, 580), fill=(*navy, 28), width=2)
    for y in range(520, 520 + 9 * 60, 60):
        m.line((1180, y, 1240, y), fill=(*navy, 22), width=2)

    for x, y in [
        (1320, 420),
        (1390, 460),
        (1460, 430),
        (1540, 470),
        (1620, 440),
        (1700, 480),
        (1780, 450),
        (1860, 500),
        (1940, 470),
    ]:
        m.ellipse((x - 3, y - 3, x + 3, y + 3), fill=(*navy, 55))

    marks = marks.filter(ImageFilter.GaussianBlur(0.6))
    base = Image.alpha_composite(base, marks)

    # Subtle vignette
    vign = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    v = ImageDraw.Draw(vign)
    for i in range(0, 22):
        a = int(2 + i * 2.2)
        v.rectangle((i, i, width - 1 - i, height - 1 - i), outline=(*navy, a))
    vign = vign.filter(ImageFilter.GaussianBlur(12))
    base = Image.alpha_composite(base, vign)

    # Fine grain
    noise = Image.new("L", (width, height))
    pixels = noise.load()
    for yy in range(height):
        for xx in range(width):
            pixels[xx, yy] = 128 + random.randint(-16, 16)
    noise = noise.filter(ImageFilter.GaussianBlur(0.6))
    grain = Image.merge("RGBA", (noise, noise, noise, Image.new("L", (width, height), 30)))
    base = Image.alpha_composite(base, grain)

    out_full = out_dir / "exam-hero-bg.png"
    out_1600 = out_dir / "exam-hero-bg-1600.png"

    base.convert("RGB").save(out_full, format="PNG")
    base.convert("RGB").resize((1600, int(1600 * height / width)), resample=Image.LANCZOS).save(
        out_1600, format="PNG"
    )

    print(f"saved {out_full} ({out_full.stat().st_size} bytes)")
    print(f"saved {out_1600} ({out_1600.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
