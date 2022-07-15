const handleHttpError = (res,message = "Something was wrong!", code = 403 ) => {
    res.status(code);
    res.json({status: message});
}

module.exports = {handleHttpError};