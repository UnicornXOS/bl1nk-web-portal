import { z } from "zod";

/**
 * Agent Skill Schema
 * Used for validating AI agent skill data
 */

export const ParameterDataTypeEnum = z.enum([
  "Text",
  "Number",
  "Select",
  "Multi-select",
  "Boolean",
  "Date",
  "File",
  "URL",
]);

export type ParameterDataType = z.infer<typeof ParameterDataTypeEnum>;

export const SkillParameterSchema = z.object({
  Param_Name: z.string().min(1, "Parameter name is required"),
  Data_Type: ParameterDataTypeEnum,
  Scope_Format: z.string().min(1, "Scope format is required"),
  Description: z.string().min(1, "Description is required"),
});

export type SkillParameter = z.infer<typeof SkillParameterSchema>;

export const AgentSkillSchema = z.object({
  Skill_Name: z.string().min(1, "Skill name is required"),
  Skill_ID: z.string().min(1, "Skill ID is required"),
  Parameters: z.array(SkillParameterSchema).default([]),
});

export type AgentSkill = z.infer<typeof AgentSkillSchema>;

export const TrackEnum = z.enum(["Builder", "Analyzer", "Designer", "Optimizer", "Integrator"]);
export type Track = z.infer<typeof TrackEnum>;

export const AgentProfileSchema = z.object({
  Agent_Profile: z.string().min(1, "Agent profile name is required"),
  Agent_ID: z.string().min(1, "Agent ID is required"),
  Track: TrackEnum,
  Skills: z.array(AgentSkillSchema).min(1, "At least one skill is required"),
});

export type AgentProfile = z.infer<typeof AgentProfileSchema>;

/**
 * Agent Skill Filter Schema
 * Used for filtering agents and skills
 */
export const AgentSkillFilterSchema = z.object({
  track: TrackEnum.optional(),
  searchQuery: z.string().optional(),
  skillName: z.string().optional(),
});

export type AgentSkillFilter = z.infer<typeof AgentSkillFilterSchema>;

/**
 * Agent Skill Request Schema
 * Used for requesting skill execution
 */
export const AgentSkillRequestSchema = z.object({
  agentId: z.string().min(1, "Agent ID is required"),
  skillId: z.string().min(1, "Skill ID is required"),
  parameters: z.record(z.string(), z.any()).optional(),
});

export type AgentSkillRequest = z.infer<typeof AgentSkillRequestSchema>;

/**
 * Batch Agent Skills Schema
 * Used for handling multiple agent skills
 */
export const BatchAgentSkillsSchema = z.object({
  agents: z.array(AgentProfileSchema),
  action: z.enum(["create", "update", "delete"]),
});

export type BatchAgentSkills = z.infer<typeof BatchAgentSkillsSchema>;
