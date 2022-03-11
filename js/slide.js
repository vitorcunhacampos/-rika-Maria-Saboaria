window.Slide = class {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
    this.changeEvent = new Event('changeEvent');
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove, { passive: true });
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${-distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.8;
    return this.dist.finalPosition + this.dist.movement;
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 100 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -100 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart, {
      passive: true,
    });
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return slide.offsetLeft - margin;
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.classActive();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  classActive() {
    this.slideArray.forEach((item) => item.element.classList.remove('active'));
    this.slideArray[this.index.active].element.classList.add('active');
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
  }

  slideIndexNav(index) {
    const last = this.slideArray.length;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last - 1 ? undefined : index + 1,
    };
  }

  resize() {
    setTimeout(() => {
      this.slidesconfig();
      this.changeSlide(this.index.active);
    }, 1000);
  }

  automatic() {
    setInterval(() => {
      if (this.index.active >= this.slideArray.length - 1) {
        this.changeSlide(0);
      } else this.changeSlide(this.index.active + 1);
    }, 6000);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.resize);
  }

  slidesconfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.resize = debounce(this.resize.bind(this), 200);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }
  init() {
    this.automatic();
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesconfig();
    this.addResizeEvent();
    this.changeSlide(0);
    return this;
  }
};

window.SlideNav = class extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindEventss();
  }
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.eventArrow();
  }

  eventArrow() {
    this.prevElement.addEventListener('click', this.activePrevSlide);
    this.nextElement.addEventListener('click', this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('changeEvent', this.activeControlItem);
  }
  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => item.classList.remove('active'));
    this.controlArray[this.index.active].classList.add('active');
  }
  bindEventss() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
};
