<template>
  <div class="resume-container">
    <!-- PDF Export Button -->
    <div class="export-controls">
      <button @click="exportToPdf" class="export-btn">导出PDF</button>
    </div>

    <!-- Resume Content for PDF Export -->
    <div class="resume-content">
      <div id="pdfDom">
        <header class="relative">
          <div class="profile">
            <div class="profile-info">
              <h1 class="p-0 m-0">江南</h1>
              <p class="p-0 m-0">{{ contact.phone }} | {{ contact.email }} | {{ contact.location }}</p>
              <p class="p-0 m-0">{{ contact.wechat }} | {{ contact.experience }} | {{ contact.gender }}</p>
            </div>
            <div class="profile-image ">
              <img :src="head" alt="">
            </div>
          </div>
        </header>
  
        <section class="section">
          <h2>教育经历</h2>
          <div class="education-item">
            <div class="edu-header">
              <span class="school sub-title">重庆第二师范学院 本科</span>
              <span class="sub-title date">2018.09</span>
            </div>
            <p class="detail">物联网工程 数学与信息工程学院</p>
          </div>
        </section>
  
        <section class="section">
          <h2>技术栈</h2>
          <ul class="skills-list">
            <li v-for="(skill, index) in skills" :key="index" class="flex">
              <div class="skills-list-point"></div>
              <span>{{ skill }}</span>
            </li>
          </ul>
        </section>
  
  
        <section class="section">
          <h2>工作经历</h2>
          <div v-for="(job, index) in workExperience" :key="index" class="job-item">
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
          <h2>项目经历</h2>
          <div v-for="(project, index) in projects" :key="index" class="job-item">
            <div class="job-header">
              <span class="company">{{ project.name }}</span>
              <span class="date">{{ project.period }}</span>
            </div>
            <p class="position">{{ project.role }} | {{ project.tech }}</p>
  
            <div class="job-details">
              <ul class="detail-list">
                <li v-for="(desc, descIndex) in project.description" :key="descIndex" class="detail-item">
                  {{ desc }}
                </li>
              </ul>
            </div>
          </div>
        </section>
  
        <section class="section">
          <h2>自我评价</h2>
          <div class="self-evaluation">
            <p v-for="(item, index) in selfEvaluation" :key="index" class="evaluation-item">
              {{ item }}
            </p>
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
import head from './assets/4.png'

// Get the current instance to access global properties
const instance = getCurrentInstance()

// Export to PDF function
const exportToPdf = async () => {
  try {
    const pdfElement = document.querySelector('#pdfDom')
    const containerElement = document.querySelector('.resume-container')

    if (!pdfElement) {
      console.error('PDF element not found')
      return
    }

    // 保存原始样式
    const originalContainerStyle = containerElement?.style.cssText || ''
    const originalElementStyle = pdfElement.style.cssText || ''

    // 临时移除容器的padding和margin，确保PDF只包含内容
    if (containerElement) {
      containerElement.style.padding = '0'
      containerElement.style.margin = '0'
      containerElement.style.background = 'white'
    }

    // 临时添加PDF导出样式
    pdfElement.classList.add('pdf-export-mode')
    pdfElement.style.margin = '0'
    pdfElement.style.transform = 'none'

    // 等待样式应用
    await new Promise(resolve => setTimeout(resolve, 100))

    if (instance?.appContext.app.config.globalProperties.$getPdf) {
      await instance.appContext.app.config.globalProperties.$getPdf('江南-简历', '#pdfDom')
      console.log('PDF exported successfully')
    } else {
      console.error('PDF export function not available')
    }

    // 恢复原始样式
    if (containerElement) {
      containerElement.style.cssText = originalContainerStyle
    }
    pdfElement.style.cssText = originalElementStyle
    pdfElement.classList.remove('pdf-export-mode')

  } catch (error) {
    console.error('Error exporting PDF:', error)
    // 确保在出错时也恢复样式
    const pdfElement = document.querySelector('#pdfDom')
    const containerElement = document.querySelector('.resume-container')

    if (pdfElement) {
      pdfElement.classList.remove('pdf-export-mode')
      pdfElement.style.cssText = ''
    }
    if (containerElement) {
      containerElement.style.cssText = ''
    }
  }
}

const contact = {
  phone: '13527354870',
  email: '495587206@qq.com',
  location: '重庆',
  wechat: '微信同号',
  experience: '二、三维前端开发',
  gender: '男'
}

const skills = [
  '精通 Javascript、Ts、ES6、CSS3(less/scss)、HTML5，有多个前端项目开发经验；',
  '精通 Threejs、Echarts 等三维数字孪生可视化技术，精通对大屏、异形屏的前端自适应分辨率开发，熟悉 shader、webGL。参与翻译Three.js中文文档；',
  '精通 Vue2/3、Vite、Webpack、VSCode 等前端常用工具、技术与脚手架；',
  '精通 Class 类与面向对象的前端开发模式，掌握函数式编程与面向对象编程等开发模式；',
  '熟练掌握 微信小程序，开发过包含微信登录、微信支付等功能的应用，并独立备案、提交审查、部署上线；',
  '熟练掌握 async + await、Promise、回调等同步与异步请求思想与处理能力，保证代码可读性；',
  '熟练掌握 Git、CI/CD、Linker、禅道、apipost、postman、蓝湖、磨刀等工具，有协同合作经验；',
  '熟练掌握 Node.js、Nginx、MySQL，独立部署过服务器，对后端有一定了解；',
  '熟悉用户体验、交互操作流程、及用户需求；',
  'PS专精。'
]

