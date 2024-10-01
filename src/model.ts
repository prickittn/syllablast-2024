export class Syllable {
    readonly word: string
    row: number;
    column: number;
    isSelected: boolean;
    isCorrect: boolean;

    constructor(label: string, r: number, c: number) {
        this.word = label
        this.row = r;
        this.column = c;
        this.isSelected = false;
        this.isCorrect = false;
    }

    place(row: number, col: number) {
        this.row = row;
        this.column = col;
    }

    copy(): Syllable {
        let p = new Syllable(this.word, this.row, this.column);
        p.place(this.row, this.column);
        return p;
    }
}

export class Puzzle {
    readonly numRows: number;
    readonly numColumns: number;
    syllables: Array<Syllable> = [];
    selectedSyllables: Array<Syllable> = [];
    swappedSyllables: Array<Syllable> = [];

    constructor(numRows: number, numColumns: number) {
        this.numRows = numRows;
        this.numColumns = numColumns;
    }

    initializeSyllables(syllables: Array<Syllable>) {
        this.syllables = syllables.map(p => p.copy());
    }

    initializeSelected(selectedSyllables: Array<Syllable>) {
        this.selectedSyllables = new Array<Syllable>;
    }

    initializeSwapped(swappedSyllables: Array<Syllable>) {
        this.swappedSyllables = new Array<Syllable>;
    }

    getSyllable(rows: number, columns: number){
        for (var i = 0; i < this.syllables.length; i++){
            if (this.syllables[i].row == rows && this.syllables[i].column == columns){
                return this.syllables[i];
            }
        }
    }

    sortSyllables(syllables: Syllable[]): Syllable[] {
        const sortedSyllables: Syllable[] = [];
      
        // Loop through each row and column in ascending order
        for (let row = 0; row < this.numRows; row++) {
          for (let col = 0; col < this.numColumns; col++) {
            // Find the syllable that matches the current row and column
            for (let i = 0; i < syllables.length; i++) {
              if (syllables[i].row === row && syllables[i].column === col) {
                sortedSyllables.push(syllables[i]);
                break; // Once we find the matching syllable, stop this inner loop
              }
            }
          }
        }
      
        return sortedSyllables;
      }
      

    selectSyllable(row: number, col: number) {
        const syllable = this.getSyllable(row, col)!;
    
        if (!syllable) {
            console.error(`Syllable not found at row: ${row}, col: ${col}`);
            return;
        }
        else if (syllable.isSelected) {
            syllable.isSelected = false;
            this.selectedSyllables = this.selectedSyllables.filter(
              (s) => s !== syllable
            );
        } 
        else if (this.selectedSyllables.length < 2) {
            syllable.isSelected = true;
            this.selectedSyllables.push(syllable);
        }
    }

    switchSyllables(first: Syllable, second: Syllable){
        var temp_row = first.row
        var temp_col = first.column
        first.row = second.row
        first.column = second.column
        second.row = temp_row
        second.column = temp_col
    }

    swapSyllables(): boolean{
        if (this.selectedSyllables.length == 2){
            this.switchSyllables(this.selectedSyllables[0], this.selectedSyllables[1])
            this.selectedSyllables[0].isSelected = false
            this.selectedSyllables[1].isSelected = false
            this.swappedSyllables.push(this.selectedSyllables[0])
            this.swappedSyllables.push(this.selectedSyllables[1])
            this.selectedSyllables.pop()
            this.selectedSyllables.pop()
            return true
        }
        else{
            return false
        }
    }

    undo(): boolean{
        if (this.swappedSyllables.length > 0){
            this.switchSyllables(this.swappedSyllables[this.swappedSyllables.length - 1], this.swappedSyllables[this.swappedSyllables.length - 2])
            this.swappedSyllables.pop()
            this.swappedSyllables.pop()
            return true
        }
        else{
            return false
        }
    }
    
    reset(){
        while(this.swappedSyllables.length > 0){
            this.undo()
        }
    }

}

// Function to create the syllables grid
function createSyllablesGrid(initialSyllables: string[], numRows: number, numCols: number): Syllable[] {
    const syllablesGrid: Syllable[] = [];

    for (let i = 0; i < initialSyllables.length; i++) {
        // Calculate row and column based on the index
        const row = Math.floor(i / numCols);
        const col = i % numCols;

        // Create a new Syllable object
        const syllable = new Syllable(initialSyllables[i], row, col);

        // Add the syllable to the grid
        syllablesGrid.push(syllable);
    }

    return syllablesGrid;
}

export class Model {
    puzzle!: Puzzle;
    victory: boolean = false;
    numMoves!: number;
    score!: number;
    finalSyllables: string[] = [];

    // info is going to be JSON-encoded puzzle
    constructor(info: { name: string; board: { rows: string; columns: string; } | { rows: string; columns: string; } | { rows: string; columns: string; }; initial_syllables: string[]; final_syllables: string[]; }) {
        this.initialize(info);
    }

    initialize(info: { board: { rows: string; columns: string; }; initial_syllables: any; final_syllables: string[]; }) {
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.columns);
        const initialSyllables = info.initial_syllables;
        this.finalSyllables = info.final_syllables;

        const allSyllables = createSyllablesGrid(initialSyllables, numRows, numColumns);
        var allSelected: Array<Syllable> = []
        var allSwapped: Array<Syllable> = []

        this.puzzle = new Puzzle(numRows, numColumns)
        this.puzzle.initializeSyllables(allSyllables)
        this.puzzle.initializeSelected(allSelected)
        this.puzzle.initializeSwapped(allSwapped)

        this.numMoves = 0;
        this.score = 0;
        this.victory = false;
    }

    calculateScore() {
        var sorted: Array<Syllable> = this.puzzle.sortSyllables(this.puzzle.syllables)
        var final: Array<string> = this.finalSyllables
        sorted.forEach(syllable => { syllable.isCorrect = false; })
        this.score = 0

        for (let k = 0; k < sorted.length; k += 4){

            for (let i = 0; i < final.length; i += 4){

                if (sorted[k].word === final[i]){

                    sorted[k].isCorrect = true;
                    this.score++
                    for(let h = k+1, j = i+1; h < k+4 && j < i+4; h++, j++){

                        if (sorted[h].word === final[j]){
                            sorted[h].isCorrect = true;
                            this.score++
                        }
                        else{
                            break;
                        }
                    }
                }
            }
        }
    }
}