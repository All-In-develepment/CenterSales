export interface Maximas {
  listMaximas: ListMaxima[];
  matches: Match[];
  chart: Chart;
}

export interface ListMaxima {
  nome: string;
  id: number;
  idCompetition: number;
  idStatistic: number;
  dataUpdate: string;
  atual: number;
  maxima: number;
  porcentagem: number;
  dataEnvio?: string;
  valorEnvio: any;
  idTelegramMessage: any;
  idNextMatch?: number;
  isGreen?: boolean;
  greenRedStartDate?: string;
  greenRedEndDate?: string;
}

export interface Match {
  data: Data;
  homeTop3: HomeTop3[];
  awayTop3: AwayTop3[];
}

export interface Data {
  teamHome: string;
  teamAway: string;
  homeImg: string;
  awayImg: string;
  id: number;
  idCompetition: number;
  idChallenge: number;
  idFixture: number;
  date: string;
  userDate: string;
  title: string;
  idTeamHome: number;
  idTeamAway: number;
  idTeamWinnerHalfTime: number;
  idTeamWinner: number;
  idTeamScoreFirst: number;
  halfTimeResult: string;
  finalTimeResult: string;
  halfTimeHomeScore: number;
  halfTimeAwayScore: number;
  halfTimeDraw: boolean;
  finalTimeDraw: boolean;
  homeScore: number;
  awayScore: number;
  sumScore: number;
  idTeamScoreLast: number;
  positionFirstGoalscorer: string;
}

export interface HomeTop3 {
  teamHome: string;
  teamAway: string;
  homeImg: string;
  awayImg: string;
  id: number;
  idCompetition: number;
  idChallenge: number;
  idFixture: number;
  date: string;
  userDate: string;
  title: string;
  idTeamHome: number;
  idTeamAway: number;
  idTeamWinnerHalfTime: number;
  idTeamWinner: number;
  idTeamScoreFirst: number;
  halfTimeResult: string;
  finalTimeResult: string;
  halfTimeHomeScore: number;
  halfTimeAwayScore: number;
  halfTimeDraw: boolean;
  finalTimeDraw: boolean;
  homeScore: number;
  awayScore: number;
  sumScore: number;
  idTeamScoreLast: number;
  positionFirstGoalscorer: string;
}

export interface AwayTop3 {
  teamHome: string;
  teamAway: string;
  homeImg: string;
  awayImg: string;
  id: number;
  idCompetition: number;
  idChallenge: number;
  idFixture: number;
  date: string;
  userDate: string;
  title: string;
  idTeamHome: number;
  idTeamAway: number;
  idTeamWinnerHalfTime: number;
  idTeamWinner: number;
  idTeamScoreFirst: number;
  halfTimeResult: string;
  finalTimeResult: string;
  halfTimeHomeScore: number;
  halfTimeAwayScore: number;
  halfTimeDraw: boolean;
  finalTimeDraw: boolean;
  homeScore: number;
  awayScore: number;
  sumScore: number;
  idTeamScoreLast: number;
  positionFirstGoalscorer: string;
}

export interface Chart {
  over15: number[];
  over25: number[];
  under25: number[];
  ambasMarcam: number[];
  casaHT: number[];
  empateHT: number[];
  visitanteHT: number[];
  casaFT: number[];
  empateFT: number[];
  visitanteFT: number[];
  empateOuCasa: number[];
  visitanteOuCasa: number[];
  empateOuVisitante: number[];
}
