using Application.Project;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProjects([FromQuery] ProjectParams param)
        {
            return HandlePagedResult(await Mediator.Send(new ListProject.Query { Params = param }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Domain.Project project)
        {
            return HandleResult(await Mediator.Send(new CreateProject.Command { Project = project }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(Guid id, Domain.Project project)
        {
            project.ProjectId = id;
            return HandleResult(await Mediator.Send(new EditProject.Command { Project = project }));
        }
    }
}