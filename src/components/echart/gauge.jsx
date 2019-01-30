import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';


class PageComponent extends Component {
  static resizePie(chartid) {
    window[chartid] = echarts.getInstanceByDom(document.getElementById(chartid));
    window[chartid].resize();
  }
  componentDidMount() {
    window[this.props.id] = echarts.init(document.getElementById(this.props.id));
    this.initPie();
    const that = this;
    $(window).on('resize', () => {
      window[that.props.id].resize();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initPie();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
    window[this.props.id] = null;
  }

  initPie() {
    const { param } = this.props;
    const startGau = param.start ? param.start : 0.1;
    let maxNumLimit = param.maxLimit ? param.maxLimit / param.maxNum : 0.8;
    const minNumLimit = param.minLimit ? param.minLimit / param.maxNum : startGau;
    maxNumLimit = maxNumLimit < minNumLimit ? (minNumLimit + 0.01) : maxNumLimit;
    const minColor = param.alarm ? '#FABD8A' : '#6AF3DE';
    const maxColor = param.alarm ? '#F395A6' : '#1AC6F8';
    const customizationCenter = param.center ? param.center : ['center', 'center'];
    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          min: param.minNum ? param.minNum : 0,
          max: param.maxNum ? param.maxNum : 100,
          center: customizationCenter,
          radius: '62%', // 仪表大小
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              // color: [
              // [0, minColor],
              // // [0.5, '#6AF3DE'],
              // [1, maxColor]
              // ],
              width: 15,
              // // shadowColor: '#fff', //默认透明
              // // shadowBlur: 10

              color: [
                [1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                  offset: 0,
                  color: minColor // 92% 处的颜色
                }, {
                  offset: 1,
                  color: maxColor // 90% 处的颜色
                }], false)]
              ]
            }
          },
          detail: {
            formatter: `${param.data}${param.unit}`,
            offsetCenter: [0, '40%'],
            textStyle: {
              color: param.alarm ? '#FCC687' : '#5AE4C5',
              fontSize: 12
            }
          },
          data: [{ value: `${param.data}`, name: `${param.title}` }],
          pointer: {
            length: '80%',
            width: 2,
            color: 'auto'
          },
          splitLine: { // 分隔线
            show: param.axisLabel !== undefined ? param.axisLabel : true, // 默认显示，属性show控制显示与否
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#eee',
              width: 2,
              type: 'solid',
              fontSize: 9
            }
          },
          // splitLine: {
          //  length: 0,
          //  lineStyle: {
          //    color: '#8c929d',
          //    width: 2
          //  }
          // },
          axisLabel: {
            show: param.axisLabel !== undefined ? param.axisLabel : true
          },
          axisTick: {
            show: param.axisLabel !== undefined ? param.axisLabel : true
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: '#bebebe',
              offsetCenter: [0, '-30%'],
              fontSize: 13
            }
          }
        }
      ]
    };
    window[this.props.id].setOption(option, true);
  }

  render() {
    return (
      <div id={this.props.id} style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  // param: PropTypes.number.isRequired
};
export default PageComponent;
