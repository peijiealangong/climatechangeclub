import re
from pathlib import Path

root = Path('.')
html_files = sorted(root.rglob('*.html'))
root_url = 'https://climatechangeclub.pages.dev'
changed = []


def site_url(path):
    if path.name == 'index.html' and path.parent == root:
        return root_url + '/'
    return root_url.rstrip('/') + '/' + path.as_posix()


def normalize_site_url_links(text):
    return re.sub(
        r'https://climatechangeclub\.pages\.dev(?!/)(?=[A-Za-z0-9_\-\.])',
        root_url + '/',
        text,
    )


def insert_meta_if_missing(text, path):
    if '<link rel="canonical"' not in text:
        m = re.search(r'(<meta[^>]*name="viewport"[^>]*>)(\s*)', text, re.IGNORECASE)
        insert = (
            '\n  <meta name="robots" content="index, follow, max-image-preview:large">'
            + '\n  <meta name="theme-color" content="#0f3d38">'
            + '\n  <link rel="canonical" href="'
            + site_url(path)
            + '">\n'
        )
        if m:
            text = text[:m.start(1)] + m.group(1) + insert + text[m.end(1):]
        else:
            head_end = text.find('</head>')
            if head_end != -1:
                text = text[:head_end] + insert + text[head_end:]

    if '<meta property="og:title"' not in text:
        title_match = re.search(r'<title>([^<]+)</title>', text, re.IGNORECASE)
        title_text = title_match.group(1).strip() if title_match else 'Climate Change Club'
        desc_match = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]*)"', text, re.IGNORECASE)
        desc_text = desc_match.group(1).strip() if desc_match else 'Learn more about Climate Change Club student-led climate action, projects, videos, and resources.'
        insert = (
            '\n  <meta property="og:type" content="website">\n'
            f'  <meta property="og:title" content="{title_text}">\n'
            f'  <meta property="og:description" content="{desc_text}">\n'
            '  <meta property="og:url" content="'
            + site_url(path)
            + '">\n'
            '  <meta property="og:image" content="https://climatechangeclub.pages.dev/images/stop-climate-change-background.webp">\n'
            '  <meta name="twitter:card" content="summary_large_image">\n'
            f'  <meta name="twitter:title" content="{title_text}">\n'
            f'  <meta name="twitter:description" content="{desc_text}">\n'
            '  <meta name="twitter:image" content="https://climatechangeclub.pages.dev/images/stop-climate-change-background.webp">\n'
        )
        if '<link rel="canonical"' in text:
            idx = text.index('<link rel="canonical"')
            end_line = text.index('>', idx) + 1
            text = text[:end_line] + insert + text[end_line:]
        else:
            m2 = re.search(r'(<meta[^>]*name="robots"[^>]*>)(\s*)', text, re.IGNORECASE)
            if m2:
                text = text[:m2.end(1)] + insert + text[m2.end(1):]

    return text


def fix_video_src(match):
    src = match.group(1)
    normalized = src.replace('\\', '/').split('/Videos/')
    if len(normalized) > 1:
        return 'src="Videos/' + normalized[-1] + '"'
    return match.group(0)


def add_lazy(match):
    tag = match.group(0)
    if ' loading=' in tag or ' preload=' in tag:
        return tag
    return tag.replace('<video ', '<video loading="lazy" preload="none" ')


for path in html_files:
    text = path.read_text(encoding='utf-8')
    original = text

    text = normalize_site_url_links(text)
    text = insert_meta_if_missing(text, path)
    text = text.replace('src="www.googletagmanager.com', 'src="https://www.googletagmanager.com')
    text = text.replace('src="www.google.com/recaptcha/api.js', 'src="https://www.google.com/recaptcha/api.js')
    text = text.replace('href="fonts.googleapis.com', 'href="https://fonts.googleapis.com')
    text = text.replace('src="//www.googletagmanager.com', 'src="https://www.googletagmanager.com')

    text = re.sub(r'src="([A-Za-z]:\\[^">]+)"', fix_video_src, text)
    text = re.sub(r'<video([^>]*)>', add_lazy, text)
    text = re.sub(r'<script\s+src="javascript\.js"(?![^>]*defer)([^>]*)>', r'<script src="javascript.js" defer\1>', text)
    text = re.sub(
        r'<script[^>]*src="https://cdn\.jsdelivr\.net/npm/canvas-confetti@1\.6\.0/dist/confetti\.browser\.min\.js"[^>]*>\s*</script>\s*',
        '',
        text,
        flags=re.IGNORECASE,
    )

    if text != original:
        path.write_text(text, encoding='utf-8')
        changed.append(str(path))

print('Modified', len(changed), 'HTML files')
for p in changed:
    print(p)
