/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/913474

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//EN
let message = "LOVE YOURSELF"
let fontSize = 38
let fontScaleY = 1

//PT
// let message = "VIDAS NEGRAS IMPORTAM"
// let fontSize = 34
// let fontScaleY = 1.3

let messageCanvas
let geometry
let size

function preload() {
  font = loadFont('ArchivoBlack-Regular.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	textureWrap(REPEAT, REPEAT)
	noStroke()
	
	size = min(width, height) / 3
	
	messageCanvas = createGraphics(512, 32);
	messageCanvas.pixelDensity(4);
	messageCanvas.textSize(fontSize);
	messageCanvas.textFont(font);
	messageCanvas.textAlign(CENTER, CENTER);
	messageCanvas.fill(233,143,147);
	messageCanvas.scale(1, fontScaleY);
	messageCanvas.text(message, messageCanvas.width/2, messageCanvas.height/3.2);
	
	initGeometry()
}

function initGeometry(){
	let points = []
	for(let i=0; i<80; i++){
		let x = cos(i/80*TWO_PI)
		let y = sin(i/80*TWO_PI)
		points.push([x, y])
	}
	
	geometry = new p5.Geometry(points.length, 1)
	geometry.extrudePoints(points, -1.3, 1, true)
	
	geometry.computeUVs(1, 18)
	geometry.computeFaces()
	geometry.computeNormals()
	if(this._renderer._doStroke){
		geometry._makeTriangleEdges()
		geometry._edgesToVertices()
	}
	this._renderer.createBuffers("!", geometry)
}

function draw() {
	background(0)
	orbitControl()
	ambientLight(100)
	directionalLight(255, 255, 255, width-mouseX-width/2, height-mouseY-height/2, 1)
	texture(messageCanvas)
	push()
		rotateY(-PI/4);
		rotateZ(millis()/5000);
		this._renderer.drawBuffersScaled("!", size, size, size)
	pop()
}