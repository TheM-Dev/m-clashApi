const axios = require('axios');

module.exports = function(options){
    if(!options || !options.token) return new Error(`You need to provide API token in options!`)
    this.apiToken = options.token;
    this.request = async (link) => {
        const requestOptions = { headers: { 'Authorization': this.apiToken } };
        return await axios.get(link, this.requestOptions);
    }
    /**
     * @name                getAllCards
     * @description         Get back an array with all cards.
     * @category            Cards
     * @author              m.
     * @returns             { Array }
     */
    getAllCards: async () => {
        const data = await this.request(`https://api.clashroyale.com/v1/cards`);
        const response = []; const cards = data.data.items;
        cards.forEach((c) => {
            const { name, id, maxLevel, iconUrls } = c;
            response.push({ id, name, maxLevel, icon: iconUrls.medium });
        });
        return response;
    }
    /**
     * @name                getUser
     * @description         Get back an object with ALL possible to gather user data.
     * @category            Profile
     * @author              m.
     * @returns             { Object }
     */
    getUser: async (playerTag) => {
        const profileData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}`).data;
        const chestData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}/upcomingchests`).data;
        const battleData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}/battlelog`).data;
        const response = {
            profile: {
                name: profileData.name,
                tag: profileData.tag,
                level: profileData.expLevel,
                trophies: profileData.trophies,
                wins: profileData.wins,
                losses: profileData.losses,
                battles: profileData.battleCount,
                threeCrownWins: profileData.threeCrownWins,
                totalDonations: profileData.totalDonations,
                clan: { name: profileData.clan.name, tag: profileData.clan.tag },
                arena: profileData.arena.name,
                badges: profileData.badges,
                achievements: profileData.achievements,
                cards: profileData.cards,
                currentDeck: profileData.currentDeck,
                currentFavouriteCard: profileData.currentFavouriteCard,
                starPoints: profileData.starPoints,
                expPoints: profileData.expPoints,
                totalExpPoints: profileData. totalExpPoints
            },
            chestCycle: chestData.items,
            battleLog: battleData
        };
        return response;
    }
}