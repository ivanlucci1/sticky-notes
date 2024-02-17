import { randomNumber } from './numbers';

export const colorPalette = [
	"#FDE68A",
	"#D9F99D",
	"#99F6E4",
	"#DDD6FE",
	"#E7E5E4",
	"#FECDD3",
	"#E9D5FF",
	"#FCA5A5"
];

export const getRandomColor = () => {
	return colorPalette[randomNumber(0, colorPalette.length)];
};