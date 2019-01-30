import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Echartstore {
  @observable data = {
    list: []
  };

  fetchDevPosition(param) {
    const that = this;
    const params = {
      successFn(data) {
        if (param.querySuccess && data.data) {
          data.data.forEach((item, key) => { Object.assign(item, { key }); });
          param.querySuccess(data.data);
        }
      },
      ...param
    };
    // console.log(params);

    Ajax.fetch(params);
  }
  fetchDetail(param) {
    const that = this;
    const params = {
      successFn(data) {
        if (param.querySuccess && data.data) {
          data.data.forEach((item, key) => { Object.assign(item, { key }); });
          param.querySuccess(data.data);
        }
      },
      ...param
    };
    // console.log(params);

    Ajax.fetch(params);
  }
  fetchNewInfoList(param) {
    const that = this;
    const params = {
      successFn(data) {
        const res = {};
        if (data.data && data.data.length > 0) {
          data.data.forEach(item => Object.assign(item, { model: `${item.model}`, status: `${item.status}` }));
          const countArr = data.data.reduce((item, next) => {
            item.push(next.alarm_type);
            return item;
          }, []);
          countArr.forEach((e) => {
            res[e] = res[e] >= 1 ? res[e] + 1 : 1;
          });
          // console.log(res);
        }
        if (param.querySuccess) {
          param.querySuccess(data.data, res);
        }
      },
      ...param
    };
    // console.log(params);
    Ajax.fetch(params);
  }
  modifyDevStatus(param) {
    const that = this;
    const params = {
      successFn(data) {
        if (param.querySuccess) {
          param.querySuccess(true);
        }
      },
      ...param
    };
    // console.log(params);
    Ajax.fetch(params);
  }
}