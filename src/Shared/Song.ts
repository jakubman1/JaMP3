export class Song {
    id: string;
    path: string;
    author?: string;
    title: string;
    album?: string;
    year?: number;
    favourite: boolean;
    playlists: string[];
}
