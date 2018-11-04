import stringWidth = require('string-width');

export = function sqrup(text: string | string[], options: string | sqrup.SquareUpOptions): string {
	const lines: string[] = extractLines(text);
	const style = makeStyle(options);

	// Find the longest line in the text
	const longestTextLine: number = longestLineLength(lines);

	// Make the strings that will constitute the top and bottom lines.
	const hatchLength = longestTextLine + style.padLeft + style.padRight + 2;
	const hatchTop: string = makeTopHatch(hatchLength, style);
	let hatchBottom: string = makeBottomHatch(hatchLength, style);

	// Make the lines that will be used for top and bottom padding.
	// (If both top and bottom padding is 0, then there's no need to create this string.)
	let verticalPadLine: string | null = null;
	if (style.padTop > 0 || style.padBottom > 0) {
		verticalPadLine = makePadLine(longestTextLine, style);
	}

	const result: string[] = new Array(lines.length + style.padTop + style.padBottom + 2);
	result[0] = hatchTop; // Top hatch
	for (let i = 1; i <= style.padTop; i++) result[i] = verticalPadLine!;
	for (let i = 1; i <= style.padBottom; i++) result[result.length - i - 1] = verticalPadLine!;
	result[result.length - 1] = hatchBottom; // Bottom hatch

	const padLeftStr = repeatStr(' ', style.padLeft);
	const padRightStr = repeatStr(' ', style.padRight);

	for (let i = 0; i < lines.length; i++) {
		result[i + 1 + style.padTop] = style.leftChar + padLeftStr + (lines[i].padEnd(longestTextLine, ' ')) + padRightStr + style.rightChar;
	}
	return result.join('\n');
}

function makePadLine(longestTextLine: number, style: sqrup.SquareUpStyle): string {
	return style.leftChar + repeatStr(' ', longestTextLine + style.padLeft + style.padRight) + style.rightChar;
}

function makeTopHatch(length: number, style: sqrup.SquareUpStyle): string {
	return style.topLeftChar + repeatStr(style.topChar, length - 2) + style.topRightChar;
}

function makeBottomHatch(length: number, style: sqrup.SquareUpStyle): string {
	return style.bottomLeftChar + repeatStr(style.bottomChar, length - 2) + style.bottomRightChar;
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
	return String(char);
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
		const length = stringWidth(ln);
		if (length > longest) {
			longest = length;
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
