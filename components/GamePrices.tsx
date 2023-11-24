import { useEffect, useState } from "preact/hooks";

interface PriceState {
  originalPrice: string;
  currentPrice: string;
  salePercent: number;
}

interface GamePriceProps {
  defaultPrice: string;
  url: string;
  readResponse: (json: ItchAppDetails | SteamAppDetails) => (PriceState | void);
}

function GamePrice({defaultPrice, url, readResponse}: GamePriceProps) {
  const [priceState, setPriceState] = useState<PriceState>({
    currentPrice: defaultPrice,
    originalPrice: defaultPrice,
    salePercent: 0
  })

  const {currentPrice, originalPrice, salePercent} = priceState
  const element = salePercent > 0
    ? <><s><small>{originalPrice}</small></s> <b>{currentPrice} (-{salePercent}%)</b></>
    : <>{currentPrice}</>

  useEffect(() => {
    fetch(url, {method: 'GET'})
      .then(response => response.json()
        .then((json) => {
          const newPriceState = readResponse(json)
          if (newPriceState)
            setPriceState(newPriceState)
        }))
  }, [])
  return element
}

interface ItchAppDetails {
    error?: string;
    price: string;
    original_price?: string;
    sale?: {
        rate: number;
    }
}

export function ItchGamePrice({author, game, defaultPrice}) {
  const readResponse = (json: ItchAppDetails) =>
    (json.error ? console.log(json.error) : {
      currentPrice: json.price,
      originalPrice: json.original_price || json.price,
      salePercent: json.sale ? json.sale.rate : 0
    })

  return <GamePrice defaultPrice={defaultPrice}
    url={`https://${author}.itch.io/${game}/data.json`}
    readResponse={readResponse}/>
}

interface SteamAppDetails {
  [appId: string]: {
      success: boolean;
      data: {
          price_overview: {
            currency: string;
            initial: number;
            final: number;
            discount_percent: number;
            initial_formatted: string;
            final_formatted: string;
          }
      }
  }
}

export function SteamGamePrice({appId, defaultPrice}) {
  const readResponse = (json: SteamAppDetails) => {
    if (json[appId] && json[appId].success) {
      const {initial_formatted, final_formatted, discount_percent} = json[appId].data.price_overview
      return {
        currentPrice: final_formatted,
        originalPrice: initial_formatted,
        salePercent: discount_percent
      }
    }
  }
  const apiOrigin = import.meta.env.VITE_API_ORIGIN || window.location.origin
  return <GamePrice defaultPrice={defaultPrice}
    url={`${apiOrigin}/api/getSteamPrices?appids=${appId}`}
    readResponse={readResponse}/>
}
