import {onCleanup, onMount} from "solid-js";

const catppuccinColors = [
    "#f5e0dc", // rosewater
    "#f2cdcd", // flamingo
    "#f5c2e7", // pink
    "#cba6f7", // mauve
    "#eba0ac", // red
    "#fab387", // peach
    "#f9e2af", // yellow
    "#a6e3a1", // green
    "#94e2d5", // teal
    "#89dceb", // sky
    "#74c7ec", // sapphire
    "#89b4fa", // blue
    "#b4befe", // lavender
];

export default function Background() {
    let canvas: HTMLCanvasElement
    onMount(() => {
        const dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        canvas.addEventListener("resize", resizeCanvas);

        const ctx = canvas.getContext("2d");
        resizeCanvas();

        let frame = requestAnimationFrame(loop);

        const CW = canvas.width;
        const CH = canvas.height;

        let squares: Square[] = [];

        class Square {
            private x: number;
            private y: number;
            private w: number;
            private h: number;
            private deg: number;
            private rotationSpeed: number;
            private fallSpeed: number;
            private color: string;

            public isOutOfBounds: boolean = false;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;

                const randSize = Math.random() * 100;
                this.w = randSize;
                this.h = randSize;

                this.deg = Math.random() * 360;
                this.rotationSpeed = Math.random() * 1.5 + 0.2;
                this.fallSpeed = Math.random() * 2.4 + 0.5;

                this.color = catppuccinColors[Math.floor(Math.random() * catppuccinColors.length)];
            }

            private draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.deg * Math.PI / 180)
                ctx.fillStyle = this.color;

                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }

            private checkOutOfBounds() {
                if (this.y + this.h < 0) {
                    this.isOutOfBounds = true;
                }
            }

            public update() {
                this.draw();
                this.y -= this.fallSpeed;
                this.deg += this.rotationSpeed;

                this.checkOutOfBounds();
            }
        }

        function GetRandomInt(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function CreateNewSquare() {
            const randomX = GetRandomInt(0, CW);

            const square = new Square(randomX, CH);

            squares.push(square);
        }

        function loop(t) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            squares.forEach((square) => {
                square.update();

                if (square.isOutOfBounds) {
                    squares = squares.filter(x => x !== square);
                }
            })

            if (squares.length < 20) {
                CreateNewSquare()
            }

            frame = requestAnimationFrame(loop);
        }

        onCleanup(() => cancelAnimationFrame(frame));
    })

    return <canvas class="z-0 w-full h-full flex-1 absolute bg-gradient-to-t from-crust to-base" ref={canvas}></canvas>
}