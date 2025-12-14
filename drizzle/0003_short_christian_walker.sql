CREATE TABLE `agent_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentProfile` varchar(255) NOT NULL,
	`agentId` varchar(255) NOT NULL,
	`track` varchar(100) NOT NULL,
	`description` text,
	`emoji` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agent_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `agent_profiles_agentId_unique` UNIQUE(`agentId`)
);
--> statement-breakpoint
CREATE TABLE `agent_skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentProfileId` int NOT NULL,
	`skillId` varchar(255) NOT NULL,
	`skillName` varchar(255) NOT NULL,
	`skillDescription` text,
	`category` varchar(100),
	`proficiencyLevel` enum('beginner','intermediate','advanced','expert') NOT NULL DEFAULT 'intermediate',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agent_skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `agent_skills` ADD CONSTRAINT `agent_skills_agentProfileId_agent_profiles_id_fk` FOREIGN KEY (`agentProfileId`) REFERENCES `agent_profiles`(`id`) ON DELETE cascade ON UPDATE no action;