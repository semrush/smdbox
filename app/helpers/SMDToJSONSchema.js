import { createRequest } from 'helpers/rpc';

const getDefaultValueForParam = (param, schema) => {
    if (!schema || !param || !schema.properties || !schema.properties[param]) return '';
    
    if (schema.properties[param].default) { return schema.properties[param].default; }
    
    switch (schema.properties[param].type) {
    case 'array':
        return [];
    case 'object':
        if (schema.properties[param].properties) {
                return getDefaultParamSetFromSchema(schema.properties[param]); // eslint-disable-line
        }
        return {};
    case 'integer':
        return undefined;
    default:
        return '';
    }
};

const getDefaultParamSetFromSchema = (schema) => {
    const paramSet = {};
    if (!schema || !schema.properties) return paramSet;
    
    Object.keys(schema.properties).forEach((param) => {
        // do not include default for optional params
        if (schema.properties[param].optional) return;
        
        paramSet[param] = getDefaultValueForParam(param, schema); // eslint-disable-line
    });
    return paramSet;
};


export const getParamsTemplateFromSchema = (method, schema, params = {}) => {
    const defaultParams = getDefaultParamSetFromSchema(schema); // eslint-disable-line
    
    return createRequest({
        method,
        params: {
            ...defaultParams,
            ...params
        } // merge default params with passed params
    });
};

const smdToSchema = (smd) => {
    const P = {
        ...smd,
        properties: {},
        definitions: {}
    };
    smd.parameters.forEach((param) => {
        P.properties[param.name] = param;
        P.properties[param.name].title = param.name;
        P.definitions = { ...P.definitions, ...param.definitions };
        
        // TODO remove manual cutting of wrong definitions
        Object.keys(P.definitions).forEach((key, i) => {
            const def = P.definitions[i];

            def && def.properties && Object.keys(def.properties).forEach((prop, j) => {
                if (def.properties[j].$ref === '#/definitions/') {
                    def.properties[j] = { type: 'string' };
                }
            });
        });
    });
    P.type = 'object';
    P.description = smd.description;
    return P;
};


export default smdToSchema;
