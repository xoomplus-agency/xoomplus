export type ComparisonTableRow = {
	label: string;
	values: [string, string, string];
};

export type ComparisonTableContent = {
	id: string;
	pill: string;
	title: [string] | [string, string];
	intro?: string;
	columns: [string, string, string, string];
	rows: ComparisonTableRow[];
};
