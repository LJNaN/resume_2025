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
            <div v-for="(detail, detailIndex) in job.details.slice(0, 3)" :key="detailIndex" class="detail-section">
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

        <!-- 衔接上一页 -->
        <div v-for="(job, index) in workExperience.slice(0, 1)" :key="index" class="job-item">
          <!-- 工作详情 -->
          <div v-if="job.details" class="job-details">
            <div v-for="(detail, detailIndex) in job.details.slice(3)" :key="detailIndex" class="detail-section">
              <h4 class="detail-title">{{ detail.title }}</h4>
              <ul class="detail-list">
                <li v-for="(item, itemIndex) in detail.items" :key="itemIndex" class="detail-item flex">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
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
              <h4 class="sub-section-title">资质/荣誉</h4>
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
import head from './assets/4.png'
import qrcode from './assets/3.png'
import { snapdom } from '@zumer/snapdom';
import jsPDF from 'jspdf';

// Export to PDF function
const exportToPdf = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pages: any = document.querySelectorAll('.pdf-page');
  let previewSet = false;
  for (let i = 0; i < pages.length; i++) {
    // 降低 scale
    const result = await snapdom(pages[i], { scale: 2 });
    // 用 JPEG 格式，设置压缩质量
    const dataUrl = await result.toJpg(); // 0.7 可调
    if (!previewSet) {
      previewSet = true;
    }
    if (i > 0) pdf.addPage();
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);
  }
  pdf.save('江南-前端工程师-4年.pdf');
}

const contact = {
  phone: '13527354870',
  email: '495587206@qq.com',
  location: '重庆',
  experience: '4年经验',
  post: '二、三维前端开发',
  gender: '男',
  age: '26'
}

