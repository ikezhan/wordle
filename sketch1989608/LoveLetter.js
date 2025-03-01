class LoveLetter {
	constructor(args) {
		this.p = args.p;
		this.v = args.v;
		this.a = args.sketch.createVector(0, 0.2);
		this.sketch = args.sketch;
	}
	update() {
		this.p.add(this.v);
		this.v.add(this.a);
	}
	draw() {
		this.sketch.textSize(60);
		this.sketch.text('💌', this.p.x, this.p.y);
	}
	isOffscreen() {
		return this.p.y > this.sketch.height + 20;
	}
}