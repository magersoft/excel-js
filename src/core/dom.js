class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  innerText(text) {
    this.$el.innerText = text;
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  getClientRect() {
    return this.$el.getBoundingClientRect();
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':').map(i => +i);
      return {
        row,
        col
      };
    }
    return this.data.id;
  }

  get data() {
    return this.$el.dataset;
  }

  get text() {
    return this.$el.innerText;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
