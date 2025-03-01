let letters = [];

function setup() {
	createCanvas(windowWidth, windowWidth*.75);
	background(0);
	textAlign(CENTER)
	e = createElement('h1', '🖨️').position(width/2-85+random(-2, 2), 50+ random(-1, 1));
}

function draw() {
	background(0,5);
	if(frameCount%2==0){
		let letter = new LoveLetter({
			p: createVector(width / 2, 250),
			v: createVector(random(-5, 5), random(-2,-10))
		})
		letters.push(letter);
	}
	
	
	for(let i=0;i<letters.length;i++){
		let letter = letters[i];
		letter.update(i);
		letter.draw();
	}
	textSize(180);
	//text('🖨️',width/2, 250)  // uncomment only to create a thumbnail or save a screenshot
	
	// Why not use an element instead of text? It behaves like a sprite, 
	// and does not draw on the background when it moves. However a new element is created 
	// every frame, so the old one must be removed before the new one is created.
	
	e.remove();
	e = createElement('h1', '🖨️').position(width/2-85+random(-2, 2), 50+ random(-1, 1));
	e.style("font-size", "180px");
}