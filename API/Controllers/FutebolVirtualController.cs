using Application.FutebolVirtualGames;
using Application.FutebolVirtualLeagues;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [AllowAnonymous]
    public class FutebolVirtualController : BaseApiController
    {
        [HttpGet("Games")]
        public async Task<IActionResult> GetFutebolVirtualGames([FromQuery] FutebolVirtualGamesParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListGames.Query { Params = param }));
        }

        [HttpGet("Games/{id}")]
        public async Task<IActionResult> GetFutebolVirtualGame(Guid id)
        {
            return HandleResult(await Mediator.Send(new DetailsGame.Query { Id = id }));
        }

        [HttpGet("GamesTimes/{initialDate}/{finalDate}/{leagueId}")]
        public async Task<IActionResult> GetFutebolVirtualGameByDate(DateTime initialDate,DateTime finalDate, int leagueId)
        {
            return HandleResult(await Mediator.Send(new DetailsGameByDate.Query { InitialDate = initialDate, FinalDate = finalDate, LeagueId = leagueId }));
        }

        [HttpPost("Games")]
        public async Task<IActionResult> CreateFutebolVirtualGame(FutebolVirtualGame futebolVirtualGame)
        {
            return HandleResult(await Mediator.Send(new CreateGame.Command { FutebolVirtualGames = futebolVirtualGame }));
        }

        [HttpPut("Games/{id}")]
        public async Task<IActionResult> Edit(Guid id, FutebolVirtualGame futebolVirtualGame)
        {
            futebolVirtualGame.Id = id;
            return HandleResult(await Mediator.Send(new EditGame.Command { FutebolVirtualGames = futebolVirtualGame }));
        }

        [HttpDelete("Games/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteGame.Command { Id = id }));
        }

        [HttpGet("Leagues")]
        public async Task<IActionResult> GetFutebolVirtualLeagues()
        {
            return HandleResult(await Mediator.Send(new ListLeagues.Query()));
        }

        [HttpGet("Leagues/{id}")]
        public async Task<IActionResult> GetFutebolVirtualLeague(Guid id)
        {
            return HandleResult(await Mediator.Send(new DetailsLeague.Query { Id = id }));
        }

        [HttpPost("Leagues")]
        public async Task<IActionResult> CreateFutebolVirtualLeague(FutebolVirtualLeague futebolVirtualLeague)
        {
            return HandleResult(await Mediator.Send(new CreateLeague.Command { FutebolVirtualLeagues = futebolVirtualLeague }));
        }

        [HttpPut("Leagues/{id}")]
        public async Task<IActionResult> Edit(Guid id, FutebolVirtualLeague futebolVirtualLeague)
        {
            futebolVirtualLeague.VirtualLeagueId = id;
            return HandleResult(await Mediator.Send(new EditLeague.Command { FutebolVirtualLeagues = futebolVirtualLeague }));
        }

        [HttpGet("Max/{league}")]
        public async Task<IActionResult> GetMaximas(string league)
        {
            return Ok(await Mediator.Send(new Max.Query{ League = league }));
        }

        [HttpGet("LastGames/{date}")]
        public async Task<IActionResult> GetLastGames(string date)
        {
            return Ok(await Mediator.Send(new LastGames.Query{ Date = date }));
        }

        [HttpGet("Odd/{gameId}")]
        public async Task<IActionResult> GetOdd(string gameId)
        {
            return Ok(await Mediator.Send(new GetOdd.Query{ GameId = gameId }));
        }

        [HttpGet("GameTime/{idCompetion}/{market}/{time}")]
        public async Task<IActionResult> GetGameTimes(string idCompetion, string market, string time)
        {
            return Ok(await Mediator.Send(new GameTimes.Query{ IdCompetion = idCompetion, Market = market, Time = time }));
        }
    }
}