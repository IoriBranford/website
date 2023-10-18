import GameProps from "./GameProps"

const GameImports: Record<string, GameProps> = import.meta.glob(
  "./*/index.page.mdx",
  {
    eager: true,
    import: 'documentProps'
  }
)

const AllGameProps : Record<string, GameProps> = Object.values(GameImports).reduce((AllGames, game) => {
  AllGames[game.id] = game
  return AllGames
}, {})

export default AllGameProps