import { getSongsTable } from './dbRequests'


export class MusicTableController
{
    public fetchSongTable(playlistId: string): Promise<object[]> {
        return getSongsTable(playlistId);
    }
}