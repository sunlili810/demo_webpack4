import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import LayoutCom from 'components/layout/layout';
import { Map, Markers, InfoWindow, GroundImage } from 'react-amap';
import item3store from 'store/item3store.js';
import srcImg from 'images/parkmap.jpg';
import mapConfig from './staticmapconfig.js';

import './item3.less';

const store = new item3store();
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: {
        longitude: '116.33719',
        latitude: '39.942384'
      }
    };
    this.markersEvents = {
      // created: (markers) => {},
      click: (e, markerInfo) => {
        // 点击单个覆盖物将数据存储到devicelist中
        const marker = markerInfo.getExtData();
      }
    };
    // 地图设置
    this.mapEvents = {
      created: (instance) => {
        window.AMap.plugin(
          ['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
          () => {
            instance.addControl(new window.AMap.ToolBar({
              position: 'RT'
            }));
          }
        );
      },
      click: () => {
        this.setState({

        });
      }
    };
  }
  componentDidMount() {
    const layout = $('.item3');
    let height = `${$(window).height() - 92}px`;
    layout.css('height', height);
    $(window).resize(() => {
      height = `${$(window).height() - 92}px`;
      layout.css('height', height);
    });
    // this.fetchDevPostion();// 获取覆盖物数据
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }

  play() {
    const media = $('#media')[0];
    media.play();
    $('#play').html('Pause music!');
  }
  pause() {
    const media = $('#media')[0];
    media.pause();
    $('#play').html('Play music!');
  }

  renderMarker = (extData) => {
  }
  render() {
    const loadingStyle = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: '600',
      color: '#24a79f'
    };
    const Loading = <div style={loadingStyle}>地图加载中...</div>;
    const {
      center, markers
    } = this.state;
    const offset = [-15, -25];
    return (
      <LayoutCom name="shmonitor">
        <div className="shmonitor">
          <div className="left-map-change" span={18} style={{ height: '1000px' }}>
            <Map
              amapkey="a15d19b9d7b2db3fc03d9c11669e20e3"
              // mapStyle="amap://styles/9b7814bc72e39d90b42cb0ea74d68ce4"
              zoom={18}
              expandZoomRange
              zooms={[1, 20]}
              // useAMapUI
              center={center}
              events={this.mapEvents}
              loading={Loading}
            >
              <Markers
                render={this.renderMarker}
                markers={markers}
                events={this.markersEvents}
              />
              {/* <InfoWindow */}
              {/* position={devicePos} */}
              {/* visible={showDeviceWin} */}
              {/* offset={offset} */}
              {/* isCustom */}
              {/* > */}
              {/* {alarmColors && deviceList && alarmColors.length && deviceList.length ? */}
              {/* <div> */}
              {/* <InfoDetails dataSource={deviceList} colors={alarmColors} fetchDetail={this.fetchDetail} /> */}
              {/* </div> : null} */}
              {/* </InfoWindow> */}
              <GroundImage
                bounds={mapConfig.data.bounds}
                src={srcImg}
              />
            </Map>
          </div>
        </div>
      </LayoutCom>
    );
  }
}

PageComponent.propTypes = {
  history: PropTypes.object.isRequired
};
export default PageComponent;
