export type AiPlatformCard = {
	title: string;
	text: string;
};

export type AiPlatformCardsContent = {
	id: string;
	pill: string;
	title: string;
	titleLines?: [string, string];
	text: string;
	cards: AiPlatformCard[];
};
