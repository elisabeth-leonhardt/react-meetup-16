export interface RickAndMortyCharacterResponse {
    info:    Info;
    results: CharacterI[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null | number;
}

export interface CharacterI {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface Location {
    name: string;
    url:  string;
}
