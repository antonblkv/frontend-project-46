import stylish from './stylish.js';

const formats = {
	stylish: stylish
};

export default (format, data) => formats[format](data);
