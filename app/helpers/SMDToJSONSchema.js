import { createRequest } from 'helpers/rpc';

const smdToSchema = (smd) => {
    
    const P = {
        ...smd,
        properties: {}
    };
    
    smd.parameters.forEach((param) => {
        P.properties[param.name] = param;
        P.properties[param.name].title = param.name;
    });
    P.type = "object";
    P.description = smd.description;
    return P;
}

const getDefaultValueForParam = (param, schema) => {
    if (!schema || !param || !schema.properties || !schema.properties[param]) return '';
    
    if (schema.properties[param].default)
        return schema.properties[param].default;
    
    switch (schema.properties[param].type) {
        case 'array':
            return [];
        case 'object':
            if (schema.properties[param].properties) {
                return getDefaultParamSetFromSchema(schema.properties[param])
            }
            return {};
        case 'integer':
            return undefined;
        default:
            return '';
    }
    
    return '';
};

const getDefaultParamSetFromSchema = (schema) => {
    const paramSet = {};
    if (!schema || !schema.properties) return paramSet;
    
    Object.keys(schema.properties).forEach((param) => {
        // do not include default for optional params
        if (schema.properties[param].optional) return;
        
        paramSet[param] = getDefaultValueForParam(param, schema);
    });
    return paramSet;
}


export const getParamsTemplateFromSchema = (method, schema, params = {}) => {
    const defaultParams = getDefaultParamSetFromSchema(schema);
    
    return createRequest({
        method,
        params: {
            ...defaultParams,
            ...params
        } // merge default params with passed params
    })
};


export default smdToSchema;
