import { getSongsTable } from './dbRequests'

export class PlaylistController
{
    public fetchPlaylists(): Promise<object[]> {
        return new Promise<object[]>((resolve => {
            resolve([
                {
                    'id': '0',
                    'name': 'pl0',
                    'songs_count': 22
                },
                {
                    'id': '1',
                    'name': 'pl1',
                    'songs_count': 69
                },
                {
                    'id': '2',
                    'name': 'pl2',
                    'songs_count': 42
                },
                {
                    'id': '3',
                    'name': 'pl3',
                    'songs_count': 420
                },
                {
                    'id': '4',
                    'name': 'pl4',
                    'songs_count': 420
                },
                {
                    'id': '4',
                    'name': 'pl4',
                    'songs_count': 420
                },
                {
                    'id': '3',
                    'name': 'pl3',
                    'songs_count': 420
                },
                {
                    'id': '4',
                    'name': 'pl4',
                    'songs_count': 420
                },
                {
                    'id': '5',
                    'name': 'pl5',
                    'songs_count': 420
                },
                {
                    'id': '5',
                    'name': 'pl5',
                    'songs_count': 420
                }
            ]);
        }));
    }
}