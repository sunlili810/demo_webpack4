import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Tablestore3 {
  @observable dataObj = {
    list: [],
    last: [],
    searchFilter: null,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 10,
      showSizeChanger: true,
      showQuickJumper: true
    }
  };

  fetchData(param) {
    const storeThis = this;
    this.dataObj.list = [];
    const params = {
      successFn(data) {
        const tempObj = { ...storeThis.dataObj };
        tempObj.pagination.total = parseInt(data.totalNum, 10);
        if (tempObj.pagination.total) {
          if (storeThis.dataObj.pagination.current > Math.ceil(storeThis.dataObj.pagination.total / storeThis.dataObj.pagination.pageSize)) {
            tempObj.pagination.current = Math.ceil(storeThis.dataObj.pagination.total / storeThis.dataObj.pagination.pageSize);
          }
        }
        if (data.data) {
          data.data.map((item, index) => {
            item.key = index + 1;
          });
          tempObj.list = data.data;
        }
        storeThis.dataObj = tempObj;
      },
      ...param
    };
    Ajax.fetch(params);
  }
  handleUser(param) {
    const params = {
      ...param
    };
    Ajax.fetch(params);
  }

  deleteUser(param) {
    const params = {
      ...param
    };
    Ajax.fetch(params);
  }
  lastUser(param) {
    const params = {
      successFn: (data) => {
        if (data.data) {
          // console.log(data.data);
          this.dataObj.last = data.data;
          if (param.querySuccess) {
            param.querySuccess(data.data);
          }
        }
        // console.log(this.dataObj.last)
      },
      ...param
    };
    // debugger
    Ajax.fetch(params);
  }

  doUploadFiles(param) {
    const that = this;
    const params = {
      ...param
    };
    // console.log(params);
    Ajax.fetchUpload(params);
  }
  synchronization(param) {
    const that = this;
    const params = {
      ...param
    };
    // console.log(params);
    Ajax.fetch(params);
  }
}
