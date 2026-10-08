export type BlogAuthor = {
	name: string;
	role: string;
	avatar: string;
};

export type BlogFaq = {
	question: string;
	answer: string;
};

export type BlogPost = {
	id: string;
	slug: string;
	image: string;
	alt: string;
	category: string;
	title: string;
	excerpt: string;
	href: string;
	draft: boolean;
	author: BlogAuthor;
	date: string;
	readTime: number;
	featureImage: { src: string; alt: string };
	content: string;
	faqs: BlogFaq[];
};

const placeholderAuthor: BlogAuthor = {
	name: 'Elena Bostova, CPC',
	role: 'AAPC Certified Professional Coder',
	avatar: '/images/avatar.webp',
};

const placeholderFaqs: BlogFaq[] = [
	{
		question: 'Are these examples of industries you have worked in?',
		answer:
			"This page describes possible uses of XoomPlus's services across the listed sectors. It is not a portfolio of sector projects or a claim of specialist experience. We would discuss suitability and any relevant experience in your first conversation.",
	},
	{
		question: 'What if my industry is not listed?',
		answer:
			'We work with businesses across many sectors. If yours is not listed, get in touch — we will tell you honestly whether we are a good fit and how we can help.',
	},
	{
		question: 'Do I need a whole new website?',
		answer:
			'Not always. Some clients need a full rebuild; others only need targeted improvements to pages, SEO, or lead generation. We recommend what matches your goals and budget.',
	},
	{
		question: 'Can I start with just one service?',
		answer:
			'Yes. Many clients begin with a single service such as SEO, Google Ads, or a website refresh, then expand once they see results.',
	},
	{
		question: 'How do you handle specialist or regulated content?',
		answer:
			'We follow your compliance requirements and work with your team or advisors on sensitive copy. Accuracy and approval processes come first in regulated industries.',
	},
];

/** Placeholder HTML — replace later with Markdown/MDX or CMS HTML. */
function buildPlaceholderContent(featureImage: { src: string; alt: string }): string {
	return `
<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<ul>
<li>Lorem ipsum dolor sit amet</li>
<li>Non blandit massa enim nec scelerisque</li>
<li>Neque egestas congue quisque egestas</li>
</ul>
<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<img src="${featureImage.src}" alt="${featureImage.alt}" width="1196" height="539" loading="lazy" decoding="async" />
`.trim();
}

/** Base posts — home page shows the first 3; listing repeats these as placeholders. */
const templates: Pick<BlogPost, 'image' | 'alt' | 'category' | 'title' | 'excerpt'>[] = [
	{
		image: '/images/1st.webp',
		alt: 'White lane number 2 painted on a red running track',
		category: 'Web design',
		title: 'Unlocking Your Dream Home with Immolibre',
		excerpt: 'A modern carpentry website designed to generate leads and showcase custom work.',
	},
	{
		image: '/images/2nd.webp',
		alt: 'Green rolling hills under a cloudy blue sky',
		category: 'Brand strategy',
		title: 'Immolibre: Your Partner in Real Estate Success',
		excerpt: 'A modern carpentry website designed to generate leads and showcase custom work.',
	},
	{
		image: '/images/3rd.webp',
		alt: 'Vintage black camera with a strap on a light surface',
		category: 'Development',
		title: 'Discover Immolibre: Innovative Solutions for Real Estate',
		excerpt: 'A modern carpentry website designed to generate leads and showcase custom work.',
	},
];

const slugBases = [
	'unlocking-your-dream-home',
	'immolibre-your-partner',
	'discover-immolibre',
] as const;

/** All listing / detail posts (9 placeholders). */
export const blogs: BlogPost[] = [1, 2, 3].flatMap((copy) =>
	templates.map((post, index) => {
		const slug = `${slugBases[index]}-${copy}`;
		const featureImage = { src: post.image, alt: post.alt };
		return {
			...post,
			id: slug,
			slug,
			href: `/blogs/${slug}`,
			draft: false,
			author: placeholderAuthor,
			date: '2028-03-05',
			readTime: 8,
			featureImage,
			content: buildPlaceholderContent(featureImage),
			faqs: placeholderFaqs,
		};
	}),
);

/** Home page Blogs section — first 3 posts only. */
export const homeBlogs = blogs.slice(0, 3);

export const hasDraftPosts = blogs.some((post) => post.draft);

export function getBlogBySlug(slug: string): BlogPost | undefined {
	return blogs.find((post) => post.slug === slug);
}

/** Same category first, then remaining by date (newest first), excluding current. */
export function getRelatedPosts(current: BlogPost, count = 3): BlogPost[] {
	const others = blogs.filter((post) => post.id !== current.id);
	const byDateDesc = (a: BlogPost, b: BlogPost) =>
		b.date.localeCompare(a.date) || b.id.localeCompare(a.id);

	const sameCategory = others
		.filter((post) => post.category === current.category)
		.sort(byDateDesc);
	const rest = others
		.filter((post) => post.category !== current.category)
		.sort(byDateDesc);

	return [...sameCategory, ...rest].slice(0, count);
}
