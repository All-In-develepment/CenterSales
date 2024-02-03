export interface FutebolVirtualGames {
  id: string;
  idBet365: number;
  homeTeam: string;
  awayTeam: string;
  sumScore: number;
  finalTimeResult: string;
  halfTimeResult: string;
  date: Date | null;
  homeImg: string;
  awayImg: string;
  leagueId: number;
}
