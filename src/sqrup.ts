export = function sqrup(text: string | string[], options: string | sqrup.SquareUpOptions): string[] {
	const lines: string[] = extractLines(text);
	const style = makeStyle(options);

	const longest: number = longestLineLength(lines);
	const hatchLength = longest + style.padLeft + style.padRight + 2;
	const hatchTop: string = style.topLeftChar + repeatStr(style.topChar, hatchLength - 2) + style.topRightChar;
	const hatchBottom: string = style.bottomLeftChar + repeatStr(style.bottomChar, hatchLength - 2) + style.bottomRightChar;

	let verticalPadLine: string | null = null;
	if (style.padTop > 0 || style.padBottom > 0) {
		verticalPadLine = style.leftChar + repeatStr(' ', longest + style.padLeft + style.padRight) + style.rightChar;
	}

	const result: string[] = new Array(lines.length + style.padTop + style.padBottom + 2);
	result[0] = hatchTop; // Top hatch
	for (let i = 1; i <= style.padTop; i++) result[i] = verticalPadLine!;
	for (let i = 1; i <= style.padBottom; i++) result[result.length - i - 1] = verticalPadLine!;
	result[result.length - 1] = hatchBottom; // Bottom hatch

	const padLeftStr = repeatStr(' ', style.padLeft);
	const padRightStr = repeatStr(' ', style.padRight);

	for (let i = 0; i < lines.length; i++) {
		result[i + 1 + style.padTop] = style.leftChar + padLeftStr + (lines[i].padEnd(longest, ' ')) + padRightStr + style.rightChar;
	}

	return result;
}

function makeStyle(options: string | sqrup.SquareUpOptions): sqrup.SquareUpStyle {
	options = (typeof options === 'string') ? {default: options} : (options || {}) as sqrup.SquareUpOptions;

	const defaultChar = extractChar(options.default, '*');
	return {
		default: defaultChar,

		padLeft: Number(options.padLeft) || 2,
		padRight: Number(options.padRight) || 2,
		padTop: Number(options.padTop) || 0,
		padBottom: Number(options.padBottom) || 0,

		topChar: extractChar(options.top, defaultChar),
		bottomChar: extractChar(options.bottom, defaultChar),
		leftChar: extractChar(options.left, defaultChar),
		rightChar: extractChar(options.right, defaultChar),

		topLeftChar: extractChar(options.topLeft, defaultChar),
		topRightChar: extractChar(options.topRight, defaultChar),
		bottomLeftChar: extractChar(options.bottomLeft, defaultChar),
		bottomRightChar: extractChar(options.bottomRight, defaultChar),
	};
}

function repeatStr(str: string, count: number): string {
	if (count < 1) {
		return '';
	}
	return (new Array(count)).fill(str).join('');
}

function extractChar(char: any, defaultCh: string): string {
	if (char == null) {
		return defaultCh;
	}
	char = String(char);
	char = (char.length > 0) ? char.charAt(0) : defaultCh;
	return char;
}

function extractLines(text: string | string[]): string[] {
	if (!Array.isArray(text)) {
		text = [String(text)];
	}
	const result: string[] = [];
	for (const line of text) {
		result.push(...String(line).split('\n'));
	}
	return result;
}

function longestLineLength(lines: string[]): number {
	let longest = 0;
	for (const ln of lines) {
		if (ln.length > longest) {
			longest = ln.length;
		}
	}
	return longest;
}

namespace sqrup {
	export type SquareUpOptions = {
		default?: string;
		// Sides
		left?: string;
		right?: string;
		top?: string;
		bottom?: string;
		// Corners
		topLeft?: string;
		topRight?: string;
		bottomLeft?: string;
		bottomRight?: string;
		// Pad
		padLeft?: number;
		padRight?: number;
		padBottom?: number;
		padTop?: number;
	}

	export type SquareUpStyle = {
		default: string;
		// Sides
		leftChar: string;
		rightChar: string;
		topChar: string;
		bottomChar: string;
		// Corners
		topLeftChar: string;
		topRightChar: string;
		bottomRightChar: string;
		bottomLeftChar: string;
		// Pad
		padLeft: number;
		padRight: number;
		padBottom: number;
		padTop: number;
	};
}
