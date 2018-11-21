const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);
  
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', this.showFrame.bind(this), false);
    this.positionsContainer.addEventListener('mouseout', this.hideFrame.bind(this), false);
    this.positionsContainer.addEventListener('drop', this.loadFile.bind(this), false);
    this.actionButton.addEventListener('click', this.makeLayout.bind(this), false);
  }
  
  loadFile(event) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    const target = event.target;
    const fileType = /^image\//;
    if (file && file.type.match(fileType)) {
      this.loadImage(file, target);
      this.result.textContent = '';
    } else {
      this.result.textContent = 'Файл не является изображением!';
    }
  }
  
  loadImage(file, container) {
    const img = document.createElement('img');
    const tmpImg = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    img.addEventListener('load', (event) => {
      addClass('layout__image', img);
      for (const prop in this.layout) {
        const className = 'layout__item_' + prop;
        if (hasClass(className, container)) {
          this.layout[prop] = img;
        }
      }      
    });
    tmpImg.addEventListener('load', (event) => {
      ctx.drawImage(tmpImg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      img.src = canvas.toDataURL();
    });
    reader.addEventListener('loadend', (event) => {
      tmpImg.src = event.currentTarget.result;
    });
    reader.readAsDataURL(file);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);    
    container.appendChild(img);
  }
  
  makeLayout() {
    const canvas = document.createElement('canvas');
    canvas.width = this.positionsContainer.clientWidth;
    canvas.height = this.positionsContainer.clientHeight;
    const ctx = canvas.getContext('2d');
    let dx = 0, dy = 0, newWidth = 0, newHeight = 0;
    
    let img = this.layout.left;
    let container = img.parentElement;
    newWidth = container.offsetWidth;
    newHeight = container.offsetHeight;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, newWidth, newHeight);
    
    img = this.layout.top;
    container = img.parentElement;
    dx = newWidth;
    newWidth = container.offsetWidth;
    newHeight = container.offsetHeight;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, newWidth, newHeight);
    
    img = this.layout.bottom;
    container = img.parentElement;
    dy = newHeight;
    newWidth = container.offsetWidth;
    newHeight = container.offsetHeight;
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, newWidth, newHeight);
    
    const resultLayout = document.createElement('img');
    resultLayout.src = canvas.toDataURL();
    this.positionsContainer.appendChild(resultLayout);
    this.result.textContent = resultLayout.outerHTML;
  }
  
  showFrame(event) {
    event.preventDefault();
    const containers = document.querySelectorAll('.layout__item');
    for (const item of containers) {
      removeClass('layout__item_active', item);
    }
    addClass('layout__item_active', event.target);
  }
  
  hideFrame(event) {
    removeClass('layout__item_active', event.target);
  }
  
}

new iLayout( document.getElementById( 'layout' ));