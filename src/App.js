import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { isInside } from './utils/is-inside';

import * as generalActions from './actions/generalActions';
import * as firstMethodActions from './actions/firstMethodActions';
import * as secndMethodActions from './actions/secondMethodActions';
import * as thirdMethodActions from './actions/thirdMethodActions';

import createPoints from './utils/createPoints';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      test: 0
    }

    this.onClickCalculate = this.onClickCalculate.bind(this);
    this.onClickCreatePoints = this.onClickCreatePoints.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.props.changeState(name, Number(value));
  }

  onClickCalculate() {
    if (this.props.general.method === 1) {
      this.props.fFindPoints(this.props.general);

    } else if (this.props.general.method === 2) {
      if (!this.props.general.isPreprocesses.second) {
        this.props.spreprocessing(this.props.general.points);
      }

      this.props.sFindPoints(this.props.general);
    } else if (this.props.general.method === 3) {
      if (!this.props.general.isPreprocesses.third) {
        this.props.tpreprocessing(this.props.general.points);
      }

      this.props.tFindPoints(this.props.general);
    }

    const { points } = this.props.general;

    const canvas = document.getElementById('canvas');

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const { start, end } = this.props.general.region;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'gray';

      let test = 0;

      points.map(point => {
        if (isInside(point, { start, end })) {
          ctx.strokeStyle = 'red';
          ctx.strokeRect(point.x, point.y, 1, 1);
          ctx.strokeStyle = 'gray';

          test++;
        } else {
          ctx.strokeStyle = 'blue';
          ctx.strokeRect(point.x, point.y, 1, 1);
          ctx.strokeStyle = 'gray';
        }

      });

      this.setState({ test });

      ctx.strokeStyle = 'black';
      ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    }
  }

  onClickCreatePoints() {
    this.props.setPoints(createPoints(this.props.general.countPoints));
  }

  render() {
    let data = [];
    let r = {};

    switch (this.props.general.method) {
      case 1:
        r.result = this.props.firstMethod.currentResult;
        r.time = this.props.firstMethod.currentTime;
        data = this.props.firstMethod.resultMap;
        break;
      case 2:
        r.result = this.props.secondMethod.currentResult;
        r.time = this.props.secondMethod.currentTime;
        data = this.props.secondMethod.resultMap;
        break;
      case 3:
        r.result = this.props.thirdMethod.currentResult;
        r.time = this.props.thirdMethod.currentTime;
        data = this.props.thirdMethod.resultMap;
        break;
      default:
        data = [];
        break;
    }

    return (
      <div>
        <div className="container">
          <canvas width='800' height='400' id='canvas'></canvas>
          <div className='container' style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <input
                onChange={this.onChange}
                id='count-points'
                name='countPoints'
                placeholder="point count..."></input>
              <input
                onChange={this.onChange}
                id='x-input'
                name='region/start/x'
                placeholder="start position x rect..."></input>
              <input
                onChange={this.onChange}
                id='y-input'
                name='region/start/y'
                placeholder="start position y rect..."></input>
              <input
                onChange={this.onChange}
                id='width-input'
                name='region/end/x'
                placeholder="end position x rect..."></input>
              <input
                onChange={this.onChange}
                id='height-input'
                name='region/end/y'
                placeholder="end position y rect..."></input>
            </div>
            <select name='method' onChange={this.onChange}>
              <option value={1}>first method</option>
              <option value={2}>second method</option>
              <option value={3}>third method</option>
            </select>
            <div>
              <button onClick={this.onClickCreatePoints}>create points</button>
              <button onClick={this.onClickCalculate} disabled={false} id='calc-btn'>сalculate</button>
              <button onClick={() => this.props.createFinalChart()}>create final chart</button>
            </div>
            <div>
              <input value={r.result} id='count-result' placeholder="count points in rect..."></input>
              <div>test {this.state.test}</div>
              <input value={`${r.time ? r.time : 0} ms`} id='time-result' placeholder="work time..."></input>
            </div>
          </div>
        </div>
        <div className='container'>
          <LineChart width={600} height={300} data={data}>
            <Tooltip />
            <Line type='monotone' dataKey='time' stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey='countPoints' />
            <YAxis dataKey="time" />
          </LineChart>
        </div>
        {
          this.props.general.finalChart &&
          <div className='container' style={{marginBottom: '2rem'}}>
            <LineChart layout='vertical' width={600} height={300} data={this.props.general.finalChart}>
              <Tooltip />
              <Line type='monotone' dataKey='k12' stroke="#8884d8" />
              <Line type='monotone' dataKey='k23' stroke="#888888" />
              <CartesianGrid stroke="#ccc" />
              <YAxis dataKey="n" type='category' />
              <XAxis type='number' />
            </LineChart>
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, { ...generalActions, ...firstMethodActions, ...secndMethodActions, ...thirdMethodActions })(App);

