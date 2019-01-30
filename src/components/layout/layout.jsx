import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menus from 'localData/menulist.json';
import './layout.less';


const {
  Header, Content, Sider
} = Layout;
const { SubMenu } = Menu;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      layoutLogo: '',
      menusList: menus,
    };
  }
  componentWillMount() {
    const tempObj = localStorage.getItem('menuObj');

    const tempMenu = tempObj === 'undefined' ? {} : JSON.parse(localStorage.getItem('menuObj'));
    const layoutLogo = '';
    const menusList = menus;
    this.setState({
      layoutLogo,
      menusList
    });
  }

  // onCollapse = (collapsed) => {
  //   this.setState({ collapsed });
  // };
  render() {
    const project = window.apiUrl.split('/')[3];
    const { layoutLogo, menusList } = this.state;
    const { children, name } = this.props;
    const layoutBgc = name === 'item1' ? { margin: '14px', backgroundColor: '#e7ebee' } : { margin: '14px' };
    const subRouter = location.pathname.split('/')[1];
    // const defaultKey = !subRouter || subRouter.substr(0, subRouter.length - 1) === 'device' ?
    //   location.search.substr(1, location.search.length - 1)
    //   : subRouter;
    let defaultKey = '';
    if (subRouter) {
      defaultKey = subRouter.substr(0, 6) === 'device' ?
        location.search.substr(1, location.search.length - 1) : subRouter;
    } else {
      defaultKey = 'monitor';
    }
    const defaultOpenKeys = '';
    const menuList = menusList.list;
    return (

      <Layout style={{ minHeight: '100vh', overflowY: 'auto' }} className="main-layout">
        {<Sider
          className="main-slider"
          // collapsible
          collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
        >
          <Link to="/item1">
            <div className="logo" style={{ background: `url(${layoutLogo}) no-repeat` }} />
          </Link>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[defaultKey]}
            defaultOpenKeys={[defaultOpenKeys]}
          >
            {menuList.length ? menuList.map(item =>
                (item.sub ? (
                  <SubMenu
                    key={item.key}
                    title={<span><Icon /><span>{item.name}</span></span>}
                  >
                    {item.sub.length ? item.sub.map(subItem => (
                      <Menu.Item key={subItem.key} className="main-sub">
                        {subItem.name}
                      </Menu.Item>
                    )) : ''}
                  </SubMenu>
                ) : (
                (

                  <Menu.Item key={item.key} className="main-menu">
                    <Link to={`/${item.key}`}>
                      <Icon type={item.icon} />
                      <span className="nav-text" >{item.name}</span >
                    </Link>
                  </Menu.Item >
                )

                )))
              : ''}
          </Menu>
          {
            project === 'zt_zayw' ? (
              <div id="claa-group">
                <img src={claaGroup} alt="" />
              </div>
            ) : ''
          }
        </Sider>
        }
        <Layout className="layout-right" style={{ width: '90%' }}>
          <Header className="header">
            test124
          </Header>
          <Content style={layoutBgc}>
            <div className="content-layout">
              {children}
            </div >
          </Content >
          {/* <Footer className="foot-index" style={{ textAlign: 'center' }} >
            <Row>
              <Col style={{ textAlign: 'right' }} className="foot-txt">
                CopyRight 消防系统演示平台
                <span className="ant-divider" />版权所有
              </Col>
            </Row>
          </Footer > */}
        </Layout>
      </Layout>
    );
  }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};

export default PageComponent;

