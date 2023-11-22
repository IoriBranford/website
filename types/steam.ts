export interface SteamPriceOverview {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
}

export interface SteamAppDetails {
    [appId: string]: {
        success: boolean;
        data: {
            price_overview: SteamPriceOverview
        }
    }
}
