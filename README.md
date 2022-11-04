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