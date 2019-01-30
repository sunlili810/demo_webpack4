import React, { Component } from 'react';
import { Row, Col, Tabs, Icon } from 'antd';
import { observer } from 'mobx-react';
import Linechart from 'components/echart/line';
import Tablestore from 'store/tablestore';
import Dashboard from 'store/item1';
import alarmData from 'localData/item1.json';

const tablestore = new Tablestore();
const store = new Dashboard();
const { TabPane } = Tabs;
const urlAlarmStat = 'alarm/historyAlarmProcessStat';

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      serrydata: []
    };
    this.tempLend = [];
  }

  componentDidMount() {
    const tempxData = [];
    const tempSerrydata = [];
    const tempArry = {};
    alarmData.data.map((item) => {
      tempxData.push(item.report_date);
      item.counts.map((item2) => {
        this.tempLend.push(item2.name);
        if (tempArry[item2.model] === undefined) {
          tempArry[item2.model] = {};
          tempArry[item2.model].data = [];
          tempArry[item2.model].data.push(item2.count);
          tempArry[item2.model].name = item2.name;
        } else {
          tempArry[item2.model].data.push(item2.count);
          tempArry[item2.model].name = item2.name;
        }
      });
    });
    // // console.log(tempArry);
    const { values } = Object;
    for (const value of values(tempArry)) {
      tempSerrydata.push(value);
    }
    this.setState({
      xData: tempxData,
      serrydata: tempSerrydata
    });
  }
  // fetch = (params = {}) => {
  //  const that = this;
  //  const queryParam = {
  //    loadingFlag: false,
  //    url: '',
  //    method: 'post',
  //    data: {
  //      ...params
  //    },
  //    successFn(data) {
  //      const tempxData = [];
  //      const tempSerrydata = [];
  //      const tempArry = {};
  //      data.data.map((item) => {
  //        tempxData.push(item.report_date);
  //        item.counts.map((item2) => {
  //          that.tempLend.push(item2.name);
  //          if (tempArry[item2.model] === undefined) {
  //            tempArry[item2.model] = {};
  //            tempArry[item2.model].data = [];
  //            tempArry[item2.model].data.push(item2.count);
  //            tempArry[item2.model].name = item2.name;
  //          } else {
  //            tempArry[item2.model].data.push(item2.count);
  //            tempArry[item2.model].name = item2.name;
  //          }
  //        });
  //      });
  //      // // console.log(tempArry);
  //      const { values } = Object;
  //      for (const value of values(tempArry)) {
  //        tempSerrydata.push(value);
  //      }
  //      that.setState({
  //        xData: tempxData,
  //        serrydata: tempSerrydata
  //      });
  //    }
  //  };
  //  tablestore.handleUser(queryParam);
  // };

  render() {
    this.state.serrydata.map(item => Object.assign(item, { areaStyle: null, smooth: true, symbolSize: 10 }));
    const linedataTemp = {
      legend: {
        data: this.tempLend
      },
      xdata: this.state.xData,
      colorOption: {
        xLineColor: '#dcdcdc',
        yLineColor: '#dcdcdc',
        backgroundLineColor: '#e9e9e9',
        xTxtColor: '#939393',
        yTxtColor: '#939393'
      },
      grid: {
        top: '2%'
      },
      serrydata: this.state.serrydata
    };
    return (
      <div className="lineWrap" style={{ width: '100%', height: '370px' }}>
        <Row
          gutter={24}
          className="line-row"
          style={{ margin: '0' }}
        >
          <Col xs={24} md={12} lg={12} ><Icon className="line-icon" type="area-chart" /></Col>
        </Row>
        <Row
          gutter={24}
        >
          <Col xs={20} md={20} lg={20} >
            <div style={{ height: '310px', padding: '0 10px' }}>
              <Linechart id="linechart1" param={linedataTemp} />
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default PageComponent;
