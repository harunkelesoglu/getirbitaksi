module.exports = (req,res,next) => { 
    debugger;
    if(typeof req.body === "string"){
    let text = req.body.replace(/[\n\s\r]/g,"");
        text = text.match(/"\w+":(\d+|"\d+-\d+-\d+")/g).join(",");
    const jsonFormat = JSON.parse("{"+text+"}");
    req.body = jsonFormat;
}
    next();
}

