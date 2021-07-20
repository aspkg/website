module.exports = {
	useTabs: true, // I like tabs, but BSS outputs spaces.
	singleQuote: true,
	semi: false,
	printWidth: 120,

	overrides: [{ files: '*.md', options: { tabWidth: 2, useTabs: false } }],
}
