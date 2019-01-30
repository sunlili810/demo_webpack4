import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

let pieChart = echarts;

class PageComponent extends Component {
  componentDidMount() {
    pieChart = echarts.init(document.getElementById('pieChart'));
    this.initPie();
    $(window).on('resize', this.resizePie);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initPie();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
  }
  resizePie() {
    const pieInstance = echarts.getInstanceByDom(document.getElementById('pieChart'));
    pieInstance.resize();
  }

  initPie() {
    const { param } = this.props;

    const option = {
      // title: {
      //   text: '',
      //   padding: 10
      // },
      color: ['#D4FC78', '#57E3C3', '#60b1cc', '#cfa448', '#6ed6c2', '#6c85bd', '#bac3d2', '#f45c47', '#8e7ebe', '#5d9ccd', '#dbcf46'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //  bottom: '10',
      //  data: param.legendData
      // },
      series: [
        {
          name: '',
          type: 'pie',
          // radius: ['42%', '62%'],
          radius: '62%',
          center: ['40%', '50%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          data: param.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    pieChart.setOption(option);
  }

  render() {
    return (
      <div id="pieChart" style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired
};
export default PageComponent;
