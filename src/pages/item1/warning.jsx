import React, { Component } from 'react';
import { Icon, Card, Button } from 'antd';
import Dashboard from 'store/item1';
import audioSrc from 'media/alert.mp3';
import rightdata from './right.json';

const store = new Dashboard();
class Warningcont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      alarmList: []
    };
    this.handleVisble = this.handleVisble.bind(this);
    this.handleAlarmMsg = this.handleAlarmMsg.bind(this);
  }
  componentDidMount() {
    this.handleAlarmMsg(rightdata.data);
  }
  componentWillUnmount() {
    clearTimeout(this.timer1);
  }
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleVisble() {
    this.setState({ visible: !this.state.visible });
  }
  handleAlarmMsg(data) {
    if (data && data.length) {
      this.play();
    } else {
      this.pause();
    }
    this.setState({
      alarmList: data,
      visible: !!data.length
    });
  }
  play() {
    const media = $('#media')[0];
    if ($('#play').html() === 'Play music!') {
      media.play();
      $('#play').html('Pause music!');
    }
  }
  pause() {
    const media = $('#media')[0];
    if ($('#play').html() === 'Pause music!') {
      media.pause();
      $('#play').html('Play music!');
    }
  }

  render() {
    return (
      <div className="warning-cont">
        {
          this.state.alarmList.length ? (
            <span className={`arrow-wrap ${!this.state.visible ? 'slideinArrow' : 'slideoutArrow'}`} onClick={this.handleVisble}>
              <Icon className="arrow-btn" type={this.state.visible ? 'right' : 'left'} />
            </span>
          ) : null
        }
        {
          this.state.visible ? (
            <div
              className={`myDrawer ${this.state.visible ? 'slideoutcss' : 'slideincss'}`}
              onClose={this.onClose}
            >
              <h3>test1</h3>
              {
                this.state.alarmList.length ? this.state.alarmList.map((item, index) => (
                  <div key={index}>
                    <Card
                      title={(<div className="warning-tit"><i className="icon iconfont icon-warningo" /> ！</div>)}
                      // extra={<span className="close-icon" href="#">×</span>}
                      style={{ width: 300, marginBottom: '5px' }}
                    >
                      <div className="proposal">1</div>
                      test
                    </Card>
                  </div>
                )) : null

              }

            </div>
          ) : null
        }
        <div className="aduio" style={{ display: 'none' }}>
          <div id="audioControl">
            <div className="play">
              <span id="play">Play music!</span>
            </div>
          </div>
          <audio id="media" loop="loop">
            <source src={audioSrc} />
          </audio>
        </div>

      </div>
    );
  }
}
export default Warningcont;
