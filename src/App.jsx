import React, { useState } from 'react';
import { Layout, Typography, Card, Space } from 'antd';
import SplashPage from './components/SplashPage';
import MainInterface from './components/MainInterface';
import './App.less';

const { Header, Content } = Layout;

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // 模拟启动页结束后显示主界面
  setTimeout(() => {
    setShowSplash(false);
  }, 3000);

  return (
    <Layout className="app-layout">
      {showSplash ? (
        <SplashPage />
      ) : (
        <>
          <Header className="app-header">
            <Typography.Title level={3} style={{ color: 'white', margin: 0 }} className="calligraphy-title">
              鲁大拿 / 山东老表
            </Typography.Title>
            <div className="agent-status">正在考公中...</div>
          </Header>
          <Content className="app-content">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card className="welcome-card">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  遇事不要慌，先整张饼尝尝。
                </Typography.Title>
                <Typography.Text type="secondary">
                  专治各种不会说话，主打一个心里有数。
                </Typography.Text>
              </Card>
              <MainInterface />
            </Space>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default App;