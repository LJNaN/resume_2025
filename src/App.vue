<template>
  <div class="resume-container">

    <div class="export-controls">
      <button @click="exportToPdf" class="export-btn">导出PDF</button>
    </div>

    <div class="resume-content" id="resume-content">
      <!-- 页1：个人信息+教育经历 -->
      <div class="pdf-page">
        <header class="relative">
          <div class="profile">
            <div class="profile-info">
              <h1 class="p-0 m-0">江南</h1>
              <p class="p-0 m-0">{{ contact.phone }} | {{ contact.email }} | {{ contact.location }}</p>
              <p class="p-0 m-0">{{ contact.experience }} | {{ contact.post }} | {{ contact.gender }} | {{ contact.age
                }}岁</p>
            </div>
            <img :src="head" class="absolute w-25mm right-0 top--20px">
            <img :src="qrcode" class="absolute w-25mm left-0 top--6px">
          </div>
        </header>

        <section class="section mt-40px">
          <h2>教育经历</h2>
          <div class="education-item">
            <div class="edu-header">
              <span class="school sub-title">重庆第二师范学院 全日制本科 学信网可查</span>
              <span class="sub-title date">2018.09 - 2022.06</span>
            </div>
            <p class="detail">物联网工程 数学与信息工程学院</p>
          </div>

          <h2>技术栈/能力</h2>
          <ul class="skills-list">
            <li v-for="(skill, index) in skills" :key="index" class="flex">
              <div class="skills-list-point"></div>
              <span>{{ skill }}</span>
            </li>
          </ul>
        </section>


        <h2>工作经历</h2>
        <div v-for="(job, index) in workExperience.slice(0, 1)" :key="index" class="job-item">
          <div class="job-header">
            <span class="company">{{ job.company }}</span>
            <span class="date">{{ job.period }}</span>
          </div>
          <p class="position">{{ job.position }}</p>

          <!-- 工作详情 -->
          <div v-if="job.details" class="job-details">
            <div v-for="(detail, detailIndex) in job.details" :key="detailIndex" class="detail-section">
              <h4 class="detail-title">{{ detail.title }}</h4>
              <ul class="detail-list">
                <li v-for="(item, itemIndex) in detail.items" :key="itemIndex" class="detail-item flex">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="pdf-page">
        <section class="section">
          <div v-for="(job, index) in workExperience.slice(1)" :key="index" class="job-item">
            <div class="job-header">
              <span class="company">{{ job.company }}</span>
              <span class="date">{{ job.period }}</span>
            </div>
            <p class="position">{{ job.position }}</p>

            <!-- 工作详情 -->
            <div v-if="job.details" class="job-details">
              <div v-for="(detail, detailIndex) in job.details" :key="detailIndex" class="detail-section">
                <h4 class="detail-title">{{ detail.title }}</h4>
                <ul class="detail-list">
                  <li v-for="(item, itemIndex) in detail.items" :key="itemIndex" class="detail-item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>


        <section class="section">
          <h2>其他</h2>
          <div class="other-section">
            <div class="qualification-section">
              <h4 class="sub-section-title">资质证书</h4>
              <ul class="qualification-list">
                <li v-for="(cert, index) in certifications" :key="index" class="qualification-item">
                  {{ cert }}
                </li>
              </ul>
            </div>

            <div class="personal-summary-section">
              <h4 class="sub-section-title">个人简述</h4>
              <div class="personal-summary">
                <p v-for="(item, index) in personalSummary" :key="index" class="summary-item">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { ref } from 'vue'
import head from './assets/4.png'
import qrcode from './assets/3.png'
import { snapdom } from '@zumer/snapdom';
import jsPDF from 'jspdf';

// Get the current instance to access global properties
const instance = getCurrentInstance()
const previewImg = ref<string | null>(null) // 1. 新增

// Export to PDF function
const exportToPdf = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pages = document.querySelectorAll('.pdf-page');
  let previewSet = false;
  for (let i = 0; i < pages.length; i++) {
    const result = await snapdom(pages[i], { scale: 2 });
    const dataUrl = await result.toPng();
    if (!previewSet) {
      previewImg.value = dataUrl; // 只预览第一页
      previewSet = true;
    }
    if (i > 0) pdf.addPage();
    pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
  }
  pdf.save('resume.pdf');
}

