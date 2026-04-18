import { Card, Col, Row, Space, Tabs, Tag, Button, Table } from 'antd'
import { FileSearchOutlined, AppstoreOutlined, PictureOutlined, PlayCircleOutlined } from '@ant-design/icons'

const hotspotColumns = [
  { title: '热点渠道', dataIndex: 'channel', key: 'channel' },
  { title: '关键词', dataIndex: 'keywords', key: 'keywords' },
  { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
]

const hotspotData = [
  { key: 1, channel: '抖音', keywords: '短视频、内容创作、带货', updatedAt: '2026-04-18 10:20' },
  { key: 2, channel: '小红书', keywords: '种草、高质量生活、场景化', updatedAt: '2026-04-18 10:18' },
]

const productData = [
  { key: 1, name: '智能营销方案', description: '面向中小企业的短视频推广服务', tags: ['商业', '营销', 'SaaS'] },
  { key: 2, name: '品牌形象策划', description: '为企业打造高传播力的内容方案', tags: ['品牌', '内容', '视觉'] },
]

const productColumns = [
  { title: '产品名称', dataIndex: 'name', key: 'name' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) => (
      <Space>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space>
    ),
  },
]

const contentColumns = [
  { title: '步骤', dataIndex: 'step', key: 'step' },
  { title: '说明', dataIndex: 'description', key: 'description' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const contentData = [
  { key: 1, step: '热点抓取', description: '聚合热门渠道并提取关键词', status: '已完成' },
  { key: 2, step: '产品档案选择', description: '选择当前项目的产品档案', status: '进行中' },
  { key: 3, step: '标题/脚本生成', description: 'AI生成多个标题和脚本', status: '待开始' },
  { key: 4, step: '封面生成', description: '基于脚本生成封面素材', status: '待开始' },
  { key: 5, step: '视频生成', description: '调用视频生成流程输出成片', status: '待开始' },
]

const MerchantDashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="商户工作台概览" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card type="inner" title="当前项目" extra={<Button type="primary">开始热点抓取</Button>}>
                这是一个演示型商户界面，包含配置页与工作流程页，用于展示热点抓取、产品档案、脚本生成、封面生成和视频生成等节点。
              </Card>
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="主营业务" bordered={false}>
                    数字人直播、品牌内容制作、短视频营销方案
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="当前行业" bordered={false}>
                    教育培训 / B2B服务 / 新媒体推广
                  </Card>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="常用操作" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button block icon={<FileSearchOutlined />}>热点抓取</Button>
              <Button block icon={<AppstoreOutlined />}>产品档案管理</Button>
              <Button block icon={<PictureOutlined />}>图片生成</Button>
              <Button block icon={<PlayCircleOutlined />}>视频生成</Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="config" items={[
          {
            key: 'config',
            label: '配置页',
            children: (
              <div>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="产品档案管理" type="inner">
                      <Table columns={productColumns} dataSource={productData} pagination={false} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="资产库管理" type="inner">
                      <Row gutter={[16, 16]}>
                        <Col span={8}><Card>数字人管理</Card></Col>
                        <Col span={8}><Card>场景管理</Card></Col>
                        <Col span={8}><Card>音频管理</Card></Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="图片生成" type="inner">
                      文生图、图生图、素材管理与库选择
                    </Card>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            key: 'workflow',
            label: '工作流程',
            children: (
              <div>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card title="热点抓取" type="inner">
                      <Table columns={hotspotColumns} dataSource={hotspotData} pagination={false} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="流程概览" type="inner">
                      <Table columns={contentColumns} dataSource={contentData} pagination={false} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="快速操作" type="inner">
                      <Space>
                        <Button type="primary">提取文字</Button>
                        <Button>重新生成标题</Button>
                        <Button>AI味消除</Button>
                        <Button>下一步</Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </div>
            ),
          },
        ]} />
      </Card>
    </div>
  )
}

export default MerchantDashboard
