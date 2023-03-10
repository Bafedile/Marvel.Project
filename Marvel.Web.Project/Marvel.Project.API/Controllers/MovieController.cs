

using Marvel.Project.API.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Marvel.Project.API.Controllers;

[ApiController]
[Route("movies")]
public class MovieController : EntityControllerBase<Movie, Guid, Core.Entities.Movie>
{

    public MovieController(IMediator mediator) : base(mediator) { }
}