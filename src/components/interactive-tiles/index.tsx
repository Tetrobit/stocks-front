import React from 'react';

import './style.css';
import { randomIdx, randomInt } from '../../utils/random';
import { repeatArray } from '../../utils/array';
import { hsl2rgb, rgb2string } from '../../utils/color';

const TILE_WIDTH = 15; // Pixels
const TILE_SPACE = 4; // Pixels between tiles
const SAFE_SPACE = 6;
const SHIFT_RATE = 40;
const CREATE_RATE = 100;

const FIGURE_PATTERNS = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
    ]
];

const TRANSITIONS = []
    .concat(repeatArray([-2], 30))
    .concat(repeatArray([-1], 20))
    .concat(repeatArray([ 0], 10))
    .concat(repeatArray([+1], 20))
    .concat(repeatArray([+2], 30));

class Tile {
    color: string;
    
    constructor(color: string = "#0000") {
        this.color = color;
    }
}

class IPoint {
    r: number;
    c: number;

    constructor(r: number, c: number) {
        this.r = r;
        this.c = c;
    }
}

class InteractiveTiles {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    blocks: Array<Array<Tile>>;
    paddingLeft: number;
    paddingTop: number;
    rowsCount: number;
    colsCount: number;
    dynamicBlocks: Array<IPoint>;
    lastShiftTime: number;
    lastAddedFigureTime: number;
    animationFrameId: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')

        this.rowsCount = Math.floor(canvas.height  / (TILE_WIDTH + TILE_SPACE));
        this.colsCount = Math.floor(canvas.width / (TILE_WIDTH + TILE_SPACE));

        this.paddingTop = (canvas.height - this.rowsCount * TILE_WIDTH - (this.rowsCount - 1) * TILE_SPACE);
        this.paddingLeft = (canvas.width - this.colsCount * TILE_WIDTH - (this.colsCount - 1) * TILE_SPACE);
        
        this.paddingTop = Math.floor(this.paddingTop / 2);
        this.paddingLeft = Math.floor(this.paddingLeft / 2);

        this.lastShiftTime = Date.now();
        this.lastAddedFigureTime = Date.now();

        this.animationFrameId = null;

        this.blocks = [];
        for (let i = 0; i < this.rowsCount + SAFE_SPACE; i++) {
            this.blocks[i] = [];
            for (let j = 0; j < this.colsCount; j++) {
                this.blocks[i].push(new Tile('#ffffff'));
            }
        }

        requestAnimationFrame(this.render.bind(this));
    }

    tryAddElement(): boolean {
        for (let attempt = 0; attempt <= 10; attempt++) {
            let type = randomIdx(FIGURE_PATTERNS.length);

            const h = FIGURE_PATTERNS[type].length;
            const w = FIGURE_PATTERNS[type][0].length;

            let i = 0;
            let j = randomIdx(this.colsCount - w);

            let possible = true;
            for (let di = 0; di < h; di++) {
                for (let dj = 0; dj < w; dj++) {
                    let y = i + di;
                    let x = j + dj;
                    if (x < 0 || y < 0 || x >= this.colsCount || y >= this.rowsCount) {
                        possible = false;
                        break;
                    }
                    if (this.blocks[y][x].color !== '#ffffff') {
                        possible = false;
                        break;
                    }
                }

                if (!possible) break;
            }

            if (!possible) continue;

            const randomColor = '#' + rgb2string(...hsl2rgb(Math.random() * 0.10 + 0.52, Math.random() * 0.5 + 0.5, Math.random() * 0.3 + 0.5));
            for (let di = 0; di < h; di++) {
                for (let dj = 0; dj < w; dj++) {
                    let y = i + di;
                    let x = j + dj;

                    if (FIGURE_PATTERNS[type][di][dj]) {
                        this.blocks[y][x].color = randomColor;
                    }
                }
            }

            return true;
        }

        return false;
    }

    shift() {
        for (let i = this.rowsCount-1 + SAFE_SPACE; i-1 >= 0; i--) {
            for (let j = this.colsCount-1; j-1 >= 0; j--) {
                this.blocks[i][j].color = this.blocks[i-1][j].color;
            }
        }

        for (let j = this.colsCount-1; j-1 >= 0; j--) {
            this.blocks[0][j].color = '#ffffff';
        }
    }

    render() {
        if (Date.now() - this.lastShiftTime >= SHIFT_RATE) {
            this.lastShiftTime = Date.now();
            this.shift();
        }

        if (Date.now() - this.lastAddedFigureTime >= CREATE_RATE) {
            this.lastAddedFigureTime = Date.now();
            this.tryAddElement();
        }
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let alpha = Math.round(Math.sin(Date.now() / 100) * 7 + 220).toString(16);
        
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.colsCount; j++) {
                this.context.fillStyle = this.blocks[SAFE_SPACE + i][j].color + alpha;
                this.context.fillRect(
                    this.paddingLeft + j * (TILE_WIDTH + TILE_SPACE),
                    this.paddingTop + i * (TILE_WIDTH + TILE_SPACE),
                    TILE_WIDTH,
                    TILE_WIDTH
                );
            }
        }

        this.animationFrameId = requestAnimationFrame(this.render.bind(this));

        // setInterval(this.render.bind(this), 200);
        // setTimeout(this.render.bind(this), 100);
    }

    destroy() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

const InteractiveTilesComponent = () => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    
    React.useLayoutEffect(() => {
        const canvas = canvasRef.current;

        const boundingRect = wrapperRef.current.getBoundingClientRect();
        canvas.width = boundingRect.width;
        canvas.height = boundingRect.height;
        
        const interactiveTiles = new InteractiveTiles(canvas);

        return () => {
            interactiveTiles.destroy();
        }
    }, []);

    return (
        <div className="canvas-wrapper" ref={wrapperRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default InteractiveTilesComponent;