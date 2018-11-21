const throttle = ( handler, ms ) => {
	let timeout;
  return () => {
  	clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};

class TextEditor {

	constructor(container, storageKey = '_text-editor__content') {
  	this.container = container;
    this.contentContainer = container.querySelector('.text-editor__content');
    this.hintContainer = container.querySelector('.text-editor__hint');
    this.filenameContainer = container.querySelector('.text-editor__filename');
    this.storageKey = storageKey;
    this.registerEvents();
    this.load(this.getStorageData());
  }
	
  registerEvents() {
    const save = throttle(this.save.bind(this), 1000);
    this.contentContainer.addEventListener('input', save);
    ['dragenter', 'dragover', 'drop'].forEach(eventName => {
    	this.contentContainer.addEventListener(eventName, event => event.preventDefault(), false);
    });
    ['dragenter', 'dragover'].forEach(eventName => {
    	this.contentContainer.addEventListener(eventName, this.showHint.bind(this), false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
    	this.contentContainer.addEventListener(eventName, this.hideHint.bind(this), false);
    });
    this.contentContainer.addEventListener('drop', this.loadFile.bind(this), false);
  }
	
  loadFile(event) {
    const file = event.dataTransfer.files[0];
    const fileType = /^text\/plain/;
    if (file && file.type.match(fileType)) {
			this.setFilename(file.name);
			this.readFile(file);
    } else {
    	this.load('Файл не может быть прочитан.\nТолько файлы .txt');
    }
  }
	
  readFile(file) {
		const reader = new FileReader();
		this.load('');
		reader.addEventListener('loadend', (event) => this.load(event.currentTarget.result));
		reader.readAsText(file);
  }
	
  setFilename(filename) {
  	this.filenameContainer.textContent = filename;
  }
	
  showHint(event) {
    //event.stopPropagation();
    this.hintContainer.classList.add('text-editor__hint_visible');
  }
	
  hideHint(event) {
    //event.stopPropagation();
		this.hintContainer.classList.remove('text-editor__hint_visible');
  }
	
  load(value) {
  	this.contentContainer.value = value || '';
  }
	
  getStorageData() {
  	return localStorage[this.storageKey];
  }
	
  save() {
  	localStorage[this.storageKey] = this.contentContainer.value;
  }
}

new TextEditor(document.getElementById('editor'));