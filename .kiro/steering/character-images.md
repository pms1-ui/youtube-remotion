---
inclusion: manual
---

# 캐릭터 이미지 제작 (OpenAI gpt-image-2) — 헬마드

롱폼 장면에 배치할 캐릭터 이미지를 생성하고, 배경을 제거한 뒤 Remotion에서 렌더한다.

## 제작 흐름
1. **이미지 생성**: OpenAI `gpt-image-2` API `/v1/images/edits` 엔드포인트.
   - `public/character-v2.png`를 **참조 이미지로 반드시 함께 전송**(`image[]` 파라미터). 없으면 외형이 달라짐 — 절대 빠뜨리지 않기.
2. **배경 제거**: rembg로 투명 PNG 변환.
3. **저장**: `public/char-01.png` ~ `char-10.png`.
4. **배치**: Scene 데이터 `characterImage` 필드에 파일명 지정.

## API 설정
- 엔드포인트 `https://api.openai.com/v1/images/edits` · 모델 `gpt-image-2` · Quality `high`
- API 키: `.env`의 `OPENAI_API_KEY`
- 참조 이미지: `public/character-v2.png` (항상 함께 전송)
- 응답: Base64 PNG(b64_json) · 크기 `1024x1536`(세로형) · 배경 검정 → rembg 투명화

## 참조 이미지 정보
- `public/character-v2.png`: 은색 메탈릭 바디, 눈코입 없는 매끈한 실버 얼굴, HMAD 검정 캡. ⚠️ 생성 시 반드시 함께 전송.

## 프롬프트 규칙
- 캐릭터 묘사: "Same character as reference image exactly: silver metallic muscular bodybuilder with smooth featureless silver face without eyes nose or mouth, HMAD black cap, shirtless, black shorts, white sneakers"
- 얼굴: "smooth featureless silver face without eyes nose or mouth" (까만 얼굴/고개 숙임 X)
- 샷 타입: 전신("full body head to toe") / 상반신("upper body shot cropped at waist, showing torso and above only") / 하반신("lower body shot from waist down only") 혼용.
- **★ 상반신 위주 기본**: 특별 요청 없으면 상반신(waist up) 기본, 전신은 명시 시에만.
- **★ 컴팩트 포즈 필수**: 팔·손·다리·발 모두 프레임 안. 프롬프트에 "all limbs visible within frame, compact pose, not extending arms outward" 포함.
- **★ 짤림 방지**: "tightly framed upper body shot cropped at waist, all body parts fully within frame, nothing cut off at edges" 포함.
- **★ 주제별 강조**: 어깨=「emphasizing massive round deltoids and shoulder caps」, 등=「emphasizing wide back and V-taper」 등.
- 배경: 생성 시 `solid black background, dramatic studio lighting`, 프롬프트 끝에 `ultra high quality, 8K detail, photorealistic metallic texture`. (배경 제거 용이하게 흰 배경 `solid pure white background`를 쓰기도 함)
- 생성 후 반드시 rembg 배경 제거, RGBA 확인.

## 이미지 생성 프로세스 (병렬 필수)
- **5개씩 병렬**(PowerShell `Start-Job`) → 완료 후 나머지 배치. **직렬 생성 금지.**
- 생성 → JSON 파싱 → base64 디코딩 → rembg → RGBA PNG 저장. 응답 JSON은 처리 후 삭제.
```powershell
$jobs = @()
for ($i = 0; $i -lt 10; $i++) {
    $jobs += Start-Job -ScriptBlock {
        param($key, $prompt, $num, $imgPath)
        curl.exe -s -X POST "https://api.openai.com/v1/images/edits" `
            -H "Authorization: Bearer $key" `
            -F "model=gpt-image-2" -F "prompt=$prompt" `
            -F "size=1024x1536" -F "quality=high" `
            -F "image[]=@$imgPath" -o "public/char-$num-raw.b64"
    } -ArgumentList $key, $prompt, $num, $imgPath
}
$jobs | Wait-Job | Receive-Job
# 이후 python rembg로 일괄 배경 제거
```

## 캐릭터 이미지 재사용 전략 (효율화)
- 장면 수만큼 매번 생성하지 않는다. **10개 포즈를 선생성**하고 장면에 순환 배정.
- 장면 N번 → `char-0${((N-1) % 10) + 1}.png` (1~10 순환). 파일 `public/char-01.png`~`char-10.png` 고정 풀.
- PowerShell Jobs로 10개 동시 병렬(gpt-image-2는 동시 요청 관대). 생성 시간 80% 절약, 포즈 다양성 유지.
- 포즈는 영상 주제에 맞게 선택(등 영상→등 포즈, 하체 영상→하체 포즈).
- 이미지 크기: 전신샷은 화면 70~80% 높이("with some space around, not filling entire frame"), 반신샷은 프레임 꽉("tightly cropped, filling the entire frame").

