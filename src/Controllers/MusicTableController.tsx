import { getSongsTable } from './dbRequests'


export class MusicTableController
{
    public fetchSongTable(playlistId: string): Promise<object[]> {
        //return getSongsTable(playlistId);
        return new Promise<object[]>((resolve => {
            resolve([
                {
                    'title': 'Nazev skladby',
                    'album': 'Nazev alba',
                    'author': 'Jmeno autora',
                    'path': 'C:/test/nic',
                    'id': '0',
                    'favourite': false,
                    'playlists': []
                },
                {
                    'title': 'Nazev skladby',
                    'album': 'Nazev alba',
                    'author': 'Jmeno autora',
                    'path': 'C:/test/nic',
                    'id': '1',
                    'favourite': false,
                    'playlists': []
                },
                {
                    'title': 'Nazev skladby',
                    'album': 'Nazev alba',
                    'author': 'Jmeno autora',
                    'path': 'C:/test/nic',
                    'id': '2',
                    'favourite': false,
                    'playlists': []
                },
                {
                    'title': 'Nazev skladby',
                    'album': 'Nazev alba',
                    'path': 'C:/test/nic',
                    'id': '3',
                    'favourite': false,
                    'playlists': []
                }
                ]);
        }));
    }
}