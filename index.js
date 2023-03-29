// Some code formating would be nice
module.exports = (apiToken) => {
    if (!apiToken) return new Error(`You need to provide an API token!`);

    const BASE_URL = `https://api.clashroyale.com/v1`;

    const get = (url) => fetch(`${BASE_URL}${url}`, { headers: { 'Authorization': apiToken } })
        .then(res => res.json())
        .catch(console.error); // todo, proper handling

    /**
     * @name                getAllCards
     * @description         Get back an array with all cards.
     * @category            Cards
     * @author              m.
     * @returns             { Array }
     */
    const getAllCards = () => get(`/cards`)
        .then(cards => cards.map(({ id, name, maxLevel, iconUrls }) => ({ id, name, maxLevel, icon: iconUrls.medium })));

    /**
     * @name                getUser
     * @description         Get back an object with ALL possible to gather user data.
     * @category            Profile
     * @author              m.
     * @returns             { Object }
     */
    const getUser = async (playerTag) => {
        const chestData = await get(`/players/%23${playerTag}/upcomingchests`);
        const battleLog = await get(`/players/%23${playerTag}/battlelog`);
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