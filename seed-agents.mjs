import mysql from "mysql2/promise";

const sampleAgents = [
  {
    name: "TypeScript API Builder",
    version: "1.0.0",
    description: "Build REST APIs with TypeScript and Express. Includes type safety and automatic documentation.",
    language: "ts",
    tools: JSON.stringify([
      { name: "express", description: "Web framework" },
      { name: "typescript", description: "Type safety" },
      { name: "swagger", description: "API documentation" },
    ]),
    endpoint: "./src/main.ts",
    dependencies: JSON.stringify(["express", "@types/express", "typescript"]),
    autoLoad: 0,
    author: "BLinkOS Team",
    authorUrl: "https://blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/ts-api-builder",
    documentationUrl: "https://docs.blinkos.dev/ts-api-builder",
    tags: JSON.stringify(["api", "typescript", "express", "rest"]),
    isPublic: 1,
    downloadCount: 245,
    rating: 5,
  },
  {
    name: "Python Data Analyzer",
    version: "2.1.0",
    description: "Analyze and visualize data with Python. Supports CSV, JSON, and database sources.",
    language: "python",
    tools: JSON.stringify([
      { name: "pandas", description: "Data manipulation" },
      { name: "matplotlib", description: "Visualization" },
      { name: "numpy", description: "Numerical computing" },
    ]),
    endpoint: "./main.py",
    dependencies: JSON.stringify(["pandas", "matplotlib", "numpy", "scipy"]),
    autoLoad: 0,
    author: "Data Team",
    authorUrl: "https://data.blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/python-analyzer",
    documentationUrl: "https://docs.blinkos.dev/python-analyzer",
    tags: JSON.stringify(["data", "python", "analysis", "visualization"]),
    isPublic: 1,
    downloadCount: 189,
    rating: 4,
  },
  {
    name: "React Component Library",
    version: "3.0.0",
    description: "Pre-built React components with Tailwind CSS. Includes buttons, cards, modals, and more.",
    language: "ts",
    tools: JSON.stringify([
      { name: "react", description: "UI library" },
      { name: "tailwindcss", description: "Styling" },
      { name: "storybook", description: "Component documentation" },
    ]),
    endpoint: "./src/index.ts",
    dependencies: JSON.stringify(["react", "tailwindcss", "typescript"]),
    autoLoad: 1,
    author: "UI Team",
    authorUrl: "https://ui.blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/react-components",
    documentationUrl: "https://storybook.blinkos.dev",
    tags: JSON.stringify(["react", "components", "ui", "tailwind"]),
    isPublic: 1,
    downloadCount: 512,
    rating: 5,
  },
  {
    name: "JSON Schema Validator",
    version: "1.5.0",
    description: "Validate JSON data against schemas. Supports custom rules and error reporting.",
    language: "json",
    tools: JSON.stringify([
      { name: "ajv", description: "JSON schema validator" },
      { name: "joi", description: "Data validation" },
    ]),
    endpoint: "./validator.json",
    dependencies: JSON.stringify(["ajv", "joi"]),
    autoLoad: 0,
    author: "Validation Team",
    authorUrl: "https://validate.blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/json-validator",
    documentationUrl: "https://docs.blinkos.dev/json-validator",
    tags: JSON.stringify(["json", "validation", "schema"]),
    isPublic: 1,
    downloadCount: 156,
    rating: 4,
  },
  {
    name: "YAML Config Parser",
    version: "1.2.0",
    description: "Parse and validate YAML configuration files. Includes environment variable substitution.",
    language: "yaml",
    tools: JSON.stringify([
      { name: "yaml", description: "YAML parser" },
      { name: "dotenv", description: "Environment variables" },
    ]),
    endpoint: "./config.yaml",
    dependencies: JSON.stringify(["yaml", "dotenv"]),
    autoLoad: 1,
    author: "Config Team",
    authorUrl: "https://config.blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/yaml-parser",
    documentationUrl: "https://docs.blinkos.dev/yaml-parser",
    tags: JSON.stringify(["yaml", "config", "parsing"]),
    isPublic: 1,
    downloadCount: 98,
    rating: 4,
  },
  {
    name: "JavaScript Task Runner",
    version: "2.0.0",
    description: "Automate tasks with JavaScript. Supports file operations, API calls, and more.",
    language: "js",
    tools: JSON.stringify([
      { name: "node", description: "JavaScript runtime" },
      { name: "fs", description: "File system" },
      { name: "axios", description: "HTTP client" },
    ]),
    endpoint: "./tasks.js",
    dependencies: JSON.stringify(["axios", "lodash"]),
    autoLoad: 0,
    author: "Automation Team",
    authorUrl: "https://auto.blinkos.dev",
    repositoryUrl: "https://github.com/blinkos/task-runner",
    documentationUrl: "https://docs.blinkos.dev/task-runner",
    tags: JSON.stringify(["javascript", "automation", "tasks"]),
    isPublic: 1,
    downloadCount: 234,
    rating: 5,
  },
];

async function seedAgents() {
  let connection;
  try {
    // Parse DATABASE_URL
    const url = new URL(process.env.DATABASE_URL);
    const user = url.username;
    const password = url.password;
    const host = url.hostname;
    const port = url.port ? parseInt(url.port) : 3306;
    const database = url.pathname.slice(1);

    console.log(`🔗 Connecting to ${host}:${port}/${database}...`);

    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("✅ Connected to database");
    console.log("🌱 Seeding sample AI agents...\n");

    for (const agent of sampleAgents) {
      const query = `
        INSERT INTO agents (
          name, version, description, language, tools, endpoint, 
          dependencies, autoLoad, author, authorUrl, repositoryUrl, 
          documentationUrl, tags, isPublic, downloadCount, rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        agent.name,
        agent.version,
        agent.description,
        agent.language,
        agent.tools,
        agent.endpoint,
        agent.dependencies,
        agent.autoLoad,
        agent.author,
        agent.authorUrl,
        agent.repositoryUrl,
        agent.documentationUrl,
        agent.tags,
        agent.isPublic,
        agent.downloadCount,
        agent.rating,
      ];

      await connection.execute(query, values);
      console.log(`✅ Added: ${agent.name}`);
    }

    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedAgents();
