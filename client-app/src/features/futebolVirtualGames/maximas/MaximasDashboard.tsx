import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

import {
  Button,
  // Grid,
  GridColumn,
  GridRow,
  Label,
  Grid as GridSemantic,
  // Table,
  // TableCell,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Data, ListMaxima, Maximas } from "../../../app/models/maximas";
import MainLineChart from "../../../app/common/chart/mainLineChart";
import TableImparPar from "./Tables/TableImparPar";
import TableOverGols from "./Tables/TableOverGols";
import TableUnderGols from "./Tables/TableUnderGols";
import TableGolsExato from "./Tables/TableGolsExato";
import TableAmbasMarcam from "./Tables/TableAmbasMarcam";
import TableResultadoHT from "./Tables/TableResultadoHT";
import TableResultadoFT from "./Tables/TableResultadoFT";
import TableResultadoExatoFT from "./Tables/TableResultadoExatoFT";
import TablePlcarExatoHT from "./Tables/TablePlcarExatoHT";
import TablePrimeiroAMarcar from "./Tables/TablePrimeiroAMarcar";
import TablePrimerioTimeAMarcar from "./Tables/TablePrimerioTimeAMarcar";
import TableUltimoTimeAMarcar from "./Tables/TableUltimoTimeAMarcar";
import Odds from "../odds/Odds";
import { Grid, TableContainer, TableHead, TableBody, TableRow, TableCell, tableCellClasses, Table, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

export default observer(function MaximasDashboard() {
  const { MaximasStore, modalStore } = useStore();

  const { loadMaximas } = MaximasStore;

  const [selectedTournament, setSelectedTournament] = useState("20700663");
  const [dataTournament, setDataTournament] = useState<Maximas>();

  // State das variaveis da lista de Maximas
  // Par / Impar
  const [golsPar, setGolsPar] = useState<ListMaxima>();
  const [golsImpar, setGolsImparAtual] = useState<ListMaxima>();
  // Over Gols
  const [over05, setOver05] = useState<ListMaxima>();
  const [over15, setOver15] = useState<ListMaxima>();
  const [over25, setOver25] = useState<ListMaxima>();
  const [over35, setOver35] = useState<ListMaxima>();
  // Under Gols
  const [under05, setUnder05] = useState<ListMaxima>();
  const [under15, setUnder15] = useState<ListMaxima>();
  const [under25, setUnder25] = useState<ListMaxima>();
  const [under35, setUnder35] = useState<ListMaxima>();
  // Gols Exatos
  const [gols0, setGols0] = useState<ListMaxima>();
  const [gols1, setGols1] = useState<ListMaxima>();
  const [gols2, setGols2] = useState<ListMaxima>();
  const [gols3, setGols3] = useState<ListMaxima>();
  const [gols4, setGols4] = useState<ListMaxima>();
  const [gols5, setGols5] = useState<ListMaxima>();
  // Ambas Marcam / Não Marcam
  const [ambasMarcam, setAmbasMarcam] = useState<ListMaxima>();
  const [ambasNaoMarcam, setAmbasNaoMarcam] = useState<ListMaxima>();
  // Resultado HT
  const [casaHT, setCasaHT] = useState<ListMaxima>();
  const [empateHT, setEmpateHT] = useState<ListMaxima>();
  const [visitanteHT, setVisitanteHT] = useState<ListMaxima>();
  // Resultado FT
  const [casaFT, setCasaFT] = useState<ListMaxima>();
  const [empateFT, setEmpateFT] = useState<ListMaxima>();
  const [visitanteFT, setVisitanteFT] = useState<ListMaxima>();
  // Resultado Exato FT
  const [score1x0FT, setScore1x0FT] = useState<ListMaxima>();
  const [score0x0FT, setScore0x0FT] = useState<ListMaxima>();
  const [score0x1FT, setScore0x1FT] = useState<ListMaxima>();
  const [score2x0FT, setScore2x0FT] = useState<ListMaxima>();
  const [score1x1FT, setScore1x1FT] = useState<ListMaxima>();
  const [score0x2FT, setScore0x2FT] = useState<ListMaxima>();
  const [score2x1FT, setScore2x1FT] = useState<ListMaxima>();
  const [score2x2FT, setScore2x2FT] = useState<ListMaxima>();
  const [score1x2FT, setScore1x2FT] = useState<ListMaxima>();
  const [score3x0FT, setScore3x0FT] = useState<ListMaxima>();
  const [score3x3FT, setScore3x3FT] = useState<ListMaxima>();
  const [score0x3FT, setScore0x3FT] = useState<ListMaxima>();
  const [score3x1FT, setScore3x1FT] = useState<ListMaxima>();
  const [score4x4FT, setScore4x4FT] = useState<ListMaxima>();
  const [score1x3FT, setScore1x3FT] = useState<ListMaxima>();
  const [score3x2FT, setScore3x2FT] = useState<ListMaxima>();
  const [score2x3FT, setScore2x3FT] = useState<ListMaxima>();
  const [score4x0FT, setScore4x0FT] = useState<ListMaxima>();
  const [score0x4FT, setScore0x4FT] = useState<ListMaxima>();
  // Resultado Exato HT
  const [score1x0HT, setScore1x0] = useState<ListMaxima>();
  const [score0x0HT, setScore0x0] = useState<ListMaxima>();
  const [score0x1HT, setScore0x1] = useState<ListMaxima>();
  const [score2x0HT, setScore2x0] = useState<ListMaxima>();
  const [score1x1HT, setScore1x1] = useState<ListMaxima>();
  const [score0x2HT, setScore0x2] = useState<ListMaxima>();
  // Primeiro a Marcar
  const [semMarcador, setSemMarcador] = useState<ListMaxima>();
  const [centroAvanteCasa, setCentroAvanteCasa] = useState<ListMaxima>();
  const [centroAvanteVisitante, setCentroAvanteVisitante] =
    useState<ListMaxima>();
  const [pontaDireitaCasa, setPontaDireitaCasa] = useState<ListMaxima>();
  const [pontaDireitaVisitante, setPontaDireitaVisitante] =
    useState<ListMaxima>();
  const [pontaEsquerdaCasa, setPontaEsquerdaCasa] = useState<ListMaxima>();
  const [pontaEsquerdaVisitante, setPontaEsquerdaVisitante] =
    useState<ListMaxima>();
  const [meiaAtacanteCasa, setMeiaAtacanteCasa] = useState<ListMaxima>();
  const [meiaAtacanteVisitante, setMeiaAtacanteVisitante] =
    useState<ListMaxima>();
  const [outroJogadorCasa, setOutroJogadorCasa] = useState<ListMaxima>();
  const [outroJogadorVisitante, setOutroJogadorVisitante] =
    useState<ListMaxima>();
  // Primeiro Time a Marcar
  const [primeiroTimeCasa, setPrimeiroTimeCasa] = useState<ListMaxima>();
  const [primeiroTimeVisitante, setPrimeiroTimeVisitante] =
    useState<ListMaxima>();
  const [primeiroTimeSemMarcador, setPrimeiroTimeSemMarcador] =
    useState<ListMaxima>();
  // ultimo Time a Marcar
  const [ultimoTimeCasa, setUltimoTimeCasa] = useState<ListMaxima>();
  const [ultimoTimeVisitante, setUltimoTimeVisitante] = useState<ListMaxima>();
  const [ultimoTimeSemMarcador, setUltimoTimeSemMarcador] =
    useState<ListMaxima>();

  async function handleEffect() {
    const maximasData = await loadMaximas(selectedTournament);

    maximasData ? setDataTournament(maximasData) : console.log("ihh rapaz");
  }

  useEffect(() => {
    if (dataTournament) {
      // Par / Impar
      // Encontrar e setar gols par
      const golPar = dataTournament.listMaximas.find(
        (golPar) => golPar.nome === "gols_par"
      );
      setGolsPar(golPar!);

      // Encontrar e setar gols impar
      const golImpar = dataTournament.listMaximas.find(
        (golImpar) => golImpar.nome === "gols_impar"
      );
      setGolsImparAtual(golImpar!);

      // Over Gols
      // Encontrar e setar gols over 0.5
      const golOver05 = dataTournament.listMaximas.find(
        (golOver05) => golOver05.nome === "over_05"
      );
      setOver05(golOver05!);

      // Encontrar e setar gols over 1.5
      const golOver15 = dataTournament.listMaximas.find(
        (golOver15) => golOver15.nome === "over_15"
      );
      setOver15(golOver15!);

      // Encontrar e setar gols over 2.5
      const golOver25 = dataTournament.listMaximas.find(
        (golOver25) => golOver25.nome === "over_25"
      );
      setOver25(golOver25!);

      // Encontrar e setar gols over 3.5
      const golOver35 = dataTournament.listMaximas.find(
        (golOver35) => golOver35.nome === "over_35"
      );
      setOver35(golOver35!);

      // Under Gols
      // Encontrar e setar gols under 0.5
      const golUnder05 = dataTournament.listMaximas.find(
        (golUnder05) => golUnder05.nome === "under_05"
      );
      setUnder05(golUnder05!);

      // Encontrar e setar gols under 1.5
      const golUnder15 = dataTournament.listMaximas.find(
        (golUnder15) => golUnder15.nome === "under_15"
      );
      setUnder15(golUnder15!);

      // Encontrar e setar gols under 2.5
      const golUnder25 = dataTournament.listMaximas.find(
        (golUnder25) => golUnder25.nome === "under_25"
      );
      setUnder25(golUnder25!);

      // Encontrar e setar gols under 3.5
      const golUnder35 = dataTournament.listMaximas.find(
        (golUnder35) => golUnder35.nome === "under_35"
      );
      setUnder35(golUnder35!);

      // Gols Exatos
      // Encontrar e setar gols 0
      const gol0 = dataTournament.listMaximas.find(
        (gol0) => gol0.nome === "gols_exatos_0"
      );
      setGols0(gol0!);

      // Encontrar e setar gols 1
      const gol1 = dataTournament.listMaximas.find(
        (gol1) => gol1.nome === "gols_exatos_1"
      );
      setGols1(gol1!);

      // Encontrar e setar gols 2
      const gol2 = dataTournament.listMaximas.find(
        (gol2) => gol2.nome === "gols_exatos_2"
      );
      setGols2(gol2!);

      // Encontrar e setar gols 3
      const gol3 = dataTournament.listMaximas.find(
        (gol3) => gol3.nome === "gols_exatos_3"
      );
      setGols3(gol3!);

      // Encontrar e setar gols 4
      const gol4 = dataTournament.listMaximas.find(
        (gol4) => gol4.nome === "gols_exatos_4"
      );
      setGols4(gol4!);

      // Encontrar e setar gols 5
      const gol5 = dataTournament.listMaximas.find(
        (gol5) => gol5.nome === "gols_exatos_5"
      );
      setGols5(gol5!);

      // Encontrar e setar ambas marcam
      // Ambas marcam
      const ambasMarcam = dataTournament.listMaximas.find(
        (ambasMarcam) => ambasMarcam.nome === "resultado_ambas_marcam"
      );
      setAmbasMarcam(ambasMarcam!);

      // Ambas não marcam
      const ambasNaoMarcam = dataTournament.listMaximas.find(
        (ambasNaoMarcam) => ambasNaoMarcam.nome === "resultado_ambas_nao_marcam"
      );
      setAmbasNaoMarcam(ambasNaoMarcam!);

      // Encontrar e setar resultado HT Casa
      // Casa
      const casaHTParse = dataTournament.listMaximas.find(
        (casaHT) => casaHT.nome === "resultado_vencedor_ht_casa"
      );
      setCasaHT(casaHTParse!);

      // Empate
      const empateHTParse = dataTournament.listMaximas.find(
        (empateHT) => empateHT.nome === "resultado_vencedor_ht_empate"
      );
      setEmpateHT(empateHTParse!);

      // Visitante
      const visitanteHTParse = dataTournament.listMaximas.find(
        (visitanteHT) => visitanteHT.nome === "resultado_vencedor_ht_visitante"
      );
      setVisitanteHT(visitanteHTParse!);

      // Encontrar e setar resultado FT Casa
      // Casa
      const casaFTParse = dataTournament.listMaximas.find(
        (casaFT) => casaFT.nome === "resultado_vencedor_ft_casa"
      );
      setCasaFT(casaFTParse!);

      // Empate
      const empateFTParse = dataTournament.listMaximas.find(
        (empateFT) => empateFT.nome === "resultado_vencedor_ft_empate"
      );
      setEmpateFT(empateFTParse!);

      // Visitante
      const visitanteFTParse = dataTournament.listMaximas.find(
        (visitanteFT) => visitanteFT.nome === "resultado_vencedor_ft_visitante"
      );
      setVisitanteFT(visitanteFTParse!);

      // Encontrar e setar placar exato FT
      // 1x0
      const score1x0Parse = dataTournament.listMaximas.find(
        (score1x0) => score1x0.nome === "resultado_ft_1x0"
      );
      setScore1x0FT(score1x0Parse!);

      // 0x0
      const score0x0Parse = dataTournament.listMaximas.find(
        (score0x0) => score0x0.nome === "resultado_ft_0x0"
      );
      setScore0x0FT(score0x0Parse!);

      // 0x1
      const score0x1Parse = dataTournament.listMaximas.find(
        (score0x1) => score0x1.nome === "resultado_ft_0x1"
      );
      setScore0x1FT(score0x1Parse!);

      // 2x0
      const score2x0Parse = dataTournament.listMaximas.find(
        (score2x0) => score2x0.nome === "resultado_ft_2x0"
      );
      setScore2x0FT(score2x0Parse!);

      // 1x1
      const score1x1Parse = dataTournament.listMaximas.find(
        (score1x1) => score1x1.nome === "resultado_ft_1x1"
      );
      setScore1x1FT(score1x1Parse!);

      // 0x2
      const score0x2Parse = dataTournament.listMaximas.find(
        (score0x2) => score0x2.nome === "resultado_ft_0x2"
      );
      setScore0x2FT(score0x2Parse!);

      // 2x1
      const score2x1Parse = dataTournament.listMaximas.find(
        (score2x1) => score2x1.nome === "resultado_ft_2x1"
      );
      setScore2x1FT(score2x1Parse!);

      // 2x2
      const score2x2Parse = dataTournament.listMaximas.find(
        (score2x2) => score2x2.nome === "resultado_ft_2x2"
      );
      setScore2x2FT(score2x2Parse!);

      // 1x2
      const score1x2Parse = dataTournament.listMaximas.find(
        (score1x2) => score1x2.nome === "resultado_ft_1x2"
      );
      setScore1x2FT(score1x2Parse!);

      // 3x0
      const score3x0Parse = dataTournament.listMaximas.find(
        (score3x0) => score3x0.nome === "resultado_ft_3x0"
      );
      setScore3x0FT(score3x0Parse!);

      // 3x3
      const score3x3Parse = dataTournament.listMaximas.find(
        (score3x3) => score3x3.nome === "resultado_ft_3x3"
      );
      setScore3x3FT(score3x3Parse!);

      // 0x3
      const score0x3Parse = dataTournament.listMaximas.find(
        (score0x3) => score0x3.nome === "resultado_ft_0x3"
      );
      setScore0x3FT(score0x3Parse!);

      // 3x1
      const score3x1Parse = dataTournament.listMaximas.find(
        (score3x1) => score3x1.nome === "resultado_ft_3x1"
      );
      setScore3x1FT(score3x1Parse!);

      // 4x4
      const score4x4Parse = dataTournament.listMaximas.find(
        (score4x4) => score4x4.nome === "resultado_ft_4x4"
      );
      setScore4x4FT(score4x4Parse!);

      // 1x3
      const score1x3Parse = dataTournament.listMaximas.find(
        (score1x3) => score1x3.nome === "resultado_ft_1x3"
      );
      setScore1x3FT(score1x3Parse!);

      // 3x2
      const score3x2Parse = dataTournament.listMaximas.find(
        (score3x2) => score3x2.nome === "resultado_ft_3x2"
      );
      setScore3x2FT(score3x2Parse!);

      // 2x3
      const score2x3Parse = dataTournament.listMaximas.find(
        (score2x3) => score2x3.nome === "resultado_ft_2x3"
      );
      setScore2x3FT(score2x3Parse!);

      // 4x0
      const score4x0Parse = dataTournament.listMaximas.find(
        (score4x0) => score4x0.nome === "resultado_ft_4x0"
      );
      setScore4x0FT(score4x0Parse!);

      // 0x4
      const score0x4Parse = dataTournament.listMaximas.find(
        (score0x4) => score0x4.nome === "resultado_ft_0x4"
      );
      setScore0x4FT(score0x4Parse!);

      // Encontrar e setar placar exato HT
      // 1x0
      const score1x0ParseHT = dataTournament.listMaximas.find(
        (score1x0) => score1x0.nome === "resultado_ht_1x0"
      );
      setScore1x0(score1x0ParseHT!);

      // 0x0
      const score0x0ParseHT = dataTournament.listMaximas.find(
        (score0x0) => score0x0.nome === "resultado_ht_0x0"
      );
      setScore0x0(score0x0ParseHT!);

      // 0x1
      const score0x1ParseHT = dataTournament.listMaximas.find(
        (score0x1) => score0x1.nome === "resultado_ht_0x1"
      );
      setScore0x1(score0x1ParseHT!);

      // 2x0
      const score2x0ParseHT = dataTournament.listMaximas.find(
        (score2x0) => score2x0.nome === "resultado_ht_2x0"
      );
      setScore2x0(score2x0ParseHT!);

      // 1x1
      const score1x1ParseHT = dataTournament.listMaximas.find(
        (score1x1) => score1x1.nome === "resultado_ht_1x1"
      );
      setScore1x1(score1x1ParseHT!);

      // 0x2
      const score0x2ParseHT = dataTournament.listMaximas.find(
        (score0x2) => score0x2.nome === "resultado_ht_0x2"
      );
      setScore0x2(score0x2ParseHT!);
    }

    // Primeiro a Marcar
    // Sem Marcador
    const semMarcadorParse = dataTournament?.listMaximas.find(
      (semMarcador) => semMarcador.nome === "goalscorer_sem_marcador"
    );
    setSemMarcador(semMarcadorParse!);

    // Centro Avante Casa
    const centroAvanteCasaParse = dataTournament?.listMaximas.find(
      (centroAvanteCasa) =>
        centroAvanteCasa.nome === "goalscorer_centro_avante_casa"
    );
    setCentroAvanteCasa(centroAvanteCasaParse!);

    // Centro Avante Visitante
    const centroAvanteVisitanteParse = dataTournament?.listMaximas.find(
      (centroAvanteVisitante) =>
        centroAvanteVisitante.nome === "goalscorer_centro_avante_fora"
    );
    setCentroAvanteVisitante(centroAvanteVisitanteParse!);

    // Ponta Direita Casa
    const pontaDireitaCasaParse = dataTournament?.listMaximas.find(
      (pontaDireitaCasa) =>
        pontaDireitaCasa.nome === "goalscorer_ponta_direita_casa"
    );
    setPontaDireitaCasa(pontaDireitaCasaParse!);

    // Ponta Direita Visitante
    const pontaDireitaVisitanteParse = dataTournament?.listMaximas.find(
      (pontaDireitaVisitante) =>
        pontaDireitaVisitante.nome === "goalscorer_ponta_direita_fora"
    );
    setPontaDireitaVisitante(pontaDireitaVisitanteParse!);

    // Ponta Esquerda Casa
    const pontaEsquerdaCasaParse = dataTournament?.listMaximas.find(
      (pontaEsquerdaCasa) =>
        pontaEsquerdaCasa.nome === "goalscorer_ponta_esquerda_casa"
    );
    setPontaEsquerdaCasa(pontaEsquerdaCasaParse!);

    // Ponta Esquerda Visitante
    const pontaEsquerdaVisitanteParse = dataTournament?.listMaximas.find(
      (pontaEsquerdaVisitante) =>
        pontaEsquerdaVisitante.nome === "goalscorer_ponta_esquerda_fora"
    );
    setPontaEsquerdaVisitante(pontaEsquerdaVisitanteParse!);

    // Meia Atacante Casa
    const meiaAtacanteCasaParse = dataTournament?.listMaximas.find(
      (meiaAtacanteCasa) =>
        meiaAtacanteCasa.nome === "goalscorer_meia_atacante_casa"
    );
    setMeiaAtacanteCasa(meiaAtacanteCasaParse!);

    // Meia Atacante Visitante
    const meiaAtacanteVisitanteParse = dataTournament?.listMaximas.find(
      (meiaAtacanteVisitante) =>
        meiaAtacanteVisitante.nome === "goalscorer_meia_atacante_fora"
    );
    setMeiaAtacanteVisitante(meiaAtacanteVisitanteParse!);

    // Outro Jogador Casa
    const outroJogadorCasaParse = dataTournament?.listMaximas.find(
      (outroJogadorCasa) =>
        outroJogadorCasa.nome === "goalscorer_qualquer_jogador_casa"
    );
    setOutroJogadorCasa(outroJogadorCasaParse!);

    // Outro Jogador Visitante
    const outroJogadorVisitanteParse = dataTournament?.listMaximas.find(
      (outroJogadorVisitante) =>
        outroJogadorVisitante.nome === "goalscorer_qualquer_jogador_fora"
    );
    setOutroJogadorVisitante(outroJogadorVisitanteParse!);

    // Primeiro Time a Marcar
    // Casa
    const primeiroTimeCasaParse = dataTournament?.listMaximas.find(
      (primeiroTimeCasa) => primeiroTimeCasa.nome === "time_primeiro_gol_casa"
    );
    setPrimeiroTimeCasa(primeiroTimeCasaParse!);

    // Visitante
    const primeiroTimeVisitanteParse = dataTournament?.listMaximas.find(
      (primeiroTimeVisitante) =>
        primeiroTimeVisitante.nome === "time_primeiro_gol_fora"
    );
    setPrimeiroTimeVisitante(primeiroTimeVisitanteParse!);

    // Sem Marcador
    const primeiroTimeSemMarcadorParse = dataTournament?.listMaximas.find(
      (primeiroTimeSemMarcador) =>
        primeiroTimeSemMarcador.nome === "time_primeiro_gol_nenhum"
    );
    setPrimeiroTimeSemMarcador(primeiroTimeSemMarcadorParse!);

    // Ultimo Time a Marcar
    // Casa
    const ultimoTimeCasaParse = dataTournament?.listMaximas.find(
      (ultimoTimeCasa) => ultimoTimeCasa.nome === "time_ultimo_gol_casa"
    );
    setUltimoTimeCasa(ultimoTimeCasaParse!);

    // Visitante
    const ultimoTimeVisitanteParse = dataTournament?.listMaximas.find(
      (ultimoTimeVisitante) =>
        ultimoTimeVisitante.nome === "time_ultimo_gol_fora"
    );
    setUltimoTimeVisitante(ultimoTimeVisitanteParse!);

    // Sem Marcador
    const ultimoTimeSemMarcadorParse = dataTournament?.listMaximas.find(
      (ultimoTimeSemMarcador) =>
        ultimoTimeSemMarcador.nome === "time_ultimo_gol_nenhum"
    );
    setUltimoTimeSemMarcador(ultimoTimeSemMarcadorParse!);
  }, [dataTournament]);

  useEffect(
    () => {
      handleEffect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTournament]
  );

  console.log(golsPar?.atual);

  const renderOddsComponent = (leagueId: number) => {
    // console.log("a liga: ", leagueId);
    return <Odds leagueId={String(leagueId)}/>;
  };

  let larguraDaTela = window.innerWidth;
  // console.log(larguraDaTela);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      {/* Botões de seleção de liga */}
      <Grid container spacing={1} className="gridLigas">
        <Grid md={3} onClick={() => setSelectedTournament("20700663")} className="bannerEuroCopa">
          <img src="/assets/banners/euro_cup.jpg" alt="Euro Cup" className="leagues_buton" /> 
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20120650")} className="bannerCopaDoMundo">
          <img src="/assets/banners/copa_do_mundo.jpg" alt="Copa do Mundo" className="leagues_buton" />
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20120653")} className="bannerPremierShip">
          <img src="/assets/banners/premiership.jpg" alt="Premier League" className="leagues_buton" />
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20849528")} className="bannerSuperLeague">
          <img src="/assets/banners/superleague.jpg" alt="Sul-Americana" className="leagues_buton" />
        </Grid>
      </Grid>

      {/* Gráfico */}
      {dataTournament && (
        <GridSemantic textAlign="center" columns={1} >
          <GridColumn>
            <MainLineChart
              over15={dataTournament.chart.over15}
              over25={dataTournament.chart.over25}
              under25={dataTournament.chart.under25}
              ambasMarcam={dataTournament.chart.ambasMarcam}
              casaHT={dataTournament.chart.casaHT}
              empateHT={dataTournament.chart.empateHT}
              visitanteHT={dataTournament.chart.visitanteHT}
              casaFT={dataTournament.chart.casaFT}
              empateFT={dataTournament.chart.empateFT}
              visitanteFT={dataTournament.chart.visitanteFT}
              empateOuCasa={dataTournament.chart.empateOuCasa}
              visitanteOuCasa={dataTournament.chart.visitanteOuCasa}
              empateOuVisitante={dataTournament.chart.empateOuVisitante}
              height={ larguraDaTela > 1000 ? 400 : 300 }
              width={ larguraDaTela > 980 ? larguraDaTela * 0.58 : larguraDaTela * 0.9 }
              marginLeft={ larguraDaTela > 1000 ? 20 : 0}
              marginRight={ larguraDaTela > 1000 ? 20 : 0}
            />
          </GridColumn>
        </GridSemantic>
      )}

      {golsPar && (
        <GridSemantic>
          <GridRow columns={2} textAlign="center">

            {/* Primeira Coluna */}
            <GridColumn >
              {/* Sessão PAR / IMPAR */}
              <TableImparPar
                parAtual={golsPar!.atual}
                parMaxima={golsPar!.maxima}
                imparAtual={golsImpar!.atual}
                imparMaxima={golsImpar!.maxima}
              /><br />

              {/* Sessão OVER GOLS */}
              <TableOverGols
                over05Atual={over05!.atual}
                over05Maxima={over05!.maxima}
                over15Atual={over15!.atual}
                over15Maxima={over15!.maxima}
                over25Atual={over25!.atual}
                over25Maxima={over25!.maxima}
                over35Atual={over35!.atual}
                over35Maxima={over35!.maxima}
              /><br />

              {/* Sessão UNDER GOLS */}
              <TableUnderGols
                under05Atual={under05!.atual}
                under05Maxima={under05!.maxima}
                under15Atual={under15!.atual}
                under15Maxima={under15!.maxima}
                under25Atual={under25!.atual}
                under25Maxima={under25!.maxima}
                under35Atual={under35!.atual}
                under35Maxima={under35!.maxima}
              /><br />

              {/* Sessão GOLS Exatos */}
              <TableGolsExato
                gols0Atual={gols0!.atual}
                gols0Maxima={gols0!.maxima}
                gols1Atual={gols1!.atual}
                gols1Maxima={gols1!.maxima}
                gols2Atual={gols2!.atual}
                gols2Maxima={gols2!.maxima}
                gols3Atual={gols3!.atual}
                gols3Maxima={gols3!.maxima}
                gols4Atual={gols4!.atual}
                gols4Maxima={gols4!.maxima}
                gols5Atual={gols5!.atual}
                gols5Maxima={gols5!.maxima}
              /><br />

              {/* Sessão AMBAS MARCAM */}
              <TableAmbasMarcam
                ambasMarcamAtual={ambasMarcam!.atual}
                ambasMarcamMaxima={ambasMarcam!.maxima}
                ambasNaoMarcamAtual={ambasNaoMarcam!.atual}
                ambasNaoMarcamMaxima={ambasNaoMarcam!.maxima}
              /><br />

              {/* Sessão Resultado Intervalo / HT */}
              <TableResultadoHT
                casaAtual={casaHT!.atual}
                casaMaxima={casaHT!.maxima}
                empateAtual={empateHT!.atual}
                empateMaxima={empateHT!.maxima}
                foraAtual={visitanteHT!.atual}
                foraMaxima={visitanteHT!.maxima}
              /><br />

              {/* Sessão Resultado Final / FT */}
              <TableResultadoFT
                casaAtual={casaFT!.atual}
                casaMaxima={casaFT!.maxima}
                empateAtual={empateFT!.atual}
                empateMaxima={empateFT!.maxima}
                foraAtual={visitanteFT!.atual}
                foraMaxima={visitanteFT!.maxima}
              /><br />

              {/* Sessão Placar Exato FT */}
              <TableResultadoExatoFT
                score1x0Atual={score1x0FT!.atual}
                score1x0Maxima={score1x0FT!.maxima}
                score0x0Atual={score0x0FT!.atual}
                score0x0Maxima={score0x0FT!.maxima}
                score0x1Atual={score0x1FT!.atual}
                score0x1Maxima={score0x1FT!.maxima}
                score2x0Atual={score2x0FT!.atual}
                score2x0Maxima={score2x0FT!.maxima}
                score1x1Atual={score1x1FT!.atual}
                score1x1Maxima={score1x1FT!.maxima}
                score0x2Atual={score0x2FT!.atual}
                score0x2Maxima={score0x2FT!.maxima}
                score2x1Atual={score2x1FT!.atual}
                score2x1Maxima={score2x1FT!.maxima}
                score2x2Atual={score2x2FT!.atual}
                score2x2Maxima={score2x2FT!.maxima}
                score1x2Atual={score1x2FT!.atual}
                score1x2Maxima={score1x2FT!.maxima}
                score3x0Atual={score3x0FT!.atual}
                score3x0Maxima={score3x0FT!.maxima}
                score3x3Atual={score3x3FT!.atual}
                score3x3Maxima={score3x3FT!.maxima}
                score0x3Atual={score0x3FT!.atual}
                score0x3Maxima={score0x3FT!.maxima}
                score3x1Atual={score3x1FT!.atual}
                score3x1Maxima={score3x1FT!.maxima}
                score4x4Atual={score4x4FT!.atual}
                score4x4Maxima={score4x4FT!.maxima}
                score1x3Atual={score1x3FT!.atual}
                score1x3Maxima={score1x3FT!.maxima}
                score3x2Atual={score3x2FT!.atual}
                score3x2Maxima={score3x2FT!.maxima}
                score2x3Atual={score2x3FT!.atual}
                score2x3Maxima={score2x3FT!.maxima}
                score4x0Atual={score4x0FT!.atual}
                score4x0Maxima={score4x0FT!.maxima}
                score0x4Atual={score0x4FT!.atual}
                score0x4Maxima={score0x4FT!.maxima}
              /><br />

              {/* Sessão Placar Exato HT */}
              <TablePlcarExatoHT
                score1x0Atual={score1x0HT!.atual}
                score1x0Maxima={score1x0HT!.maxima}
                score0x0Atual={score0x0HT!.atual}
                score0x0Maxima={score0x0HT!.maxima}
                score0x1Atual={score0x1HT!.atual}
                score0x1Maxima={score0x1HT!.maxima}
                score2x0Atual={score2x0HT!.atual}
                score2x0Maxima={score2x0HT!.maxima}
                score1x1Atual={score1x1HT!.atual}
                score1x1Maxima={score1x1HT!.maxima}
                score0x2Atual={score0x2HT!.atual}
                score0x2Maxima={score0x2HT!.maxima}
              /><br />

              {/* Sessão Primeiro a Marcar */}
              <TablePrimeiroAMarcar
                semMarcadorAtual={semMarcador!.atual}
                semMarcadorMaxima={semMarcador!.maxima}
                centroAvanteCasaAtual={centroAvanteCasa!.atual}
                centroAvanteCasaMaxima={centroAvanteCasa!.maxima}
                centroAvanteVisitanteAtual={centroAvanteVisitante!.atual}
                centroAvanteVisitanteMaxima={centroAvanteVisitante!.maxima}
                pontaDireitaCasaAtual={pontaDireitaCasa!.atual}
                pontaDireitaCasaMaxima={pontaDireitaCasa!.maxima}
                pontaDireitaVisitanteAtual={pontaDireitaVisitante!.atual}
                pontaDireitaVisitanteMaxima={pontaDireitaVisitante!.maxima}
                pontaEsquerdaCasaAtual={pontaEsquerdaCasa!.atual}
                pontaEsquerdaCasaMaxima={pontaEsquerdaCasa!.maxima}
                pontaEsquerdaVisitanteAtual={pontaEsquerdaVisitante!.atual}
                pontaEsquerdaVisitanteMaxima={pontaEsquerdaVisitante!.maxima}
                meiaAtacanteCasaAtual={meiaAtacanteCasa!.atual}
                meiaAtacanteCasaMaxima={meiaAtacanteCasa!.maxima}
                meiaAtacanteVisitanteAtual={meiaAtacanteVisitante!.atual}
                meiaAtacanteVisitanteMaxima={meiaAtacanteVisitante!.maxima}
                outroJogadorCasaAtual={outroJogadorCasa!.atual}
                outroJogadorCasaMaxima={outroJogadorCasa!.maxima}
                outroJogadorVisitanteAtual={outroJogadorVisitante!.atual}
                outroJogadorVisitanteMaxima={outroJogadorVisitante!.maxima}
              /><br />

              {/* Sessão Primeiro Time a Marcar */}
              <TablePrimerioTimeAMarcar
                casaAtual={primeiroTimeCasa!.atual}
                casaMaxima={primeiroTimeCasa!.maxima}
                empateAtual={primeiroTimeSemMarcador!.atual}
                empateMaxima={primeiroTimeSemMarcador!.maxima}
                foraAtual={primeiroTimeVisitante!.atual}
                foraMaxima={primeiroTimeVisitante!.maxima}
              /><br />

              {/* Sessão Ultimo Time a Marcar */}
              <TableUltimoTimeAMarcar
                casaAtual={ultimoTimeCasa!.atual}
                casaMaxima={ultimoTimeCasa!.maxima}
                empateAtual={ultimoTimeVisitante!.atual}
                empateMaxima={ultimoTimeVisitante!.maxima}
                foraAtual={ultimoTimeSemMarcador!.atual}
                foraMaxima={ultimoTimeSemMarcador!.maxima}
              /><br />
            </GridColumn>

            {/* Segunda Coluna */}
            <GridColumn>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Hora</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Casa</StyledTableCell>
                    <StyledTableCell>Placar</StyledTableCell>
                    <StyledTableCell>Visitante</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableHead>
                  <TableBody className="tablesMax">
                    {dataTournament?.matches.map((match) => (
                      <TableRow key={match.data.id}>
                        <StyledTableCell align="center" className="table_detail_body">
                          {/* Botaão para abrir o composnete Odds como modal em fullscreen */}
                          <Button
                            onClick={() =>
                              modalStore.openModal(
                                renderOddsComponent(match.data.id), 'large'
                              )
                            }
                            size="medium"
                            
                          >
                            ODDS
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">{match.data.date.split("T")[1]}</StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">
                          {match.homeTop3.map((homeTop) =>
                            homeTop.idTeamWinner === homeTop.idTeamHome ? (
                              <Label color="green">V</Label>
                            ) : homeTop.finalTimeDraw === true ? (
                              <Label color="yellow">E</Label>
                            ) : (
                              <Label color="red">D</Label>
                            )
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">
                          <img
                            src={`/assets/flags/${match.data.homeImg}`}
                            alt={match.data.homeImg}
                            width={60}
                          />
                          {match.data.teamHome}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">{match.data.finalTimeResult}</StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">
                          <img
                            src={`/assets/flags/${match.data.awayImg}`}
                            alt={match.data.awayImg}
                            width={60}
                          />
                          {match.data.teamAway}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="table_detail_body">
                          {match.awayTop3.map((awayTop) =>
                            awayTop.idTeamWinner === awayTop.idTeamAway ? (
                              <Label color="green">V</Label>
                            ) : awayTop.finalTimeDraw === true ? (
                              <Label color="yellow">E</Label>
                            ) : (
                              <Label color="red">D</Label>
                            )
                          )}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </GridColumn>

            {/* Fim Segunda Coluna */}
          </GridRow>
        </GridSemantic>
      )}
    </>
  );
});
