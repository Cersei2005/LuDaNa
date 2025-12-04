import { v4 as uuidv4 } from 'uuid';

// 阿里云DashScope API配置
const DASHSCOPE_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const API_KEY = 'sk-d6adfc69f7a642b4bd0eb9fe79c25836';

// 角色人设定义
const AGENT_PERSONAS = {
  leader: {
    name: '厅里厅气模式',
    description: '高情商·考公版',
    prompt: '你是一个情商很高的山东籍公务员，名叫鲁大拿。面对领导时，你需要：1. 先肯定对方的观点 2. 委婉地提出困难 3. 给出折中解决方案 4. 再次赞美对方。请以这种风格回应以下内容：'
  },
  partner: {
    name: '浩克热情模式',
    description: '安慰·暖男版',
    prompt: '你是一个热情贴心的山东大汉，名叫鲁大拿。面对朋友倾诉时，你需要：1. 表现出极大的关心和同情 2. 用夸张但温暖的语言安慰对方 3. 提供实际可行的建议 4. 表达无条件支持。请以这种风格回应以下内容：'
  },
  relative: {
    name: '阴阳倒装模式',
    description: '骂人·发疯版',
    prompt: '你是一个直爽幽默的山东大汉，名叫鲁大拿。面对亲戚催婚等无理要求时，你需要：1. 使用山东方言和倒装句 2. 带点阴阳怪气但不脏话 3. 用歇后语或比喻巧妙回击 4. 保持幽默感。请以这种风格回应以下内容：'
  },
  debater: {
    name: '硬核大葱模式',
    description: '硬怼·直爽版',
    prompt: '你是一个逻辑严谨的山东硬汉，名叫鲁大拿。面对杠精时，你需要：1. 直接指出逻辑漏洞 2. 用事实和道理反驳 3. 保持不卑不亢的态度 4. 必要时使用山东俗语增强说服力。请以这种风格回应以下内容：'
  }
};

// 辣度风格定义
const SPICE_LEVELS = {
  1: {
    name: '微辣',
    description: '委婉客气（厅局风）',
    temperature: 0.3
  },
  2: {
    name: '中辣',
    description: '有理有据（硬怼）',
    temperature: 0.6
  },
  3: {
    name: '爆辣',
    description: '阴阳怪气（发疯）',
    temperature: 0.9
  }
};

/**
 * 调用阿里云DashScope API生成回应
 * @param {string} targetType - 对象类型 (leader/partner/relative/debater)
 * @param {string} inputText - 输入文本
 * @param {number} spiceLevel - 辣度等级 (1/2/3)
 * @returns {Promise<Object>} API响应结果
 */
export const generateResponse = async (targetType, inputText, spiceLevel) => {
  try {
    // 获取角色人设
    const persona = AGENT_PERSONAS[targetType];
    if (!persona) {
      throw new Error('未知的角色类型');
    }

    // 获取辣度配置
    const spice = SPICE_LEVELS[spiceLevel];
    if (!spice) {
      throw new Error('未知的辣度等级');
    }

    // 构造提示词
    const prompt = `${persona.prompt}\n\n"${inputText}"\n\n请直接给出回应，不需要额外解释。`;

    // 构造请求体
    const requestBody = {
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content: '你是一个具有山东特色的拟人化Agent，名叫鲁大拿。你需要根据不同的对话对象和语气要求，生成符合山东文化特色的回应。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: spice.temperature,
      max_tokens: 500,
      top_p: 0.8,
      repetition_penalty: 1.1
    };

    // 调用API
    const response = await fetch(DASHSCOPE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify(requestBody)
    });

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // 解析响应
    const data = await response.json();
    
    // 检查是否有错误
    if (data.error) {
      throw new Error(`API返回错误: ${data.error.message}`);
    }

    // 提取生成的文本
    const generatedText = data.choices?.[0]?.message?.content?.trim();
    if (!generatedText) {
      throw new Error('API未返回有效内容');
    }

    // 生成潜台词解释（使用另一个API调用）
    const explanation = await generateExplanation(targetType, inputText, generatedText);

    // 返回结果
    return {
      id: uuidv4(),
      input: inputText,
      target: targetType,
      targetName: persona.name,
      spice: spice.name,
      spiceDescription: spice.description,
      text: generatedText,
      explanation: explanation
    };
  } catch (error) {
    console.error('生成回应时出错:', error);
    throw new Error(`生成回应失败: ${error.message}`);
  }
};

/**
 * 生成潜台词解释
 * @param {string} targetType - 对象类型
 * @param {string} inputText - 输入文本
 * @param {string} responseText - 生成的回应
 * @returns {Promise<string>} 解释文本
 */
const generateExplanation = async (targetType, inputText, responseText) => {
  try {
    const persona = AGENT_PERSONAS[targetType];
    const explanationPrompt = `你是一个沟通专家，请分析以下山东籍Agent的回应。请用简洁明了的语言解释：
1. 这段回应使用了什么沟通技巧
2. 背后想表达的真实意图是什么
3. 为什么这样回应比较合适

Agent回应: "${responseText}"

请直接给出分析结果，不需要额外解释。`;

    const requestBody = {
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content: '你是一个沟通分析专家，擅长解析人际交往中的潜台词和沟通技巧。'
        },
        {
          role: 'user',
          content: explanationPrompt
        }
      ],
      temperature: 0.5,
      max_tokens: 300,
      top_p: 0.8,
      repetition_penalty: 1.1
    };

    const response = await fetch(DASHSCOPE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      return '暂无分析内容';
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '暂无分析内容';
  } catch (error) {
    console.error('生成解释时出错:', error);
    return '暂无分析内容';
  }
};

export default { generateResponse };