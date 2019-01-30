import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

let pieChart = echarts;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.resizePie = this.resizePie.bind(this);
  }
  componentDidMount() {
    pieChart = echarts.init(document.getElementById(`pieChart${this.props.param.key}`));
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
    const pieInstance = echarts.getInstanceByDom(document.getElementById(`pieChart${this.props.param.key}`));
    pieInstance.resize();
  }

  initPie() {
    const { param } = this.props;

    const option = {
      title: {
        text: `${param.text}`,
        padding: 10
      },
      color: ['#43aea8', '#48b5df', '#ecb031', '#66c1bc', '#edcf91', '#6c85bd', '#ff6751', '#f31e54'],
      tooltip: {
        trigger: 'item',
        formatter: `正常：${(param.normalRate * 100).toFixed(0)}%`
      },
      graphic: {
        show: true,
        type: 'text',
        top: '50%',
        left: '68%',
        style: {
          text: `${(param.normalRate * 100).toFixed(0)}%`,
          fill: param.alarm ? '#FCC687' : '#5AE4C5',
          fontSize: 18 // 字体大小
        }
      },
      series: [
        {
          // name: '故障率',
          type: 'pie',
          radius: ['44%', '58%'],
          center: ['72%', '52%'],
          data: [
            {
              value: param.normal.value,
              // name: '正常',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0, color: param.normal.color_0 // 0% 处的颜色
                  }, {
                    offset: 1, color: param.normal.color_1 // 100% 处的颜色
                  }], false)
                }
              }
            }
            // {
            //  value: param.abnormal.value,
            //  name: '不正常',
            //  itemStyle: {
            //    normal: {
            //      color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
            //        offset: 0, color: param.abnormal.color // 0% 处的颜色
            //      }, {
            //        offset: 1, color: param.abnormal.color // 100% 处的颜色
            //      }], false)
            //    }
            //  }
            // }
          ],
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
                fontSize: '18',
                fontWeight: 'bold',
                color: 'rgba(0, 0, 0, 0.65)'
              }
            }
          },
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
    const idName = `pieChart${this.props.param.key}`;
    return (
      <div key={this.props.param.key} id={idName} style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired
};
export default PageComponent;