const contact = {
  phone: '13527354870',
  email: '495587206@qq.com',
  location: '重庆',
  experience: '4年',
  post: '二、三维前端开发',
  gender: '男',
  age: '26'
}

const skills = [
  '具备团队管理与项目推进能力，能够合理分配任务、组织代码评审、提升团队协作效率。',
  '精通 JavaScript、TypeScript、ES6、CSS3、HTML5，具备丰富的前端项目开发经验。',
  '精通 Vue2/Vue3、Vite、Webpack 等主流前端框架与工具，掌握 VSCode、Cursor 等开发 IDE，能够借助 AI 辅助开发。',
  '精通 Three.js、ECharts 等三维/数据可视化技术，精通大屏与异形屏自适应开发，熟悉 Shader、WebGL，参与 Three.js 官方中文文档翻译。',
  '精通 Photoshop，具备较强的视觉设计能力，能够与设计高效沟通。',
  '掌握 微信小程序开发，独立实现微信登录、支付等功能，具备备案、审核、上线全流程经验。',
  '掌握 前端工程化流程，熟悉CI/CD自动化测试与持续集成，能够搭建高效的前端开发与部署流水线。',
  '掌握 在线协作文档、Git、Apipost、Postman、禅道、蓝湖、磨刀等协作与开发工具，具备良好团队协作经验。',
  '具备 Node.js、Nginx、MySQL 等后端技术基础，能独立完成服务器部署。',
]

const workExperience = [
  {
    company: '重庆双高实业有限公司(国家电网)',
    position: '数据业务线 前端开发组长',
    period: '2024.06 - 至今',
    details: [
      {
        title: '开发组长职责与任务',
        items: [
          '参与原型和 UI 设计评审，讨论 UI 展示、数据来源等系统相关内容及存在的问题',
          '及时提出原型和 UI 评审阶段存在的问题并给出建议，包括地图交互与功能、设计感、字形、热力范围设计等',
          '领导并协调前端开发团队，根据团队成员的技能和项目需求，合理分配工作任务',
          '定期进行代码审核，确保代码质量和一致性，为团队成员提供技术支持和培训'
        ]
      },
      {
        title: '能源大数据管理平台 (ECharts/Three.js)',
        items: [
          '主导 ECharts 组件库二次封装，基于业务场景抽象通用配置模板，实现 8 种标准化图表组件',
          '支持动态数据渲染、主题切换及响应式布局，开发效率提升 35%',
          '通过按需加载、动态注册策略优化组件体积，单图表资源加载耗时降低至 500ms 以内',
          '独立完成 Three.js 三维地图引擎开发，增加辉光、轮廓、RGB、抗锯齿等滤镜和效果',
          '实现省级行政区地形渲染、动态热力图更新及3D模型交互功能，FPS 稳定在60帧以上',
          '独立完成动态水平面的片元着色器制作、三维旋转轮盘、适配 Echarts 地图的自定义内阴影'
        ]
      },
      {
        title: '关键指标看板 (H5/IE11)',
        items: [
          '支持 PC 端、移动端 (H5) 以及 IE11 浏览器，采用 Vue 2.7 版本进行开发',
          '实施按需加载策略，控制每个页面的图表数量以保证 IE 浏览器和移动端的使用体验',
          '权限细分与后端系统协同，实施四级目录的权限控制',
          '严格执行上线流程，确保项目成功上架至国家电网的内网环境中'
        ]
      }
    ]
  },
  {
    company: '重庆瞰图科技有限公司',
    position: '数字孪生二、三维 前端开发',
    period: '2022.03 - 2024.05',
    details: [
      {
        title: '主要项目与成果',
        items: [
          '负责数字孪生项目的前端开发，使用 Three.js 构建三维可视化场景',
          '开发多个大屏可视化项目，实现数据实时展示和交互功能',
          '参与智慧城市、智慧园区等项目的前端架构设计和开发',
          '优化三维渲染性能，提升用户体验和系统稳定性'
        ]
      }
    ]
  }
]



const certifications = [
  '软件设计师(中级)'
]

