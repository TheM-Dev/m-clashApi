// You don't need axios TBH. Just use `fetch` API
const axios = require('axios');

// Could just destructure the token
// You could write it as a class tbh (syntactic sugar). Writing modules this way is very oldschool
module.exports = function (options) {
    if (!options || !options.token) return new Error(`You need to provide API token in options!`) // missing ; use eslint/prettier

    // no need to asigning the API token here to `this`. Or it could be OK if that's something you want to provide as your API to access a token.
    // But if the user provides the token to the instance of this module, then he can probably get it and manage in a better way than you do.
    this.apiToken = options.token;

    // Use fetch API
    // `get` is more meaningfull than `request`, i'd change the `link` to `url` as well
    // you don't need async here, you can just return a promise anyways and await it where you consume it
    this.request = async (link) => {
        const requestOptions = { headers: { 'Authorization': this.apiToken } };
        // just use `requestOptions`
        return await axios.get(link, this.requestOptions);
    }

    // Nice to see some JSdocs ;) Tho they do not describe exactly what's returned :P
    /**
     * @name                getAllCards
     * @description         Get back an array with all cards.
     * @category            Cards
     * @author              m.
     * @returns             { Array }
     */
    getAllCards: async () => {
        // no proper error handling.
        const data = await this.request(`https://api.clashroyale.com/v1/cards`);

        // No need to create empty array for response, just use Array.map()
        // because of axios u need to access it via `data.data.items` instead of `data.items`
        // also u could have destructured it
        // i see no need to keep two consts in one line, either use const once and declare two variables or just move it to the next line
        // i'd move it to the next line because it is more readable. Don't try to make your code shorter by sacrificing the readability.
        const response = []; const cards = data.data.items;

        // Use Array.map()
        // return cards.map(({ id, name, maxLevel, iconUrls }) => ({ id, name, maxLebel, icon: iconUrls.medium }));
        // Also you may just try to spread { ...c, icon: c.iconUrls.medium } if those are the only properties available in card
        // But tbh explicitly declaring which properties you want to use is safer (no unnecessary data is spilled - ex. api might return more data in the future)
        cards.forEach((c) => {
            const { name, id, maxLevel, iconUrls } = c;
            response.push({ id, name, maxLevel, icon: iconUrls.medium });
        });
        return response;
    }

    // Same here, not quite known what type are the returned fields in the object (what is the shape of the object returned)
    // And also what is the expected type of `playerTag` param
    /**
     * @name                getUser
     * @description         Get back an object with ALL possible to gather user data.
     * @category            Profile
     * @author              m.
     * @returns             { Object }
     */
    getUser: async (playerTag) => {
        // no error handling
        const profileData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}`).data;
        const chestData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}/upcomingchests`).data;
        const battleData = await this.request(`https://api.clashroyale.com/v1/players/%23${playerTag}/battlelog`).data;
        // just return { ... }, no need to declare `response` variable here.
        // Also you could destructure some properties to save a lot of code and improve readability.
        // remember you can rename variables when destructuring
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
                totalExpPoints: profileData.totalExpPoints
            },
            chestCycle: chestData.items,
            battleLog: battleData
        };
        return response;
    }
}