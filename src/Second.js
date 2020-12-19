import React from 'react';
import grahamFind from './utils/grahamMethod/find';
import jarvisFind from './utils/jarvisMethod/find';
import { gaussRandom, circle, normalRandom, rectangel } from './utils/createPoints';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import fc from './utils/fc';

export default function Second() {

    const [state, setState] = React.useState({
        'count': 100,
        'rect-method': 1,
        'circle-method': 1,
        'distribution': 1,
        'rect-shell': { time: null },
        'circle-shell': { time: null },
        'points': null,
        fc: null
    });

    const onChange = e => setState({
        ...state,
        [e.target.name]: Number(e.target.value)
    });

    const drawShell = (canvas) => (p, shell) => {
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

        shell.map(i => {
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.arc(i.x, i.y, 2, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.strokeStyle = 'black';
        });

        ctx.beginPath();
        ctx.moveTo(shell[0].x, shell[0].y);
        shell.map(i => {
            ctx.lineTo(i.x, i.y);
        });
        ctx.lineTo(shell[0].x, shell[0].y);
        ctx.stroke();
    }

    const onClick = () => {
        const { rect, circle } = state.points;

        const rectShell = state['rect-method'] === 1 ? grahamFind(rect) : jarvisFind(rect);
        const circleShell = state['circle-method'] === 1 ? grahamFind(circle) : jarvisFind(circle);

        drawShell(document.getElementById('canvas-1'))(rect,
            rectShell.shell
        );
        drawShell(document.getElementById('canvas-2'))(circle,
            circleShell.shell
        );

        setState({
            ...state,
            'rect-shell': rectShell,
            'circle-shell': circleShell,
        })
    }

    const onCreatePoints = () => {

        const generator = state.distribution === 1 ? normalRandom : gaussRandom;
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
                    <span
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem'
                        }}>
                        Время: {state['rect-shell'].time || '0'} мс
                    </span>
                    <canvas width='800' height='400' id='canvas-1'></canvas>
                </div>
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
                        Окружность
                    </span>
                    <span
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem'
                        }}>
                        Время: {state['circle-shell'].time || '0'} мс
                    </span>
                    <canvas width='800' height='400' id='canvas-2'></canvas>
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
                        onChange={onChange}
                        name='count'
                        placeholder="Введите количество точек..."></input>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <label>Метод для прямоугольника</label>
                    <select name='rect-method' onChange={onChange}>
                        <option value={1}>Алгоритм Грэхэма</option>
                        <option value={2}>Алгоритм Джарвиса</option>
                    </select>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <label>Метод для окружности</label>
                    <select name='circle-method' onChange={onChange}>
                        <option value={1}>Алгоритм Грэхэма</option>
                        <option value={2}>Алгоритм Джарвиса</option>
                    </select>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <label>Распределение точек</label>
                    <select name='distribution' onChange={onChange}>
                        <option value={1}>Равномерное</option>
                        <option value={2}>Нормальное</option>
                    </select>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <button onClick={onCreatePoints}>Сгенерировать точки</button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <button onClick={onClick}>Построить выпуклые оболочки</button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1rem'
                    }}>
                    <button onClick={() => setState({ ...state, fc: fc() })}>Построить рафики</button>
                </div>
            </div>
            {state.fc &&
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '300px 300px'
                }}>
                <div>
                    <LineChart 
                        width={600} 
                        height={300} 
                        data={state.fc.map(i => ({ x: i.i, gy: i.gp1, jy: i.jp1 }))}>
                        <Tooltip />
                        <Line type='monotone' dataKey='gy' stroke="#808000" />
                        <Line type='monotone' dataKey='jy' stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="x" />
                        <YAxis />
                    </LineChart>
                </div>
                <div>
                    <LineChart 
                        width={600} 
                        height={300} 
                        data={state.fc.map(i => ({ x: i.i, gy: i.gp2, jy: i.jp2 }))}>
                        <Tooltip />
                        <Line type='monotone' dataKey='gy' stroke="#808000" />
                        <Line type='monotone' dataKey='jy' stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="x" />
                        <YAxis />
                    </LineChart>
                </div>
                <div>
                    <LineChart 
                        width={600} 
                        height={300} 
                        data={state.fc.map(i => ({ x: i.i, gy: i.gp3, jy: i.jp3 }))}>
                        <Tooltip />
                        <Line type='monotone' dataKey='gy' stroke="#808000" />
                        <Line type='monotone' dataKey='jy' stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="x" />
                        <YAxis />
                    </LineChart>
                </div>
                <div>
                    <LineChart 
                        width={600} 
                        height={300} 
                        data={state.fc.map(i => ({ x: i.i, gy: i.gp4, jy: i.jp4 }))}>
                        <Tooltip />
                        <Line type='monotone' dataKey='gy' stroke="#808000" />
                        <Line type='monotone' dataKey='jy' stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="x" />
                        <YAxis />
                    </LineChart>
                </div>
            </div>}
        </div>

    )
}
