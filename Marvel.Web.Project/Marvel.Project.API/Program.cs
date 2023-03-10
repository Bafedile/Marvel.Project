using System.Runtime.CompilerServices;
using Marvel.Project.Core.Data;
using Marvel.Project.Data;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Marvel.Project.API.Commands;
using Marvel.Project.Api.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("MarvelProject");
// var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
builder.Services.AddDbContext<MarvelProjectDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.Add(new ServiceDescriptor(typeof(IRepository), typeof(MarvelProjectDbContext), ServiceLifetime.Scoped));
builder.Services.Add(new ServiceDescriptor(typeof(IQueryRepository), typeof(MarvelProjectDbContext), ServiceLifetime.Scoped));
builder.Services.Add(new ServiceDescriptor(typeof(ICommandRepository), typeof(MarvelProjectDbContext), ServiceLifetime.Scoped));
builder.Services.Add(new ServiceDescriptor(typeof(IModelGenerateIdentityKey<Guid>), typeof(GenerateIdentityKey), ServiceLifetime.Scoped));



builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddMediatR(typeof(Program).Assembly);
builder.Services.AddEntityHandlers();

builder.Services.AddCors();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
// /*if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
//     using(var scope = app.Services.CreateScope()){
//         var context = scope.ServiceProvider.GetRequiredService<MarvelProjectDbContext>();
//         context.Database.EnsureCreated();
        
//     }
// }*/

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseAuthorization();

app.MapControllers();

app.Run();
