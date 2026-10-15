"""Package a coherent release with content-addressed CSS and JavaScript URLs."""
from hashlib import sha256
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / '_site'
ASSETS = ('styles.css', 'content.js', 'diagrams.js', 'app.js')


def build():
    # The complete release fingerprint changes even when only HTML changes.
    digest = sha256()
    for name in ('index.html', *ASSETS):
        digest.update(name.encode())
        digest.update((ROOT / name).read_bytes())
    version = digest.hexdigest()[:12]
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    html = (ROOT / 'index.html').read_text()
    for name in ASSETS:
        path = Path(name)
        versioned = f'{path.stem}.{version}{path.suffix}'
        shutil.copy2(ROOT / name, OUTPUT / versioned)
        html = html.replace(f'./{name}', f'./{versioned}')
        # Preserve the original public URLs for older cached entry pages.
        shutil.copy2(ROOT / name, OUTPUT / name)
    html = html.replace('data-release-version>本地预览', f'data-release-version>{version}')
    (OUTPUT / 'index.html').write_text(html)
    shutil.copy2(ROOT / '.nojekyll', OUTPUT / '.nojekyll')
    shutil.copytree(ROOT / 'assets', OUTPUT / 'assets', dirs_exist_ok=True)
    print(f'Packaged release {version} into _site/')
    return version


if __name__ == '__main__':
    build()
