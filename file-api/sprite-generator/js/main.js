const prop = (data, name) => data.map(item => item[ name ]),
  summ = data => data.reduce((total, value) => total + value, 0);
  
class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code'); 
    this.imageElement = container.querySelector('.sprite-generator__result-image'); 
    this.images = [];
    
    this.imagesCount = 0;
    
    this.registerEvents();
  }
  
  registerEvents() {
    this.uploadButton.addEventListener('change', this.loadFile.bind(this), false);
    this.submitButton.addEventListener('click', this.generate.bind(this), false);
  }
  
  loadFile(event) {
    event.preventDefault();
    event.stopPropagation();
    const imageTypeRegExp = /^image\//;
    for (const file of event.currentTarget.files) {
      if (imageTypeRegExp.test(file.type)) {
        const img = document.createElement('img');
        img.width = 50;
        img.height = 50;
        img.addEventListener('load', (event) => {
          URL.revokeObjectURL(event.currentTarget.result);
        });
        img.src = URL.createObjectURL(file);
        img.filename = file.name;
        this.images.push(img);
      } 
    }
    this.imagesCount = this.images.length;
    this.imagesCountContainer.textContent = this.imagesCount;
  }
  
  generate() {
    const getCSS = (name, dx, dy) => {
      let css = `.${name} {\n\t`;
      css += `background-position: `;
      css += dx === 0 ? '0 ' : `-${dx}px `;
      css += dy === 0 ? '0' : `-${dy}px`;
      css += `;\n\twidth: 50px;\n\theight: 50px;\n}\n\n`;
      return css;
    }
    
    const sideLength = Math.ceil(Math.sqrt(this.imagesCount));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let dx = 0, dy = 0;
    let css = '';
    this.images.forEach(img => {
      ctx.drawImage(img, dx, dy, img.width, img.height);
      css += getCSS('icon_' + img.filename, dx, dy);
      dx += img.width;
      if (dx % (sideLength * img.width) === 0) {
        dy += img.height;
        dx = 0;
      }
    });
    this.imageElement.src = canvas.toDataURL();
    let cssPref = `.icon {\n\tdisplay: inline-block;\n\t`;
    cssPref += `background-image: url(img/sprite.png);\n}\n\n`;
    this.codeContainer.textContent = cssPref + css;
  }
  
}

new SpriteGenerator(document.getElementById('generator'));