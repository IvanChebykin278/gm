import React from 'react';
import voronoi from './utils/voronoi';
import { circle, normalRandom, rectangel } from './utils/createPoints';

export default function Voronoi() {

    React.useEffect(() => {
        onCreatePoints();
    }, []);

    const force = () => {
        const ctx = document.getElementById('canvas-1').getContext('2d');
        const v = voronoi(state.points.rect, ctx);
        setState({ ...state, v });
    }

    const [state, setState] = React.useState({
        count: 10,
        points: {
            rect: [],
            circle: []
        },
        v: []
    });

    const onChange = e => setState({
        ...state,
        [e.target.name]: Number(e.target.value)
    });

    const drawVoronoi = (canvas) => (p = [], voronoi = []) => {
        const ctx = canvas.getContext('2d');

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        p.map(i => {
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(i.x, i.y, 1, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.strokeStyle = 'black';
        });

        voronoi.forEach(j => {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            j.forEach((i, ind) => {
                if (ind === 0) {
                    ctx.moveTo(i.x, i.y);
                } else {
                    ctx.lineTo(i.x, i.y);
                }
            });
            //if (j[0]) ctx.lineTo(j[0].x, j[0].y);
            ctx.strokeStyle = 'black';
            ctx.stroke();

            j.forEach((i, ind) => {
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.arc(i.x, i.y, 1, 0, 2 * Math.PI, false);
                ctx.stroke();
                ctx.strokeStyle = 'black';
            });
        })
    }

    const draw = () => {
        drawVoronoi(document.getElementById('canvas-1'))(state.points.rect, state.v);
    }

    const onCreatePoints = () => {

        const generator = normalRandom;
        const pointsInRect = rectangel(state.count)(generator);
        const pointsInCircle = circle(state.count)(generator);

        setState({
            ...state,
            points: {
                rect: pointsInRect,
                circle: pointsInCircle
            }
        });
    }

    return (
        <React.Fragment>
            <div
                style={{
                    display: 'flex',
                    margin: '1rem'
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <div
                        style={{
                            position: 'relative'
                        }}>
                        <span
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1rem'
                            }}>
                            Прямоугольник
                    </span>
                        <canvas width='800' height='400' id='canvas-1'></canvas>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '1rem'
                        }}>
                        <input
                            name='count'
                            placeholder="Введите количество точек..."></input>
                    </div>
                </div>
            </div>
            <button onClick={force}>force</button>
            <button onClick={draw}>draw</button>
        </React.Fragment>
    )
}

