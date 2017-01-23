/**
 * Adds css classes to a given element only if these classes are not already
 * present. Keeps a record of css classes which actually have been added.
 * This way, they can also be removed in a way which keeps the original classes
 * set by the user.
 * Most useful in attached() and detached() handlers.
 */
export class AttributeManager {
  _colorClasses = [
    'accent',
    'primary'
  ];
  addedClasses = [];
  addedAttributes = {};

  constructor(element) {
    this.element = element;
  }

  addAttributes(attrs) {
    let keys = Object.keys(attrs);
    keys.forEach(k => {
      if (!this.element.getAttribute(k)) {
        this.addedAttributes[k] = attrs[k];
        this.element.setAttribute(k, attrs[k]);
      } else if (this.element.getAttribute(k) !== attrs[k]) {
        this.element.setAttribute(k, attrs[k]);
      }
    });
  }

  removeAttribute(attribute) {
    if (this.element.getAttribute(attribute) && !!this.addedAttributes[attribute]) {
      this.element.removeAttribute(attribute);
      this.addedAttributes[attribute] = null;
      delete this.addedAttributes[attribute];
    }
  }

  removeAttributes(attrs) {
    if (typeof attrs === 'string') {
      this.removeAttribute(attrs);
    } else {
      attrs.forEach(c => this.removeAttribute(c));
    }
  }

  addClass(cssClass) {
    let classListHasColor = this._colorClasses.filter(cc => this.element.classList.contains(cc)).length > 0;
    if (this._colorClasses.indexOf(cssClass) > -1 && classListHasColor) {
        //
    } else {
      if (!this.element.classList.contains(cssClass)) {
        this.addedClasses.push(cssClass);
        this.element.classList.add(cssClass);
      }
    }
  }

  addClasses(classes) {
    if (typeof classes === 'string') {
      this.addClass(classes);
    } else {
      classes.forEach(c => this.addClass(c));
    }
  }

  removeClass(cssClass) {
    if (this.element.classList.contains(cssClass) && this.addedClasses.indexOf(cssClass) > -1) {
      this.element.classList.remove(cssClass);
      this.addedClasses.splice(this.addedClasses.indexOf(cssClass), 1);
    }
  }

  removeClasses(classes) {
    if (typeof classes === 'string') {
      this.removeClass(classes);
    } else {
      classes.forEach(c => this.removeClass(c));
    }
  }
}
