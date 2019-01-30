import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Rfidlabelstore {
  @observable data = {
    devModellist: [],
    descData: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 10,
      showSizeChanger: true,
      showQuickJumper: true
    }
  };

  fetchTable(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        data.data.forEach((item, index) => Object.assign(item, { key: index }));
        if (param.querySuccess) param.querySuccess(data.data);
        dataObserve.pagination.total = parseInt(data.totalNum, 10);
        if (dataObserve.pagination.total) {
          if (that.data.pagination.current > Math.ceil(that.data.pagination.total / that.data.pagination.pageSize)) {
            dataObserve.pagination.current = Math.ceil(that.data.pagination.total / that.data.pagination.pageSize);
          }
        }
        that.data = dataObserve;
      },
      ...param
    };
    // console.log('query param:', params);
    Ajax.fetch(params);
  }
  fetchDevModel(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        data.data.forEach((item, index) => Object.assign(item, { key: index }));
        dataObserve.devModellist = data.data;
        that.data = dataObserve;
      },
      ...param
    };
    // console.log(params);
    Ajax.fetch(params);
  }
  fetchDescData(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        data.data.forEach((item, index) => Object.assign(item, { key: index }));
        dataObserve.descData = data.data;
        that.data = dataObserve;
      },
      ...param
    };
    // console.log(params);
    Ajax.fetch(params);
  }
  modifyStatus(param) {
    // console.log(param);
    Ajax.fetch(param);
  }
}
