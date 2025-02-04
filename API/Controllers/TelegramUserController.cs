using Application.TelegramUsers;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TelegramUserController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetInstagramUsers()
        {
            return HandleResult(await Mediator.Send(new TelegramUserList.Query()));
        }

        [HttpGet("{telegramUserName}")]
        public async Task<IActionResult> GetInstagramUser(string telegramUserName)
        {
            return HandleResult(await Mediator.Send(new GetTelegramUserByName.Query { UserTelegramName = telegramUserName }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateInstagramUser(TelegramUser telegramUser)
        {
            return HandleResult(await Mediator.Send(new CreateTelegramUser.Command { TelegramUser = telegramUser }));
        }
    }
}