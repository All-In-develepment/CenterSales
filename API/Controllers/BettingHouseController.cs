using Application.BettingHouse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class BettingHouseController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBettingHouses()
        {
            return HandleResult(await Mediator.Send(new ListBettingHouse.Query()));
        }

        [HttpGet("{bettingHouseName}")]
        public async Task<IActionResult> GetBettingHouse(string bettingHouseName)
        {
            return HandleResult(await Mediator.Send(new GetBetingByName.Query { BettingHouseName = bettingHouseName }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBettingHouse(Domain.BettingHouse bettingHouse)
        {
            return HandleResult(await Mediator.Send(new CreateBettingHouse.Command { BettingHouse = bettingHouse }));
        }
    }
}