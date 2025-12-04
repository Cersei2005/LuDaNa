import React, { useState } from 'react';
import { Card, Form, Select, Input, Slider, Button, Space, message } from 'antd';
import { FireOutlined, MehOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import OutputCard from './OutputCard';
import { generateResponse } from '../lib/aiService';
import './MainInterface.less';

const { Option } = Select;
const { TextArea } = Input;

const MainInterface = () => {
  const [form] = Form.useForm();
  const [spiceLevel, setSpiceLevel] = useState(1);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // 辣度配置
  const spiceLevels = [
    { value: 1, label: '微辣', icon: <MehOutlined />, description: '委婉客气（厅局风）' },
    { value: 2, label: '中辣', icon: <SmileOutlined />, description: '有理有据（硬怼）' },
    { value: 3, label: '爆辣', icon: <FrownOutlined />, description: '阴阳怪气（发疯）' }
  ];

  // 提交表单生成回应
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 调用真实API生成回应
      const result = await generateResponse(values.targetType, values.inputText, spiceLevel);
      setResponse(result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理辣度选择点击事件
  const handleSpiceLevelClick = (level) => {
    setSpiceLevel(level);
  };

  return (
    <Card className="main-interface-card">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="targetType"
          label="对方是谁？"
          rules={[{ required: true, message: '请选择对方身份' }]}
        >
          <Select placeholder="请选择对方身份">
            <Option value="leader">领导</Option>
            <Option value="partner">对象</Option>
            <Option value="relative">亲戚</Option>
            <Option value="debater">杠精</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="inputText"
          label="他说了啥？"
          rules={[{ required: true, message: '请输入对方说的话' }]}
        >
          <TextArea
            rows={3}
            placeholder="比如：领导让我下班后去拿快递"
          />
        </Form.Item>

        <Form.Item
          label="辣度调节器"
          tooltip="调节回应的语气强度"
        >
          <div className="spice-control">
            <div className="spice-slider-container">
              <Slider
                min={1}
                max={3}
                value={spiceLevel}
                onChange={setSpiceLevel}
                marks={{
                  1: '',
                  2: '',
                  3: ''
                }}
                className="spice-slider"
              />
            </div>
            <div className="spice-indicator">
              {spiceLevels.map((level) => (
                <div
                  key={level.value}
                  className={`spice-level ${spiceLevel === level.value ? 'active' : ''}`}
                  onClick={() => handleSpiceLevelClick(level.value)}
                >
                  <div className="spice-icon">{level.icon}</div>
                  <div className="spice-label">{level.label}</div>
                  <div className="spice-description">{level.description}</div>
                </div>
              ))}
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            生成回应
          </Button>
        </Form.Item>
      </Form>

      {response && (
        <OutputCard response={response} />
      )}
    </Card>
  );
};

export default MainInterface;