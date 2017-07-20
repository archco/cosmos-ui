import Util from '../lib/util';

export default {
  name: 'activator',
  inserted(el, binding) {
    let isSelf = binding.modifiers.self;
    let isThis = binding.modifiers.this;
    let selector = binding.value || 'a';
    let links = isThis ? [el] : el.querySelectorAll(selector);
    if (!links.length) return;

    for (let a of links) {
      if (compareWithLocation(a)) {
        if (isSelf) {
          a.classList.add('active');
        } else {
          a.parentNode.classList.add('active');
        }
      }
    }
  },
};

function compareWithLocation(anchor) {
  let l = {
    path: lastTerm(document.location.pathname),
    query: Util.locationSearchToObject(),
  };
  let a = {
    path: lastTerm(anchor.pathname),
    query: Util.searchToObject(anchor.search),
  };

  if (anchor.getAttribute('href') == '#') {
    // sample link (e.g. <a href="#">)
    return false;
  }

  if (l.path == a.path) {
    if (!a.query || Util.isContains(l.query, a.query)) return true;
  }

  return false;
}

function lastTerm(string) {
  return string.substr(string.lastIndexOf('/'));
}