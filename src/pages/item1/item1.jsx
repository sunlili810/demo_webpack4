import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Icon, Drawer, Card } from 'antd';
import LayoutCom from 'components/layout/layout';
import Gagugechart from 'components/echart/gauge';
import itemStore from 'store/item1';
import './item1.less';
import Alarmcont from './alarm';
import Warningcont from './warning';

const store = new itemStore();

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <LayoutCom name="item1">
        <div className="item1" >
          <Row gutter={24} style={{ marginTop: '10px' }}>
            <Col xs={24} md={24} lg={24} xl={16} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <div className="block-col" >
                <Alarmcont />
              </div>
            </Col>
          </Row>
          <Warningcont />
        </div>
      </LayoutCom>
    );
  }
}

export default PageComponent;
