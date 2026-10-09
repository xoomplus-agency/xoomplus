/**
 * Service-hero glass layer — dark frosted charcoal (not bright).
 *
 * Figma Glass → props:
 *   Light (-45°, 80%) · Refraction 80 · Depth 100
 *   Dispersion 50 · Frost 15 · Splay 100
 */
import GlassSurface from './GlassSurface';

type HeroGlassPanelProps = {
	className?: string;
};

export default function HeroGlassPanel({ className = '' }: HeroGlassPanelProps) {
	return (
		<div className={`hero-glass-layer ${className}`.trim()} aria-hidden="true">
			<GlassSurface
				width="100%"
				height="100%"
				borderRadius={21}
				borderWidth={0.1}
				brightness={22}
				/* Very low opacity — mostly see-through */
				opacity={0.28}
				blur={15}
				displace={1.2}
				distortionScale={-55}
				backgroundOpacity={0.06}
				saturation={1}
				redOffset={-10}
				greenOffset={0}
				blueOffset={10}
				lightAngle={-45}
				className="hero-glass-surface"
			/>
		</div>
	);
}
