import fs from 'node:fs';

const files = [
	['src/components/ServiceBento.astro', '.sb-header', '.sb-header__aside'],
	['src/components/ServiceDetail.astro', '.sd-header', '.sd-header__aside'],
	['src/components/ServiceDetailPair.astro', '.sdp-header', '.sdp-header__aside'],
	['src/components/ServicesBehind.astro', '.services-behind__header', '.services-behind__intro'],
	['src/components/ServicesOverview.astro', '.so-header', '.so-header__aside'],
	['src/components/IndustryFundamentals.astro', '.industry-fundamentals__header', '.industry-fundamentals__intro'],
	['src/components/IndustryIntent.astro', '.industry-intent__header', '.industry-intent__intro'],
	['src/components/IndustryClarity.astro', '.industry-clarity__header', '.industry-clarity__intro'],
	['src/components/LocationIntent.astro', '.location-intent__header', '.location-intent__intro'],
	['src/components/CaseStudiesListingPage.astro', '.cs-listing__header', '.cs-listing__aside'],
];

function block(header, aside) {
	return `

	/* Tablet: section header side-by-side from 900px */
	@media (min-width: 900px) and (max-width: 1023px) {
		${header} {
			flex-direction: row;
			align-items: flex-end;
			gap: 40px;
		}

		${aside} {
			max-width: 360px;
			width: auto;
		}
	}

	@media (min-width: 1024px) and (max-width: 1199px) {
		${aside} {
			max-width: 360px;
		}
	}
`;
}

for (const [file, header, aside] of files) {
	let css = fs.readFileSync(file, 'utf8');
	if (css.includes('Tablet: section header side-by-side')) {
		console.log('skip', file);
		continue;
	}
	if (!css.includes(aside.slice(1))) {
		console.log('WARN missing aside', file, aside);
	}
	const idx = css.lastIndexOf('</style>');
	if (idx < 0) {
		console.log('no style', file);
		continue;
	}
	css = css.slice(0, idx) + block(header, aside) + css.slice(idx);
	fs.writeFileSync(file, css);
	console.log('patched', file);
}
