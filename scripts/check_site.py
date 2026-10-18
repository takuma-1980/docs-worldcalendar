"""Check internal links and anchors in a built GitHub Pages site.

Usage: python3 scripts/check_site.py _site
"""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = []
        self.links = []
        self.images = []
        self.missing_image_alts = 0
        self.headings = 0
        self.sections = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag == "img" and "src" in attrs:
            self.images.append(attrs["src"])
            if not attrs.get("alt"):
                self.missing_image_alts += 1
        if tag == "h1":
            self.headings += 1
        if tag == "h2":
            self.sections += 1


root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
pages = {p: Page(p.read_text()) for p in root.rglob("*.html")}
errors = []
link_count = 0
if not pages:
    errors.append(f"No HTML pages in {root}")
for path, page in pages.items():
    label = path.relative_to(root)
    for anchor, count in Counter(page.ids).items():
        if count > 1:
            errors.append(f"{label}: duplicate id {anchor}")
    if page.headings != 1:
        errors.append(f"{label}: expected one h1, found {page.headings}")
    if page.sections == 0:
        errors.append(f"{label}: no rendered h2 sections")
    if page.missing_image_alts:
        errors.append(f"{label}: {page.missing_image_alts} images missing alt text")
    for href in page.links + page.images:
        url = urlsplit(href)
        if url.scheme or url.netloc:
            continue
        link_count += 1
        route = unquote(url.path)
        target = ((root / route.lstrip("/")) if route.startswith("/") else (path.parent / route)).resolve() if route else path
        if not target.is_relative_to(root):
            errors.append(f"{label}: link outside site: {href}")
            continue
        if target.is_dir():
            target /= "index.html"
        if not target.exists():
            errors.append(f"{label}: missing target: {href}")
        elif target.suffix == ".md":
            errors.append(f"{label}: unconverted Markdown link: {href}")
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{label}: missing anchor: {href}")
for error in errors:
    print(error)
print(f"Checked {len(pages)} pages and {link_count} internal links/images; {len(errors)} errors.")
sys.exit(bool(errors))
