import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Table,
  Typography,
} from 'antd'
import {
  FileSearchOutlined,
  AppstoreOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'

const platformOptions = ['抖音', '小红书', '快手', 'B站']
const channelOptions = ['教育培训', '品牌营销', '科技创新', '财经热点', '生活方式']

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
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: any) => (
      <Button type="link" onClick={() => record.onEdit(record)}>
        编辑
      </Button>
    ),
  },
]

const workflowSteps = [
  { key: 1, step: '热点抓取', description: '聚合热门渠道并提取关键词' },
  { key: 2, step: '产品档案选择', description: '选择当前项目的产品档案' },
  { key: 3, step: '标题/脚本生成', description: 'AI生成多个标题和脚本' },
  { key: 4, step: '封面生成', description: '基于脚本生成封面素材' },
  { key: 5, step: '视频生成', description: '调用视频生成流程输出成片' },
]

const MerchantDashboard = () => {
  const [hotspotPlatforms, setHotspotPlatforms] = useState<string[]>(['抖音', '小红书'])
  const [hotspotChannels, setHotspotChannels] = useState<string[]>(['品牌营销'])
  const [hotspotData, setHotspotData] = useState<any[]>([])
  const [manualText, setManualText] = useState('在这里粘贴视频台词，点击提取文字。')
  const [extractedText, setExtractedText] = useState('')
  const [products, setProducts] = useState<any[]>([
    { key: 1, name: '智能营销方案', description: '面向中小企业的短视频推广服务', tags: ['商业', '营销', 'SaaS'] },
    { key: 2, name: '品牌形象策划', description: '为企业打造高传播力的内容方案', tags: ['品牌', '内容', '视觉'] },
  ])
  const [currentStep, setCurrentStep] = useState(2)
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [productForm] = Form.useForm()
  const [titleSamples, setTitleSamples] = useState<string[]>([
    '如何用数字人提升品牌曝光率？',
    '3个步骤搞定短视频营销方案',
    '新媒体推广中的热点选题策略',
  ])
  const [scriptOutput, setScriptOutput] = useState(
    '根据当前热点和产品档案，生成一段专业且易于传播的短视频脚本。',
  )
  const [aiFlavorRemoved, setAiFlavorRemoved] = useState(false)

  const productTableData = useMemo(
    () => products.map((item) => ({ ...item, onEdit: handleEditProduct })),
    [products],
  )

  function handleEditProduct(product: any) {
    setEditingProduct(product)
    setIsProductModalVisible(true)
    productForm.setFieldsValue({ ...product })
  }

  function openProductModal() {
    setEditingProduct(null)
    productForm.resetFields()
    setIsProductModalVisible(true)
  }

  const handleSubmitProduct = async (values: any) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((item) => (item.key === editingProduct.key ? { ...item, ...values } : item)))
      message.success('产品档案已更新')
    } else {
      setProducts((prev) => [...prev, { key: Date.now(), ...values }])
      message.success('产品档案已新增')
    }
    setIsProductModalVisible(false)
  }

  const handleFetchHotspots = () => {
    if (!hotspotPlatforms.length || !hotspotChannels.length) {
      message.warning('请选择至少一个平台和一个行业渠道。')
      return
    }

    const generated = hotspotPlatforms.map((platform, index) => ({
      key: Date.now() + index,
      channel: platform,
      keywords: `${platform} 热点、${hotspotChannels.join('、')}、短视频创作`,
      updatedAt: new Date().toLocaleString(),
    }))

    setHotspotData(generated)
    message.success('热点抓取完成，已生成最新关键词。')
  }

  const handleExtractText = () => {
    if (!manualText.trim()) {
      message.warning('请输入要提取的文字内容。')
      return
    }
    setExtractedText(manualText.replace(/\s+/g, ' ').slice(0, 180))
    message.success('文字提取成功，可继续传入下一步。')
  }

  const handleGenerateContent = () => {
    setTitleSamples([
      '用数字人内容打造爆款短视频',
      '3个热点选题提升品牌影响力',
      '从行业热点到视频脚本，一站式内容生成',
    ])
    setScriptOutput('本视频将从热点趋势出发，结合产品档案与行业输出一个场景化口播脚本。')
    setAiFlavorRemoved(false)
    message.success('标题与脚本已经重新生成。')
  }

  const handleRemoveAiFlavor = () => {
    setAiFlavorRemoved(true)
    message.success('已优化脚本风格，减少AI痕迹。')
  }

  const stepStatus = workflowSteps.map((item) => ({
    ...item,
    status: item.key < currentStep ? '已完成' : item.key === currentStep ? '进行中' : '待开始',
  }))

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="商户工作台概览" bordered={false} extra={<Button type="primary" onClick={openProductModal}>新增产品档案</Button>}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card type="inner" title="当前项目" extra={<Button type="primary" onClick={handleFetchHotspots}>开始热点抓取</Button>}>
                <Typography.Paragraph>
                  这是一个演示型商户界面，包含配置页与工作流程页，用于展示热点抓取、产品档案、脚本生成、封面生成和视频生成等节点。
                </Typography.Paragraph>
                <Space wrap>
                  <Tag color="blue">当前行业：新媒体推广</Tag>
                  <Tag color="green">项目状态：进行中</Tag>
                  <Tag color="cyan">已选平台：{hotspotPlatforms.join('、')}</Tag>
                </Space>
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
                    <Card title="产品档案管理" type="inner" extra={<Button icon={<PlusOutlined />} onClick={openProductModal}>新增产品</Button>}>
                      <Table columns={productColumns} dataSource={productTableData} pagination={false} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="资产库管理" type="inner">
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                          <Card type="inner" title="数字人管理">
                            上传和删除数字人头像、形象素材
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card type="inner" title="场景管理">
                            管理视频拍摄场景和背景图
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card type="inner" title="音频管理">
                            选择音频素材或自定义上传
                          </Card>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="图片生成" type="inner">
                      <Typography.Paragraph>
                        文生图 / 图生图 功能展示，可选择将生成内容保存到数字人库或场景库。
                      </Typography.Paragraph>
                      <Button type="primary">打开图片生成</Button>
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
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <Typography.Text strong>选择平台：</Typography.Text>
                          <Checkbox.Group
                            options={platformOptions}
                            value={hotspotPlatforms}
                            onChange={(value) => setHotspotPlatforms(value as string[])}
                            style={{ marginLeft: 12 }}
                          />
                        </div>
                        <div>
                          <Typography.Text strong>行业渠道：</Typography.Text>
                          <Checkbox.Group
                            options={channelOptions}
                            value={hotspotChannels}
                            onChange={(value) => setHotspotChannels(value as string[])}
                            style={{ marginLeft: 12 }}
                          />
                        </div>
                        <Button type="primary" onClick={handleFetchHotspots}>批量 Fetch 热点</Button>
                      </Space>
                      <Table columns={[
                        { title: '热点渠道', dataIndex: 'channel', key: 'channel' },
                        { title: '关键词', dataIndex: 'keywords', key: 'keywords' },
                        { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
                      ]} dataSource={hotspotData} style={{ marginTop: 16 }} pagination={false} />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="视频一键提取文字" type="inner">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Input.TextArea
                          rows={4}
                          value={manualText}
                          onChange={(e) => setManualText(e.target.value)}
                          placeholder="粘贴视频台词或内容，让系统提取关键文字"
                        />
                        <Button type="primary" onClick={handleExtractText}>提取文字</Button>
                        <Typography.Paragraph strong>已提取文字：</Typography.Paragraph>
                        <Typography.Paragraph>{extractedText || '提取结果将显示在此处。'}</Typography.Paragraph>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="流程概览" type="inner">
                      <Table
                        columns={[
                          { title: '步骤', dataIndex: 'step', key: 'step' },
                          { title: '说明', dataIndex: 'description', key: 'description' },
                          {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            render: (status: string) => (
                              <Tag color={status === '已完成' ? 'green' : status === '进行中' ? 'blue' : 'default'}>{status}</Tag>
                            ),
                          },
                        ]}
                        dataSource={stepStatus}
                        pagination={false}
                      />
                      <Space style={{ marginTop: 16 }}>
                        <Button
                          icon={<ArrowLeftOutlined />}
                          disabled={currentStep <= 1}
                          onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
                        >
                          上一步
                        </Button>
                        <Button
                          icon={<ArrowRightOutlined />}
                          type="primary"
                          disabled={currentStep >= workflowSteps.length}
                          onClick={() => setCurrentStep((step) => Math.min(workflowSteps.length, step + 1))}
                        >
                          下一步
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="生成标题 & 脚本" type="inner">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button type="primary" onClick={handleGenerateContent}>重新生成标题和脚本</Button>
                        <Typography.Title level={5}>标题候选</Typography.Title>
                        <Space wrap>
                          {titleSamples.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </Space>
                        <Typography.Title level={5}>脚本输出</Typography.Title>
                        <Typography.Paragraph>{scriptOutput}</Typography.Paragraph>
                        <Button onClick={handleRemoveAiFlavor}>AI味消除</Button>
                        {aiFlavorRemoved && <Tag color="processing">已优化脚本风格</Tag>}
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </div>
            ),
          },
        ]} />
      </Card>

      <Modal
        title={editingProduct ? '编辑产品档案' : '新增产品档案'}
        open={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        onOk={() => productForm.submit()}
      >
        <Form form={productForm} layout="vertical" onFinish={handleSubmitProduct} initialValues={{ tags: [] }}>
          <Form.Item name="name" label="产品名称" rules={[{ required: true, message: '请输入产品名称' }]}> 
            <Input placeholder="输入产品名称" />
          </Form.Item>
          <Form.Item name="description" label="描述" rules={[{ required: true, message: '请输入产品描述' }]}> 
            <Input.TextArea rows={3} placeholder="输入产品或业务场景描述" />
          </Form.Item>
          <Form.Item name="tags" label="标签" rules={[{ required: true, message: '请输入至少一个标签' }]}> 
            <Select mode="tags" placeholder="填写标签，如营销、品牌、SaaS" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MerchantDashboard
