module.exports = {

    color: 2123412,
    errorColor: 10038562,

    bold: (string) => {
        return "**" + string + "**"
    },

    italics: (string) => {
        return "*" + string + "*"
    },

    titleCase: (string) => {
        return string.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

}