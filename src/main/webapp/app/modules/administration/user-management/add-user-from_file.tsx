import React from 'react';
import {Row, Col, Table, Button, Modal, Upload, Icon} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

class Add extends React.Component {
  state = {
    studentColumns: [],
    studentData: [],
    Modalvisible: false,
    fileType: "",
    studentDataPreview: [],
  }
  uploadrequest = () => {
    const {Modalvisible} = this.state;
    this.setState({
      Modalvisible: !Modalvisible
    });
  }
  componentWillMount = async () => {
    const sdata = await axios.get("/api/users").then(response => response.data).then(data => data
    )
    sdata.map(data => {
      data.authorities = data.authorities.join(",");
      data
    });
    this.setState({studentData: sdata})

  }
  onChangeUpLoadFile = (item) => {
    if (item.file.response !== undefined) {
      this.setState({studentDataPreview: item.file.response})
    }
  }

  render() {
    const fileColumns = [{}];
    const fileData = [{}];
    const studentPreviewColumn = [{
      title: '登录名',
      dataIndex: 'login',
      key: 'login',
    },
      {
        title: '权限',
        dataIndex: 'authorities',
        key: 'authorities',
      },]
    const studentColumn = [{
      title: '登录名',
      dataIndex: 'login',
      key: 'login',
    },
      {
        title: '权限',
        dataIndex: 'authorities',
        key: 'authorities',
      },
      {
        title: '创建时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
      },
    ]
    return (
      <div>
        <Row>
          <h2>批量导入学生</h2>
        </Row>
        <Row style={{marginTop: '1.6rem'}}>
          <h3>上传文件</h3>
          <Row>
            <Button type={"primary"} onClick={this.uploadrequest}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Icon type="file-text" style={{marginRight: '.2rem'}}/>点此上传CSV文件
              </div>
            </Button>
            <div style={{display: 'inline-block', width: '.8rem'}}/>
            <Button type={"primary"} onClick={this.uploadrequest}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Icon type="file-excel" style={{marginRight: '.2rem'}}/>点此上传Excel文件
              </div>

            </Button>
          </Row>
        </Row>
        <Row style={{marginTop: '1.6rem'}}>
          <h3>学生名单</h3>
          <Table rowKey="id" columns={studentColumn} dataSource={this.state.studentData}/>
        </Row>

        <Modal title="上传文件" width={800} onOk={this.uploadrequest} onCancel={this.uploadrequest}
               visible={this.state.Modalvisible}>
          <Row>
            <Col span={10}>
              <Upload action="/user/addUserFromDirectory" directory>
                <Button>
                  <Icon type="upload"/> 选择文件夹
                </Button>
              </Upload>
              <div style={{height: "80px"}}/>
              <Upload accept=".csv" action="/addUserFromFile" onChange={this.onChangeUpLoadFile}>
                <Button>
                  <Icon type="upload"/> 选择文件
                </Button>
              </Upload>
            </Col>
            <Col span={14}>
              <Row>
                <h3>文件数据预览</h3>
              </Row>
              <Row>
                <h5>请务必检查文件格式符合[登录名，密码]形式！</h5>
              </Row>
              <Row>
                <Table
                  rowKey="id"
                  columns={studentPreviewColumn}
                  dataSource={this.state.studentDataPreview}
                />
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>


    )
  }
}

export default Add;
