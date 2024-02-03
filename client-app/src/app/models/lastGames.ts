export interface ILastGames {
  id: number;
  competition: string;
  changeDate: boolean;
  matches: Match[];
}

export interface Match {
  id: number;
  teamHome: string;
  teamAway: string;
  sumScore: number;
  finalTimeResult: string;
  halfTimeResult: string;
  date: string;
  homeImg: string;
  awayImg: string;
}
