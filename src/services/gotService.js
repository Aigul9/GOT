export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'; // static data, not changeable
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        // 1 page = 10 chars
        const res = await this.getResource('/characters?page=5&pageSize=10');
        // console.log(res);
        return res.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformChar(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _transformChar = (char) => {
        return {
            id: this._getId(char),
            name: this._checkNoData(char.name),
            gender: this._checkNoData(char.gender),
            born: this._checkNoData(char.born),
            died: this._checkNoData(char.died),
            culture: this._checkNoData(char.culture)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._getId(book),
            name: this._checkNoData(book.name),
            numberOfPages: this._checkNoData(book.numberOfPages),
            publisher: this._checkNoData(book.publisher),
            released: this._checkNoData(book.released)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._getId(house),
            name: this._checkNoData(house.name),
            region: this._checkNoData(house.region),
            words: this._checkNoData(house.words),
            titles: this._checkNoData(house.titles),
            overlord: this._checkNoData(house.overlord),
            ancestralWeapons: this._checkNoData(house.ancestralWeapons)
        }
    }

    _checkNoData(prop) {
        return prop || 'No Data';
    }

    _getId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        // console.log(item);
        // console.log(item.url.match(idRegExp));
        return item.url.match(idRegExp)[1];
    }
}