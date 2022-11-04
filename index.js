const axios = require('axios');

module.exports = function(options){
    if(!options || !options.token) return new Error(`You need to provide API token in options!`)
    this.apiToken = options.token;
    this.requestOptions = { headers: { 'Authorization': this.apiToken } }
    /**
     * @name                getAllCards
     * @description         Get back an array with all cards.
     * @category            Cards
     * @author              m.
     * @returns             { Array }
     */
    getAllCards: async () => {
        const res = await axios.get(`https://api.clashroyale.com/v1/cards`, this.requestOptions);
        const response = [];
        const cards = res.data.items;
        cards.forEach((c) => {
            const { name, id, maxLevel, iconUrls } = c;
            response.push({ id, name, maxLevel, icon: iconUrls.medium });
        });
        return response;
    }
}