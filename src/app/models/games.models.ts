export interface Games {
    gameID:         string;
    steamAppID:     string;
    cheapest:       string;
    cheapestDealID: string;
    external:       string;
    internalName:   string;
    thumb:          string;
}

export interface Juegos {
    games : Games[]
}