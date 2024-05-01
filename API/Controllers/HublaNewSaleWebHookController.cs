using Application.Hubla.Sale;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class HublaNewSaleWebHookController : BaseApiController
    {
        // função para recever o payload do webhook e converter para um objeto do tipo NewSale
        [HttpPost("hubla-new-sale")]
        public async Task<IActionResult> HublaNewSale([FromBody] HublaNewSale payload)
        {
            // diserializar e imprimir no console
            // Console.WriteLine(JsonConvert.SerializeObject(payload));

            // Inscrição Cancelada
            if (payload.Type == "CanceledSubscription")
            {
                Console.WriteLine("Inscrição cancelada por teste");
                return Ok();
            }

            // Nova Venda
            if (payload.Type == "NewSale")
            {
                Console.WriteLine("Nova Venda");
                return HandleResult(await Mediator.Send(new CreateSale.Command { HublaNewSale = payload }));
            }

            // Novo Usuário
            if (payload.Type == "NewUser")
            {
                Console.WriteLine("Novo Usuário");
                return Ok();
            }

            // Venda Pendente
            if (payload.Type == "PendingSale")
            {
                Console.WriteLine("Venda Pendente");
                return Ok();
            }

            // Venda Em Protesto
            if (payload.Type == "InProtestSale")
            {
                Console.WriteLine("Venda Em Protesto");
                return Ok();
            }

            // Solicitação de Reembolso
            if (payload.Type == "RefundRequested")
            {
                Console.WriteLine("Solicitação de Reembolso");
                return Ok();
            }

            // Carrinho abandonado
            if (payload.Type == "AbandonedCheckout")
            {
                Console.WriteLine("Carrinho abandonado");
                return Ok();
            }

            // se não for nenhum dos casos acima, retornar um status 400
            Console.WriteLine(payload.Type);
            return BadRequest();
        }

        [HttpGet("hubla-sale")]
        public async Task<IActionResult> GetSales()
        {
            return HandleResult<List<SaleDto>>(await Mediator.Send(new ListSale.Query{}));
        }

        [HttpPut("hubla-sale/{id}")]
        public async Task<IActionResult> EditSale(Guid id, HublaNewSale sale)
        {
            sale.HublaNewSaleId = id;
            return HandleResult(await Mediator.Send(new EditSale.Command { HublaNewSale = sale }));
        }

        [HttpGet("hubla-sale/{id}")]
        public async Task<IActionResult> GetSale(Guid id)
        {
            return HandleResult<SaleDto>(await Mediator.Send(new DetailsSale.Query{ Id = id }));
        }

        [HttpDelete("hubla-sale/{id}")]
        public async Task<IActionResult> DeleteSale(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteSale.Command{ Id = id }));
        }
    }
}