module.exports = {

    fieldExists: (fields, fieldName) => {
        return fields.map(field => field.name).some(field => field === fieldName);
    },

    getFieldVal: (fields, fieldName) => {
        return fields.filter(field => field.name === fieldName).map(field => field.value)[0];
    },

    field: (name, value, inline) => {
        return {name: name, value: value, inline: inline === null ? false : inline};
    }

}