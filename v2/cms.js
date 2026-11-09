/* Top 2 content loader.
   The page keeps its own photos and wording in the HTML, so it always shows something.
   When it loads, this script reads what the hotel last saved in the admin panel
   (content/site.json), puts it in place, and only then starts the page's own script. */
(function () {
  var queue = [], ready = false;
  window.T2_whenReady = function (fn) { if (ready) fn(); else queue.push(fn); };
  function release() {
    if (ready) return;
    ready = true;
    queue.splice(0).forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } });
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function src(v) {
    v = String(v || '').trim();
    if (/^(https?:)?\/\//i.test(v)) return v;
    return v.replace(/^\/+/, '').replace(/^v2\//, '');
  }
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function text(el, v) {
    if (v === undefined || v === null) return;
    v = String(v).trim();
    if (!v) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = esc(v).replace(/\n/g, '<br>');
  }
  function photo(img, v, alt) {
    if (v === undefined || v === null) return;
    var box = img.closest('figure') || img.closest('.card-img') || img;
    if (!String(v).trim()) { box.hidden = true; return; }
    img.src = src(v);
    if (alt !== undefined) img.alt = alt || '';
    box.hidden = false;
  }
  function digits(v) { return String(v || '').replace(/\D/g, ''); }
  function intl(v) { var d = digits(v); return d.charAt(0) === '0' ? '234' + d.slice(1) : d; }

  /* ---------- hero slides: add, remove and reorder ---------- */
  function hero(list) {
    if (!Array.isArray(list)) return;
    list = list.filter(function (s) { return s && s.photo; });
    if (!list.length) return;
    var box = document.getElementById('slides');
    var old = box.querySelectorAll('.slide');
    var first = old[0];
    list.forEach(function (s, i) {
      var d = document.createElement('div');
      d.className = 'slide' + (i === 0 ? ' on' : '');
      d.setAttribute('role', 'group');
      d.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + list.length);
      d.setAttribute('data-h', s.title || '');
      d.setAttribute('data-p', s.text || '');
      var img = document.createElement('img');
      img.src = src(s.photo);
      img.alt = s.photo_alt || '';
      if (i === 0) img.setAttribute('fetchpriority', 'high'); else img.loading = 'lazy';
      d.appendChild(img);
      box.insertBefore(d, first);
    });
    Array.prototype.forEach.call(old, function (n) { n.remove(); });
    var h = document.getElementById('heroH'), p = document.getElementById('heroP');
    if (h && list[0].title) h.textContent = list[0].title;
    if (p) p.textContent = list[0].text || '';
  }

  /* ---------- gallery: add, remove and reorder ---------- */
  function gallery(list) {
    var box = document.querySelector('[data-cl="gallery"]');
    if (!box || !Array.isArray(list)) return;
    var html = list.filter(function (g) { return g && g.photo; }).map(function (g) {
      var cls = g.shape === 'wide' ? ' class="w2"' : g.shape === 'tall' ? ' class="h2"' : '';
      return '<figure' + cls + '><img src="' + esc(src(g.photo)) + '" alt="' + esc(g.photo_alt || '') + '" loading="lazy">' +
        (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') + '</figure>';
    }).join('');
    box.innerHTML = html;
    var sec = box.closest('section');
    if (sec) sec.hidden = !html;
  }

  /* ---------- phone numbers, WhatsApp, email, address ---------- */
  var OLD = {
    phone1: { tel: 'tel:+2347036404868', shown: '0703 640 4868' },
    phone2: { tel: 'tel:+2348123391957', shown: '0812 339 1957' },
    email: 'info@top2hotels.com'
  };
  function contact(c) {
    if (!c) return;
    window.T2_SET = c;
    ['phone1', 'phone2'].forEach(function (k) {
      if (!digits(c[k])) return;
      document.querySelectorAll('a[href="' + OLD[k].tel + '"]').forEach(function (a) {
        a.href = 'tel:+' + intl(c[k]);
        if (a.textContent.trim() === OLD[k].shown) a.textContent = c[k];
      });
    });
    if (c.email) {
      document.querySelectorAll('a[href="mailto:' + OLD.email + '"]').forEach(function (a) {
        a.href = 'mailto:' + c.email;
        if (a.textContent.trim() === OLD.email) a.textContent = c.email;
      });
    }
  }

  function apply(d) {
    if (!ready) hero(d.hero);
    document.querySelectorAll('[data-c]').forEach(function (el) {
      var path = el.getAttribute('data-c');
      if (el.tagName === 'IMG') photo(el, get(d, path), get(d, path + '_alt'));
      else text(el, get(d, path));
    });
    gallery(d.gallery);
    contact(d.contact);
  }

  function run() {
    fetch('content/site.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { try { apply(d); } catch (e) { console.error('Top 2 content', e); } })
      .catch(function () {})
      .then(release);
    setTimeout(release, 2500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
