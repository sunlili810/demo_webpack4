import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import LoginStore from 'store/loginstore';
import './login.less';

const FormItem = Form.Item;
const loginUrl = 'login';
const store = new LoginStore();

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleLogo: '',
      loginTxt: ''
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }
  componentWillMount() {
    let titleLogo = '';
    let loginTxt = '';
    switch (window.apiUrl.split('/')[3]) {
      case 'test':
        titleLogo = '';
        break;
      default:
        break;
    }
    this.setState({
      titleLogo,
      loginTxt
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        localStorage.setItem('username', values.userName);
        const param = {
          loadingFlag: false,
          url: loginUrl,
          method: 'POST',
          data: {
            username: values.userName,
            password: values.password,
            project: window.apiUrl.split('/')[3]
          },
          querySuccess: this.loginSuccess
        };
        store.login(param);
      }
    });
  };
  loginSuccess(data) {
    localStorage.setItem('userType', data.userType);
    localStorage.setItem('menuObj', JSON.stringify(data.data));
    const List = data.data.list;
    List.sort((i1, i2) => i1.index - i2.index);
    if (data.data === undefined) {
      switch (window.apiUrl.split('/')[3]) {
        case 'test':
          this.props.history.push('/test');
          break;
        default:
          this.props.history.push('/item1');
          break;
      }
    } else {
      store.data.menuObj = {
        layoutTitle: data.data.layoutTitle,
        menulist: List
      };
      this.props.history.push(`/${data.data.list[0].key}`);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="container-out">
          <div className="container">
            <div className="content">
              <div className="logo">
              </div>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }]
                  })(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }]
                  })(<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
                </FormItem>
                <FormItem>
                  <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageComponent.propTypes = {
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const WrappedNormalLoginForm = Form.create()(PageComponent);
export default WrappedNormalLoginForm;
