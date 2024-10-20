using Application.Core;
using Application.Seller;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SellersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSellers([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListSeller.Query { Params = param }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSeller(Domain.Seller seller)
        {
            return HandleResult(await Mediator.Send(new CreateSeller.Command { Seller = seller }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSeller(Guid id, Domain.Seller seller)
        {
            seller.SellerId = id;
            return HandleResult(await Mediator.Send(new EditSeller.Command { Seller = seller }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSellerById(Guid id)
        {
            return HandleResult(await Mediator.Send(new DetailsSeller.Query { Id = id }));
        }
    }
}