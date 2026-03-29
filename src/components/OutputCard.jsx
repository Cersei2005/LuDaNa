import React from 'react';
import { Card, Space, Typography, Button } from 'antd';
import { SoundOutlined, FileSyncOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import './OutputCard.less';

const { Title, Text } = Typography;

const OutputCard = ({ response }) => {
  return (
    <Card className="output-card" bordered={false}>
      <div className="response-bubble">
        <div className="bubble-content">
          <Title level={5} style={{ color: '#D32F2F' }}>鲁大拿回应：</Title>
          <Text>{response.text}</Text>
        </div>
      </div>
      
      <div className="subtext-section">
        <Title level={5}>
          <SettingOutlined style={{ marginRight: 8 }} />
          翻译一下：
        </Title>
        <Text type="secondary">{response.explanation}</Text>
      </div>
      
      <Space className="action-buttons" size="middle">
        <Button icon={<SoundOutlined />} size="small">
          听听乡音
        </Button>
        <Button icon={<FileSyncOutlined />} size="small">
          换个口味
        </Button>
        <Button icon={<HeartOutlined />} size="small">
          收藏
        </Button>
      </Space>
    </Card>
  );
};

export default OutputCard;