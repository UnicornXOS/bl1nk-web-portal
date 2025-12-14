import { AgentProfile } from "@/components/AgentCard";

export const agentSkillsData: AgentProfile[] = [
  {
    Agent_Profile: "AI_Systems_Architect",
    Agent_ID: "ASA-001",
    Track: "Builder",
    Skills: [
      {
        Skill_Name: "Architecture_Blueprint_Generator",
        Skill_ID: "ASA-001-T1",
        Parameters: [
          {
            Param_Name: "requirements",
            Data_Type: "Text",
            Scope_Format: '"A microservices system for e-commerce"',
            Description: "ใส่ข้อกำหนดทางธุรกิจหรือฟังก์ชันที่ระบบต้องทำได้",
          },
          {
            Param_Name: "constraints",
            Data_Type: "Text",
            Scope_Format: '"Budget < $5k/month, Must use AWS"',
            Description: "ใส่ข้อจำกัดต่างๆ เช่น งบประมาณ, เทคโนโลยีที่บังคับใช้",
          },
          {
            Param_Name: "scale_metrics",
            Data_Type: "Text",
            Scope_Format: '"1000 rps, 1M users, 1TB data"',
            Description: "ใส่ตัวเลขที่คาดการณ์ไว้เพื่อประเมินการขยายตัวของระบบ",
          },
          {
            Param_Name: "Design_Pattern_Selection",
            Data_Type: "Select",
            Scope_Format: "[Microservices, Serverless, Monolith]",
            Description: "เลือกรูปแบบสถาปัตยกรรมหลักที่ต้องการใช้ในการออกแบบ",
          },
        ],
      },
      {
        Skill_Name: "Model_Orchestration_Engine",
        Skill_ID: "ASA-001-T2",
        Parameters: [
          {
            Param_Name: "model_specs",
            Data_Type: "Text",
            Scope_Format: '"BERT-base, ResNet50"',
            Description: "ใส่ชื่อหรือรายละเอียดของโมเดล AI ที่จะนำมาใช้งาน",
          },
          {
            Param_Name: "performance_criteria",
            Data_Type: "Text",
            Scope_Format: '"Accuracy > 95%, Latency < 200ms"',
            Description: "ใส่เกณฑ์ที่ต้องการใช้วัดประสิทธิภาพของโมเดล",
          },
          {
            Param_Name: "latency_requirements",
            Data_Type: "Number",
            Scope_Format: "Range: 1-1000, Unit: ms",
            Description: "กำหนดเวลาตอบสนองสูงสุดที่ยอมรับได้ (หน่วยเป็นมิลลิวินาที)",
          },
        ],
      },
      {
        Skill_Name: "Scalability_Assessment_Suite",
        Skill_ID: "ASA-001-T3",
        Parameters: [
          {
            Param_Name: "load_test_scenario",
            Data_Type: "Text",
            Scope_Format: '"Simulate 1000 concurrent users for 5 minutes"',
            Description: "รายละเอียดสถานการณ์การทดสอบโหลด",
          },
          {
            Param_Name: "target_latency",
            Data_Type: "Number",
            Scope_Format: "Unit: ms",
            Description: "เวลาแฝงสูงสุดที่ยอมรับได้",
          },
        ],
      },
      {
        Skill_Name: "Integration_Validator",
        Skill_ID: "ASA-001-T4",
        Parameters: [
          {
            Param_Name: "api_endpoint",
            Data_Type: "Text",
            Scope_Format: "URL of the API endpoint",
            Description: "URL ของ API ที่ต้องการตรวจสอบ",
          },
          {
            Param_Name: "expected_response",
            Data_Type: "Text",
            Scope_Format: "JSON or XML structure",
            Description: "โครงสร้างการตอบสนองที่คาดหวังจาก API",
          },
        ],
      },
    ],
  },
  {
    Agent_Profile: "Full_Stack_Engineer",
    Agent_ID: "FSE-002",
    Track: "Builder",
    Skills: [
      {
        Skill_Name: "Full_Stack_Code_Generator",
        Skill_ID: "FSE-002-T1",
        Parameters: [
          {
            Param_Name: "project_type",
            Data_Type: "Select",
            Scope_Format: "[Web Application, Mobile Application, API Service]",
            Description: "เลือกประเภทของโปรเจกต์ที่ต้องการสร้าง",
          },
          {
            Param_Name: "frontend_framework",
            Data_Type: "Select",
            Scope_Format: "[React, Vue, Angular, Svelte]",
            Description: "เลือกเฟรมเวิร์กสำหรับส่วน Frontend",
          },
          {
            Param_Name: "backend_framework",
            Data_Type: "Select",
            Scope_Format: "[Node.js (Express), Python (Django/Flask), Go (Gin)]",
            Description: "เลือกเฟรมเวิร์กสำหรับส่วน Backend",
          },
          {
            Param_Name: "database_type",
            Data_Type: "Select",
            Scope_Format: "[PostgreSQL, MongoDB, MySQL, SQLite]",
            Description: "เลือกประเภทของฐานข้อมูลที่ต้องการใช้",
          },
        ],
      },
      {
        Skill_Name: "Database_Optimizer",
        Skill_ID: "FSE-002-T2",
        Parameters: [
          {
            Param_Name: "database_connection_string",
            Data_Type: "Text",
            Scope_Format: "Standard database connection string",
            Description: "สตริงสำหรับเชื่อมต่อกับฐานข้อมูล",
          },
          {
            Param_Name: "optimization_strategy",
            Data_Type: "Select",
            Scope_Format: "[Index Optimization, Query Refactoring, Schema Normalization]",
            Description: "เลือกกลยุทธ์ในการปรับแต่งฐานข้อมูล",
          },
        ],
      },
      {
        Skill_Name: "Frontend_Performance_Engineer",
        Skill_ID: "FSE-002-T3",
        Parameters: [
          {
            Param_Name: "website_url",
            Data_Type: "Text",
            Scope_Format: "URL of the website to analyze",
            Description: "URL ของเว็บไซต์ที่ต้องการวิเคราะห์ประสิทธิภาพ",
          },
          {
            Param_Name: "optimization_techniques",
            Data_Type: "Multi-select",
            Scope_Format: "[Image Optimization, Code Splitting, Lazy Loading, CDN]",
            Description: "เลือกเทคนิคการปรับแต่งที่ต้องการใช้",
          },
        ],
      },
    ],
  },
  {
    Agent_Profile: "Data_Science_Specialist",
    Agent_ID: "DSS-003",
    Track: "Analyzer",
    Skills: [
      {
        Skill_Name: "Data_Pipeline_Builder",
        Skill_ID: "DSS-003-T1",
        Parameters: [
          {
            Param_Name: "data_source",
            Data_Type: "Text",
            Scope_Format: '"CSV, JSON, Database, API"',
            Description: "ระบุแหล่งข้อมูลที่ต้องการประมวลผล",
          },
          {
            Param_Name: "transformation_rules",
            Data_Type: "Text",
            Scope_Format: '"Normalize, Aggregate, Filter"',
            Description: "กำหนดกฎการแปลงข้อมูล",
          },
        ],
      },
      {
        Skill_Name: "Statistical_Analysis_Engine",
        Skill_ID: "DSS-003-T2",
        Parameters: [
          {
            Param_Name: "dataset",
            Data_Type: "File",
            Scope_Format: "Input: .csv, .json",
            Description: "ไฟล์ข้อมูลสำหรับการวิเคราะห์",
          },
          {
            Param_Name: "analysis_type",
            Data_Type: "Select",
            Scope_Format: "[Descriptive, Inferential, Predictive]",
            Description: "เลือกประเภทของการวิเคราะห์",
          },
        ],
      },
    ],
  },
  {
    Agent_Profile: "UI_UX_Designer",
    Agent_ID: "UXD-004",
    Track: "Designer",
    Skills: [
      {
        Skill_Name: "Wireframe_Generator",
        Skill_ID: "UXD-004-T1",
        Parameters: [
          {
            Param_Name: "project_description",
            Data_Type: "Text",
            Scope_Format: '"E-commerce dashboard with analytics"',
            Description: "คำอธิบายของโปรเจกต์ที่ต้องการออกแบบ",
          },
          {
            Param_Name: "target_audience",
            Data_Type: "Text",
            Scope_Format: '"Business users, Developers, End users"',
            Description: "กำหนดกลุ่มเป้าหมายของการออกแบบ",
          },
        ],
      },
      {
        Skill_Name: "Design_System_Creator",
        Skill_ID: "UXD-004-T2",
        Parameters: [
          {
            Param_Name: "brand_guidelines",
            Data_Type: "File",
            Scope_Format: "Input: .pdf, .figma",
            Description: "ไฟล์แนวทางแบรนด์",
          },
          {
            Param_Name: "component_library",
            Data_Type: "Select",
            Scope_Format: "[Material Design, Fluent Design, Custom]",
            Description: "เลือกไลบรารี่คอมโพเนนต์",
          },
        ],
      },
    ],
  },
];
