import os, base64, concurrent.futures
from openai import OpenAI
from pathlib import Path

client = OpenAI(api_key=Path(".env").read_text().split("OPENAI_API_KEY=")[1].strip())

REF_IMAGE = "public/character-v2.png"
OUT_DIR = Path("out/char-raw")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PREFIX = "Exactly same character as the reference image: smooth blank silver chrome metallic face with NO eyes NO nose NO mouth (completely featureless smooth metal face), black HMAD cap on head, shirtless chrome silver metallic muscular body with hyper-detailed muscle striations and veins, black athletic shorts, white sneakers. Official bodybuilding competition pose: "
SUFFIX = ". Solid pure black background, dramatic studio rim lighting highlighting every muscle fiber, 8K ultra high quality, photorealistic chrome metal texture matching the reference exactly"

POSES = [
    "front double biceps pose showing full musculature, full body head to toe",
    "side chest pose showing bicep peak and pec thickness, full body head to toe",
    "lower body ONLY cropped from waist down: side lunge showing massive quad and hamstring, NO head NO arms NO torso visible in frame",
    "rear lat spread pose showing wide back and thick glutes, full body head to toe",
    "lower body ONLY cropped from waist down: front stance showing thick quads and calves, NO head NO arms NO torso visible in frame",
    "most muscular crab pose showing full body power, full body head to toe",
    "lower body ONLY cropped from waist down: side view showing quad sweep and hamstring, NO head NO arms NO torso visible in frame",
    "arms crossed confident stance with massive visible legs, full body head to toe",
    "lower body ONLY cropped from waist down: wide sumo stance showing abductors and adductors, NO head NO arms NO torso visible in frame",
    "rear double biceps pose showing back detail, full body head to toe",
]

def generate_one(i):
    num = f"{i+1:02d}"
    prompt = f"{PREFIX}{POSES[i]}{SUFFIX}"
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
        out_path = OUT_DIR / f"char-{num}-raw.png"
        out_path.write_bytes(img_data)
        print(f"char-{num} OK ({len(img_data)//1024}KB)")
        return True
    except Exception as e:
        print(f"char-{num} FAIL: {e}")
        return False

# 5개씩 2배치 (rate limit safe)
print("=== Batch 1 (1-5) ===")
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
    list(ex.map(generate_one, range(5)))

print("=== Batch 2 (6-10) ===")
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
    list(ex.map(generate_one, range(5, 10)))

print("\nAll done! Raw images in out/char-raw/")
