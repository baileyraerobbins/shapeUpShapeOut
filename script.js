const MAX = 390; //set box max
const shapeMax = 200; //set shape max
let box = document.getElementById('whiteBox'); //get black box div

//get button inputs
let recBtn = document.getElementById('recBtn');
let sqBtn = document.getElementById('sqBtn');
let cirBtn = document.getElementById('circBtn');
let triBtn = document.getElementById('triBtn');

//get shape inputs
let recHeight = document.getElementById('recHeight');
let recWidth = document.getElementById('recWidth');
let sqLength = document.getElementById('sqLength');
let circRadius = document.getElementById('circRadius');
let triheight = document.getElementById('isocelesheight');

//get panel inputs
let shapeName = document.getElementById('panelShape');
let shapeWidth = document.getElementById('panelWidth');
let shapeHeight = document.getElementById('panelHeight');
let shapeRadius = document.getElementById('panelRadius');
let shapeArea = document.getElementById('panelArea');
let shapePerimeter = document.getElementById('panelPerimeter');

recBtn.addEventListener('click', () => new Rectangle(recHeight.value, recWidth.value)) //on rectangle button click, add rectangle to box
sqBtn.addEventListener('click', () => new Square(sqLength.value)); //on square button click, add square to box
cirBtn.addEventListener('click', () => new Circle(circRadius.value)); //on circle button click, add circle to box
triBtn.addEventListener('click', () => new Triangle(triheight.value)); //on triangle button click, add triangle to box

function randomVal(min, max) { //generate a random value so shapes appear randomly in box
    return Math.floor(Math.random() * (max - min));
}

class Shape {
    constructor(width, height) { //every shape needs a width and height!
        this.width = width; //set width of shape
        this.height = height; //set height of shape
        this.div = document.createElement('div'); //create div for shape
        this.updateLocation(); //update x,y coordinates within box
        this.div.addEventListener('click', () => this.describe()); //on shape click, update side panel stats
        this.div.addEventListener('dblclick', () => this.destroy()); //on shape dbl click, delete shape
    }

    addShape() { // add all shapes to black box 
        if ( // if any size input is larger than 200px, alert to reset number
            this.width > shapeMax && this.height > shapeMax ||
            this.width > shapeMax ||
            this.height > shapeMax
        ) {
            return alert('This is too big. You need to change the size of your shape to 200px or below.');
        }
        box.appendChild(this.div); // attach shape to box
        this.div.classList.add(this.cssClass); //add styles to shape
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;

    }
    updateLocation() { //update shape location in box
        let xVal = randomVal(0, MAX); //set x coord
        let yVal = randomVal(0, MAX); //set y coord
        this.div.style.left = `${xVal}px`; //determine x px in box
        this.div.style.top = `${yVal}px`; //determine y px in box
    }
    destroy() { //remove div (shape) from box
        this.div.remove();
    }
}

class Rectangle extends Shape {
    constructor(width, height) { //needs width, height parameters
        super(width, height);
        this.cssClass = ('rectangle'); //add class name for styling
        this.addShape(); //add shape
    }
    describe() { //get values from rectangle width & height and update side panel stats
        shapeName.value = 'Rectangle';
        shapeWidth.value = this.width;
        shapeHeight.value = this.height;
        shapeRadius.value = 'N/A';
        shapeArea.value = this.width * this.height;
        shapePerimeter.value = this.width * 2 + this.height * 2;
    }
}

class Square extends Shape {
    constructor(sideLength) { //needs sideLength parameter
        super(sideLength, sideLength);
        this.cssClass = ('square'); //add class name for styling
        this.addShape(); //add shape
    }
    describe() { //get values from square width & height and update to side panel stats
        shapeName.value = 'Sqaure';
        shapeWidth.value = this.width;
        shapeHeight.value = this.height;
        shapeRadius.value = 'N/A';
        shapeArea.value = Math.pow(this.width, 2);
        shapePerimeter.value = this.width * 4;
    }
}

class Circle extends Shape {
    constructor(radius) { //needs radius parameter
        super(radius, radius);
        this.cssClass = ('circle'); //add class name for styling
        this.addShape(); //add shape
    }
    describe() { //get values from circle width and update side panel stats
        shapeName.value = 'Circle';
        shapeWidth.value = 'N/A';
        shapeHeight.value = 'N/A';
        shapeRadius.value = this.width;
        shapeArea.value = Math.PI * Math.pow(this.width, 2);
        shapePerimeter.value = 2 * Math.PI * this.wdith;
    }
}

class Triangle extends Shape {
    constructor(height) { //needs height parameter      
        super(height, height);
        this.cssClass = ('triangle'); //add class name for styling
        this.addShape(); //add shape
        this.div.style.borderBottomWidth = `${height}px`; 
        this.div.style.borderRightWidth = `${height}px`;
    }
    describe() { //get values from triangle width & height and update side panel stats
        shapeName.value = 'Triangle';
        shapeWidth.value = this.width;
        shapeHeight.value = this.height;
        shapeRadius.value = 'N/A';
        shapeArea.value = 0.5 * this.height * this.height;
        shapePerimeter.value = 2 * this.height + Math.sqrt(2) * this.height;
    }
}