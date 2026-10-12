import { useMemo, useState } from 'react';
import GlideSelect from './GlideSelect.jsx';
import './FormSelect.css';

export type FormSelectOption = {
	value: string;
	label: string;
};

type FormSelectProps = {
	name: string;
	options: FormSelectOption[] | string[];
	placeholder: string;
	id: string;
	ariaLabel: string;
	defaultValue?: string;
};

function normalizeOptions(options: FormSelectOption[] | string[]): FormSelectOption[] {
	return options.map((option) =>
		typeof option === 'string' ? { value: option, label: option } : option,
	);
}

export default function FormSelect({
	name,
	options,
	placeholder,
	id,
	ariaLabel,
	defaultValue = '',
}: FormSelectProps) {
	const items = useMemo(() => normalizeOptions(options), [options]);
	const [value, setValue] = useState(defaultValue);

	return (
		<div className="form-select">
			<GlideSelect
				id={id}
				options={items}
				value={value}
				placeholder={placeholder}
				ariaLabel={ariaLabel}
				showTags={false}
				size="lg"
				placement="bottom"
				align="left"
				popDuration={180}
				glideDuration={220}
				rememberPosition
				radius={12}
				menuWidth={400}
				surfaceColor="#FFFFFF"
				highlightColor="#F7F7F5"
				textColor="#1A1A1A"
				accentColor="#FFA800"
				onChange={(next: string) => setValue(next ?? '')}
			/>
			{/*
			 * Hidden field for FormData. Disabled when empty so a noscript <select>
			 * can submit without a duplicate empty value when JS is off.
			 */}
			<input type="hidden" name={name} value={value} disabled={value === ''} />
		</div>
	);
}
