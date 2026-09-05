---
inclusion: manual
---

# 영상 믹스 (장면 무작위 섞기) — 헬마드

사용자가 "믹스해줘/섞어줘/영상 섞어/컷 섞어/mix" 요청 시. 운동 영상 컷을 자동 감지해 무작위 재배치한다.

## 워크플로우
```
① mp4를 mix/ 폴더에 배치
② ffmpeg scene detection으로 컷 분할 (threshold 0.3)
③ 3초 미만 구간 병합 → 유효 장면 목록
④ 사용자에게 장면 분할 결과 제시 (검증)
⑤ 승인 후 무작위 seed로 순서 섞기
⑥ Remotion MixVideo로 미리보기
⑦ 렌더링 (필요 시, ffmpeg concat)
```

## 파일 구조
| 경로 | 역할 |
|------|------|
| `mix/` | 원본 mp4 소스 |
| `mix/mix_result/` | **믹스 렌더링 결과물** |
| `mix/*_scenes.json` | 장면 분할 결과(검증용) |
| `public/mix/` | Remotion 참조 mp4(staticFile) |
| `src/data/mix-scenes.ts` | 장면 데이터 + shuffle 함수 |
| `src/MixVideo.tsx` | Remotion 컴포지션 |

## 장면 감지
```powershell
ffmpeg -i "mix/파일명.mp4" -filter:v "select='gt(scene,0.3)',showinfo" -vsync vfr -f null NUL 2>&1 | Select-String "pts_time"
```
- threshold 0.3(운동 영상 적합). 너무 많이 감지되면 0.4, 적으면 0.2.
- 병합: 최소 3초. 3초 미만은 다음 구간과 자동 병합(빠른 전환은 같은 동작 앵글 변경일 가능성 높음).

## Remotion 컴포지션
- ID `MixVideo`, 해상도=원본(보통 1920×1080), FPS=원본(보통 24fps), Props `seed`(다른 seed=다른 순서).

## 렌더링 (ffmpeg copy concat — 필수)
- **Remotion 렌더링 사용 안 함**(단순 컷 섞기엔 비효율, 1시간+). **ffmpeg `-c copy` concat만 사용**(재인코딩 없이 1분 이내).
- 출력: `mix/mix_result/mix_파일명.mp4` (반드시 이 경로).
- 절차: scenes.json 로드 → seed 셔플 → ffmpeg `-c copy` 세그먼트 추출(임시) → concat → 결과 저장 → 임시 파일 정리.
- seed 변경 시 스크립트 내 `SEED` 값만 수정.

## 파일명 규칙
- 입력 `mix/YYMMDD.mp4` · 장면 `mix/YYMMDD_scenes.json` · 출력 `mix/mix_result/mix_YYMMDD.mp4`.

## 새 영상 작업 절차
1. `mix/`에 mp4 배치 → 2. ffprobe로 정보 확인 → 3. scene detection → 4. 장면 필터링 → 5. `mix-scenes.ts`의 `MIX_DATA` 업데이트 → 6. `public/mix/`에 mp4 복사 → 7. Root.tsx MixVideo fps/duration 확인 → 8. Studio 미리보기 → 9. 검증 후 필요시 렌더.
