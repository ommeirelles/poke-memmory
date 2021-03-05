import { Piece } from '../entity'
import { isTwoPiecesEqual } from '../service'

describe("Piece match", () => {
    test("should two pieces match", () => {
        const p1: Piece = { set: 1, name: "peça um" }
        const p2: Piece = { set: 1, name: "peça dois" }
        expect(isTwoPiecesEqual(p1, p2)).toBe(true)
    })

    describe("two pieces shouldn't match", () => {
        test("two different pieces", () => {
            const p1: Piece = { set: 2, name: "peça um" }
            const p2: Piece = { set: 1, name: "peça dois" }
            expect(isTwoPiecesEqual(p1, p2)).toBe(false)
        })

        test("one piece null", () => {
            const p1: Piece = ({ set: null, name: "peça um" } as unknown) as Piece
            const p2: Piece = { set: 1, name: "peça dois" }
            expect(isTwoPiecesEqual(p1, p2)).toBe(false)
        })

        test("two pieces null", () => {
            const p1: Piece = ({ set: null, name: "peça um" } as unknown) as Piece
            const p2: Piece = ({ set: null, name: "peça dois" } as unknown) as Piece
            expect(isTwoPiecesEqual(p1, p2)).toBe(false)
        })

        test("a piece without set attribute", () => {
            const p1: Piece = { set: 1, name: "peça um" }
            const p2: Piece = ({ name: "peça dois" } as unknown) as Piece
            expect(isTwoPiecesEqual(p1, p2)).toBe(false)
        })

        test("two pieces without set attribute", () => {
            const p1: Piece = ({ name: "peça um" } as unknown) as Piece
            const p2: Piece = ({ name: "peça dois" } as unknown) as Piece
            expect(isTwoPiecesEqual(p1, p2)).toBe(false)
        })
    })
})