/*
  # Create responses table for鲁大拿 Agent

  1. New Tables
    - `responses_59015`
      - `id` (primary key, uuid)
      - `input_text` (text, not null) - 用户输入的话术
      - `target_type` (text, not null) - 对象类型（领导/对象/亲戚/杠精）
      - `spice_level` (text, not null) - 辣度等级（微辣/中辣/爆辣）
      - `response_text` (text, not null) - 生成的回应
      - `subtext_explanation` (text) - 潜台词解释
      - `created_at` (timestamp with time zone, default now())

  2. Purpose
    - 存储用户输入与Agent生成的回应历史
    - 支持"换个口味"功能的实现
    - 为后续分析用户提供数据基础
*/

CREATE TABLE IF NOT EXISTS responses_59015 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text text NOT NULL,
  target_type text NOT NULL,
  spice_level text NOT NULL,
  response_text text NOT NULL,
  subtext_explanation text,
  created_at timestamptz DEFAULT now()
);