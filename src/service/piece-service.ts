import { Piece } from '../entity'

export function isTwoPiecesEqual(p1: Piece, p2: Piece) {
    return Boolean(p1.set && p2.set && p1.set == p2.set)
}