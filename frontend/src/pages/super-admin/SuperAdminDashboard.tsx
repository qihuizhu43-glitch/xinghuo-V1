import { Card, Col, Row, Space, Button, Table, Tag } from 'antd'

const merchantColumns = [
  { title: '商户名称', dataIndex: 'name', key: 'name' },
  { title: '账号', dataIndex: 'account', key: 'account' },
  { title: '状态', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === '启用' ? 'green' : 'red'}>{status}</Tag> },
  { title: '操作', key: 'action', render: () => <Button type="link">编辑</Button> },
]

const merchantData = [
  { key: 1, name: '青云传媒', account: 'qcloud_media', status: '启用' },
  { key: 2, name: '星火教育', account: 'spark_ed', status: '停用' },
]

const SuperAdminDashboard = () => (
  <div>
    <Row gutter={[16, 16]}>
      <Col span={16}>
        <Card title="超级管理员面板" bordered={false}>
          <p>这里展示商户账号管理、行业配置、广告合规词库以及素材管理的展示页面。</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="快速入口" bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button block type="primary">创建商户</Button>
            <Button block>编辑行业</Button>
            <Button block>管理违禁词</Button>
            <Button block>音频素材管理</Button>
          </Space>
        </Card>
      </Col>
    </Row>

    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      <Col span={24}>
        <Card title="商户管理列表" bordered={false}>
          <Table columns={merchantColumns} dataSource={merchantData} pagination={false} />
        </Card>
      </Col>
    </Row>
  </div>
)

export default SuperAdminDashboard
