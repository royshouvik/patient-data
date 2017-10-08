export const isObject = (value) => value !== null && typeof value === 'object';

export const paramsToQueryString = (resource) => (params) => {
    return Object.keys(params).reduce((query, key) => {
        const value = params[key];
        if (value !== '') {
            const result = isObject(value) ? `${query}&${key}=${JSON.stringify(params[key])}` : `${query}&${key}=${params[key]}`;
            return result;
        }
        else {
            return query;
        }
    }, `${resource}?`)
}

export const transformFields = (checkedFields) => {
    const checkedFieldsMap = checkedFields.reduce((acc, field) => {
        acc[field.id] = field.checked;
        return acc;
    }, {});
    return {
        fields: checkedFieldsMap,
    }
}