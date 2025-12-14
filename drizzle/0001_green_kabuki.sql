CREATE TABLE `api_keys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`provider` varchar(50) NOT NULL,
	`keyName` varchar(255) NOT NULL,
	`encryptedKey` text NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`lastUsed` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `api_keys_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contentId` varchar(255) NOT NULL,
	`contentType` enum('github','gitbook','notion','other') NOT NULL DEFAULT 'other',
	`contentTitle` text NOT NULL,
	`contentUrl` text NOT NULL,
	`contentDescription` text,
	`contentImage` text,
	`tags` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`theme` enum('light','dark') NOT NULL DEFAULT 'dark',
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`notificationsEnabled` int NOT NULL DEFAULT 1,
	`emailNotifications` int NOT NULL DEFAULT 1,
	`dashboardLayout` varchar(50) NOT NULL DEFAULT 'grid',
	`itemsPerPage` int NOT NULL DEFAULT 20,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_preferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `api_keys` ADD CONSTRAINT `api_keys_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_favorites` ADD CONSTRAINT `user_favorites_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;