## 레이아웃 규칙 (요약, 상세는 remotion-scenes.md)
- 캐릭터 있는 장면: 콘텐츠 왼쪽 77%(`right:23%`), 캐릭터 오른쪽 `right:5%`·`height:95%`. 최소 5% 간격, 겹침 금지.
- **★ 캐릭터는 롱폼 모든 장면에 필수** — 영상 전체에 항상 등장.

## 검증 체크리스트 (생성 후 필수)
- [ ] 텍스트가 캐릭터와 겹치지 않는가?
- [ ] 16:9 안에서 균형감이 맞는가?
- [ ] 캐릭터가 세로로 찌그러지지 않았는가?
- [ ] 차트/그래프가 콘텐츠 영역 안에 들어가는가?
- [ ] highlight 카드 그리드: 캐릭터 있으면 최대 2열(`hasChar ? repeat(2, auto)`)
- [ ] 콘텐츠 영역에 `overflow:hidden`/`maxWidth:100%` 적용됐는가?

### 겹침 원인·해결
- 원인: highlight에서 카드 3열(`repeat(3,auto)`)이 콘텐츠 77%를 초과해 캐릭터 영역 침범.
- 해결: `hasChar` 장면은 카드 그리드 최대 2열 강제. 예방: 모든 콘텐츠 컨테이너 `maxWidth:100%`, `overflow:hidden`.

## 포즈 다양성 가이드
| 장면 톤 | 추천 포즈 |
|---------|-----------|
| 인트로/질문 | 프론트 더블 바이셉, 팔짱 |
| 경고/주의 | 손가락 포인팅, 팔 뻗기 |
| 긍정/성장 | 사이드 체스트, 모스트 머스큘러 |
| 설명/분석 | 상반신 크로스암, 턱 괴기 |
| 결론/마무리 | 라떼 스프레드, 승리 포즈 |
- "근육을 자랑하는 포즈"로 넓게 지시하면 다양한 결과. 동일 프롬프트 반복 금지(장면마다 포즈 키워드 다르게). 전신/상반신 혼용. 상반신도 매우 좋음.

## 포즈 프롬프트 풀 (공통 프리픽스 + 15개)
**공통 프리픽스** (항상 앞에):
```
Same character as reference: silver metallic muscular bodybuilder with HMAD black cap covering face, no visible face, shirtless, black shorts, white sneakers.
```
| # | 포즈 (프리픽스 뒤) | 샷 |
|---|---|---|
| 1 | `Pose: back double biceps, rear view showing massive back muscles and lats spread wide, full body head to toe, solid pure white background, studio lighting` | 전신 뒷모습 |
| 2 | `Pose: arms crossed over chest confidently, upper body shot from waist up, looking slightly to the left, solid pure white background, studio lighting` | 상반신 팔짱 |
| 3 | `Pose: side chest pose, one arm flexed showing bicep peak, upper body shot from waist up, solid pure white background, dramatic studio lighting` | 상반신 사이드체스트 |
| 4 | `Pose: rear lat spread, back facing camera showing V-taper and wide lats, full body head to toe, solid pure white background, studio lighting` | 전신 래트스프레드 |
| 5 | `Pose: most muscular crab pose, arms tensed showing vascularity, powerful wide stance, full body head to toe, solid pure white background, dramatic studio lighting` | 전신 크랩포즈 |
| 6 | `Pose: front relaxed stance with hands on hips, showing quad sweep and leg definition, full body head to toe, solid pure white background, studio lighting` | 전신 하체 강조 |
| 7 | `Pose: side tricep pose, one arm behind showing tricep and shoulder, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 사이드트라이셉 |
| 8 | `Pose: front double bicep flex, powerful wide stance, full body head to toe, solid pure white background, dramatic studio lighting` | 전신 더블바이셉 |
| 9 | `Pose: vacuum pose showing tiny waist and broad shoulders, hands behind head, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 바큠포즈 |
| 10 | `Pose: walking towards camera confidently with slight turn, showing quad definition, full body head to toe, solid pure white background, studio lighting` | 전신 워킹 |
| 11 | `Pose: rear view looking over shoulder, showing thick traps and rear delts, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 뒤돌아보기 |
| 12 | `Pose: seated on invisible bench leaning forward, forearms on knees, showing upper back thickness, upper body shot, solid pure white background, studio lighting` | 상반신 앉은자세 |
| 13 | `Pose: one arm raised overhead showing serratus and obliques, other hand on hip, full body head to toe, solid pure white background, studio lighting` | 전신 한팔올리기 |
| 14 | `Pose: lunging forward showing quad separation and hamstring, dynamic athletic stance, full body head to toe, solid pure white background, studio lighting` | 전신 런지 |
| 15 | `Pose: hands clasped behind back pulling shoulders open, showing full chest and front delt, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 가슴열기 |
