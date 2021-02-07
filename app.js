const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// responsive canvas
const resizeCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    location.reload();
});

const numberOfDrops = 1000;

// Rain class constructor
class Rain {

    // mandatory constructor function with 6 arguments
    constructor(x, y, weight, tail, floor, width) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.tail = tail;
        this.floor = floor;
        this.width = width;
    }

    // rain draw function
    draw() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.tail);
        ctx.stroke();
    }

    // rain update function
    update() {
        
        // increase weight everyframe
        this.weight += 0.01;

        // add weight to y position
        this.y += this.weight;

        // if y position is greater that floor
        if (this.y > this.floor) {

            // randomize x, y, weight and tail
            this.y = (Math.random() * canvas.height) - canvas.height;
            this.x = Math.random() * canvas.width;
            this.weight = Math.random() * 10;
            this.tail = Math.random() * 50;
        }

        // if y position is greater than floor draw drop
        if (this.y >= this.floor - 10) {

            // call drop function
            this.drop();
        }

        // call draw
        this.draw();
    }

    // rain drop function simulate a splash
    drop() {
        ctx.strokeStyle= '#ffffff';
        ctx.beginPath();
        ctx.setLineDash([2, 2])
        ctx.arc(this.x, this.y + 50, 5, Math.PI, Math.PI * 2, false);
        ctx.stroke();  
    }
}

// init function
const init = () => {

    // clear array
    rainArray = [];

    // loop the number of drops
    for (let i = 0; i < numberOfDrops; i++) {

        // generate random variables for rain
        const x = Math.random() * canvas.width;
        const y = (Math.random() * canvas.height) - canvas.height;
        const weight = Math.random() * 10;
        const tail = Math.random() * 50;
        const floor = canvas.height - (Math.random() * 100 + 90);
        const width = Math.random() * 0.5;

        // push new rain with random variables
        rainArray.push(new Rain(x, y, weight, tail, floor, width))
    }
};

// clear function
const clear = () => {

    // create a canvas gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    // first color stop
    gradient.addColorStop(0, '#202020');

    // second color stop
    gradient.addColorStop(1, '#111119');

    // fillstyle canvas with gradient
    ctx.fillStyle = gradient;

    // create rect to clear whole canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// animate function
const animate = () => {

    // clear canvas every frame
    clear();

    // loop thru the rainArray
    for (let i = 0; i < rainArray.length; i++) {

        // execute update function
        rainArray[i].update();
    }

    // call animation function / recursion
    requestAnimationFrame(animate);
};

init();
animate();