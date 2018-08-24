"use strict"; 

let buttonPaintings = document.getElementById("inspired"); 
let divPaintings = document.getElementById("paintings"); 

function showPaintings() {
	divPaintings.classList.toggle("hide");
}

buttonPaintings.addEventListener("click",showPaintings); 

class Brush {
	constructor() {
		this.colorButton = document.querySelectorAll(".color"); 
		this.color = "red"; 
		for (let i=0; i<this.colorButton.length; i++) {
			this.colorButton[i].addEventListener('click', this.getColor.bind(this)); 
		}
		this.brushSizes = document.querySelectorAll(".brush");
		this.brushSize = 0; 
		for (let i=0; i<this.brushSizes.length; i++) {
			this.brushSizes[i].addEventListener('click', this.getSize.bind(this));  
		}
		this.rubber = document.getElementById("rubber");
		this.rubber.addEventListener('click',this.erase.bind(this)); 
	}
	getColor(e) {
		this.color = e.target.value; 
	}
	getSize(e) {
		this.brushSize = e.target.value; 	  
	}
	erase(e) {
		this.color = e.target.value; 
	}
}

class Canvas {

	constructor(){

    	this.cvs = document.createElement("canvas");
        let cvs = this.cvs; 
        cvs.width = 600; 
        cvs.height = 400; 
        document.getElementById("canvas").appendChild(cvs);
        cvs.addEventListener('mousedown', this.beginDraw.bind(this));
        document.addEventListener('mouseup', this.stopDraw.bind(this)); 
        cvs.addEventListener('mousemove', this.mouseDraw.bind(this)); 

        this.ctx = cvs.getContext('2d'); 
        let ctx = this.ctx;

        this.brush = new Brush(); 

        this.clearButton = document.getElementById("clear"); 
        this.clearButton.addEventListener('click', this.clearAll.bind(this)); 

        this.saveImage = document.getElementById("saveButton");
        this.saveImage.addEventListener('click', this.save.bind(this));  
 
    }

    beginDraw(e){
    	this.checkMouse = true; 
    	let ctx = this.ctx;
    	let mouseX = e.offsetX;
        let mouseY = e.offsetY;
		ctx.beginPath();
		ctx.moveTo(mouseX,mouseY); 
    }

    stopDraw(e) {
    	this.checkMouse = false; 
    	let ctx = this.ctx;
    	ctx.closePath(); 
    }

    mouseDraw(e) { 
    	let cvs = this.cvs;  
		let ctx = this.ctx;
		if (this.checkMouse) {
			let mouseX = e.offsetX;
        	let mouseY = e.offsetY;
			ctx.lineTo(mouseX, mouseY);
			ctx.lineWidth = this.brush.brushSize; 
			ctx.strokeStyle = this.brush.color;
			ctx.stroke();  
		}
    }
    clearAll(e) {
    	let cvs = this.cvs;  
    	let ctx = this.ctx;
    	let sure = confirm("Sure you want to delete your piece of art?"); 
    	if (sure) {
    		ctx.clearRect(0,0,cvs.width,cvs.height);
    	}
    }
    save(e) {
    	let cvs = this.cvs;  
    	this.saveImage.href = cvs.toDataURL();
    	this.saveImage.download = "my_Miro_Painting.png"; 
    }
}

class App { 
	constructor(name) {
    	this.name = name;
        this.canvas = new Canvas();
    }
}

let app = new App("Drawing App");