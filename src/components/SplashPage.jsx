import React from 'react';
import { Flex, Typography } from 'antd';
import './SplashPage.less';

const { Title } = Typography;

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className="mountain-background"></div>
      <div className="agent-character">
        <div className="character-head">
          <div className="character-eyes"></div>
          <div className="character-mouth"></div>
        </div>
        <div className="character-body"></div>
      </div>
      <div className="callout-bubble">
        <Title level={4} style={{ margin: 0, color: '#333' }}>
          遇事不要慌，先整张饼尝尝。
        </Title>
      </div>
      <div className="calligraphy-character">稳</div>
    </div>
  );
};

export default SplashPage;