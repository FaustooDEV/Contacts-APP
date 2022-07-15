const axios = require('axios');

const validatePhoneNumber = async (value) => {
    return await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=533a005105ea428d8bcb26602d3b05cc&phone=${value}`)
        .then(response => {
            if (!response.data.valid) {
                return false
            }
            return true;
        })
        .catch(error => {
            console.log(error);
        });

}

module.exports = validatePhoneNumber;