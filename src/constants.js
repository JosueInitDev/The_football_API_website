export const COLORS = {
    color1: "#ce004f",
    color2: "#ED7D31",
}

export const CONSTS = {
    app_name: "The Football API",
    app_mail: "contact@vetcho.org",
    api_url: "https://api-thefootballapi.vetcho.org",
    leagues: [
        {
            "name": "Premier League",
            "country": "England",
            "league_logo": "premier-league.png",
        },
        {
            "name": "Ligue 1",
            "country": "France",
            "league_logo": "ligue-1.png",
        },
        {
            "name": "Bundesliga",
            "country": "Germany",
            "league_logo": "Bundesliga.png",
        },
        {
            "name": "Serie A",
            "country": "Italy",
            "league_logo": "Serie-A.png",
        },
        {
            "name": "Eredivisie",
            "country": "Netherland",
            "league_logo": "Eredivisie.png",
        },
        {
            "name": "La Liga",
            "country": "Spain",
            "league_logo": "La-Liga.png",
        },
        {
            "name": "Euro",
            "country": "Europe",
            "league_logo": "euro.png",
        },
        {
            "name": "Champions League",
            "country": "Europe",
            "league_logo": "Champions-League.png",
        },
        {
            "name": "Europa League",
            "country": "Europe",
            "league_logo": "Europa-League.png",
        },
        {
            "name": "Conference League",
            "country": "Europe",
            "league_logo": "Conference-League.png",
        },
        {
            "name": "World Cup",
            "country": "World",
            "league_logo": "world-cup.png",
        }
    ]
}

export const PLANS = [
    {
        "name": "Free",
        "price": 0,
        "custom": false,
        "content": [
            "✓ 10 requests / minute",
            "(14 400 requests / day)",
            "✓ All major leagues & cups",
            "✓ Head-to-head stats",
            "✓ Live scores",
            "✓ Live statistics"
        ],
        "buttonText": "Start Free, no card!"
    },
    {
        "name": "Premium",
        "price": 10,
        "custom": false,
        "content": [
            "✓ 50 requests / minute",
            "(72 000 requests / day)",
            "✓ All major leagues & cups",
            "✓ Head-to-head stats",
            "✓ Live scores",
            "✓ Live statistics",
            "✓ Match history",
            "✓ Odds + probabilities",
            "✓ Priority updates",
            "✓ Early API features"
        ],
        "buttonText": "Go Premium"
    },
    {
        "name": "Enterprise",
        "price": 0,
        "custom": true,
        "content": [
            "✓ Dedicated limits",
            "✓ SLA 99.9%",
            "✓ Custom league imports",
            "✓ Direct support"
        ],
        "buttonText": "Contact Us"
    },
]