# Demo video embed guide

The README embeds an autoplaying silent GIF (`.github/assets/demo.gif`). This
is the only fully-autonomous README asset GitHub will play on its own. A voiced
`demo-output/output.mp4` is also produced for the HTML5 native player, which
GitHub renders only from an uploaded attachment URL.

## What the demo is

This is a **marketplace montage**: a single ~52s reel covering all five 10x plugins:

1. `sniff`: walks a running app and finds real bugs
2. `ui-ux-suite`: scores 12 design dimensions and shows the exact fix
3. `recap-studio`: turns a topic into a one-page explainer
4. `aws-cost-audit`: read-only AWS bill audit, safe by default
5. `goalify`: prepares a self-deleting `/goal` run a fresh session executes

> Note: `goalify` is skill-only, so it has no standalone demo clip. It appears as a
> title-card beat (`scenes/goalify.html` -> `clips/cg.mp4`, green `#3FB950`) inserted
> before the editors strip, not as a hero segment. The first four plugins each get a
> title card plus a hero segment.

Structure: intro card → per-plugin title card + hero segment (x4 for sniff,
ui-ux-suite, recap-studio, aws-cost-audit) → goalify title card (skill-only, no hero
segment) → editors strip → close card with the repo URL. The four hero segments are
trimmed straight from each plugin repo's own `demo-output/output.mp4`, so they are
authentic.

## Adding the HTML5 native player (manual, optional)

GitHub will not host an mp4 from the repo tree. To get an inline player:

1. Open a GitHub issue, PR, or release comment box on this repo.
2. Drag `demo-output/output.mp4` into the comment box. GitHub uploads it and
   returns a URL like `https://github.com/user-attachments/assets/<uuid>`.
3. Paste that URL on its own line at the top of `README.md`, just above the
   GIF embed. GitHub turns a bare `user-attachments` video URL into an HTML5
   `<video>` player automatically.

### Native player limits

- Formats: `.mp4`, `.mov`, `.webm` (H.264 for `.mp4`).
- Size: 10 MB on the free tier, 100 MB on paid. The current `output.mp4` is
  ~6 MB, so it fits the free tier.
- The mp4 is **not committed** (`demo-output/` is gitignored); rebuild it with
  the pipeline below, then drag-drop it.

## Narration note (edge-tts is broken here)

The narration on `output.mp4` uses the **offline macOS `say` voice** (`say -v Alex`)
because edge-tts cannot run in this environment: the 2026 system-clock skew makes
Microsoft's speech endpoint reject edge-tts's time-based `Sec-MS-GEC` token
(WebSocket 1007), and edge-tts only self-corrects on a 403 that never fires.

To regenerate higher-quality neural narration on a machine with a correct clock:

```bash
edge-tts --voice en-US-AndrewNeural --file demo-output/narration/vo.txt \
  --write-media demo-output/audio/vo.mp3
# then re-mux over the silent montage:
ffmpeg -y -i demo-output/output_silent.mp4 -i demo-output/audio/vo.mp3 \
  -filter_complex "[1:a]adelay=1000|1000,afade=t=in:st=1:d=0.4,afade=t=out:st=44:d=2,apad,aresample=44100[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -t 48.933 -movflags +faststart \
  demo-output/output.mp4
```

## Rebuilding the demo from scratch

The whole pipeline lives in `demo-output/` (gitignored). It expects the four
plugin demo clips to exist at their repos' `demo-output/output.mp4`.

```bash
cd demo-output
# 1. regenerate the HTML title/intro/close cards
bash make-titles.sh
for s in scenes/*.html; do
  playwright screenshot --viewport-size=1920,1080 --wait-for-timeout=1600 \
    "file://$PWD/$s" "frames/$(basename "$s" .html).png"
done
# 2. (re)build card clips + plugin segments, then concat with crossfades
bash build_concat.sh            # -> output_silent.mp4 (xfade chain in xfade.txt)
# 3. mux narration (say -v Alex) -> output.mp4   (see narration note above)
# 4. rebuild the committed GIF
ffmpeg -y -i output_silent.mp4 -vf "fps=12,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" /tmp/pal.png
ffmpeg -y -i output_silent.mp4 -i /tmp/pal.png \
  -lavfi "fps=12,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" /tmp/raw.gif
gifsicle -O3 --lossy=80 --colors 200 /tmp/raw.gif -o ../.github/assets/demo.gif
du -h ../.github/assets/demo.gif   # must be <= 10MB
```

If the GIF exceeds 10 MB: drop `fps` to 10, width to 800, colors to 128, raise
`--lossy`; as a last resort make the GIF a condensed ~20-25s highlight (intro +
one beat per plugin + close) while the full montage stays in `output.mp4`.
