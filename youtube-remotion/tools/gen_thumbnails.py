import base64, concurrent.futures
from openai import OpenAI
from pathlib import Path

client = OpenAI(api_key=Path(".env").read_text().split("OPENAI_API_KEY=")[1].strip())

REF_IMAGE = "public/character-v2.png"
OUT_DIR = Path("img/thum")
OUT_DIR.mkdir(parents=True, exist_ok=True)

TITLE = "하루 끼니 6번 먹고\n세계 챔피언이 된 남자"
DATE_PREFIX = "260726_올림피아챔피언의극한커팅식단"

# 4개 썸네일 변형 프롬프트
PROMPTS = [
    # 1: 강렬한 빨간+검정 배경
    f"YouTube thumbnail, 16:9 landscape ratio. Left side: bold Korean text '{TITLE}' in thick white font with red glow outline, impactful and clickbait style. Right side: the exact character from reference image (silver chrome muscular bodybuilder with blank featureless face, black HMAD cap). Dark red-to-black gradient background. Dramatic lighting. Ultra high contrast. Professional YouTube thumbnail quality.",
    # 2: 네온 블루 배경
    f"YouTube thumbnail, 16:9 landscape ratio. Left side: bold Korean text '{TITLE}' in thick yellow font with black stroke, huge and eye-catching. Right side: the exact character from reference (silver chrome muscular bodybuilder with blank face, HMAD cap) in side chest pose. Dark navy-to-black gradient background with blue neon accents. Dramatic rim lighting. Professional YouTube thumbnail.",
    # 3: 오렌지/골드 에너지
    f"YouTube thumbnail, 16:9 landscape ratio. Left side: bold Korean text '{TITLE}' in white font with orange fire glow effect. Right side: the exact character from reference (silver chrome bodybuilder, blank face, HMAD cap) flexing double biceps. Black background with golden energy particles. Dramatic studio lighting. Professional YouTube thumbnail quality.",
    # 4: 심플 블랙+화이트 대비
    f"YouTube thumbnail, 16:9 landscape ratio. Left side: bold Korean text '{TITLE}' in massive neon green font with dark stroke. Right side: the exact reference character (silver chrome muscular bodybuilder, featureless face, HMAD cap) in most muscular pose. Pure black background. High contrast dramatic lighting from above. Clean professional YouTube thumbnail.",
]

def generate_thumb(i):
    num = i + 1
    suffix = f"_{num}" if num > 1 else ""
    filename = f"{DATE_PREFIX}{suffix}.png"
    try:
        result = client.images.edit(
            model="gpt-image-2",
            image=[open(REF_IMAGE, "rb")],
            prompt=PROMPTS[i],
            size="1536x1024",  # 16:9 landscape
            quality="high",
            n=1,
        )
        img_data = base64.b64decode(result.data[0].b64_json)
        out_path = OUT_DIR / filename
        out_path.write_bytes(img_data)
        print(f"Thumbnail {num} OK: {out_path} ({len(img_data)//1024}KB)")
        return True
    except Exception as e:
        print(f"Thumbnail {num} FAIL: {e}")
        return False

print("=== Generating 4 thumbnails in parallel ===")
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    results = list(ex.map(generate_thumb, range(4)))

success = sum(results)
print(f"\nDone! {success}/4 thumbnails saved to {OUT_DIR}/")
