import React from 'react';

import './style.css';
import { randomIdx, randomInt } from '../../utils/random';
import { repeatArray } from '../../utils/array';

const TILE_WIDTH = 15; // Pixels
const TILE_SPACE = 4; // Pixels between tiles

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
]

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

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')

        this.rowsCount = Math.floor(canvas.height  / (TILE_WIDTH + TILE_SPACE));
        this.colsCount = Math.floor(canvas.width / (TILE_WIDTH + TILE_SPACE));

        this.paddingTop = (canvas.height - this.rowsCount * TILE_WIDTH - (this.rowsCount - 1) * TILE_SPACE);
        this.paddingLeft = (canvas.width - this.colsCount * TILE_WIDTH - (this.colsCount - 1) * TILE_SPACE);
        
        this.paddingTop = Math.floor(this.paddingTop / 2);
        this.paddingLeft = Math.floor(this.paddingLeft / 2);

        this.blocks = [];
        for (let i = 0; i < this.rowsCount; i++) {
            this.blocks[i] = [];
            for (let j = 0; j < this.colsCount; j++) {
                this.blocks[i].push(new Tile('#ffffff'));
            }
        }

        let maxHeight = Math.random() * this.rowsCount / 2;
        let height = Math.floor(maxHeight / 2 + 1);
        for (let j = 0; j < this.colsCount; j++) {
            height += TRANSITIONS[randomIdx(TRANSITIONS.length)];
            height = Math.min(Math.max(1, height), maxHeight);
            for (let i = 0; i < height; i++) {
                this.blocks[i][j].color = "#1111" + Math.floor(Math.random() * 55 + 200).toString(16);
            }
        }

        for (let i = 0; i < 10 && this.tryAddElement(); i++);

        // requestAnimationFrame(this.render.bind(this));
        setInterval(this.render.bind(this), 1000);
    }

    tryAddElement(): boolean {
        for (let attempt = 0; attempt <= 10; attempt++) {
            let type = randomIdx(FIGURE_PATTERNS.length);

            const w = FIGURE_PATTERNS[type].length;
            const h = FIGURE_PATTERNS[type][0].length;

            let i = randomIdx(this.rowsCount - w);
            let j = randomIdx(this.colsCount - h);

            let possible = true;
            for (let di = 0; di < w; di++) {
                for (let dj = 0; dj < h; dj++) {
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

            for (let di = 0; di < w; di++) {
                for (let dj = 0; dj < h; dj++) {
                    let y = i + di;
                    let x = j + dj;

                    if (FIGURE_PATTERNS[type][di][dj]) {
                        this.blocks[y][x].color = '#dddddd';
                    }
                }
            }

            return true;
        }

        return false;
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let alpha = Math.round(Math.sin(Date.now() / 100) * 7 + 220).toString(16);
        console.log(alpha);
        
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.colsCount; j++) {
                this.context.fillStyle = this.blocks[i][j].color + alpha;
                this.context.fillRect(
                    this.paddingLeft + j * (TILE_WIDTH + TILE_SPACE),
                    this.paddingTop + (this.rowsCount - 1 - i) * (TILE_WIDTH + TILE_SPACE),
                    TILE_WIDTH,
                    TILE_WIDTH
                );
            }
        }

        // requestAnimationFrame(this.render.bind(this));
        // setInterval(this.render.bind(this), 200);
    }

    destroy() {
        
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