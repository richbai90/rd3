'use strict';

const React = require('react');
const BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    _data: React.PropTypes.array,
    series: React.PropTypes.array,
    grouped: React.PropTypes.bool,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    valuesAccessor: React.PropTypes.func,
    hoverAnimation: React.PropTypes.any, // TODO: prop types?
    xScale: React.PropTypes.any,
    yScale: React.PropTypes.any,
  },

  _renderBarSeries() {
    const { _data, valuesAccessor } = this.props;
    return _data.map((layer, seriesIdx) => (
      valuesAccessor(layer).map(segment => this._renderBar(segment, seriesIdx))
    ));
  },

  _renderBar(segment, seriesIdx) {
    const { colors, colorAccessor, grouped, hoverAnimation, series, xScale, yScale } = this.props;
    const barHeight = Math.abs(yScale(0) - yScale(segment.y));
    const y = grouped ? yScale(segment.y) : yScale(segment.y0 + segment.y);
    return (
      <rect
        height={barHeight}
        width={grouped ? xScale.rangeBand() / series.length : xScale.rangeBand() }
        x={grouped ?
          xScale(segment.x) + xScale.rangeBand() / series.length * seriesIdx :
          xScale(segment.x)
        }
        y={(segment.y >= 0) ? y : y - barHeight}
        fill={colors(colorAccessor(segment, seriesIdx))}
      />
    );
  },

  render() {
    return (
      <g>{this._renderBarSeries()}</g>
    );
  },
});
