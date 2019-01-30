import axios from 'axios';
import modal from 'components/modal/modal';

const baseUrl = window.apiUrl;
export default class AJAX {
  static fetch(options) {
    const {
      method = 'get',
      successFn,
      errorFn
    } = options;
    let { data, url } = options;
    url = baseUrl + url;
    if (method.toLowerCase() === 'get') {
      data = null;
    } else {
      data = JSON.stringify(data);
    }
    const tempData = AJAX.isExisty(data) ? data : {};
    axios({
      method,
      url,
      // headers: { 'Content-Type': 'application/json;charset=UTF-8'},
      withCredentials: true,
      data: {
        req: tempData
      }
    })
      .then((response) => {
        if (successFn) {
          successFn(response.data);
        }
      }).catch((error) => {
        if (errorFn) {
          errorFn(error);
        } else {
          AJAX.modalError(error);
        }
      });
  }

  static fetchUpload(options) {
    const {
      method = 'get',
      successFn,
      errorFn,
      data
    } = options;
    let { url } = options;
    url = baseUrl + url;
    axios({
      method,
      url,
      withCredentials: true,
      data
    })
      .then((response) => {
        if (successFn) {
          successFn(response.data);
        }
      }).catch((error) => {
        if (errorFn) {
          errorFn(error);
        } else {
          AJAX.modalError(error);
        }
      });
  }


  static isExisty(obj) {
    return obj !== null;
  }

  static modalError(message) {
    return modal.showModel({
      type: 'error',
      message
    });
  }

  static modalSuccess() {
    return modal.showModel({
      type: 'success',
      message: '指令发送成功'
    });
  }

  static modalHandleSuccess(message) {
    return modal.showModel({
      type: 'success',
      message
    });
  }
}
