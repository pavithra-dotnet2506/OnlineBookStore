using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStore.Domain.Models;
using OnlineBookStore.Infra.DBContext;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OnlineBookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ApplicationDBContext _context;

        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDBContext context,
                              IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _context.User
                    .FirstOrDefaultAsync(x =>
                        x.Email == request.Email &&
                        x.Password == request.Password);

                if (user == null)
                {
                    return Unauthorized(new
                    {
                        Status = false,
                        Message = "Invalid Email or Password"
                    });
                }

                var claims = new[]
                {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role,user.Role)
            };

                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!));

                var creds = new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(2),
                    signingCredentials: creds);

                return Ok(new
                {
                    Status = true,
                    Message = "Login Successful",
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    User = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.Role
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = false,
                    Message = ex.Message
                });
            }
        }
    }
}
