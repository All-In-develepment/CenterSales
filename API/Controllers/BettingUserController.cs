using Application.BettingUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class BettingUserController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBettingUsers()
        {
            return HandleResult(await Mediator.Send(new ListBettingUsers.Query()));
        }

        [HttpGet("TelegramUserId/{telegramUserId}/BettingHouseId/{bettingHouseId}")]
        public async Task<IActionResult> GetBettingUser(int telegramUserId, int bettingHouseId)
        {
            return HandleResult(await Mediator.Send(new GetBettingUserById.Query { TelegramUserId = telegramUserId, BettingHouseId = bettingHouseId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBettingUser(Domain.BettingUser bettingUser)
        {
            return HandleResult(await Mediator.Send(new CreateBettingUser.Command { BettingUser = bettingUser }));
        }
    }
}