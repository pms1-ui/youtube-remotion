import base64, concurrent.futures
from openai import OpenAI
from pathlib import Path
from rembg import remove
from PIL import Image

client = OpenAI(api_key=Path(".env").read_text().split("OPENAI_API_KEY=")[1].strip())

REF_IMAGE = "public/character-v2.png"
OUT_DIR = Path("public/image_2026")
RAW_DIR = Path("out/char-raw")
RAW_DIR.mkdir(parents=True, exist_ok=True)

PREFIX = "Exactly same character as reference: smooth blank silver chrome metallic face with NO eyes NO nose NO mouth, black HMAD cap, extremely muscular physique with detailed striations, black shorts, white sneakers. Bodybuilding pose: "
SUFFIX = ". Solid black background, dramatic studio rim lighting, 8K ultra quality, photorealistic chrome metal"

# 상반신 3, 하반신 3, 전신 3
POSES = [
    # 상반신 (tightly cropped waist up, filling entire frame)
    "side chest pose showing shredded abs and bicep peak, upper body from waist up tightly cropped filling entire frame" + SUFFIX,
    "front double biceps showing ripped abs and vascular arms, upper body from waist up tightly cropped filling entire frame" + SUFFIX,
    "arms crossed confidently showing shredded chest and shoulders, upper body from waist up tightly cropped filling entire frame" + SUFFIX,
    # 하반신 (cropped from waist down, filling frame)
    "lower body ONLY from waist down showing massive quads in front stance, NO head NO arms NO torso visible, tightly cropped filling frame" + SUFFIX,
    "lower body ONLY from waist down side view showing quad sweep and hamstring, NO head NO arms NO torso, tightly cropped filling frame" + SUFFIX,
    "lower body ONLY from waist down wide stance showing inner outer thigh, NO head NO arms NO torso, tightly cropped filling frame" + SUFFIX,
    # 전신 (with some space around, not filling entire frame)
    "front relaxed pose full body head to toe with space around not filling entire frame" + SUFFIX,
    "rear lat spread full body head to toe with space around not filling entire frame" + SUFFIX,
    "most muscular crab pose full body head to toe with space around not filling entire frame" + SUFFIX,
]

def generate_one(i):
    num = f"{i+1:02d}"
    prompt = PREFIX + POSES[i]
    try:
        result = client.images.edit(
            model="gpt-image-2",
            image=[open(REF_IMAGE, "rb")],
            prompt=prompt,
            size="1024x1536",
            quality="high",
            n=1,
        )
        img_data = base64.b64decode(result.data[0].b64_json)
        raw_path = RAW_DIR / f"diet-{num}-raw.png"
        raw_path.write_bytes(img_data)
        # rembg
        img = Image.open(raw_path)
        out = remove(img)
        out_path = OUT_DIR / f"char-{num}.png"
        out.save(out_path)
        print(f"char-{num} OK ({len(img_data)//1024}KB)")
        return True
    except Exception as e:
        print(f"char-{num} FAIL: {e}")
        return False

# 5+4 병렬 (rate limit safe)
print("=== Batch 1 (1-5) ===")
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
    list(ex.map(generate_one, range(5)))

print("=== Batch 2 (6-9) ===")
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    list(ex.map(generate_one, range(5, 9)))

print("\nAll done! Images in public/image_2026/")
