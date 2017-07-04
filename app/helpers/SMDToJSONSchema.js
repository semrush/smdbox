const smdToSchema = (smd) => {
    
    const P = {properties: {}};
    
    smd.parameters.forEach((param) => {
        P.properties[param.name] = param;
        P.properties[param.name].title = param.name;
    });
    P.type = "object";
    P.description = smd.description;
    return P;
}

export default smdToSchema;
