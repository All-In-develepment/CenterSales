using Application.Hubla.Sale;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class HublaCancledSaleWebHookController : BaseApiController
    {
        // Vendas Canceladas
        [HttpGet("hubla-canceled-sale")]
        public async Task<IActionResult> GetCanceledSales()
        {
            return HandleResult<List<CanceledSaleDto>>(await Mediator.Send(new ListCanceledSale.Query{}));
        }

        [HttpGet("hubla-canceled-sale/{id}")]
        public async Task<IActionResult> GetCanceledSale(Guid id)
        {
            return HandleResult<CanceledSaleDto>(await Mediator.Send(new DetailsCanceledSale.Query{ Id = id }));
        }

        [HttpDelete("hubla-canceled-sale/{id}")]
        public async Task<IActionResult> DeleteCanceledSale(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCanceledSale.Command{ Id = id }));
        }

        [HttpPut("hubla-canceled-sale/{id}")]
        public async Task<IActionResult> EditCanceledSale(Guid id, HublaCanceledSale sale)
        {
            sale.HublaCanceledSaleId = id;
            return HandleResult(await Mediator.Send(new EditCanceledSale.Command { HublaCanceledSale = sale }));
        }

        [HttpPost("hubla-canceled-sale")]
        public async Task<IActionResult> CreateCanceledSale(HublaCanceledSale sale)
        {
            return HandleResult(await Mediator.Send(new CreateCanceledSale.Command { HublaCanceledSale = sale }));
        }
    }
}