const personalSummary = [
  '没闯过祸，言行有度，谨言慎行；性格开朗，能高效地与同事沟通交流，提升团队积极性；',
  '能提前意识到项目的痛点难点，并与上级积极沟通；喜欢探索新兴技术并用以实践。'
]
</script>

<style scoped lang="less">
* {
  font-family: 'OPPO Sans 4.0';
}

.resume-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  flex-direction: column;
}

.resume-content {
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8mm;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-info h1 {
  display: flex;
  justify-self: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 10px;
  margin-left: 10px;
}

.profile-info p {
  display: flex;
  justify-self: center;
  font-weight: 500;
  font-size: 12px;
}

.section {
  margin-bottom: 10px;
}

h2 {
  font-size: 14px;
  border-bottom: 2px solid #6c6c6c;
  padding-bottom: 2px;
  margin-bottom: 8px;
  margin-top: 0;
}

.education-item,
.job-item {
  margin-bottom: 15px;
}

.edu-header,
.job-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.skills-list {
  padding: 0;
  margin: 0 0 0 4px;
}

.skills-list li {
  margin-bottom: 4px;
  position: relative;
  padding-left: 12px;
  list-style: none;
  font-size: 12px;
}

.skills-list-point {
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  background: black;
  border-radius: 4px;
}

.profile-image {
  position: absolute;
  width: 80px;
  right: 0px;
  top: -14px;
  border-radius: 8px;
  overflow: hidden;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sub-title {
  font-size: 12px;
}

.date {
  font-weight: 400;
  font-size: 12px;
}


.detail {
  font-size: 12px;
  margin: 4px 0;
}

.company {
  font-size: 12px;
}

.position {
  font-size: 12px;
}

.export-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}


.export-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.export-btn::before {
  content: '📄';
  font-size: 16px;
}

.export-btn:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
  transform: translateY(-2px);
}

.export-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

/* 工作经历详情样式 */
.job-details {
  margin-top: 10px;
  padding-left: 10px;
}

.detail-section {
  margin-bottom: 15px;
}

.detail-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin: 8px 0 5px 0;
  border-left: 3px solid #007bff;
  padding-left: 8px;
}

.detail-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail-item {
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 3px;
  padding-left: 12px;
  position: relative;
}



/* 自我评价样式 */
.self-evaluation {
  padding: 0 10px;
}

.evaluation-item {
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;
  text-align: justify;
  text-indent: 2em;
}

/* 其他部分样式 */
.other-section {
  padding: 0 10px;
}

.qualification-section,
.personal-summary-section {
  margin-bottom: 15px;
}

.sub-section-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin: 8px 0 5px 0;
  border-left: 3px solid #28a745;
  padding-left: 8px;
}

.qualification-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.qualification-item {
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 3px;
  padding-left: 12px;
  position: relative;
}

.personal-summary {
  padding: 0;
}

.summary-item {
  padding-left: 12px;
  font-size: 12px;
}

/* PDF导出专用样式 */
.pdf-export-mode {
  /* 设置内容区域的内边距，这将成为PDF的实际边距 */
  padding: 20mm !important;
  border: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  background: white !important;
  min-height: auto !important;
  width: 210mm !important;
  /* A4宽度 */
  max-width: none !important;
  position: relative !important;
  transform: none !important;
  left: 0 !important;
  top: 0 !important;
  overflow: visible !important;
  /* 确保内容不会被截断 */
  height: auto !important;
}

.pdf-export-mode .profile-image {
  position: absolute;
  width: 90px !important;
  /* 在PDF模式下，right和top是相对于容器内边距的，所以需要调整 */
  right: 30px !important;
  /* 相对于内容区域的右边距 */
  top: 30px !important;
  /* 相对于内容区域的上边距 */
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.pdf-export-mode .detail-title {
  border-left: 2px solid #333 !important;
}

.pdf-export-mode .sub-section-title {
  border-left: 2px solid #333 !important;
}


.pdf-page {
  margin-bottom: 20mm;
  border: 1px solid #0004;
  box-shadow: 1mm 1mm 2mm #0004;
  width: 210mm;
  min-height: 297mm;
  height: 297mm;
  box-sizing: border-box;
  page-break-after: always;
  background: white;
  padding: 20mm;
  overflow: hidden;
  position: relative;
}
</style>