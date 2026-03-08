"""
Extract English paragraphs/list items from HTML for translation,
then inject translated versions back.
"""
import re, json, sys

def extract(html_file, json_file):
    with open(html_file, encoding='utf-8') as f:
        content = f.read()

    # Match <p> and <li> tags that contain mostly English (not CSS/JS)
    entries = []
    pattern = re.compile(r'(<(?:p|li)(?:\s[^>]*)?>)(.*?)(</(?:p|li)>)', re.DOTALL)

    idx = 0
    for m in pattern.finditer(content):
        tag_open, inner, tag_close = m.group(1), m.group(2), m.group(3)
        # Strip inner HTML tags to get plain text
        plain = re.sub(r'<[^>]+>', '', inner).strip()
        # Skip if mostly Korean, empty, or too short
        if not plain or len(plain) < 20: continue
        latin_chars = len(re.findall(r'[a-zA-Z]', plain))
        total_chars = len(re.sub(r'\s', '', plain))
        if total_chars == 0: continue
        latin_ratio = latin_chars / total_chars
        # Only include if >40% latin (English)
        if latin_ratio < 0.4: continue
        # Skip if looks like CSS/code
        if re.search(r'[{};]|function |var |const |let ', plain): continue

        entries.append({
            'id': idx,
            'original': plain[:500],  # max 500 chars for translation
            'full_match': m.group(0),
            'start': m.start(),
        })
        idx += 1

    print(f"Found {len(entries)} English text blocks")

    # Save for translation (only the text, not the HTML)
    translation_input = {str(e['id']): e['original'] for e in entries}
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(translation_input, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(entries)} items to {json_file}")
    return entries

def inject(html_file, json_file, output_file):
    with open(html_file, encoding='utf-8') as f:
        content = f.read()
    with open(json_file, encoding='utf-8') as f:
        translations = json.load(f)

    pattern = re.compile(r'(<(?:p|li)(?:\s[^>]*)?>)(.*?)(</(?:p|li)>)', re.DOTALL)
    idx = 0
    result = []
    last_end = 0

    for m in pattern.finditer(content):
        tag_open, inner, tag_close = m.group(1), m.group(2), m.group(3)
        plain = re.sub(r'<[^>]+>', '', inner).strip()

        if not plain or len(plain) < 20:
            result.append(content[last_end:m.end()])
            last_end = m.end()
            continue

        latin_chars = len(re.findall(r'[a-zA-Z]', plain))
        total_chars = len(re.sub(r'\s', '', plain))
        if total_chars == 0:
            result.append(content[last_end:m.end()])
            last_end = m.end()
            continue
        latin_ratio = latin_chars / total_chars
        if latin_ratio < 0.4 or re.search(r'[{};]|function |var |const |let ', plain):
            result.append(content[last_end:m.end()])
            last_end = m.end()
            continue

        str_idx = str(idx)
        if str_idx in translations:
            ko_text = translations[str_idx]
            # Replace plain text in inner — use str.replace to avoid regex escape issues
            new_inner = inner.replace(plain[:100], ko_text, 1)
            if new_inner == inner:  # fallback: replace whole inner
                new_inner = ko_text
            result.append(content[last_end:m.start()])
            result.append(f'{tag_open}{new_inner}{tag_close}')
            last_end = m.end()
        else:
            result.append(content[last_end:m.end()])
            last_end = m.end()
        idx += 1

    result.append(content[last_end:])
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(''.join(result))
    print(f"Injected translations → {output_file}")

if __name__ == '__main__':
    base = r'C:\Users\joons\work\marketing\landing-page\reports-dashboard'
    if sys.argv[1] == 'extract':
        extract(f'{base}\\index_ko.html', f'{base}\\en_texts.json')
    elif sys.argv[1] == 'inject':
        inject(f'{base}\\index_ko.html', f'{base}\\ko_texts.json', f'{base}\\index.html')
