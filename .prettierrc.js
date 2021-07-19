module.exports = {
    tabWidth: 4, // to match output format of BSS, but we can change this.
    useTabs: false, // I like tabs, but BSS outputs spaces.
    singleQuote: true,
    semi: false,
    printWidth: 120,

    overrides: [{ files: '*.md', options: { tabWidth: 2 } }],
}