const workExperience = [
  {
    company: '重庆双高实业有限公司',
    position: '数据业务线 前端开发组长',
    period: '2024.06 - 至今',
    details: [
      {
        title: '角色职责与任务',
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
        title: '关键指标看板',
        items: [
          '支持 PC 端、移动端（H5）以及 IE11 浏览器，采用 Vue 2.7 版本进行开发',
          '实施按需加载策略，控制每个页面的图表数量以保证 IE 浏览器和移动端的使用体验',
          '权限细分与后端系统协同，实施四级目录的权限控制',
          '严格执行上线流程，确保项目成功上架至国家电网的内网环境中'
        ]
      }
    ]
  },
  {
    company: '重庆驰图科技有限公司',
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

const projects = [
  {
    name: '能源大数据管理平台',
    period: '2024.06 - 2024.12',
    role: '前端负责人',
    tech: 'Vue3 + TypeScript + Three.js + ECharts',
    description: [
      '负责整体前端架构设计，采用微前端架构，支持多团队协同开发',
      '开发三维地理信息可视化系统，实现省级行政区地形渲染和动态热力图',
      '封装 ECharts 组件库，提供 8 种标准化图表组件，开发效率提升 35%',
      '实现多端适配（PC/移动端/IE11），保证良好的用户体验'
    ]
  },
  {
    name: '智慧园区数字孪生平台',
    period: '2023.03 - 2024.05',
    role: '核心开发者',
    tech: 'Vue2 + Three.js + WebGL + Node.js',
    description: [
      '构建园区三维场景，包含建筑物、设备、人员等要素的实时渲染',
      '开发设备监控模块，实现传感器数据的实时可视化展示',
      '优化渲染性能，通过 LOD 技术和实例化渲染，FPS 稳定在 60 帧',
      '集成物联网数据，实现数字孪生与现实世界的数据同步'
    ]
  },
  {
    name: '城市交通大屏可视化系统',
    period: '2022.08 - 2023.02',
    role: '前端开发',
    tech: 'Vue2 + ECharts + Canvas + WebSocket',
    description: [
      '开发城市交通流量实时监控大屏，支持多种图表类型和动画效果',
      '实现地图热力图展示，直观显示城市各区域交通拥堵情况',
      '通过 WebSocket 实现数据实时更新，延迟控制在 100ms 以内',
      '适配多种分辨率大屏设备，支持 4K 显示和异形屏幕'
    ]
  }
]

const selfEvaluation = [
  '具有扎实的前端技术基础和丰富的项目经验，熟练掌握现代前端开发技术栈，能够独立完成复杂项目的架构设计和开发。',
  '在三维可视化和数据可视化领域有深入研究，具备优秀的性能优化能力，能够处理大数据量的实时渲染需求。',
  '具有良好的团队协作能力和技术领导力，能够带领团队完成高质量的项目交付，注重代码质量和开发规范。',
  '学习能力强，对新技术保持敏感度，能够快速掌握并应用到实际项目中，持续提升技术水平和业务理解能力。'
]

const certifications = [
  '软件设计师（中级）'
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
  align-items: flex-start;
  min-height: 100vh;
  background: #f5f5f5;
}

.resume-content {
  /* A4纸比例：210mm × 297mm，约等于 1:1.414 */
  width: 210mm;
  min-height: 297mm;
  max-width: 90vw;
  /* 在小屏幕上限制最大宽度 */
  border: 2px solid #333;
  padding: 20mm;
  /* 使用mm单位更符合A4纸张 */
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* 确保内容不会超出A4比例 */
  box-sizing: border-box;
  overflow: hidden;
}


header {
  margin-bottom: 30px;
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
  font-size: 11px;
  line-height: 1.4;
  margin-bottom: 3px;
  padding-left: 12px;
  position: relative;
}

.detail-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #666;
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

.qualification-item::before {
  content: '🏆';
  position: absolute;
  left: 0;
  font-size: 10px;
}

.personal-summary {
  padding: 0;
}

.summary-item {
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 6px;
  text-align: justify;
  text-indent: 2em;
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
  width: 210mm !important; /* A4宽度 */
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
  right: 30px !important; /* 相对于内容区域的右边距 */
  top: 30px !important;   /* 相对于内容区域的上边距 */
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.pdf-export-mode .detail-title {
  border-left: 2px solid #333 !important;
}

.pdf-export-mode .sub-section-title {
  border-left: 2px solid #333 !important;
}

/* A4纸张预览模式样式 */
.resume-content {
  /* 添加阴影效果，模拟纸张 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05);
}

</style>