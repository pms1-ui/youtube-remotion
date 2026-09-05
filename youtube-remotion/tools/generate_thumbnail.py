import base64, os, sys
from openai import OpenAI
from pathlib import Path

client = OpenAI(api_key=Path(".env").read_text().split("OPENAI_API_KEY=")[1].strip())

REF_IMAGE = "public/character-v2.png"
OUT_DIR = Path("img/thum")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# 유튜브 썸네일 비율: 1280x720 (16:9)
# gpt-image-2 지원 크기 중 1536x1024가 가장 가까움 (3:2지만 crop 가능)
# 또는 1792x1024 사용

prompts = [
    "YouTube thumbnail, dark black/navy gradient background, LEFT side: bold Korean text '챔피언의 극한 식단' in large white bold impact font with yellow highlight on '극한', RIGHT side: the reference character (silver metallic muscular bodybuilder with HMAD cap) in confident pose. Dramatic lighting, high contrast, professional YouTube thumbnail style, eye-catching, 16:9 aspect ratio",
    "YouTube thumbnail, dark black background with subtle red accent lighting, LEFT side: bold Korean text '하루 250kcal로 올림피아 우승?' in massive white impact font with red glow on '250kcal', RIGHT side: the reference character (silver metallic muscular bodybuilder with HMAD cap) flexing pose. Professional YouTube thumbnail, dramatic, clickbait style, 16:9 aspect ratio",
]

for i, prompt in enumerate(prompts):
    num = i + 1
    print(f"Generating thumbnail {num}...")
    try:
        result = client.images.edit(
            model="gpt-image-2",
            image=[open(REF_IMAGE, "rb")],
            prompt=prompt,
            size="1536x1024",
            quality="high",
            n=1,
        )
        img_data = base64.b64decode(result.data[0].b64_json)
        filename = f"260725_올림피아챔피언의극한커팅식단_{num}.png"
        out_path = OUT_DIR / filename
        out_path.write_bytes(img_data)
        print(f"  Saved: {out_path} ({len(img_data)//1024}KB)")
    except Exception as e:
        print(f"  FAIL: {e}")

print("\nDone!")
