import { Piece, Pieces } from '../entity/index';
import { isTwoPiecesEqual } from '../service/piece-service';
interface piecePageElement {
    id: number;
    piece: Piece;
}

let selectedPieces: piecePageElement[] = [];
let pokemonCardArray: Array<Piece>;
let htmlCardArray: NodeListOf<Element>;

export function startGame(startingPokemonCardArray: Array<Piece>, startingHtmlCardArray: NodeListOf<Element>) {
    pokemonCardArray = startingPokemonCardArray;
    htmlCardArray = startingHtmlCardArray;

    gameLoop();
}

function gameLoop() {
     console.log
}

export function cardHasBeenClicked(id: number) {
    console.log(id);
    if(htmlCardArray[id].classList.contains("matched") || htmlCardArray[id].classList.contains("selected")){
        return;
    }
    if(selectedPieces.length < 2){
        selectedPieces.push({id: id, piece: pokemonCardArray[id]});
        htmlCardArray[id].classList.toggle("selected");
        htmlCardArray[id].children[1].classList.toggle("selected");
        if(selectedPieces.length === 2){
            const isEqual = isTwoPiecesEqual(selectedPieces[0].piece, selectedPieces[1].piece);
            selectedPieces.forEach(selectedPiece => {
                if(isEqual){
                    htmlCardArray[selectedPiece.id].classList.toggle("matched");
                    htmlCardArray[selectedPiece.id].children[1].classList.toggle("matched");
                    selectedPieces = [];
                    
                }
                else {
                    htmlCardArray[selectedPiece.id].classList.toggle("missed");
                    setTimeout(() => {
                        htmlCardArray[selectedPiece.id].classList.toggle("selected");
                        htmlCardArray[selectedPiece.id].children[1].classList.toggle("selected");
                        htmlCardArray[selectedPiece.id].classList.toggle("missed");
                        htmlCardArray[selectedPiece.id].children[1].classList.toggle("missed");
                        selectedPieces = [];
                    }, 2000);
                }
            });
        }
    }

}

