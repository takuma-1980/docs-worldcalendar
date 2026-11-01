"""Check preservation and SEO contracts. Usage: python3 scripts/check_contracts.py _site"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET

repo = Path(__file__).resolve().parents[1]
root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
origin = 'https://www.worldcalendar.xyz'
errors = []


def check(condition, message):
    if not condition:
        errors.append(message)


def normalized_body(text):
    if text.startswith('---\n'):
        text = text.split('---\n', 2)[2]
    return re.sub(r'(\[[^\]]*\])\([^)]*\)', r'\1(LINK)', text)


manifest = json.loads((repo / 'tests/protected-content.json').read_text())
for path, expected in manifest['documents'].items():
    target = repo / path
    check(target.exists(), f'protected document missing: {path}')
    if target.exists():
        actual = hashlib.sha256(normalized_body(target.read_text()).encode()).hexdigest()
        check(actual == expected, f'protected wording changed: {path}')
for path, expected in manifest['bytes'].items():
    for base in (repo, root):
        target = base / path
        check(target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == expected,
              f'protected bytes changed or missing: {target}')


class Head(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.meta, self.alternates, self.scripts, self.images = {}, {}, [], []
        self.canonical = self.lang = self.direction = ''
        self.script = None
        self.title = ''
        self.in_title = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang', '')
            self.direction = a.get('dir', '')
        if tag == 'title': self.in_title = True
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'link' and a.get('rel') == 'alternate': self.alternates[a.get('hreflang')] = a.get('href', '')
        if tag == 'script' and a.get('type') == 'application/ld+json': self.script = ''
        if tag == 'img': self.images.append(a)

    def handle_data(self, text):
        if self.in_title: self.title += text
        if self.script is not None: self.script += text

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.script is not None:
            self.scripts.append(self.script)
            self.script = None


pages = {}
for path in root.rglob('*.html'):
    route = '/' + str(path.relative_to(root))
    route = route.removesuffix('index.html')
    head = Head(path.read_text())
    pages[route] = head
    check(head.lang in ('ja', 'en'), f'{route}: invalid lang')
    check(head.direction in ('ltr', 'rtl', 'auto'), f'{route}: invalid text direction')
    check(bool(head.title.strip()), f'{route}: missing title')
    check(head.canonical.startswith(origin + '/'), f'{route}: invalid canonical')
    for key in ('description', 'og:title', 'og:description', 'og:url', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'):
        check(bool(head.meta.get(key)), f'{route}: missing {key}')
    for a in head.images:
        check('alt' in a and 'width' in a and 'height' in a, f'{route}: image needs alt/dimensions')
    check(bool(head.scripts), f'{route}: missing structured data')
    for raw in head.scripts:
        try:
            data = json.loads(raw)
            check(data['@context'] == 'https://schema.org', f'{route}: invalid schema context')
        except (ValueError, KeyError):
            errors.append(f'{route}: invalid JSON-LD')

slugs = ['gregorian', 'japanese-lunar', 'julian', 'ethiopian', 'hebrew', 'hindu-amanta']
required = ['/helps/ja/', '/helps/en/', '/terms-of-use/ja/', '/terms-of-use/en/', '/privacy-policy/ja/', '/privacy-policy/en/', '/privacy-policy/']
for prefix in ('/', '/en/'):
    required += [prefix, *[prefix + p + '/' for p in ('features', 'calendars', 'news', 'contact')]]
    required += [prefix + 'calendars/' + s + '/' for s in slugs]
for route in required: check(route in pages, f'missing required page: {route}')
for route, head in pages.items():
    for lang, url in head.alternates.items():
        alternate = pages.get(urlsplit(url).path)
        check(alternate is not None, f'{route}: alternate target missing: {url}')
        if alternate:
            check(alternate.lang == lang, f'{route}: alternate language mismatch')
            check(alternate.alternates.get(head.lang) == origin + route, f'{route}: alternate not reciprocal')
    if 'noindex' not in head.meta.get('robots', ''):
        check(head.alternates.get(head.lang) == origin + route, f'{route}: missing self hreflang')
        check(head.canonical == origin + route, f'{route}: canonical mismatch')

sitemap = ET.parse(root / 'sitemap.xml')
urls = {node.text for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
expected = {origin + route for route, head in pages.items() if 'noindex' not in head.meta.get('robots', '')}
check(urls == expected, 'sitemap differs from indexable pages')
check(f'Sitemap: {origin}/sitemap.xml' in (root / 'robots.txt').read_text(), 'robots sitemap missing')
check('data-language-hint' not in (root / 'privacy-policy/ja/index.html').read_text(), 'language hint leaked to legal page')
for error in errors: print(error)
print(f'Preservation and SEO: {len(pages)} HTML pages, {len(urls)} sitemap URLs; {len(errors)} errors.')
sys.exit(bool(errors))
