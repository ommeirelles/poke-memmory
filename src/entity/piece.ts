export interface Piece {
    image?: string
    name: string
    color?: string
    set: number
}

export const Pieces: Array<Piece> = [
    {
        name: "Pikachu",
        set: 1
    },
    {
        name: "Charmander",
        set: 2
    },
    {
        name: "Bulbasaur",
        set: 3
    },
    {
        name: "Squirtle",
        set: 4
    },
    {
        name: "Pidgey",
        set: 5
    },
]