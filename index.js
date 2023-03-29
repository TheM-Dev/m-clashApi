// You could write it as a class or just functions and then combine it into the exported object tbh (syntactic sugar).
// Writing modules this way is very oldschool
module.exports = ({ token }) => { // if the token is the only value then it can be just (token) instead of options object. But it is okay that way as well
    if (!token) return new Error(`You need to provide API token in options!`);

    const BASE_URL = `https://api.clashroyale.com/v1`;
    // you can do generic error handling here
    const get = (url) => fetch(`${BASE_URL}${url}`, { headers: { 'Authorization': token } })
        .then(res => res.json());

    // Nice to see some JSdocs ;) Tho they do not describe exactly what's returned :P
    /**
     * @name                getAllCards
     * @description         Get back an array with all cards.
     * @category            Cards
     * @author              m.
     * @returns             { Array }
     */

    // no proper error handling.
    // Also you may just try to spread { ...c, icon: c.iconUrls.medium } if those are the only properties available in card
    // But tbh explicitly declaring which properties you want to use is safer (no unnecessary data is spilled - ex. api might return more data in the future)
    // Just return the promise, no need for async/await
    const getAllCards = () => get(`/cards`)
        .then(cards => cards.map(({ id, name, maxLevel, iconUrls }) => ({ id, name, maxLevel, icon: iconUrls.medium })));


    // Same here, not quite known what type are the returned fields in the object (what is the shape of the object returned)
    // And also what is the expected type of `playerTag` param
    /**
     * @name                getUser
     * @description         Get back an object with ALL possible to gather user data.
     * @category            Profile
     * @author              m.
     * @returns             { Object }
     */
    const getUser = async (playerTag) => {
        // no error handling
        const chestData = await get(`/players/%23${playerTag}/upcomingchests`);
        const battleLog = await get(`/players/%23${playerTag}/battlelog`);
        // It could be spread but this way is safer to not spill as mentioned above
        const {
            name,
            tag,
            expLevel: level,
            trophies,
            wins,
            losses,
            battleCount: battles,
            threeCrownWins,
            totalDonations,
            clan,
            arena,
            badges,
            achievements,
            cards,
            currentDeck,
            currentFavouriteCard,
            starPoints,
            expPoints,
            totalExpPoints
        } = await get(`/players/%23${playerTag}`);

        return {
            chestCycle: chestData.items,
            battleLog,
            profile: {
                name,
                tag,
                level,
                trophies,
                wins,
                losses,
                battles,
                threeCrownWins,
                totalDonations,
                clan: { name: clan.name, tag: clan.tag },
                arena: arena.name,
                badges,
                achievements,
                cards,
                currentDeck,
                currentFavouriteCard,
                starPoints,
                expPoints,
                totalExpPoints,
            },
        };
    };

    return { getAllCards, getUser };
};