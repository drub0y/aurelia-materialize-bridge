import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { AttributeManager } from '../common/attributeManager';

@customAttribute('md-footer')
@inject(Element)
export class MdFooter {
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  bind() {
    this.attributeManager.addClass('page-footer');
  }

  unbind() {
    this.attributeManager.removeClass('page-footer');
  }
}
