import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

// 配置 Ant Design 主题色
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4CAF50', // 大葱绿
          colorError: '#D32F2F',   // 高粱红
          colorBgBase: '#F5F5DC',  // 黄河土
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);