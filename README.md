# Site7 Designs

The switchable designs for Site7 sites: one folder per design (`harbor/`). A design is a
look on top of the base theme (`site7/theme`): its own CSS tokens and the few templates it
changes. It is not a theme.

This repo is a submodule of rp-craft at `designs/`, the path every Site7 site reads designs
from (`designs/<handle>/`). Customer sites don't use this repo: they install each design as
a Library package from Commerce24, into the same path.

```
<handle>/
├── design.json        handle, name, description
├── DESIGN.md          the design's rules
├── frontend/src/      laid out like the theme package (themes/site7-theme/frontend/src)
│   ├── css/<handle>.css   Tailwind tokens on top of the site's CSS
│   ├── js/<handle>.js     optional: the design's own script, runs after the theme's JS
│   └── images/            optional: images its CSS or JS uses
└── templates/         only the templates it replaces, at the same paths as the theme's
```

Create, build, preview, publish and test designs from rp-craft with `bash scripts/design.sh`
(Site7 Studio docs/60). After committing here, record the new commit in rp-craft
(`git add designs`), as with `themes/site7-theme`.