const skills = [
  '具备团队管理与项目推进能力，能够合理分配任务、组织代码评审、提升团队协作效率',
  '精通 JavaScript、TypeScript、ES6、CSS3、HTML5，具备丰富的前端项目开发经验',
  '精通 Vue2/Vue3、Vite、Webpack 等主流前端框架与工具，掌握 Cursor 等开发 IDE，能够借助 AI 辅助开发',
  '精通 Three.js、ECharts、动效 等三维/数据可视化技术，精通大屏与异形屏自适应开发，熟悉 Shader、WebGL，参与 Three.js 官方中文文档翻译',
  '精通 Photoshop，具备较强的视觉设计能力，能够与设计高效沟通',
  '掌握 微信小程序开发，独立实现微信登录、支付等功能，具备备案、审核、上线全流程经验',
  '掌握 前端工程化流程，熟悉CI/CD自动化测试与持续集成，能够搭建高效的前端开发与部署流水线',
  '掌握 在线协作文档、Git、Apipost、Postman、禅道、蓝湖、墨刀等协作与开发工具，具备良好团队协作经验',
  '具备 Node.js、Nginx、MySQL 等后端技术基础，能独立完成服务器部署',
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
          '理解项目业务需求，根据实际业务改造公司现有前端框架，实现前端框架定制化、精简化，降低同事学习成本，提升协同开发效率 15%，bug 率降低 15%',
          '开展技能分享交流会，分享动效、三维效果、数据可视化等技术，参会研发人员45人',
          '参与原型和 UI 设计评审，讨论 UI 展示、数据来源等系统相关内容及存在的问题',
          '及时提出原型和 UI 评审阶段存在的问题并给出建议，包括地图交互与功能、设计感、字形、热力范围设计等',
          '领导并协调前端开发团队，根据团队成员的技能和项目需求，合理分配工作任务',
          '定期进行代码审核，确保代码质量和一致性，为团队成员提供技术支持和培训'
        ]
      },
      {
        title: '能源大数据管理平台 (ECharts/Three.js/可视化大屏)',
        items: [
          '主导 ECharts 组件库二次封装，基于业务场景抽象通用配置模板，实现 8 种标准化图表组件',
          '支持动态数据渲染、主题切换及响应式布局，开发效率提升 35%',
          '通过按需加载、动态注册策略优化组件体积，单图表资源加载耗时降低至 500ms 以内',
          '独立完成 Three.js 三维地图引擎开发，增加辉光、轮廓、RGB、抗锯齿等滤镜和效果',
          '实现省级行政区地形渲染、动态热力图更新及3D模型交互功能，FPS 稳定在60帧以上',
          '独立完成动态水平面的片元着色器制作、三维旋转轮盘，制作 Echarts 官方未支持的地图自定义内阴影'
        ]
      },
      {
        title: '关键指标看板 (H5/IE11)',
        items: [
          '支持 PC 端、移动端 (H5) ，兼容 IE11 浏览器，采用 Vue 2.7 版本进行开发',
          '实施按需加载策略，控制每个页面的图表数量以保证 IE 浏览器和移动端的使用体验，所有组件均采用自适应设计，确保移动端用户有充足的安全区。兼顾键鼠与移动端的操作习惯，提升用户体验',
          '权限细分与后端系统协同，实施四级目录的权限控制,允许在后台灵活配置每个四级目录的权限指标',
          '严格执行 「提交测试、修复问题、进行回归测试、审核通过、正式上线、上线后测试、发布上线」 的流程上线，确保项目成功上架至国家电网的内网环境中'
        ]
      },
      {
        title: '数据底座 (数据中台/系统安全)',
        items: [
          '基于 Vue3、Vite、Pinia、Vue Router 搭建数据中台，涵盖数据接入、处理、分析与可视化',
          '负责系统安全架构设计，严格落实用户敏感操作二次鉴权、细粒度角色权限分配、安全审计、异常告警、数据加密与备份等多项安全机制，全面覆盖系统级与业务级安全事件',
          '使用 session、token、authorization、请求加签、数据加密等技术形成组合拳，极大增加系统安全性，系统通过电科院、国网信通部、国网大数据中心等权威机构的安全测评，满足数据传输完整性、会话管理、并发控制、CSRF防护、敏感信息保护等合规要求，有效防范明文传输、上传漏洞、信息泄露、设计缺陷等安全风险',
          '实现敏感操作二次鉴权、业务配置员权限精细化管控，支持 API 接口全流程管理 (上传、申请、审批、调用) ，并监控调用次数、频率与结果',
        ]
      }
    ]
  },
  {
    company: '重庆瞰图科技有限公司',
    position: '前端开发 (数字孪生方向)',
    period: '2022.08 - 2024.04',
    details: [
      {
        title: '石油管道项目 (Three.js)',
        items: [
          '动态生成：利用 Canvas 批量动态生成油罐编号图像，附加于油罐上',
          '管道关系图：通过图结构生成管道关系图，使用广度优先搜索 (BFS) 算法实现自动查找管道线路的功能',
          '管道类设计：继承网格类，创建管道类，提供 set/get 方法以快速实现业务需求',
          '动态效果：编写管道 Shader，呈现流动状态下的动态效果'
        ]
      },
      {
        title: '实时的仓库搬运系统项目 (Three.js)',
        items: [
          '接口对接：对接甲方的 WebSocket 和 HTTP 接口，模型实时响应数据变化 (动画、移动、状态更新等) ',
          '性能优化：对场景中的重复模型进行实例化和网格合并，显著提升渲染性能',
          '二维页面开发：独立完成项目看板及二维页面设计，使用 Echarts 图表 (饼图、折线图等) ，优化二、三维兼容性和路由设计',
          '时间回溯系统：开发时间回溯功能，选择时间段查看搬运情况，支持倍速、进度条、终止和重复等选项'
        ]
      },
      {
        title: '含底图的模型展示项目 (Cesium)',
        items: [
          '地图集成：集成高德、腾讯、天地图、谷歌、必应等多种地图源，支持实时切换与自定义图层显示/隐藏',
          '模型导入：将客户模型导入指定经纬度，支持交互点击、自定义弹窗和高亮功能。支持导入 GLB 模型、倾斜摄影、点云、地形及流动管线等',
          '视觉美化：整体项目滤镜美化，实时调整天气效果 (晴、雨、雪) ，并更新模型的 PBR 材质，提升真实感',
          '测量功能：支持量算与测绘功能，允许用户点击画线、面以量算距离、面积及等高线等'
        ]
      }
    ]
  }
]



const certifications = [
  '计算机技术与软件专业技术资格 (软件设计师 中级)',
  '大学学院奖学金 (三等)',
  '大学学院Web应用技术比赛 (第一)'
]

const personalSummary = [
  '没闯过祸，言行有度，谨言慎行，性格开朗，能高效地与同事沟通交流，提升团队积极性',
  '能提前意识到项目的痛点难点，并与上级积极沟通，喜欢探索新兴技术并用以实践'
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
  display: flex;
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