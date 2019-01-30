import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './common.less';
// import '../res/iconfont/iconfont.css';
import { Spin } from 'antd';

// const login = loadable(() => import('pages/login/login'));
// const item1 = loadable(() => import('pages/item1/item1'));
// const item2 = loadable(() => import('pages/item2/item2'));
// const item3 = loadable(() => import('pages/item3/item3'));
// const shdevconfig = loadable(() => import('pages/shdevconfig/shdevconfig'));


const login = lazy(() => import('pages/login/login'));
const item1 = lazy(() => import('pages/item1/item1'));
const item2 = lazy(() => import('pages/item2/item2'));
const item3 = lazy(() => import('pages/item3/item3'));
const item4 = lazy(() => import('pages/item4/item4'));
// const shdevconfig = lazy(() => import('pages/shdevconfig/shdevconfig'));
// const importdata = lazy(() => import('pages/item2/item2'));

// import login from 'pages/login/login';
// import item1 from 'pages/item1/item1'; // 首页
// import item2 from 'pages/item2/item2'; // 历史告警
// import item3 from 'pages/item3/item3'; // 上海实时监控
// import shdevconfig from 'pages/shdevconfig/shdevconfig'; // 上海设备配置


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Suspense fallback={<Spin size="large" tip="Loading..." />} maxDuration={250} >
            <Switch>
              <Route exact path="/" component={item1} />
              <Route exact path="/login" component={login} />
              <Route exact path="/item1" component={item1} />
              <Route exact path="/item2" component={item2} />
              <Route exact path="/item3" component={item3} />
              <Route exact path="/item4" component={item4} />
              {/* <Route exact path="/shdevconfig" component={shdevconfig} /> */}
              {/* <Route exact path="/importdata" component={importdata} /> */}
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
