'use strict';

var expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-addons-test-utils');

describe('BarChart', function() {
  it('renders barchart', function() {
    var BarChart = require('../src/barchart').BarChart;
    var generate = require('./utils/datagen').generateArrayOfPoints;
    var length = 5;

    var data = [
      {
        name: "series1",
        values: generate(length)
      },
      {
        name: "series2",
        values: generate(length)
      }
    ];

    // Render a barchart using array data
    var barchart = TestUtils.renderIntoDocument(
      <BarChart data={data} width={400} height={200} />
    );

    // Verify that it has rendered the main chart svg
    var barchartGroup = TestUtils.findRenderedDOMComponentWithClass(
      barchart, 'rd3-barchart');
    expect(barchartGroup).to.exist;
    expect(barchartGroup.tagName).to.equal('g');

    // Verify that it has the same number of bars as the array's length
    var bars = TestUtils.scryRenderedDOMComponentsWithTag(
      barchart, 'rect');
    expect(bars.length).to.equal(data.length * length);
  });

  it('renders barchart with negative values', function() {
    var BarChart = require('../src/barchart').BarChart;
    var generate = require('./utils/datagen').generateArrayOfPoints;

    var length = 5;

    var data = [
      {
        name: "series1",
        values: generate(length)
      },
      {
        name: "series2",
        values: generate(length)
      }
    ];

    // Set a few values to negative numbers
    data[0].values[1]['y'] = -100;
    data[1].values[3]['y'] = -150;

    var barchart = TestUtils.renderIntoDocument(
      <BarChart data={data} width={400} height={200} />
    );

    // Verify that it has rendered the main chart svg
    var barchartGroup = TestUtils.findRenderedDOMComponentWithClass(
      barchart, 'rd3-barchart');
    expect(barchartGroup).to.exist;
    expect(barchartGroup.tagName).to.equal('g');

    // Verify that it has the same number of bars as the array's length
    var bars = TestUtils.scryRenderedDOMComponentsWithTag(
      barchart, 'rect');
    expect(bars.length).to.equal(data.length * length);
  });

  it('animates bar correctly', function() {

    var BarChart = require('../src/barchart').BarChart;
    var generate = require('./utils/datagen').generateArrayOfPoints;
    var length = 5;

    var data = [
      {
        name: "series1",
        values: generate(length)
      },
      {
        name: "series2",
        values: generate(length)
      }
    ];

    // Render a barchart using array data
    var barchart = TestUtils.renderIntoDocument(
      <BarChart data={data} width={400} height={200} />
    );

    // Verify that it has rendered the main chart svg
    var bars = TestUtils.scryRenderedDOMComponentsWithTag(
      barchart, 'rect');

    // Before animation
    var bar = bars[0];
    var defaultFill = bar.getAttribute('fill');

    // Animation starts with hover
    TestUtils.Simulate.mouseOver(bar);
    expect(bar.getAttribute('fill')).to.not.equal(defaultFill);

    // TestUtils.Simulate.mouseOut(circle) is not working here
    // https://github.com/facebook/react/issues/1297
    // Animation ends with end of hover
    TestUtils.SimulateNative.mouseOut(bar);
    expect(bar.getAttribute('fill')).to.equal(defaultFill);

  });
});
