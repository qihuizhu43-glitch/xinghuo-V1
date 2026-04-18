import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd'
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'
import MerchantDashboard from './pages/merchant/MerchantDashboard'

const { Header, Content, Footer, Sider } = Layout

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">星火自媒体工作台</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['merchant']} items={[
          { key: 'merchant', label: <Link to="/merchant">商户界面</Link> },
          { key: 'admin', label: <Link to="/admin">超级管理员</Link> },
        ]} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Routes>
              <Route path="/merchant" element={<MerchantDashboard />} />
              <Route path="/admin" element={<SuperAdminDashboard />} />
              <Route path="/" element={<Navigate to="/merchant" replace />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>星火自媒体工作台 ©2026</Footer>
      </Layout>
    </Layout>
  )
}

export default App
