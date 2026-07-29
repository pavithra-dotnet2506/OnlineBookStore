
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Infra.DBContext;

namespace OnlineBookStore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<ApplicationDBContext>(options => 
                options.UseSqlServer(builder.Configuration.GetConnectionString("dbConn")));

            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();
            app.UseCors("CorsPolicy");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();   // Enable serving files from wwwroot


            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
