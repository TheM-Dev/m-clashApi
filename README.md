# m-clashApi
Simple scraper for easier access to the Clash Royale (Supercell) API data.

### Functions:
- getAllCards() - Returns an Array with list of all obtainable cards.
    Example response: 
    ```js
    [
        {
            id: 26000000,
            name: "Knight",
            maxLevel: 14,
            icon: "https://api-assets.clashroyale.com/cards/300jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png"
        },
        ...
    ]
    ```
- getUser() - Get back an object with ALL possible to gather user data.
    Example response: 
    ```js
    {
        profile: {
            name: name,
            tag: tag,
            level: expLevel,
            trophies: trophies,
            wins: wins,
            losses: losses,
            battles: battleCount,
            threeCrownWins: threeCrownWins,
            totalDonations: totalDonations,
            clan: {
                name: clan name,
                tag: clan tag
            },
            arena: arenaname,
            badges: badges,
            achievements: achievements,
            cards: cards,
            currentDeck: currentDeck,
            currentFavouriteCard: currentFavouriteCard,
            starPoints: starPoints,
            expPoints: expPoints,
            totalExpPoints:  totalExpPoints
        },
        chestCycle: chestData,
        battleLog: battleData
    };
    ```