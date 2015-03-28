import re
from os.path import join
from flask import url_for
from functools import partial
from realms.lib.util import filename_to_cname, directory_file_listing


def _directory_index(match, wiki):
    directory = match.group(1)
    files = directory_file_listing(join(wiki.path, directory))
    output = '### Directory Listing for *{}*\n'.format(directory)
    for f in files:
        output = output + '* [[{1}|{0}/{1}]]\n'.format(directory, filename_to_cname(f))

    return output


def _link(match, wiki):
    name = match.group(3)

    if match.group(2):  # if we have link text
        text = match.group(2)
    else:
        text = name

    page = wiki.get_page(name)

    css_class = ""

    if page:
        url = url_for('wiki.page', name=filename_to_cname(page['path']))
    else:
        url = url_for('wiki.create', name=name)
        css_class = "create-link"

    return '<a class="{}" href="{}">{}</a>'.format(css_class, url, text)


def parse(content, wiki):
    markup = [
        (r'\[\[DirIndex:(.+)\]\]', _directory_index,),
        (r'\[\[(([^\[\]]+)\|)?([^\[\]]+)\]\]', _link,),
    ]

    for r, f in markup:
        fp = partial(f, wiki=wiki)
        content = re.sub(r, fp, content)

    return content