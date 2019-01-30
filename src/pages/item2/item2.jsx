import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LayoutCom from 'components/layout/layout';
import { Form, Button, Upload, Icon, Table, Tooltip, Select } from 'antd';
import Tablestore from 'store/tablestore';
import modal from 'components/modal/modal';
import './item2.less';

const store = new Tablestore();
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStatus: 0
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }];
  }
  componentDidMount() {
    // this.fetchBatchOptProcess();
    // this.fetchBatchOptDetail();
  }
  componentWillUnmount() {
    clearTimeout(this.timer1);
  }
  fetchUploadFile = (value = {}) => {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '',
      method: 'POST',
      data: value.upload,
      successFn() {
        that.fetchBatchOptProcess();
      }
    };
    store.doUploadFiles(param);
  };

  fetchBatchOptProcess = (value = {}) => {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '',
      method: 'POST',
      data: {
        task_id: ''
      },
      successFn(data) {
        if (that.timer1) {
          clearTimeout(that.timer1);
        }
        if (data.data.progress === 100) {
          that.fetchBatchOptDetail();
          modal.closeModel(that.loadingDialog);
        } else {
          that.timer1 = setTimeout(that.fetchBatchOptProcess.bind(that), 1000);
        }
      }
    };
    store.handleUser(param);
  };

  fetchBatchOptDetail = (params = {}) => {
    const queryParam = {
      loadingFlag: false,
      url: '',
      method: 'post',
      data: {
        task_id: '',
        numPerPage: store.dataObj.pagination.pageSize,
        page: store.dataObj.pagination.current,
        flag: this.state.searchStatus,
        ...params
      }
    };
    store.fetchData(queryParam);
  };


  handleOk(e) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const formData = new FormData();
      const tempUpload = values.upload.slice();
      tempUpload.map((file) => {
        formData.append('files[]', file.originFileObj);
      });
      // formData.append('opt', values.opt);
      const data = {
        upload: formData
      };
      this.fetchUploadFile(data);
      this.loadingDialog = modal.showModel({
        type: 'loading',
        title: '导出中...'
      });
    });
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  }
  handleTableChange = (pagination, filters, sorter) => {
    store.dataObj.pagination.current = pagination.current;
    store.dataObj.pagination.pageSize = pagination.pageSize;
    this.fetchBatchOptDetail(sorter.field === undefined ? {} : {
      sort: [{
        name: sorter.field,
        sort: sorter.order === 'ascend' ? 'asc' : 'desc'
      }]
    });
  };
  handleSearch(values) {
    this.setState({
      searchStatus: values.flag
    }, () => {
      this.fetchBatchOptDetail();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const props1 = {
      action: '', // 这里是上传的URL地址
      accept: '.csv',
      multiple: false,
      onRemove: (file) => {
      },
      beforeUpload: file => false
    };
    const datasorce = store.dataObj.list.slice();
    datasorce.map(item => (Object.assign(item, { flagDesc: item.flag === 0 ? '全部' : item.flag === 1 ? '成功' : '失败' })));
    return (
      <LayoutCom name="shBulkImport">
        <div className="shBulkImport">
          <div className="nav-right" >
            <div className="tab-left inlineblock" >
              <Form layout="horizontal" className="tab-form-left" >
                <FormItem
                  {...formItemLayout}
                  style={{ display: 'inline-block' }}
                  label={(
                    <span>
                            测试上传&nbsp;

                    </span>
                )}
                  extra=""
                >
                  {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [
                    {
                      required: false,
                      message: '请上传文件'
                    }
                  ]
                })(<Upload name="logo" {...props1}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>)}
                </FormItem>
                <Button
                  className="upload-demo-start"
                  type="primary"
                  onClick={this.handleOk}
                  // disabled={this.state.fileList.length === 0}
                  // loading={uploading}
                >
                  upload
                </Button>
              </Form>

            </div>

          </div>
          {/* <Table */}
          {/* className="deviceConfigTab" */}
          {/* // rowSelection={rowSelection} */}
          {/* columns={this.columns} */}
          {/* bordered */}
          {/* dataSource={datasorce} */}
          {/* pagination={store.dataObj.pagination} */}
          {/* // scroll={{ x: 2700 }} */}
          {/* onChange={this.handleTableChange} */}
          {/* /> */}
        </div>
      </LayoutCom>
    );
  }
}
export default Form.create()(PageComponent);
